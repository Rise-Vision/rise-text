import { html } from "@polymer/polymer";
import "@polymer/polymer/lib/elements/dom-if.js";
import { RiseElement } from "rise-common-component/src/rise-element.js";
import { version } from "./rise-text-version.js";

const MIN_TEXT_SIZE = 1;
const MAX_TEXT_SIZE = 200;

export default class RiseText extends RiseElement {

  static get template() {
    return html`
      <style>
        :host([verticalalign]), :host([horizontalalign]), :host([textalign]) {
          width: 100%;
          height: 100%;
          display: flex;
        }
        :host([multiline=true]) span {
          white-space: pre-wrap;
        }
      </style>
      <template is="dom-if" if="{{validFont}}"><span style="font-size: [[fontsize]]px;">[[value]]</span></template>
      <template is="dom-if" if="{{!validFont}}"><span>[[value]]</span></template>
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
      },
      verticalalign: {
        type: String,
        observer: "_verticalAlignmentChanged",
        reflectToAttribute: true
      },
      horizontalalign: {
        type: String,
        observer: "_horizontalAlignmentChanged",
        reflectToAttribute: true
      },
      textalign: {
        type: String,
        observer: "_textAlignmentChanged",
        reflectToAttribute: true
      },
    };
  }

  constructor() {
    super();

    this._setVersion( version );
    this.validFont = false;
  }

  _valueChanged(newValue, oldValue) {
    this._sendTextEvent( RiseText.EVENT_DATA_UPDATE, {newValue, oldValue, fontsize: this.fontsize});
  }

  _fontsizeChanged() {
    this.validFont = this._checkFontSize();

    if (this.validFont) {
      this._sendTextEvent( RiseText.EVENT_DATA_UPDATE, {newValue: this.value, oldValue: this.value, fontsize: this.fontsize});
    }
  }

  _verticalAlignmentChanged(verticalalign) {
    let vertical = "flex-start";

    switch(verticalalign) {
      case "bottom":
        vertical = "flex-end";
        break;
      case "middle":
        vertical = "center";
        break;
      default:
    }

    this.style["align-items"] = vertical;
  }

  _horizontalAlignmentChanged(horizontalalign) {
    let horizontal = "flex-start";

    switch(horizontalalign) {
      case "right":
        horizontal = "flex-end";
        break;
      case "center":
        horizontal = "center";
        break;
      default:
    }

    this.style["justify-content"] =  horizontal;
  }

  _textAlignmentChanged(textalign) {
    this.style["text-align"] =  textalign;
  }

  _checkFontSize() {
    let validParameters = true;

    if (this.minfontsize && this.minfontsize < MIN_TEXT_SIZE) {
      super.log( RiseText.LOG_TYPE_ERROR, "Minimum font size must be greater than 0", {errorCode: "E000000032"}, { min: this.minfontsize } );
      this._sendTextEvent( RiseText.EVENT_DATA_ERROR, {
        message: "Minimum font size must be greater 0",
        min: this.minfontsize
      });

      validParameters = false;
    }

    if (this.maxfontsize && this.maxfontsize < MIN_TEXT_SIZE) {
      super.log( RiseText.LOG_TYPE_ERROR, "Maximum font size must be greater than 0", {errorCode: "E000000032"}, { max: this.maxfontsize } );
      this._sendTextEvent( RiseText.EVENT_DATA_ERROR, {
        message: "Maximum font size must be greater 0",
        max: this.maxfontsize
      });

      validParameters = false;
    }

    if (this.minfontsize && this.maxfontsize && this.maxfontsize < this.minfontsize) {
      super.log( RiseText.LOG_TYPE_ERROR, "Maximum font size must be greater than minimum", {errorCode: "E000000032"}, { min: this.minfontsize, max: this.maxfontsize } );
      this._sendTextEvent( RiseText.EVENT_DATA_ERROR, {
        message: "Maximum font size must be greater than minimum",
        min: this.minfontsize,
        max: this.maxfontsize
      });

      validParameters = false;
    }

    if (this.hasAttribute("fontsize") && this.getAttribute("fontsize") < this.minfontsize) {
      super.log( RiseText.LOG_TYPE_ERROR, "Font size must be greater than or equal to the minimum", {errorCode: "E000000033"}, { min: this.minfontsize, size: this.fontsize } );
      this._sendTextEvent( RiseText.EVENT_DATA_ERROR, {
        message: "Font size must be greater than or equal to the minimum",
        min: this.minfontsize,
        size: this.fontsize
      });

      validParameters = false;
    }

    if (this.hasAttribute("fontsize") && this.getAttribute("fontsize") > this.maxfontsize) {
      super.log( RiseText.LOG_TYPE_ERROR, "Font size must be lower than or equal to the maximum", {errorCode: "E000000033"}, { max: this.maxfontsize, size: this.fontsize } );
      this._sendTextEvent( RiseText.EVENT_DATA_ERROR, {
        message: "Font size must be lower than or equal to the maximum",
        max: this.maxfontsize,
        size: this.fontsize
      });

      validParameters = false;
    }

    return validParameters;
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
