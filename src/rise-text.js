import { html } from "@polymer/polymer";
import "@polymer/polymer/lib/elements/dom-if.js";
import { RiseElement } from "rise-common-component/src/rise-element.js";
import { version } from "./rise-text-version.js";

const MIN_TEXT_SIZE = 1;
const MAX_TEXT_SIZE = 200;

export default class RiseText extends RiseElement {

  static get template() {
    return html``;
  }

  static get properties() {
    return {
      richText: {
        type: String,
        observer: "_richTextChanged"
      },
      value: {
        type: String,
        observer: "_valueChanged"
      },
      fontsize: {
        type: Number,
        observer: "_fontsizeChanged"
      },
      minfontsize: {
        type: Number,
        value: MIN_TEXT_SIZE,
        observer: "_checkFontSize"
      },
      maxfontsize: {
        type: Number,
        value: MAX_TEXT_SIZE,
        observer: "_checkFontSize"
      },
      multiline: {
        type: Boolean,
        value: false
      }
    };
  }

  constructor() {
    super();

    this._setVersion( version );
    this.validFont = false;
  }

  _richTextChanged(newValue, oldValue) {
    this._refresh();
    this._sendTextEvent( RiseText.EVENT_DATA_UPDATE, {newValue, oldValue, content: "html"});
  }

  _valueChanged(newValue, oldValue) {
    if (!this._richTextIsSet()) {
      this._refresh();
    }
    this._sendTextEvent( RiseText.EVENT_DATA_UPDATE, {newValue, oldValue, fontsize: this.fontsize});
  }

  _fontsizeChanged() {
    this.validFont = this._checkFontSize();

    if (this.validFont) {
      if (!this._richTextIsSet()) {
        this._refresh();
      }
      this._sendTextEvent( RiseText.EVENT_DATA_UPDATE, {newValue: this.value, oldValue: this.value, fontsize: this.fontsize});
    }
  }

  _checkFontSize() {
    let validParameters = true;

    if (this.minfontsize && this.minfontsize < MIN_TEXT_SIZE) {
      super.log( "error", "Minimum font size must be greater than 0", { min: this.minfontsize } );
      this._sendTextEvent( RiseText.EVENT_DATA_ERROR, {
        message: "Minimum font size must be greater 0",
        min: this.minfontsize
      });

      validParameters = false;
    }

    if (this.maxfontsize && this.maxfontsize < MIN_TEXT_SIZE) {
      super.log( "error", "Maximum font size must be greater than 0", { max: this.maxfontsize } );
      this._sendTextEvent( RiseText.EVENT_DATA_ERROR, {
        message: "Maximum font size must be greater 0",
        max: this.maxfontsize
      });

      validParameters = false;
    }

    if (this.minfontsize && this.maxfontsize && this.maxfontsize < this.minfontsize) {
      super.log( "error", "Maximum font size must be greater than minimum", { min: this.minfontsize, max: this.maxfontsize } );
      this._sendTextEvent( RiseText.EVENT_DATA_ERROR, {
        message: "Maximum font size must be greater than minimum",
        min: this.minfontsize,
        max: this.maxfontsize
      });

      validParameters = false;
    }

    if (this.fontsize && this.fontsize < this.minfontsize) {
      super.log( "error", "Font size must be greater than or equal to the minimum", { min: this.minfontsize, size: this.fontsize } );
      this._sendTextEvent( RiseText.EVENT_DATA_ERROR, {
        message: "Font size must be greater than or equal to the minimum",
        min: this.minfontsize,
        size: this.fontsize
      });

      validParameters = false;
    }

    if (this.fontsize && this.fontsize > this.maxfontsize) {
      super.log( "error", "Font size must be lower than or equal to the maximum", { max: this.maxfontsize, size: this.fontsize } );
      this._sendTextEvent( RiseText.EVENT_DATA_ERROR, {
        message: "Font size must be lower than or equal to the maximum",
        max: this.maxfontsize,
        size: this.fontsize
      });

      validParameters = false;
    }

    return validParameters;
  }

  _richTextIsSet() {
    return typeof this.richText !== "undefined"
  }

  _refresh() {
    const css = `
<style>
  :host([multiline=true]) span {
    white-space: pre-wrap;
  }
</style>
    `;

    let html = this.richText;

    //backwards compatibility
    if (!this._richTextIsSet()) {
      if (this.validFont) {
        html = `<span style="font-size: ${this.fontsize}px;">${this.value}</span>`;
      } else {
        html = `<span>${this.value}</span>`;
      }
    }

    this.shadowRoot.innerHTML = css + html;
  }

  _sendTextEvent( eventName, detail ) {
    super._sendEvent( eventName, detail );

    switch ( eventName ) {
      case RiseText.EVENT_DATA_ERROR:
        super._setUptimeError( true );
        break;
      case RiseText.EVENT_DATA_UPDATE:
        super._setUptimeError( false );
        break;
      default:
    }
  }
}

customElements.define("rise-text", RiseText);
