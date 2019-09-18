import { PolymerElement, html } from '@polymer/polymer/polymer-element.js';
import '@polymer/iron-icon/iron-icon.js';
import 'https://unpkg.com/tonysoft@1.53.21/iron-icons.js?module'

class RatingBar extends PolymerElement {
  static get template() {
    return html`
            <style>
            :host {
        display: inline-block;
      }
      iron-icon {
        fill: var(--rating-bar-color, rgba(0,0,0,0));
        stroke: var(--rating-bar-outline-color, currentcolor);
      }
      :host([pressed]) iron-icon {
        fill: var(--rating-bar-pressed-color, currentcolor);
      }
        </style>

      <!-- shadow DOM goes here -->
      <iron-icon icon="[[toggleIcon]]"></iron-icon>
      <iron-icon icon="chevron-right"></iron-icon>
      <!-- <span>Icons</span> -->

    `;
  }

  static get properties () {
    return {
      toggleIcon: {
        type: String
      },
      pressed: {
        type: Boolean,
        value: false,
        notify: true,
        reflectToAttribute: true
      }
    };
  }

  constructor() {
    super();
    this.addEventListener('click', this.toggle.bind(this));
  }
  toggle() {
    this.pressed = !this.pressed;
  }


}

customElements.define('rating-bar', RatingBar);