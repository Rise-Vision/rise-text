import { html } from "@polymer/polymer";
import { RiseElement } from "rise-common-component/src/rise-element.js";
import { version } from "./rise-text-version.js";

export default class RiseText extends RiseElement {

  static get template() {
    return html`[[value]]`;
  }

  static get properties() {
    return {
      value: {
        type: String,
        observer: "_valueChanged"
      }
    }
  }

  // Event name constants
  static get EVENT_DATA_UPDATE() {
    return "data-update";
  }

  constructor() {
    super();

    this._setVersion( version );
  }

  _valueChanged(newValue, oldValue) {
    super._sendEvent( RiseText.EVENT_DATA_UPDATE, {newValue, oldValue});
  }
}

customElements.define("rise-text", RiseText);
