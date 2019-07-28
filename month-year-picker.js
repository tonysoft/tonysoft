import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
// import {digitCell} from 'tonysoft/digit-cell.js';
import '@polymer/iron-icon/iron-icon.js';
import 'tonysoft/iron-icons.js'

/**
 * `month-year-picker`
 * Pick a Month and Year within an optional defined range
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
 */
class monthYearPicker extends PolymerElement {
    static get template() {
        return html`
        <style>
            :host {
                display: block;
                --icon-size: 24px;
                --font-size: 24px;
                --adjust-double-arrow-left: 12px;
                --adjust-double-arrow-right: -12px;
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
            .flex-layout { 
                display: flex; 
                flex-direction: row; 
                flex-wrap: wrap; 
                justify-content: space-evenly;
                align-items: center;
            }
            .timePicker {
                border: 1px solid black;
                background-color: #cccccc;
                position: relative;
            }
            .timePickerLabels {
                position: relative;
                user-select: none;
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
                pointer-events: none;
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
            .pickerLabel {
                pointer-events: none;
                position: absolute;
                font-size: var(--picker-label);
                text-align: center;
            }
            .iconSize {
                --iron-icon-height: var(--icon-size);
                --iron-icon-width: var(--icon-size);
            }
            .adjustDoubleArrowLeft {
                position: relative;
                left: var(--adjust-double-arrow-left);
            }
            .adjustDoubleArrowRight {
                position: relative;
                left: var(--adjust-double-arrow-right);
            }
            .monthYearDisplay {
                font-size: var(--font-size);
                font-family: inherit;
                font-weight: bold;
                margin: 0 20px 0 20px;
            }
        </style>
        <div class="relatively flex-layout noSelect" style="width: [[setWidth(width)]];">
            <div id="yearBack" on-click="yearBack"><iron-icon icon="chevron-left" class="iconSize"></iron-icon><iron-icon icon="chevron-left" class="iconSize adjustDoubleArrowLeft"></iron-icon></div>
            <div id="monthBack" on-click="monthBack"><iron-icon icon="chevron-left" class="iconSize"></iron-icon></div>
            <div class="monthYearDisplay">
                <div id="month" style="margin-right: 10px; display: inline-block;">[[formatMonth(month)]]</div>
                <div id="year" style="display: inline-block;">[[year]]</div>
            </div>
            <div id="monthForward" on-click="monthForward"><iron-icon icon="chevron-right" class="iconSize"></iron-icon></div>
            <div id="yearForward" on-click="yearForward"><iron-icon icon="chevron-right" class="iconSize adjustDoubleArrowRight"></iron-icon><iron-icon icon="chevron-right" class="iconSize"></iron-icon></div>
        </div>
            `;
    }
    static get properties() {
        return {
            size: {
                type: Number,
                observer: '_sizeChanged'
            },
            isReady: {
                type: Boolean
            },
            width: {
                type: String
            },
            timePicker: {
                type: Number
            },
            year: {
                type: Number
            },
            maxYear: {
                type: Number,
                observer: "_maxYearChanged"
            },
            minYear: {
                type: Number,
                observer: "_minYearChanged"
            },
            month: {
                type: Number
            },
            monthFormat: {
                type: String
            }
        };
    }
    constructor() {
        super();
        this.size = 16;
        this.month = new Date().getMonth();
        this.year = new Date().getFullYear();
        this.maxYear = this.year;
        this.minYear = 0;
        this.isReady = false;
        this.width = "220";
        this.timePicker = 0;
        this.monthFormat = "short";  // || "number" || "long";
        this.monthShort = ["", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        this.monthLong = ["", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        this.monthNumber = ["", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
    }
    ready() {
        var context = this;
        super.ready();
        context.isReady = true;
        // context.addTicks();
    }

    addTicks() {
        var  context = this;
        if (context.timePicker) {
            if (context.shadowRoot) {
                var picker = context.shadowRoot.querySelector(".timePicker");
                var pickerLabels = context.shadowRoot.querySelector(".timePickerLabels");
                var tickTemplate = picker.innerHTML;
                var labelTemplate = pickerLabels.innerHTML;
                var ticks = "";
                var labels = "";
                for (var i = 0; i < 24; i++) {
                    var label = labelTemplate;
                    var label = labelTemplate;
                    var labelLeft = i * 4.166;
                    label = label.replace("50", labelLeft);
                    if (i && ((i % 3) === 0)) {
                        label = label.replace("XX", i);
                    } else {
                        label = label.replace("XX", "");
                    }
                    labels += label;
                }
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
                pickerLabels.innerHTML = labels;
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
            return parseInt(width / 6) + "px";
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
    cellMargin(pct) {
        var margin = this.size / pct;
        return parseInt(margin);
    }
    _sizeChanged (newValue, oldValue) {
        var margin = parseInt(newValue * .05);
        this.updateStyles({'--icon-size': parseInt(this.size * .95) + "px"});
        this.updateStyles({'--font-size': parseInt(this.size) + "px"});
        this.updateStyles({'--adjust-double-arrow-left': parseInt(this.size * .5) * -1 + "px"});
        this.updateStyles({'--adjust-double-arrow-right': parseInt(this.size * .5) + "px"});
    }
    _maxYearChanged(newValue) {
        var context = this;
        if (newValue < context.year) {
            context.year = newValue;
        }
    }
    _minYearChanged(newValue) {
        var context = this;
        if (newValue > context.year) {
            context.year = newValue;
        }
    }
    formatMonth(month) {
        var context = this;
        if (month > 12) {
            month = 12;
        }
        if (month <= 0) {
            month = 1;
        }
        var monthFormatted = month;
        switch (context.monthFormat) {
            case "number":
                monthFormatted = context.monthNumber[month];
                break;
            case "long":
                monthFormatted = context.monthLong[month];
                break;
            case "short":
            default:
                monthFormatted = context.monthShort[month];
                break;
        }
        return monthFormatted;
    }
    yearBack(e) {
        var context = this;
        if (e) {
            e.stopPropagation();
            context.year--;
        }
        if (context.year < context.minYear) {
            context.year = context.minYear;
        }
        context.yearChanged();
    }
    yearForward(e) {
        var context = this;
        if (e) {
            e.stopPropagation();
            context.year++;
        }
        if (context.year > context.maxYear) {
            context.year = context.maxYear;
        }
        context.yearChanged();
    }
    yearChanged() {
        var context = this;
        context.dispatchEvent(new CustomEvent('yearChanged', { detail: { year: context.year }}));
    }
    monthBack(e) {
        var context = this;
        e.stopPropagation();
        context.month--;
        if (context.month < 1) {
            context.month = 12;
            context.year--;
            context.yearBack();
        }
        context.yearChanged();
    }
    monthForward(e) {
        var context = this;
        e.stopPropagation();
        context.month++;
        if (context.month > 12) {
            context.month = 1;
            context.year++;
            context.yearForward();
        }
        context.monthChanged();
    }
    monthChanged() {
        var context = this;
        context.dispatchEvent(new CustomEvent('monthChanged', { detail: { month: context.month, formattedMonth: context.formatMonth(context.month) }}));
    }
}

window.customElements.define('month-year-picker', monthYearPicker);
