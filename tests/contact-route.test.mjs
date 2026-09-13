import assert from "node:assert/strict";
import { after, test } from "node:test";
import { POST } from "../src/app/api/contact/route.ts";

const originalFetch = globalThis.fetch;
const originalWebhook = process.env.MAKE_CONTACT_WEBHOOK_URL;
after(() => {
  globalThis.fetch = originalFetch;
  if (originalWebhook === undefined) delete process.env.MAKE_CONTACT_WEBHOOK_URL;
  else process.env.MAKE_CONTACT_WEBHOOK_URL = originalWebhook;
});

const payload = {
  name: " Teste Skave ", email: "teste@example.com", phone: "(11) 99999-9999",
  referralSource: "google", companyNameAndIndustry: "Empresa teste — Design",
  company: "https://example.com", partners: "Sócio teste", budget: "7000-15000",
  message: "Mensagem de teste",
};
const request = (data) => new Request("http://localhost/api/contact", {
  method: "POST", body: JSON.stringify(data),
  headers: { "Content-Type": "application/json" },
});

test("encaminha os campos atuais, remove extras e aceita resposta textual do Make", async () => {
  process.env.MAKE_CONTACT_WEBHOOK_URL = "https://example.com/webhook";
  globalThis.fetch = async (url, options) => {
    assert.equal(url, process.env.MAKE_CONTACT_WEBHOOK_URL);
    assert.equal(options.method, "POST");
    assert.deepEqual(JSON.parse(options.body), { ...payload, name: "Teste Skave" });
    return new Response("Accepted");
  };
  const response = await POST(request({ ...payload, employees: "10" }));
  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { success: true });
});

test("rejeita dados inválidos antes de chamar o webhook", async () => {
  globalThis.fetch = async () => { assert.fail("Não deve chamar o Make"); };
  for (const data of [null, [], {}, { ...payload, email: "inválido" },
    { ...payload, referralSource: "unknown" }, { ...payload, budget: "unknown" },
    { ...payload, message: "x".repeat(10001) }, { ...payload, name: 123 }]) {
    assert.equal((await POST(request(data))).status, 400);
  }
  assert.equal((await POST(new Request("http://localhost/api/contact", {
    method: "POST", body: "{",
  }))).status, 400);
});

test("exige os sete campos obrigatórios antes de chamar o Make", async () => {
  globalThis.fetch = async () => { assert.fail("Não deve chamar o Make"); };
  for (const field of ["name", "email", "referralSource", "companyNameAndIndustry", "partners", "budget", "message"]) {
    for (const value of [undefined, "", "   "]) {
      assert.equal((await POST(request({ ...payload, [field]: value }))).status, 400, field);
    }
  }
});

test("aceita telefone e site/Instagram vazios ou ausentes", async () => {
  process.env.MAKE_CONTACT_WEBHOOK_URL = "https://example.com/webhook";
  globalThis.fetch = async (_url, options) => {
    const data = JSON.parse(options.body);
    assert.equal(data.phone, "");
    assert.equal(data.company, "");
    return new Response("Accepted");
  };
  for (const value of [undefined, "", "   "]) {
    assert.equal((await POST(request({ ...payload, phone: value, company: value }))).status, 200);
  }
});

test("valida URLs de site/Instagram e mantém o campo opcional", async () => {
  process.env.MAKE_CONTACT_WEBHOOK_URL = "https://example.com/webhook";
  let calls = 0;
  globalThis.fetch = async () => {
    calls += 1;
    return new Response("Accepted");
  };
  for (const company of ["texto livre", "@skave", "example.com", "https://", "https:example.com",
    "javascript:alert(1)", "ftp://example.com", "https://example.com/um caminho"]) {
    assert.equal((await POST(request({ ...payload, company }))).status, 400, company);
  }
  assert.equal(calls, 0);
  for (const company of ["", "https://instagram.com/skave/", "http://example.com",
    "https://example.com/path?q=design#contact"]) {
    assert.equal((await POST(request({ ...payload, company }))).status, 200, company);
  }
  assert.equal(calls, 4);
});

test("reporta indisponibilidade e falhas do Make sem retornar sucesso", async () => {
  delete process.env.MAKE_CONTACT_WEBHOOK_URL;
  assert.equal((await POST(request(payload))).status, 503);
  process.env.MAKE_CONTACT_WEBHOOK_URL = "https://example.com/webhook";
  globalThis.fetch = async () => new Response("Rejected", { status: 500 });
  assert.equal((await POST(request(payload))).status, 502);
  globalThis.fetch = async () => { throw new DOMException("Timeout", "TimeoutError"); };
  assert.equal((await POST(request(payload))).status, 502);
});
