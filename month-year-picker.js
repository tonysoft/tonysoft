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
                --drop-top: 6px;
                --font-size: 24px;
                --picker-label: 12px;
                --picker-height: 16px;
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
            .picker-components { 
                display: flex; 
                flex-direction: column; 
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
            .picker {
                border: 1px solid black;
                background-color: #eeeeee;
                text-align: center;
                color: transparent;
                position: relative;
                height: var(--font-size);
                line-height: var(--font-size);
                margin-top: 4px;
                padding: 2px 3px 0 3px;
                cursor: pointer;
                overflow: hidden;
            }
            .pickerLabels {
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
                position: absolute;
                top: 0%;
                left: 50%;
                height: 100%;
                pointer-events: none;
                border-right: 1px solid black;
                color: black;
                font-size: var(--picker-label);
                line-height: var(--font-size);
                padding-top: 2px;
                text-align: center;
            }
            .tick100 {
                height: 100%;
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
            .yearLabel {
                font-size: var(--picker-label);
                text-align: center;
                color: black;
                display: inline-block;
            }
            .yearPicker {
                font-size: var(--picker-label);
                text-align: center;
                display: inline-block;
            }
            .pickerLabel {
                pointer-events: none;
                position: absolute;
                font-size: var(--picker-label);
                text-align: center;
                padding: 2px;
                border-left: 1px solid black;
            }
            .iconSize {
                --iron-icon-height: var(--icon-size);
                --iron-icon-width: var(--icon-size);
            }
            .dropIcon {
                --iron-icon-height: var(--icon-size);
                --iron-icon-width: var(--icon-size);
                top: var(--drop-top);
                position: relative; 
                margin: 0 0px 0 0px; 
                display: inline-block;
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
        <div class="relatively picker-components">
            <div class="relatively flex-layout noSelect" style="width: [[setWidth(width)]];">
                <div id="yearBack" on-click="yearBack"><iron-icon icon="chevron-left" class="iconSize"></iron-icon><iron-icon icon="chevron-left" class="iconSize adjustDoubleArrowLeft"></iron-icon></div>
                <div id="monthBack" on-click="monthBack"><iron-icon icon="chevron-left" class="iconSize"></iron-icon></div>
                <div class="monthYearDisplay" on-click="displayPicker">
                    <div id="month" style="display: inline-block;">[[formatMonth(month)]]</div>
                    <iron-icon icon="arrow-drop-down" class="dropIcon"></iron-icon>
                    <div id="year" style="display: inline-block;">[[year]]</div>
                </div>
                <div id="monthForward" on-click="monthForward"><iron-icon icon="chevron-right" class="iconSize"></iron-icon></div>
                <div id="yearForward" on-click="yearForward"><iron-icon icon="chevron-right" class="iconSize adjustDoubleArrowRight"></iron-icon><iron-icon icon="chevron-right" class="iconSize"></iron-icon></div>
            </div>
            <div class="pickerWrapper pickerInvisible noSelect" style="text-align: center;">
                <div>
                    <div class="picker yearLabel" on-click="pickYearFromLabel">[[minYear]]</div>
                    <div class="picker yearPicker" style="width: [[setWidth(width)]];" on-click="pickYearFromRange" on-mouseover="hoverRange"  on-mousemove="hoverYearFromRange" on-mouseout="unhoverRange">
                        <div class="pickerTick" style="left: 50px; width: 10px; color: transparent">y</div>
                    </div>
                    <div class="picker yearLabel" on-click="pickYearFromLabel">[[maxYear]]</div>
                </div>
                <div class="picker monthPicker" style="width: [[setWidth(width)]]; display: inline-block;" on-click="pickMonthFromRange">
                    <div class="pickerTick" style="left: 50px; width: 10px;">XX</div>
                </div>
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
            isReady: {
                type: Boolean
            },
            width: {
                type: String
            },
            picker: {
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
        this.minYear = 1950;
        this.isReady = false;
        this.width = "220";
        this.picker = 0;
        this.monthFormat = "short";  // || "number" || "long";
        this.monthShort = ["", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        this.monthLong = ["", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        this.monthNumber = ["", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12"];
    }
    ready() {
        var context = this;
        super.ready();
        context.isReady = true;
        context.displayPicker();
        context.addMonthTicks();
        context.addYearTicks();
        context.displayPicker();
    }

    addMonthTicks() {
        var  context = this;
        var picker = context.shadowRoot.querySelector(".monthPicker");
        var pickerWidth = picker.offsetWidth;
        var width = (pickerWidth / 12);
        var tickTemplate = picker.innerHTML;
        var ticks = "";
        for (var i = 0; i < 12; i++) {
            var tick = tickTemplate;
            var left = i * width;
            tick = tick.replace("50px", left + "px");
            tick = tick.replace("10px", width + "px");
            var leading = ((i + 1) < 10) ? "0" : "";
            tick = tick.replace("XX", leading + (i + 1));
            ticks += tick;
        }
        picker.innerHTML = ticks;
    }
    addYearTicks() {
        var  context = this;
        var picker = context.shadowRoot.querySelector(".yearPicker");
        var pickerWidth = picker.offsetWidth;
        var numYears = context.maxYear - context.minYear - 1;
        var width = (pickerWidth / numYears);
        var tickTemplate = picker.innerHTML;
        var ticks = "";
        for (var i = 0; i < numYears; i++) {
            var tick = tickTemplate;
            var left = i * width;
            tick = tick.replace("50px", left + "px");
            tick = tick.replace("10px", width + "px");
            ticks += tick;
        }
        picker.innerHTML = ticks;
    }
    displayPicker(e) {
        var context = this;
        if (e) {
            e.stopPropagation();
        }
        var picker = context.shadowRoot.querySelector(".pickerWrapper");
        var classList = picker.classList;
        if (classList.value.indexOf("pickerVisible") < 0) {
            picker.classList.add("pickerVisible");
        } else {
            picker.classList.remove("pickerVisible");
        }
    }
    shouldShowPicker(picker) {
        var context = this;
        if (picker) {
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
    setPickerWidth(picker) {
        if (picker) {
            return picker + "px";
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
        this.updateStyles({'--picker-label': parseInt(this.size * .6) + "px"});
        this.updateStyles({'--picker-height': parseInt(this.size * .8) + "px"});
        this.updateStyles({'--icon-size': parseInt(this.size * .95) + "px"});
        this.updateStyles({'--drop-top': parseInt(this.size * .25) + "px"});
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
        if (e !== null) {
            context.yearChanged();
        }
    }
    yearChanged() {
        var context = this;
        context.dispatchEvent(new CustomEvent('yearChanged', { detail: { year: context.year, formattedYear: context.year.toString() }}));
    }
    monthBack(e) {
        var context = this;
        if (e) {
            e.stopPropagation();
            context.month--;
        }
        if (context.month < 1) {
            context.month = 12;
            context.year--;
            context.yearBack();
        }
        context.monthChanged();
    }
    monthForward(e) {
        var context = this;
        if (e) {
            e.stopPropagation();
            context.month++;
        }
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

    pickYearFromLabel(e) {
        var context = this;
        e.stopPropagation();
        context.year = parseInt(e.srcElement.innerText);
        context.yearForward();
    }

    setYearFromXOffset(e, bCommit) {
        var context = this;
        var picker = e.srcElement;
        var width = picker.offsetWidth;
        var xOffset = e.offsetX;
        var numYears = context.maxYear - context.minYear - 1;
        var yearLength = width / numYears;
        var yearOffset = parseInt(xOffset / yearLength);
        yearOffset += 1;
        context.year = context.minYear + yearOffset;
        if (bCommit) {
            context.saveYear = context.year;
        }
        context.yearForward(!bCommit ? null : e);
    }

    hoverYearFromRange(e) {
        var context = this;
        e.stopPropagation();
        context.setYearFromXOffset(e, false);
    }

    hoverRange(e) {
        var context = this;
        e.stopPropagation();
        context.saveYear = context.year;
    }

    unhoverRange(e) {
        var context = this;
        e.stopPropagation();
        context.year = context.saveYear;
    }

    pickYearFromRange(e) {
        var context = this;
        e.stopPropagation();
        context.setYearFromXOffset(e, true);
    }

    setMonthFromXOffset(e, bCommit) {
        var context = this;
        var picker = e.srcElement;
        var width = picker.offsetWidth;
        var xOffset = e.offsetX;
        var numMonths = 12;
        var monthLength = width / numMonths;
        var monthOffset = parseInt(xOffset / monthLength);
        monthOffset += 1;
        context.month = monthOffset;
        context.monthForward();
    }

    pickMonthFromRange(e) {
        var context = this;
        e.stopPropagation();
        context.setMonthFromXOffset(e, true);
    }
}

window.customElements.define('month-year-picker', monthYearPicker);
