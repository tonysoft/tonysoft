import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import '@polymer/iron-icon/iron-icon.js';
import 'tonysoft/iron-icons.js'

/**
 * `digit-cell`
 * a single digit for use in a digital numeric display
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
 */
class digitCell extends PolymerElement {
    static get template() {
        return html`
        <style>
            :host {
                display: block;
                --line-on: #00000088;
                --line-off: #00000005;
                --icon-size: 24px;
                --dec-vert-bump: 9px;
                --inc-vert-bump: -10px;
                --dec-horz-bump: 2px;
                --inc-horz-bump: -2px;
            }
            .lineOn {
                stroke: var(--line-on);
            }
            .lineOff {
                stroke: var(--line-off);
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
                pointer-eventsx: none
            }
            .noSelect {
                user-select: none;
            }
            .iconSize {
                --iron-icon-height: var(--icon-size);
                --iron-icon-width: var(--icon-size);
            }
            .incDecInvisible {
                display:none;
            }
            .incDecVisible {
                display: block;
                opacity: .20;
            }
            .bumpDecrement {
                position: relative;
                top: var(--dec-vert-bump);
                left: var(--dec-horz-bump);;
            }
            .bumpIncrement {
                position: relative;
                top: var(--inc-vert-bump);
                left: var(--inc-horz-bump);
            }
        </style>
        <div>
        <div class$="digitWidth bumpIncrement incDecInvisible [[incDecVisible(incrementDecrement)]]" on-click="increment"><iron-icon icon="arrow-drop-up" class="iconSize"></iron-icon></div>
        <div class="relatively inert noSelect" style="width: [[width]]px; height: [[height]]px;" on-click="getValue">
                <span class="svg digit">
                <svg xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:cc="http://creativecommons.org/ns#" xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns:svg="http://www.w3.org/2000/svg" xmlns="http://www.w3.org/2000/svg" xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd" xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape" class="q" viewBox="4 1 12.613149 22.785754" version="1.1" id="svg3751" sodipodi:docname="digit.svg" inkscape:version="0.92.4 (5da689c313, 2019-01-14)">
                    <g id="digit" inkscape:label="">
                        <desc id="desc13879">digit</desc>
                        <path inkscape:connector-curvature="0" inkscape:connector-type="polyline" id="top" d="M 15.798207,3.4043353 H 6.925759" style="fill: none; fill-rule: evenodd; stroke-width: 1.69919; stroke-linecap: round; stroke-linejoin: miter; stroke-miterlimit: 4; stroke-dasharray: none; stroke-opacity: 1;" inkscape:label="" class$="[[top(value)]]">
                        <desc id="desc13837">top</desc>
                        </path>
                        <path inkscape:connector-curvature="0" inkscape:connector-type="polyline" id="middle" d="M 14.845707,12.318198 H 5.9732587" style="fill: none; fill-rule: evenodd; stroke-width: 1.69919; stroke-linecap: round; stroke-linejoin: miter; stroke-miterlimit: 4; stroke-dasharray: none; stroke-opacity: 1;" inkscape:label="" class$="[[middle(value)]]">
                        <desc id="desc13841">middle</desc>
                        </path>
                        <path inkscape:connector-curvature="0" inkscape:connector-type="polyline" id="bottom" d="M 13.893207,21.232062 H 5.0207591" style="fill: none; fill-rule: evenodd; stroke-width: 1.69919; stroke-linecap: round; stroke-linejoin: miter; stroke-miterlimit: 4; stroke-dasharray: none; stroke-opacity: 1;" inkscape:label="" class$="[[bottom(value)]]">
                        <desc id="desc13845">bottom</desc>
                        </path>
                        <path inkscape:connector-curvature="0" inkscape:connector-type="polyline" id="upperright" d="m 14.845707,12.318198 0.9525,-8.9138627" style="display: inline; fill: none; fill-rule: evenodd; stroke-width: 1.69919; stroke-linecap: round; stroke-linejoin: miter; stroke-miterlimit: 4; stroke-dasharray: none; stroke-opacity: 1;" inkscape:label="" class$="[[upperright(value)]]">
                        <desc id="desc13835">upperright</desc>
                        </path>
                        <path inkscape:connector-curvature="0" inkscape:connector-type="polyline" id="upperleft" d="m 5.9732587,12.318198 0.9525,-8.913863" style="display: inline; fill: none; fill-rule: evenodd; stroke-width: 1.69919; stroke-linecap: round; stroke-linejoin: miter; stroke-miterlimit: 4; stroke-dasharray: none; stroke-opacity: 1;" inkscape:label="" class$="[[upperleft(value)]]">
                        <desc id="desc13839">upperleft</desc>
                        </path>
                        <path inkscape:connector-curvature="0" inkscape:connector-type="polyline" id="lowerright" d="m 13.893207,21.232061 0.9525,-8.913863" style="display: inline; fill: none; fill-rule: evenodd; stroke-width: 1.69919; stroke-linecap: round; stroke-linejoin: miter; stroke-miterlimit: 4; stroke-dasharray: none; stroke-opacity: 1;" inkscape:label="" class$="[[lowerright(value)]]">
                        <desc id="desc13843">lowerright</desc>
                        </path>
                        <path inkscape:connector-curvature="0" inkscape:connector-type="polyline" id="lowerleft" d="m 5.0207587,21.232061 0.9525,-8.913863" style="display: inline; fill: none; fill-rule: evenodd; stroke-width: 1.69919; stroke-linecap: round; stroke-linejoin: miter; stroke-miterlimit: 4; stroke-dasharray: none; stroke-opacity: 1;" inkscape:label="" class$="[[lowerleft(value)]]">
                        <desc id="desc13847">lowerleft</desc>
                        </path>
                    </g>
                </svg>
            </span>
          </div>
          <div class$="digitWidth bumpDecrement incDecInvisible [[incDecVisible(incrementDecrement)]]" on-click="decrement"><iron-icon icon="arrow-drop-down" class="iconSize"></iron-icon></div>
          </div>
        `;
    }
    static get properties() {
        return {
            width: {
                type: String
            },
            height: {
                type: String
            },
            size: {
                type: String,
                observer: '_sizeChanged'
            },
            value: {
                type: Number
            },
            maxValue: {
                type: Number
            },
            incrementDecrement: {
                type: Boolean
            },
            clickEvent: {
                type: Boolean
            },
            direction: {
                type: Number
            }
        };
    }
    constructor() {
        super();
        this.value = -1;
        this.maxValue = 9;
        this.size = 100;
        this.incrementDecrement = false;
        this.clickEvent = false;
        this.direction = 0;
    }
    incDecVisible(incrementDecrement) {
        var context = this;
        if (incrementDecrement) {
            return "incDecVisible";
        } else {
            return "";
        }
    }
    upperright(value) {
        var onOrOff = "lineOff"
        switch (value) {
            case 0:
            case 1:
            case 2:
            case 3:
            case 4:
            case 7:
            case 8:
            case 9:
                onOrOff = "lineOn";
                break;
        }
        return onOrOff;
    }
    upperleft(value) {
        var onOrOff = "lineOff"
        switch (value) {
            case 0:
            case 4:
            case 5:
            case 6:
            case 8:
            case 9:
                onOrOff = "lineOn";
                break;
        }
        return onOrOff;
    }
    lowerleft(value) {
        var onOrOff = "lineOff"
        switch (value) {
            case 0:
            case 2:
            case 6:
            case 8:
                onOrOff = "lineOn";
                break;
        }
        return onOrOff;
    }
    lowerright(value) {
        var onOrOff = "lineOff"
        switch (value) {
            case 0:
            case 1:
            case 3:
            case 4:
            case 5:
            case 6:
            case 7:
            case 8:
            case 9:
                onOrOff = "lineOn";
                break;
        }
        return onOrOff;
    }
    top(value) {
        var onOrOff = "lineOff"
        switch (value) {
            case 0:
            case 2:
            case 3:
            case 5:
            case 7:
            case 8:
            case 9:
                onOrOff = "lineOn";
                break;
        }
        return onOrOff;
    }
    middle(value) {
        var onOrOff = "lineOff"
        switch (value) {
            case 2:
            case 3:
            case 4:
            case 5:
            case 6:
            case 8:
            case 9:
                onOrOff = "lineOn";
                break;
        }
        return onOrOff;
    }
    bottom(value) {
        var onOrOff = "lineOff"
        switch (value) {
            case 0:
            case 2:
            case 3:
            case 5:
            case 6:
            case 8:
                onOrOff = "lineOn";
                break;
        }
        return onOrOff;
    }
    _sizeChanged(newValue, oldValue) {
        this.width = parseInt(newValue * .55);
        this.height = newValue;
        var iconSize = parseInt(newValue * .55);
        this.updateStyles({'--icon-size': iconSize + "px"});
        var bump = parseInt(newValue * .15);
        this.updateStyles({'--inc-vert-bump': bump + "px"});
        bump = parseInt(newValue * .15) * -1;
        this.updateStyles({'--dec-vert-bump': bump + "px"});
        bump = parseInt(newValue * .05);
        this.updateStyles({'--inc-horz-bump': bump + "px"});
        bump = parseInt(newValue * .05) * -1;
        this.updateStyles({'--dec-horz-bump': bump + "px"});
        
    }
    increment(e) {
        var digitCell = this;
        e.stopPropagation();
        var value = digitCell.value;
        if (value === digitCell.maxValue) {
            value = 0;
        }
        else {
            value++;
        }
        digitCell.value = value;
        digitCell.direction = 1;
        digitCell.fireEvent(value, 1);
    }
    decrement(e) {
        var digitCell = this;
        e.stopPropagation();
        var value = digitCell.value;
        if (value === 0) {
            value = digitCell.maxValue;
        }
        else {
            value--;
        }
        digitCell.value = value;
        digitCell.direction = -1;
        digitCell.fireEvent(value, -1);
    }
    getValue(e) {
        var context = this;
        if (context.clickEvent) {
            e.stopPropagation();
            context.direction = 0;
            context.dispatchEvent(new CustomEvent('click', { 
                detail: { value: context.value }
            }));
        }
    }
    fireEvent(value, direction) {
        var context = this;
        context.dispatchEvent(new CustomEvent('changed', { 
            detail: { value: value, direction: direction }
        }));
    }
}

window.customElements.define('digit-cell', digitCell);
export { digitCell }