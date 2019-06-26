import { html } from "@polymer/polymer";
import { RiseElement } from "rise-common-component/src/rise-element.js";

export default class RiseText extends RiseElement {

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

}

customElements.define("rise-text", RiseText);
