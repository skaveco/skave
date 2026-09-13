import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";
import vm from "node:vm";
import ts from "typescript";

function setup(props = {}) {
  let effect, cleanup;
  const observers = [];
  const target = new EventTarget();
  target.focusVisible = false;
  target.matches = (selector) => selector === ":focus-visible" && target.focusVisible;
  const desktop = new EventTarget();
  desktop.matches = true;
  const video = new EventTarget();
  video.closest = () => target;
  video.paused = true;
  video.play = () => { video.paused = false; return Promise.resolve(); };
  video.pause = () => { video.paused = true; };
  const document = new EventTarget();
  document.hidden = false;
  const preference = new EventTarget();
  preference.matches = false;
  class IntersectionObserver {
    constructor(callback, options) {
      this.callback = callback;
      this.thresholds = options?.threshold ?? [0];
      observers.push(this);
    }
    observe() {}
    disconnect() {}
    update(ratio) {
      const crossed = this.previous === undefined || this.thresholds.some(
        (threshold) => (this.previous >= threshold) !== (ratio >= threshold),
      );
      this.previous = ratio;
      if (crossed) this.callback([{ isIntersecting: true, intersectionRatio: ratio }]);
    }
  }
  const source = ts.transpileModule(
    readFileSync(new URL("../src/components/ui/viewport-video.tsx", import.meta.url), "utf8"),
    { compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX } },
  ).outputText;
  const exports = {};
  vm.runInNewContext(source, {
    exports, document, IntersectionObserver,
    window: { IntersectionObserver, matchMedia: (query) => query.includes("min-width") ? desktop : preference },
    require: (name) => name === "react" ? {
      useRef: () => ({ current: video }),
      useEffect: (callback) => { effect = callback; },
    } : { jsx: () => null },
  });
  exports.ViewportVideo({ muted: true, loop: true, ...props });
  cleanup = effect();
  return { video, document, preference, desktop, target, observer: observers[0], cleanup };
}

test("starts after a reveal changes the clipped video from zero area to visible", () => {
  const { video, observer, cleanup } = setup();
  observer.update(0);
  assert.equal(video.paused, true);
  observer.update(0.5);
  assert.equal(video.paused, false);
  observer.update(0);
  assert.equal(video.paused, true);
  cleanup();
});

test("retries when ready and pauses for hidden tabs and reduced motion", () => {
  const { video, observer, document, preference, cleanup } = setup();
  observer.update(1);
  video.pause();
  video.dispatchEvent(new Event("canplay"));
  assert.equal(video.paused, false);
  document.hidden = true;
  document.dispatchEvent(new Event("visibilitychange"));
  assert.equal(video.paused, true);
  document.hidden = false;
  document.dispatchEvent(new Event("visibilitychange"));
  assert.equal(video.paused, false);
  preference.matches = true;
  preference.dispatchEvent(new Event("change"));
  assert.equal(video.paused, true);
  cleanup();
});


test("desktop previews require hover or keyboard focus as well as viewport visibility", () => {
  const { video, target, observer, cleanup } = setup({ hoverTargetSelector: "[data-project-preview]" });
  observer.update(1);
  assert.equal(video.paused, true);
  target.dispatchEvent(new Event("mouseenter"));
  assert.equal(video.paused, false);
  target.dispatchEvent(new Event("mouseleave"));
  assert.equal(video.paused, true, "pauses immediately, before the exit animation ends");
  target.focusVisible = true;
  target.dispatchEvent(new Event("focusin"));
  assert.equal(video.paused, false);
  observer.update(0);
  assert.equal(video.paused, true, "focus must not keep an offscreen video playing");
  observer.update(1);
  assert.equal(video.paused, false);
  target.focusVisible = false;
  target.dispatchEvent(new Event("focusout"));
  assert.equal(video.paused, true);
  cleanup();
  target.dispatchEvent(new Event("mouseenter"));
  assert.equal(video.paused, true, "cleanup removes interaction listeners");
});

test("mobile previews play without hover and re-evaluate on breakpoint changes", () => {
  const { video, desktop, observer, cleanup } = setup({ hoverTargetSelector: "[data-project-preview]" });
  desktop.matches = false;
  observer.update(1);
  assert.equal(video.paused, false);
  observer.update(0);
  assert.equal(video.paused, true);
  observer.update(1);
  desktop.matches = true;
  desktop.dispatchEvent(new Event("change"));
  assert.equal(video.paused, true);
  desktop.matches = false;
  desktop.dispatchEvent(new Event("change"));
  assert.equal(video.paused, false);
  cleanup();
});
