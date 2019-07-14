import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import {digitCell} from 'tonysoft/digit-cell.js';
import '@polymer/iron-icon/iron-icon.js';
import 'tonysoft/iron-icons.js'

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
                --icon-size: 24px;
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
            .clock-components { 
                display: flex; 
                flex-direction: column; 
                flex-wrap: wrap; 
                justify-content: space-evenly;
                align-items: center;
            }
            .cellMargin {
                margin: var(--cell-margin)
            }
            .timePicker {
                border: 1px solid black;
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
                bottom: 0%;
                left: 50%;
                height: 100%;
                background-color: black;
            }
            .tick100 {
                height: 100%
            }
            .tick75 {
                height: 75%
            }
            .tick50 {
                height: 50%
            }
            .tick25 {
                height: 25%
            }
            .iconSize {
                --iron-icon-height: var(--icon-size);
                --iron-icon-width: var(--icon-size);
            }
        </style>
        <div class="relatively clock-components">
            <div class="relatively active noSelect digital-clock" style="width: [[setWidth(width)]];" on-click="getCurrentTime">
                <digit-cell id="hourTens" class="cellMargin" size="[[size]]" value="0" max-value="2" on-click="clickDigit"></digit-cell>
                <digit-cell id="hourOnes" class="cellMargin" size="[[size]]" value="0" max-value="9" on-click="clickDigit"></digit-cell>
                <div class="cellMargin"style="font-size: [[size]]px;">:</div>
                <digit-cell id="minuteTens" class="cellMargin" size="[[size]]" value="0" max-value="5" on-click="clickDigit"></digit-cell>
                <digit-cell id="minuteOnes" class="cellMargin" size="[[size]]" value="0" max-value="9" on-click="clickDigit"></digit-cell>
                <div class$="secondsVisible [[shouldHideSeconds(hideSeconds)]] cellMargin" style="font-size: [[size]]px;">:</div>
                <digit-cell id="secondTens" class$="secondsVisible [[shouldHideSeconds(hideSeconds)]] cellMargin" size="[[size]]" value="0" max-value="5" on-click="clickDigit"></digit-cell>
                <digit-cell id="secondOnes" class$="secondsVisible [[shouldHideSeconds(hideSeconds)]] cellMargin" size="[[size]]" value="0" max-value="9" on-click="clickDigit"></digit-cell>
                <div class$="pickerInvisible [[shouldShowPicker(timePicker)]] cellMargin" on-click="displayTimePicker"><iron-icon icon="schedule" class="iconSize"></div>
            </div>
            <div class="timePicker pickerInvisible" style="width: [[setPickerWidth(timePicker)]]; height: [[setPickerHeight(width)]];" on-click="setCurrentTime">
                <div class="pickerTick tick100" style="left: 50%;"></div>
            </div>
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
                type: Number
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
        this.timePicker = 0;
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
        context.addTicks();
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

    displayTimePicker(e) {
        var context = this;
        e.stopPropagation();
        var picker = context.shadowRoot.querySelector(".timePicker");
        var classList = picker.classList;
        if (classList.value.indexOf("pickerVisible") < 0) {
            picker.classList.add("pickerVisible");
        } else {
            picker.classList.remove("pickerVisible");
            context.currentTimeEvent();
        }
    }
    addTicks() {
        var  context = this;
        if (context.timePicker) {
            if (context.shadowRoot) {
                var picker = context.shadowRoot.querySelector(".timePicker");
                var tickTemplate = picker.innerHTML;
                var ticks = "";
                for (var i = 1; i < 24; i++) {
                    var tick = tickTemplate;
                    var left = i * 4.166;
                    var height = "tick100";
                    var tickType = i % 6;
                    switch (tickType) {
                        case 0:
                            height = "tick75";
                            break;
                        case 1:
                        case 2:
                        case 4:
                        case 5:
                            height = "tick25";
                            break;
                        case 3:
                            height = "tick50";
                            break;
                    }
                    if (i !== 12) {
                        tick = tick.replace("50", left);
                        tick = tick.replace("tick100", height);
                    }
                    ticks += tick;
                }
                picker.innerHTML = ticks;
            }
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
    setPickerHeight(width) {
        if (width) {
            return parseInt(width / 9) + "px";
        }
        else {
            return "";
        }
    }
    setPickerWidth(timePicker) {
        if (timePicker) {
            return timePicker + "px";
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
        this.updateStyles({'--icon-size': parseInt(this.size * .75) + "px"});
    }
    clickDigit(e) {
        var context = this;
        var digit = e.srcElement;
        var id = digit.id;
        switch (id) {
            case "hourOnes":
                var hourTens = context.shadowRoot.querySelector("#hourTens");
                if ((digit.direction > 0) && (digit.value > 3) && (hourTens.value > 1)) {
                    digit.value = 3;
                } else {
                    if ((digit.value === 0) && (digit.direction > 0) && (hourTens.value < 2)) {
                        hourTens.value++;
                    }
                    if ((digit.value === 9) && (digit.direction < 0) && (hourTens.value > 0)) {
                        hourTens.value--;
                    }
                }
                break;
            case "minuteOnes":
                var minuteTens = context.shadowRoot.querySelector("#minuteTens");
                if ((digit.value === 0) && (digit.direction > 0) && (minuteTens.value < 5)) {
                    minuteTens.value++;
                }
                if ((digit.value === 9) && (digit.direction < 0) && (minuteTens.value > 0)) {
                    minuteTens.value--;
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
            // case "minuteTens":
            //     if (digit.value > 1) {
            //         var minuteOnes = context.shadowRoot.querySelector("#minuteOnes");
            //         if (minuteOnes.value > 3) {
            //             minuteOnes.value = 0;
            //         }
            //     }
            //     break;
            default:
                break;
        }
        context.currentTimeEvent();
    }
    setCurrentTime(e) {
        var context = this;
        e.stopPropagation();
        var timePicker = e.srcElement;
        var width = timePicker.offsetWidth;
        var xOffset = e.offsetX;
        var height = timePicker.offsetHeight;
        var yOffset = e.offsetY;
        var hour = parseInt(xOffset * 24 / width);
        var minutes = 0;
        if (yOffset < (height / 2)) {
            var hourWidth = width / 24;
            var offsetWithinHour = xOffset - (hour * hourWidth);
            var pctIntoHour = parseInt(offsetWithinHour / hourWidth * 100);
            if (pctIntoHour > 75) {
                minutes = 45;
            } else if (pctIntoHour > 50) {
                minutes = 30;
            } else if (pctIntoHour > 25) {
                minutes = 15
            }
        }
        context.clockSeconds = 0;
        context.clockMinutes = minutes;
        context.clockHours = hour;
        context.currentTimeEvent();
    }
    getCurrentTime(e) {
        var context = this;
        e.stopPropagation();
        context.currentTimeEvent();
    }
    currentTimeEvent() {
        var context = this;
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
