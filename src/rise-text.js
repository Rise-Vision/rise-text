import {PolymerElement, html} from "@polymer/polymer";

export default class RiseText extends PolymerElement {

  static get template() {
    return html`[[renderedValue]]`;
  }

  static get properties() {
    return {
      value: {
        type: String
      },
      startEventReceived: {
        type: Boolean,
        value: false
      },
      renderedValue: {
        type: String,
        // when `value` or `startEventReceived` changes `computeRenderedValue` is called once
        // and the value it returns is stored as `renderedValue`
        computed: "_computeRenderedValue(value, startEventReceived)"
      }
    }
  }

  // Event name constants
  static get EVENT_CONFIGURED() {
    return "configured";
  }

  constructor() {
    super();
    this._started = false;
  }

  ready() {
    super.ready();

    window.addEventListener( "start", () => this._start(), { once: true });

    if (RisePlayerConfiguration.isConfigured()) {
      this._init();
    } else {
      window.addEventListener( "rise-components-ready", () => this._init(), { once: true });
    }
  }

  _init() {
    this._sendEvent(RiseText.EVENT_CONFIGURED);
  }

  _start() {
    this.startEventReceived = true;
  }

  _computeFullName(value, startEventReceived) {
    if (startEventReceived) {
      return value;
    } else {
      return "";
    }
  }

  _sendEvent(eventName, detail = {}) {
    const event = new CustomEvent(eventName, {
      bubbles: true, composed: true, detail
    });

    this.dispatchEvent(event);
  }

}

customElements.define("rise-text", RiseText);
