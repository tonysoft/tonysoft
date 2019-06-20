import {html, PolymerElement} from 'https://unpkg.com/@polymer/polymer/polymer-element.js';

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
                pointer-events: none
            }
            .noSelect {
                user-select: none;
            }
        </style>
        <div class="relatively inert noSelect" style="width: [[width]]px; height: [[height]]px;">
            <span class="svg digit">
<svg xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:cc="http://creativecommons.org/ns#" xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns:svg="http://www.w3.org/2000/svg" xmlns="http://www.w3.org/2000/svg" xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd" xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape" class="q" viewBox="4 1 12.613149 22.785754" version="1.1" id="svg3751" sodipodi:docname="digit.svg" inkscape:version="0.92.4 (5da689c313, 2019-01-14)">
  <metadata id="metadata3757">
    <rdf:RDF>
      <cc:Work rdf:about="">
        <dc:format>image/svg+xml</dc:format>
        <dc:type rdf:resource="http://purl.org/dc/dcmitype/StillImage"/>
        <dc:title/>
      </cc:Work>
    </rdf:RDF>
  </metadata>
  <defs id="defs3755"/>
  <sodipodi:namedview pagecolor="#ffffff" bordercolor="#666666" borderopacity="1" objecttolerance="10" gridtolerance="10" guidetolerance="10" inkscape:pageopacity="0" inkscape:pageshadow="2" inkscape:window-width="1263" inkscape:window-height="902" id="namedview3753" showgrid="false" inkscape:zoom="7.8327791" inkscape:cx="-18.34438" inkscape:cy="13.989887" inkscape:window-x="511" inkscape:window-y="1137" inkscape:window-maximized="0" inkscape:current-layer="svg3751" fit-margin-top="0.1" fit-margin-left="0.1" fit-margin-right="0.1" fit-margin-bottom="0.1" units="px"/>
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
            }
        };
    }
    constructor() {
        super();
        this.value = -1;
        this.size = 100;
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
    }
}

window.customElements.define('digit-cell', digitCell);
export { digitCell }