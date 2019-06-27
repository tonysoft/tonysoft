import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import {digitCell} from 'tonysoft/digit-cell.js';

/**
 * `digital-time-piece`
 * combine some digit-cell components into a digital time piece
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
 */
class digitalTimePiece extends PolymerElement {
    static get template() {
        return html`
        <style>
            :host {
                display: block;
                --cell-margin: 0 2px 0 2px;
            }
            .absolutely {
                position: absolute;
                top: 0px;
                left: 0px;
                width: 100%;
                height: 100%;
            }
            .inert {
                cursor: default;
                pointer-events: none
            }
            .noSelect {
                user-select: none;
            }
            .digital-clock { 
                display: flex; 
                flex-direction: row; 
                flex-wrap: wrap; 
                justify-content: space-evenly;
                align-items: center;
            }
            .cellMargin {
                margin: var(--cell-margin)
            }
        </style>
        <div class="relatively inert noSelect digital-clock">
          <digit-cell id="hourTens" class="cellMargin" size="[[size]]" value="0"></digit-cell>
          <digit-cell id="hourOnes" class="cellMargin" size="[[size]]" value="0"></digit-cell>
          <div  class="cellMargin"style="font-size: [[size]]px;">:</div>
          <digit-cell id="minuteTens" class="cellMargin" size="[[size]]" value="0"></digit-cell>
          <digit-cell id="minuteOnes" class="cellMargin" size="[[size]]" value="0"></digit-cell>
          <div  class="cellMargin"style="font-size: [[size]]px;">:</div>
          <digit-cell id="secondTens" class="cellMargin" size="[[size]]" value="0"></digit-cell>
          <digit-cell id="secondOnes" class="cellMargin" size="[[size]]" value="0"></digit-cell>
        </div>
        `;
    }
    static get properties() {
        return {
            size: {
                type: Number,
                observer: '_sizeChanged'
            },
            clockMode: {
             type: Boolean
            },
            elapsedTime: {
                type: Number,
                observer: '_elapsedTimeChanged'
            },
            clockTimer: {
                type: Number
            },
            clockSeconds: {
                type: Number,
                observer: '_dispatchSeconds'
            },
            clockMinutes: {
                type: Number,
                observer: '_dispatchMinutes'
            },
            clockHours: {
                type: Number,
                observer: '_dispatchHours'
            }
        };
    }
    constructor() {
        super();
        this.size = 50;
        this.reset();
        this.optionalDisplayScale = 1.0;
        this.clockMode = true;
        this.clockSeconds = 0;
        this.clockMinutes = 0;
        this.clockHours = 0;  
    }
    reset() {
        this.elapsedTime = 0;
    }
    start() {
        var context = this;
        if (!context.clockTimer) {
          context.clockTimer = setInterval(function() {
            context.elapsedTime += 1000;
          }, 1000);
        }
    }
    pause() {
        if (this.clockTimer) {
          clearInterval(this.clockTimer);
          this.clockTimer = 0;
        }
    }
    _elapsedTimeChanged() {
        var context = this;
        if (context.clockTimer) {
          var d = null;
          if (!context.clockMode) {
            d = new Date(context.elapsedTime);
            context.clockSeconds = d.getSeconds()
            context.clockMinutes = d.getMinutes()
            context.clockHours = d.getHours() - 16;
          } else {
            d = new Date();
            context.clockSeconds = d.getSeconds()
            context.clockMinutes = d.getMinutes()
            context.clockHours = d.getHours();
          }
          context.dispatchEvent(new CustomEvent('update', { detail: { rawDate: d, hours: d.getHours(), minutes: context.clockMinutes, seconds: context.clockSeconds }}));
        }
    }
    _dispatchHours() {
        var value = this.clockHours;
        var valueTens = parseInt(value / 10);
        var valueOnes = value % 10;
        var tens = this.shadowRoot.querySelector("#hourTens");
        tens.value = valueTens;
        var ones = this.shadowRoot.querySelector("#hourOnes");
        ones.value = valueOnes;
    }
    _dispatchMinutes() {
        var value = this.clockMinutes;
        var valueTens = parseInt(value / 10)
        var valueOnes = value % 10
        var tens = this.shadowRoot.querySelector("#minuteTens");
        tens.value = valueTens;
        var ones = this.shadowRoot.querySelector("#minuteOnes");
        ones.value = valueOnes;
    }
    _dispatchSeconds() {
        var value = this.clockSeconds;
        var valueTens = parseInt(value / 10)
        var valueOnes = value % 10
        var tens = this.shadowRoot.querySelector("#secondTens");
        tens.value = valueTens;
        var ones = this.shadowRoot.querySelector("#secondOnes");
        ones.value = valueOnes;
    }
    cellMargin(pct) {
        var margin = this.size / pct;
        return parseInt(margin);
    }
    _sizeChanged (newValue, oldValue) {
        var margin = parseInt(newValue * .05);
        this.updateStyles({'--cell-margin': "0 " + margin + "px 0 " + margin + "px"});
    }
}

window.customElements.define('digital-time-piece', digitalTimePiece);
