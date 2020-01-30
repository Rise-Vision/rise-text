import { html } from "@polymer/polymer";
import "@polymer/polymer/lib/elements/dom-if.js";
import { RiseElement } from "rise-common-component/src/rise-element.js";
import { version } from "./rise-text-version.js";

export default class RiseText extends RiseElement {

  static get template() {
    return html`
      <template is="dom-if" if="{{fontsize > 0}}"><span style="font-size: [[fontsize]]px">[[value]]</span></template>
      <template is="dom-if" if="{{!fontsize}}">[[value]]</template>
    `;
  }

  static get properties() {
    return {
      value: {
        type: String,
        observer: "_valueChanged"
      },
      fontsize: {
        type: Number
      }
    };
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
