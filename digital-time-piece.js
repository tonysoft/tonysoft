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
            .active {
                cursor: pointer;
                pointer-events: all;
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
            .timePicker {
                border: 1 solid black;
                background-color: #cccccc;
                position: relative;
            }
            .secondsVisible {
                display: ;
            }
            .secondsInvisible {
                display:none;
            }
            .pickerInvisible {
                display:none;
            }
            .pickerVisible {
                display: block;
            }
            .pickerTick {
                width: 1px;
                position: absolute;
                top: 0%;
                left: 50%;
                height: 100%;
                background-color: black;
            }
            .hoursTwelve {
                left: 50%;
            }
            .hoursSix {
                left: 25%;
                height: 75%;
            }
            .hoursThree {
                left: 12.5%;
                height: 50%;
            }
            .hoursNine {
                left: 37.5%;
                height: 50%;
            }
            .hoursEighteen {
                left: 75%;
                height: 75%;
            }
            .hoursFifteen {
                left: 62.5%;
                height: 50%;
            }
            .hoursTwentyOne {
                left: 87.5%;
                height: 50%;
            }
            .hoursOne {
                left: 4.166%;
                height: 25%;
            }
            .hoursTwo {
                left: 8.333%;
                height: 25%;
            }
            .hoursFour {
                left: 16.666%;
                height: 25%;
            }
            .hoursFive {
                left: 20.832%;
                height: 25%;
            }
            .hoursSeven {
                left: 29.166%;
                height: 25%;
            }
            .hoursEight {
                left: 33.333%;
                height: 25%;
            }
            .hoursTen {
                left: 41.666%;
                height: 25%;
            }
            .hoursEleven {
                left: 45.832%;
                height: 25%;
            }
            .hoursThirteen {
                left: 54.166%;
                height: 25%;
            }
            .hoursFourteen {
                left: 58.333%;
                height: 25%;
            }
            .hoursSixteen {
                left: 66.666%;
                height: 25%;
            }
            .hoursSeventeen  {
                left: 70.832%;
                height: 25%;
            }
            .hoursNineteen {
                left: 79.166%;
                height: 25%;
            }
            .hoursTwenty {
                left: 83.333%;
                height: 25%;
            }
            .hoursTwentyTwo {
                left: 91.666%;
                height: 25%;
            }
            .hoursTwentyThree {
                left: 95.832%;
                height: 25%;
            }
        </style>
        <div class="relatively active noSelect digital-clock" style="width: [[setWidth(width)]];" on-click="getCurrentTime">
          <digit-cell id="hourTens" class="cellMargin" size="[[size]]" value="0" max-value="2" on-click="clickDigit"></digit-cell>
          <digit-cell id="hourOnes" class="cellMargin" size="[[size]]" value="0" max-value="9" on-click="clickDigit"></digit-cell>
          <div class="cellMargin"style="font-size: [[size]]px;">:</div>
          <digit-cell id="minuteTens" class="cellMargin" size="[[size]]" value="0" max-value="5" on-click="clickDigit"></digit-cell>
          <digit-cell id="minuteOnes" class="cellMargin" size="[[size]]" value="0" max-value="9" on-click="clickDigit"></digit-cell>
          <div class$="secondsVisible [[shouldHideSeconds(hideSeconds)]] cellMargin" style="font-size: [[size]]px;">:</div>
          <digit-cell id="secondTens" class$="secondsVisible [[shouldHideSeconds(hideSeconds)]] cellMargin" size="[[size]]" value="0" max-value="5" on-click="clickDigit"></digit-cell>
          <digit-cell id="secondOnes" class$="secondsVisible [[shouldHideSeconds(hideSeconds)]] cellMargin" size="[[size]]" value="0" max-value="9" on-click="clickDigit"></digit-cell>
        </div>
        <div class$="timePicker pickerInvisible [[shouldShowPicker(timePicker)]]" style="width: [[setWidth(width)]]; height: [[setHeight(width)]];">
            <div class="pickerTick hoursTwelve"></div>
            <div class="pickerTick hoursSix"></div>
            <div class="pickerTick hoursThree"></div>
            <div class="pickerTick hoursNine"></div>
            <div class="pickerTick hoursEighteen"></div>
            <div class="pickerTick hoursTwentyOne"></div>
            <div class="pickerTick hoursFifteen"></div>
            <div class="pickerTick hoursOne"></div>
            <div class="pickerTick hoursTwo"></div>
            <div class="pickerTick hoursFour"></div>
            <div class="pickerTick hoursFive"></div>
            <div class="pickerTick hoursSeven"></div>
            <div class="pickerTick hoursEight"></div>
            <div class="pickerTick hoursTen"></div>
            <div class="pickerTick hoursEleven"></div>
            <div class="pickerTick hoursThirteen"></div>
            <div class="pickerTick hoursFourteen"></div>
            <div class="pickerTick hoursSixteen"></div>
            <div class="pickerTick hoursSeventeen"></div>
            <div class="pickerTick hoursNineteen"></div>
            <div class="pickerTick hoursTwenty"></div>
            <div class="pickerTick hoursTwentyTwo"></div>
            <div class="pickerTick hoursTwentyThree"></div>
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
            autoStart: {
                type: Boolean
            },
            currentTime: {
                type: String,
                observer: "_currentTimeChanged"
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
            },
            isReady: {
                type: Boolean
            },
            width: {
                type: String
            },
            incrementDecrement: {
                type: Boolean
            },
            hideSeconds: {
                type: Boolean
            },
            timePicker: {
                type: Boolean
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
        this.currentTime = ""; 
        this.isReady = false;
        this.width = "";
        this.incrementDecrement = false;
        this.hideSeconds = false;
        this.timePicker = false;
    }
    ready() {
        var context = this;
        super.ready();
        context.isReady = true;
        if (context.currentTime) {
            context._currentTimeChanged(context.currentTime);
            context.hasIncrementDecrement(context.incrementDecrement);
        }
        if (context.autoStart) {
          context.start();
        }
    }
    reset() {
        this.elapsedTime = 0;
    }
    shouldHideSeconds(hideSeconds) {
        var context = this;
        if (hideSeconds) {
            return "secondsInvisible";
        } else {
            return "";
        }
    }
    shouldShowPicker(timePicker) {
        var context = this;
        if (timePicker) {
            return "pickerVisible";
        } else {
            return "";
        }
    }
    hasIncrementDecrement(incrementDecrement) {
        var context = this;
        var digitCells = context.shadowRoot.querySelectorAll("digit-cell");
        digitCells.forEach(function(digitCell) {
            digitCell.incrementDecrement = incrementDecrement;
        })
    }
    setWidth(width) {
        if (width) {
            return width + "px";
        }
        else {
            return "";
        }
    }
    setHeight(width) {
        if (width) {
            return parseInt(width / 12) + "px";
        }
        else {
            return "";
        }
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

    _currentTimeChanged(newValue) {
        var context = this;
        var testDate = "01/01/2000";
        var validTime = new Date(Date.parse(testDate));
        if (!context.isReady) {
            return;
        }
        if (newValue) {
            testDate += " " + newValue;
            var newTime = new Date(Date.parse(testDate));
            if (newTime.toString() !== "Invalid Date") {
                validTime = newTime;
            }
        }
        context.clockSeconds = validTime.getSeconds()
        context.clockMinutes = validTime.getMinutes()
        context.clockHours = validTime.getHours();
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
    clickDigit(e) {
        var context = this;
        var digit = e.srcElement;
        var id = digit.id;
        switch (id) {
            case "hourOnes":
                var hourTens = context.shadowRoot.querySelector("#hourTens");
                if ((digit.value > 3) && (hourTens.value > 1)) {
                    digit.value = 3;
                }
                break;
            case "hourTens":
                if (digit.value > 1) {
                    var hourOnes = context.shadowRoot.querySelector("#hourOnes");
                    if (hourOnes.value > 3) {
                        hourOnes.value = 0;
                    }
                }
                break;
            default:
                break;
        }
    }
    getCurrentTime(e) {
        var context = this;
        // e.stopPropagation();
        context.dispatchEvent(new CustomEvent('currentTime', { 
            detail: {
                hour: context.clockHours,
                minute: context.clockMinutes,
                second: context.clockSeconds
            }
        }));
    }
}

window.customElements.define('digital-time-piece', digitalTimePiece);
