import {html, PolymerElement} from 'https://unpkg.com/tonysoft@1.2.4/@polymer/polymer/polymer-element.js';

/**
 * `generic-container`
 * A container with header, content, and footer slots which will also scale its content to the size of its parent container
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
 */
class GenericContainer extends PolymerElement {
    static get template() {
      return html`
        <style>
          :host {
            --transform-main: translate(0,0) scale(1.0);
          }
          .main {
            transform: var(--transform-main);
          }
        </style>
        <div class="main">
          <slot name="header"></slot>
          <slot name="content"></slot>
          <slot name="footer"></slot>
        </div>
      `;
    }

    static get properties() {
      return {
        bestFit: {
          type: Boolean,
          observer: '_bestFitChanged'
        }
      }
    }

    constructor() {
      super();
    }

    _bestFitChanged(newValue) {
      var context = this;
      if (newValue) {
        context.style.position = "absolute";
        context.style.left = "0px";
        context.style.top = "0px";
      } else {
        context.style.position = "";
        context.style.left = "";
        context.style.top = "";
      }
    }

    scaleContent(widthWindow, heightWindow) {
      var context = this;
      if (context.bestFit) {
        var width = widthWindow;
        var height = heightWindow;
        var parent = context.parentNode;
        if (parent && (parent.offsetWidth || parent.offsetHeight)) {
          width = parent.offsetWidth || width;
          height = parent.offsetHeight || height;
        }
        var main = this.shadowRoot.querySelector(".main");
        // var main = this.querySelector("div[slot='content']");
        var mainWidth = main.offsetWidth;
        var mainHeight = main.offsetHeight;
        var hScale = width / mainWidth;
        var vScale = height / mainHeight;
        var newScale = Math.min(hScale, vScale);
        var translateX = 0;
        var translateY = 0;
        if (newScale < 1) {
          translateX = (mainWidth * (1 - newScale)) / -2;
          translateY = (mainHeight * (1 - newScale)) / -2;
        } else {
          translateX = mainWidth * (newScale - 1.0) / 2;
          translateY = mainHeight * (newScale - 1.0) / 2;
        }
        var adjWidth = (mainWidth * newScale);
        if (adjWidth < width) {
          translateX -= (adjWidth - width) / 2;
        }
        var adjHeight = (mainHeight * newScale);
        if (adjHeight < height) {
          translateY -= (adjHeight - height) / 2;
        }
        this.updateStyles({'--transform-main': "translate(" + translateX + "px," + translateY + "px) scale(" + newScale + ")"});
      }
    }
}


window.customElements.define('generic-container', GenericContainer);
export { GenericContainer }