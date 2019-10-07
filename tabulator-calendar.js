import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import {TabulatorTables} from "./tabulator-tables.js?module";

class TabulatorCalendar extends TabulatorTables {

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
            margin-left: 0px;
            margin-right: 0px;
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
        .bullet {
            width: 10px;
            height: 10px;
            background-color: #88bb88;
            border-radius: 50%;
            display: inline-block;
            margin-right: 4px;
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
    <div id="appointmentTemplate" style="display:none;">
        <div class="appointment" test-attr="This is a test attribute: *{index}">
            <div class="bullet"></div>*{cellValue}
        </div>
    </div>
    <div id="appointmentsTemplate" style="display:none;">
        <div class="appointments"></div>
    </div>
    <div id="dayOfWeekTemplate" style="display:none;">
        <div class="dayOfWeek">*{dayOfWeek}</div>
    </div>
    <div id="dayTemplate" style="display:none;">
        <div class="day">*{day}</div>
    </div>
`;
  }

    static get properties() {
        return {
            yearMonth: {
                type: String,
                observer: "_yearMonth"
            },
            month: {
                type: Number
            },
        }
    }
    constructor() {
        super();
        var context = this;
        var now = new Date();
        var year = now.getFullYear();
        var month = now.getMonth() + 1;
        context.yearMonth = year + "-" + month;
        context.default = true;
    }

    _yearMonth(yearMonth) {
        var context = this;
        var delim = yearMonth.indexOf("/") > 0 ? "/" : "-";
        var segs = yearMonth.split(delim);
        if (segs.length === 2) {
            var year = parseInt(segs[0]);
            var month = parseInt(segs[1]);
            if ((year >= 1970) && (month >= 1) && (month < 13)) {
                context.calcMonthLayout(month, year);
            }
        }
    }


    calcMonthLayout(month, year) {
        var context = this;
        var now = new Date();
        var firstOfMonth = new Date(year + "-" + month + "-01");
        context.year = firstOfMonth.getUTCFullYear();
        context.month = firstOfMonth.getUTCMonth() + 1;
        context.today = now.getUTCDate();
        context.timeZoneOffset = firstOfMonth.getTimezoneOffset() * (1000 * 60);
        context.dayOfWeekOfFirstDayOfThisMonth = firstOfMonth.getUTCDay();
        var lastOfLastMonthTime = firstOfMonth.getTime() + context.timeZoneOffset - (1000*24*60*60); 
        context.lastDayOfLastMonth = new Date(lastOfLastMonthTime).getDate();
        var firstOfNextMonth = new Date(context.year + "-" + (context.month + 1) + "-1");
        var lastOfThisMonthTime = firstOfNextMonth.getTime() + context.timeZoneOffset - (1000*24*60*60); 
        context.lastDayOfThisMonth = new Date(lastOfThisMonthTime).getDate();
        context.daysFromLastMonth = 7 - (7 - context.dayOfWeekOfFirstDayOfThisMonth);
        context.daysFromNextMonth = 42 - (context.daysFromLastMonth + context.lastDayOfThisMonth);
    }

    ready() {
        super.ready();
        var context = this;
        if (context.default && !context.options && !context.onReadyProps.options) {
            setTimeout(function() {
                context.options = context.defaultOptions();
            }, 300);
        }
        if (context.default && !context.data && !context.onReadyProps.data) {
            setTimeout(function() {
                context.data = context.defaultData();
            }, 300);
        }
    }

    defaultOptions() {
        var context = this;
        var appointmentTemplate = context.shadowRoot.querySelector("#appointmentTemplate").innerHTML;
        var appointmentsTemplate = context.shadowRoot.querySelector("#appointmentsTemplate").innerHTML;
        var dayOfWeekTemplate = context.shadowRoot.querySelector("#dayOfWeekTemplate").innerHTML;
        var dayTemplate = context.shadowRoot.querySelector("#dayTemplate").innerHTML;
        return {
            layout:"fitColumns",
            placeholder:"No Data Set",
            headerVisible: false,
            autoColumns: false,
            selectable:false,
            headerSort: false,
            columns:[
            {
                    title:"Sunday", field:"SUN", formatter:"context.dayCell", align:"center", editor:false, width:130, formatterParams:{appointmentsTemplate: appointmentsTemplate, appointmentTemplate: appointmentTemplate, dayOfWeekTemplate: dayOfWeekTemplate, dayTemplate: dayTemplate}
                },
                {
                    title:"Monday", field:"MON", formatter:"context.dayCell", align:"center", editor:false, width:130, formatterParams:{appointmentsTemplate: appointmentsTemplate, appointmentTemplate: appointmentTemplate, dayOfWeekTemplate: dayOfWeekTemplate, dayTemplate: dayTemplate}
                },
                {
                    title:"Tuesday", field:"TUE", formatter:"context.dayCell", align:"center", editor:false, width:130, formatterParams:{appointmentsTemplate: appointmentsTemplate, appointmentTemplate: appointmentTemplate, dayOfWeekTemplate: dayOfWeekTemplate, dayTemplate: dayTemplate}
                },
                {
                    title:"Wednesday", field:"WED", formatter:"context.dayCell", align:"center", editor:false, width:130, formatterParams:{appointmentsTemplate: appointmentsTemplate, appointmentTemplate: appointmentTemplate, dayOfWeekTemplate: dayOfWeekTemplate, dayTemplate: dayTemplate}
                },
                {
                    title:"Thursday", field:"THU", formatter:"context.dayCell", align:"center", editor:false, width:130, formatterParams:{appointmentsTemplate: appointmentsTemplate, appointmentTemplate: appointmentTemplate, dayOfWeekTemplate: dayOfWeekTemplate, dayTemplate: dayTemplate}
                },
                {
                    title:"Friday", field:"FRI", formatter:"context.dayCell", align:"center", editor:false, width:130, formatterParams:{appointmentsTemplate: appointmentsTemplate, appointmentTemplate: appointmentTemplate, dayOfWeekTemplate: dayOfWeekTemplate, dayTemplate: dayTemplate}
                },
                {
                        title:"Saturday", field:"SAT", formatter:"context.dayCell", align:"center", editor:false, width:130, formatterParams:{appointmentsTemplate: appointmentsTemplate, appointmentTemplate: appointmentTemplate, dayOfWeekTemplate: dayOfWeekTemplate, dayTemplate: dayTemplate}
                }
            ]
        };
    }

    defaultData() {
        var context = this;
        return [
            {row: 0, SUN: 29, MON: 30, TUE: 1, WED: 2, THU: 3, FRI: 4, SAT: 5},
            {row: 1, SUN: 6, MON: 7, TUE: 8, WED: 9, THU: 10, FRI: 11, SAT: 12},
            {row: 2, SUN: 13, MON: 14, TUE: 15, WED: 16, THU: 17, FRI: 18, SAT: 19},
            {row: 3, SUN: 20, MON: 21, TUE: 22, WED: 23, THU: 24, FRI: 25, SAT: 26},
            {row: 4, SUN: 27, MON: 28, TUE: 29, WED: 30, THU: 31, FRI: 1, SAT: 2},
            {row: 5, SUN: 3, MON: 4, TUE: 5, WED: 6, THU: 7, FRI: 8, SAT: 9}
        ];
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
            cellContainerContent += dayOfWeekTemplate.replace("*{dayOfWeek}", columnDef["field"]);
        }
        cellContainerContent += dayTemplate.replace("*{day}", row[columnDef["field"]]);

        cellContainer.innerHTML = cellContainerContent + appointmentsTemplate;
        var appointments = cellContainer.querySelector(".appointments")
        var repeat = 5;

        if (true && cellValue && appointmentTemplate) {
            var appointmentsContent = "";
            for (var i = 0; i < repeat; i++) {
                var value = cellValue + " " + cellValue + " " + cellValue + " " + cellValue + " " + cellValue
                var appointment = appointmentTemplate.replace("*{index}", i);
                appointment = appointment.replace("*{cellValue}", value);
                appointmentsContent += appointment;
            }
            appointments.innerHTML = appointmentsContent;
        }

        var parentNode = cell._cell.element;

        return cellContainer.outerHTML;
    }

}
customElements.define('tabulator-calendar', TabulatorCalendar);