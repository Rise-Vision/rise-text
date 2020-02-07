import { html } from "@polymer/polymer";
import "@polymer/polymer/lib/elements/dom-if.js";
import { RiseElement } from "rise-common-component/src/rise-element.js";
import { version } from "./rise-text-version.js";

export default class RiseText extends RiseElement {

  static get template() {
    return html`
      <template is="dom-if" if="{{validFont}}"><span style="font-size: [[fontsize]]px">[[value]]</span></template>
      <template is="dom-if" if="{{!validFont}}">[[value]]</template>
    `;
  }

  static get properties() {
    return {
      value: {
        type: String,
        observer: "_valueChanged"
      },
      fontsize: {
        type: Number,
        observer: "_fontsizeChanged"
      }
    };
  }

  constructor() {
    super();

    this._setVersion( version );
    this.validFont = false;
  }

  _valueChanged(newValue, oldValue) {
    super._sendEvent( RiseText.EVENT_DATA_UPDATE, {newValue, oldValue, fontsize: this.fontsize});
  }

  _fontsizeChanged(newValue) {
    this.validFont = newValue && newValue > 0;

    super._sendEvent( RiseText.EVENT_DATA_UPDATE, {newValue: this.value, oldValue: this.value, fontsize: this.fontsize});
  }
}

customElements.define("rise-text", RiseText);
