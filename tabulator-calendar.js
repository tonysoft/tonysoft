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

    _options(options) {
        var context = this;
        if (context.checkIsReady("options", options, null)) {
            var path = "$.[?(@.editor)]";
            var editors = context.JSONPath({ path: path, json: options});
            editors.forEach(function(parentNode) {
                var editor = parentNode.editor;
                if (editor.length) {
                    var segs = editor.split(".");
                    if ((segs.length > 1) && (segs[0] === "context")) {
                        context.fixups.push({node: parentNode, prop: "editor", func: context[segs[1]]})
                        delete parentNode.editor;
                    }
                }
            });
            path = "$.[?(@.formatter)]";
            var formatters = context.JSONPath({ path: path, json: options});
            formatters.forEach(function(parentNode) {
                var formatter = parentNode.formatter;
                if (formatter.length) {
                    var segs = formatter.split(".");
                    if ((segs.length > 1) && (segs[0] === "context")) {
                        context.fixups.push({node: parentNode, prop: "formatter", func: context[segs[1]]});
                        delete parentNode.formatter;
                    }
                }
            })
        }
        super._options(options);
    }

    dayCell(cell, formatingParams) {
        var table = this;
        var context = table.component;
        var cellValue = cell.getValue();
        var rowIndex = cell._cell.row.data.row;
        var row = cell._cell.row.data;
        var columnDef = cell.getColumn()._column.definition;
        var appointmentsTemplate = formatingParams.appointmentsTemplate;
        var appointmentTemplate = formatingParams.appointmentTemplate;
        var dayOfWeekTemplate = formatingParams.dayOfWeekTemplate;
        var dayTemplate = formatingParams.dayTemplate;
        var cellContainer = document.createElement("div");
        var cellContainerContent = "";
        if (rowIndex === 0) {
            cellContainerContent += dayOfWeekTemplate.replace("${dayOfWeek}", columnDef["field"]);
        }
        cellContainerContent += dayTemplate.replace("${day}", row[columnDef["field"]]);

        cellContainer.innerHTML = cellContainerContent + appointmentsTemplate;
        var appointments = cellContainer.querySelector(".appointments")
        var repeat = 5;

        if (false && cellValue && appointmentTemplate) {
            var appointmentsContent = "";
            for (var i = 0; i < repeat; i++) {
                var value = cellValue + " " + cellValue + " " + cellValue + " " + cellValue + " " + cellValue
                var appointment = appointmentTemplate.replace("${index}", i);
                appointment = appointment.replace("${cellValue}", value);
                appointmentsContent += appointment;
            }
            appointments.innerHTML = appointmentsContent;
        }

        var parentNode = cell._cell.element;

        return cellContainer.outerHTML;
    }

}
customElements.define('tabulator-calendar', TabulatorCalendar);