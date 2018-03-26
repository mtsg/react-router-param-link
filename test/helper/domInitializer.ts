import { JSDOM, DOMWindow } from "jsdom";


export class DOMInitializer {
  readonly DOM: JSDOM;

  constructor(url?: string) {
    const URL = url ? url : "https://example.com";
    this.DOM = new JSDOM("<!doctype html><html><body></body></html>",
      {
        url: URL,
        contentType: "text/html",
        includeNodeLocations: true
      }
    );

    this.setup(this.DOM);
  }

  private setup(dom: JSDOM) {
    global["document"] = dom.window.document;
    global["window"] = dom.window;
    global["navigator"] = dom.window.navigator;
    global["HTMLElement"] = dom.window.HTMLElement;

    this.propagateToGlobal(dom.window)
  }

  private propagateToGlobal(window: DOMWindow) {
    for (let key in window) {
      if (!window.hasOwnProperty(key)) continue
      if (key in global) continue
      global[key] = window[key]
    }
  }
}
