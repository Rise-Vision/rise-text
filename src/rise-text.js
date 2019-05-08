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

  // Event name constants
  static get EVENT_CONFIGURED() {
    return "configured";
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
    this._sendEvent(RiseText.EVENT_CONFIGURED);
  }

  _sendEvent(eventName, detail = {}) {
    const event = new CustomEvent(eventName, {
      bubbles: true, composed: true, detail
    });

    this.dispatchEvent(event);
  }

}

customElements.define("rise-text", RiseText);
