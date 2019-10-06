import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import {TabulatorTables} from "./tabulator-tables.js?module";

class TabulatorCalendar extends TabulatorTables {

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
    <link href="https://unpkg.com/tabulator-tables@4.4.1/dist/css/tabulator_simple.min.css" rel="stylesheet">
    <style>
        :host {
        }
        .noSelect {
            user-select: none;
        }
        .main {
            position: relative;
        }
        .border {
            border: 1px solid #888888 !important;
            border-radius: 8px;
        }
        .appointment {
            cursor: pointer;
            text-align: left;
            margin-left: 4px;
            margin-right: 4px;
            text-overflow: ellipsis;
            width: 95%;
            white-space: nowrap;
            overflow: hidden;
        }
        .dayOfWeek {
            text-align: center;
            width: 100%;
            display: block;
            font-weight: 400;
            margin-bottom: 4px;
        }
        .day {
            text-align: center;
            width: 100%;
            display: block;
            font-weight: 400;
            margin-bottom: 8px;
        }
        .appointments {
            text-align: left;
            width: 100%;
            display: inline-block;
            height: 60px;
            overflow: auto;
            padding-left: 8px;
            padding-right: 19px;
            box-sizing: content-box;
        }
    </style>
    <div class$="main noSelect [[hasBorder(border)]]" style="width: [[setWidth(width)]]; max-width: [[setMaxWidth(maxWidth)]]; height: [[setHeight(height)]]; overflow: hidden;">
        <div id="table" style="width: 100%; height: 100%;"></div>
    </div>
`;
  }

    static get properties() {
        return {
        }
    }
    constructor() {
        super();
    }

    ready() {
        var context = this;
        super.ready();
    }

}
customElements.define('tabulator-calendar', TabulatorCalendar);