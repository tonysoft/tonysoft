import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
// import '@polymer/iron-icon/iron-icon.js';
// import 'https://unpkg.com/tonysoft@1.53.21/iron-icons.js?module'

class RatingStrip extends PolymerElement {

  static get properties() {
    return {

        variousIcons: {
            type: Array,
            value() {
            return [
                    {symbol: 'block'},
                    {symbol: 'star'},
                    {symbol: 'star'},
                    {symbol: 'star'},
                    {symbol: 'star'},
                    {symbol: 'star'}
                ];
            }
        },

        ratingValue: {
            type: Number
        }

    };
  }

  static get template() {
    return html`

    <style>
          :host {
          display: inline-block;
          --icon-toggle-pressed-color: #f0f000;
          --icon-toggle-color: rgba(0,0,0,0);
          --icon-no-rating: #aaaaaa;
          --icon-no-rating-stroke: #888888;
          --icon-no-rating-off: #aaaaaa66;
          --icon-no-rating-off-stroke: #88888866;
          }
          iron-icon {
          fill: var(--icon-toggle-color, rgba(0,0,0,0));
          stroke: var(--icon-toggle-outline-color, currentcolor);
          }
          :host([pressed]) iron-icon {
          fill: var(--icon-toggle-pressed-color, currentcolor);
          }
          .noRating {
            fill: var(--icon-no-rating, currentcolor);
            stroke: var(--icon-no-rating, currentcolor);
          }
          .noRatingOff {
            fill: var(--icon-no-rating-off, currentcolor);
            stroke: var(--icon-no-rating-off, currentcolor);
          }
          .toggleOff {
            fill: var(--icon-toggle-color, currentcolor);
          }
          .toggleOn {
              fill: var(--icon-toggle-pressed-color, currentcolor);
          }
</style>
    <template is="dom-repeat" items="{{variousIcons}}">
        <iron-icon id="[[setIdValue(index)]]" class$="[[toggleState(ratingValue, index)]]" on-click="setRatingValue" icon="[[item.symbol]]"></iron-icon>
    </template>
    `;
  }

  constructor() {
    super();
    this.ratingValue = 0;
    // this.addEventListener('click', this.toggle.bind(this));
  }

  setIdValue(index) {
      return index;
  }

  setRatingValue(e) {
    var context = this;
    var icon = e.srcElement;
    var id = icon.id;
    context.ratingValue = parseInt(id);
    context.dispatchEvent(new CustomEvent("ratingValue", { 
        detail: context.ratingValue
    }));
  }
  
  toggleState(value, index) {
    var context = this;
    if (index === 0) {
        switch (value) {
            case 0:
                return "noRating";
                break;
            default:
                return "noRatingOff";
        }
    }
    if (value >= index) {
        return "toggleOn";
    } else {
        return "toggleOff"
    }
  }
}
customElements.define('rating-strip', RatingStrip);