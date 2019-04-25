import {PolymerElement, html} from "@polymer/polymer";

export default class RiseText extends PolymerElement {

  static get template() {
    return html`[[value]]`;
  }

  static get properties() {
    return {
      value: {
        type: String
      }
    }
  }

  constructor() {
    super();
  }

  ready() {
    super.ready();

    if (RisePlayerConfiguration.isConfigured()) {
      this._init();
    } else {
      window.addEventListener( "rise-components-ready", () => this._init(), { once: true });
    }
  }

  _init() {
    console.log("init"); // eslint-disable-line no-console
  }

}

customElements.define("rise-text", RiseText);
