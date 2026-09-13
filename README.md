# SKAVE

Site desenvolvido com Next.js, React, TypeScript e Tailwind CSS.

## Desenvolvimento

```bash
npm install
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000) e edite a página inicial em
`src/app/page.tsx`.

## Comandos

- `npm run dev`: inicia o ambiente de desenvolvimento.
- `npm run build`: cria o build de produção.
- `npm run start`: executa o build de produção.
- `npm run lint`: verifica a qualidade do código.

## Formulário de contato

Configure `MAKE_CONTACT_WEBHOOK_URL` em `.env.local` no desenvolvimento e nas
variáveis de ambiente do servidor de produção com a URL do webhook do Make.
O navegador envia para `POST /api/contact`, que valida os dados e encaminha JSON
ao Make. Apenas telefone e site/Instagram são opcionais; todos os demais campos
são obrigatórios. Site/Instagram, quando preenchido, deve ser uma URL HTTP ou HTTPS.

Campos enviados: `name`, `email`, `phone`, `referralSource`,
`companyNameAndIndustry`, `company` (site/Instagram), `partners`, `budget` e `message`.
`referralSource` usa `social-media`, `referral`, `google` ou `online-ad`;
`budget` usa os valores definidos no dicionário do formulário.
Campos opcionais não preenchidos são enviados como strings vazias.

Verifique a integração localmente sem chamar o Make com
`node --test tests/contact-route.test.mjs`.

## Estrutura principal

```text
src/
└── app/
    ├── globals.css
    ├── layout.tsx
    └── page.tsx
```
