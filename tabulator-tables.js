import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import './js/tabulator.js'
import './js/moment.js'
import "https://unpkg.com/jsonpath-plus@1.1.0/dist/index-umd.js"

class TabulatorTables extends PolymerElement {

  static get properties() {
    return {


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
            maxWidth: {
                type: Number
            },
            height: {
                type: Number
            },
            width: {
                type: Number
            },
            border: {
                type: Boolean
            },
            default: {
                type: Boolean
            },
            options: {
                type: Object,
                observer: "_options"
            },
            data: {
                type: Object,
                observer: "_data"
            },
            onReadyProps: {
                type: Object
            }
        }
    }
    constructor() {
        super();
        var context = this;
        context.default = false;
        context.maxWidth = 0;
        context.height = 0;
        context.width = 0;
        context.border = false;
        context.onReadyProps = {};
        context.options = null;
        context.data = null;
    }

    ready() {
        var context = this;
        super.ready();
        if (!context.width || !context.height) {
            var elements = document.querySelectorAll("tabulator-tables");
            elements.forEach(function(element) {
                var parentNode = element.parentNode;
                if (!element.style.width) {
                    element.style.width = "100%";
                }
                if (!element.style.height) {
                    element.style.height = "100%";
                }
            })
        }
        context.JSONPath = JSONPath.JSONPath;
        if (context.default && !context.options && !context.onReadyProps.options) {
            context.options = context.defaultOptions();
        }
        if (context.default && !context.data && !context.onReadyProps.data) {
            context.data = context.defaultData();
        }
        context.isReady = true;
        context.tableDest = context.shadowRoot.querySelector('#table');
        for (var prop in context.onReadyProps) {
            context[prop] = context.onReadyProps[prop];
        }
    }

    initTable() {
        var context = this;
        context.table = new Tabulator(context.tableDest, context.options);
        context.table.component = context;
    }



    defaultOptions() {
        var context = this;
        return {
            layout:"fitColumns",
            placeholder:"No Data Set",
            headerVisible: true,
            autoColumns: false,
            columns:[
                {title:"Name", field:"name", width:150, editor:"input"},
                {title:"Location", field:"location", width:130, editor:"autocomplete", editorParams:{allowEmpty:true, showListOnEmpty:true, values:true}},
                {title:"Progress", field:"progress", sorter:"number", align:"left", formatter:"progress", width:140, editor:"input"},
                {title:"Gender", field:"gender", editor:"select", editorParams:{values:{"M":"Male", "F":"Female", "?":"Unknown"}}},
                {title:"Rating", field:"rating",  formatter:"star", align:"center", width:100, editor:true},
                {title:"Date Of Birth", field:"dob", align:"center", sorter:"date", width:140, editor:context.dateEditor},
                {title:"Driver", field:"car", align:"center", editor:true, formatter:"tickCross"},
            ]
        };
    }

    defaultData() {
        var context = this;
        return [
            {id:1, name:"Oli Bob", age:"12", progress: 80, location: "HERE", col:"red", dob:""},
            {id:2, name:"Mary May", age:"1", col:"blue", location: "THERE", dob:"05/14/1982"},
            {id:3, name:"Christine Lobowski", age:"42", col:"green", dob:"05/22/1982"},
            {id:4, name:"Brendon Philips", age:"125", col:"orange", dob:"01/08/1980"},
            {id:5, name:"Margret Marmajuke", age:"16", col:"yellow", dob:"01/31/1999"},
        ];
    }

    _options(options) {
        var context = this;
        if (context.checkIsReady("options", options, null)) {
            var fixups = [];
            var path = "$.[?(@.editor)]";
            var editors = context.JSONPath({ path: path, json: options});
            editors.forEach(function(parentNode) {
                var editor = parentNode.editor;
                if (editor.length) {
                    var segs = editor.split(".");
                    if ((segs.length > 1) && (segs[0] === "context")) {
                        fixups.push({node: parentNode, prop: "editor", func: context[segs[1]]})
                        //parentNode.editor = context[segs[1]];
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
                        fixups.push({node: parentNode, prop: "formatter", func: context[segs[1]]})
                        //parentNode.formatter = context[segs[1]];
                    }
                }
            })
            options.cellEdited = context.cellEdited;
            options.cellClick = context.cellClick;
            fixups.forEach(function (fixup) {
                fixup.node[fixup.prop] = fixup.func;
            })
            context.initTable();
        }
    }

    cellClick(e, cell) {
        var table = this;
        var context = table.component;
        var row = cell._cell.row.data;
        var clickSrc = e.srcElement;
        var attributes = clickSrc.attributes;
        var srcAttributes = {};
        for (var attrId in attributes) {
            if (parseInt(attrId) >= 0) {
                var attr = attributes[attrId];
                srcAttributes[attr.name] = attributes[attr.name].value;;
            }
        }
        context.dispatchEvent(new CustomEvent("cellClicked", { 
            detail: {
                cell: cell,
                attributes: srcAttributes,
                row: row
            }
        }));
    }

    cellEdited(cell) {
        var table = this;
        var context = table.component;
        var row = cell._cell.row.data;
        var field = cell._cell.column.field;
        var value = cell._cell.value;
        var oldValue = cell._cell.oldValue;
        context.dispatchEvent(new CustomEvent("cellEdited", { 
            detail: {
                field: field,
                value: value,
                oldValue: oldValue,
                row: row
            }
        }));
    }

    _data(data) {
        var context = this;
        if (context.checkIsReady("data", data, null)) {
            context.table.setData(data);
        }
    }

    checkIsReady(name, value, noValue) {
        var context = this;
        if (value === noValue) {
            return false;
        }
        if (!context.isReady) {
            context.onReadyProps[name] = value;
            context[name] = noValue;
            return false;
        }
        return true;
    }

    hasBorder(border) {
        var context = this;
        if (border) {
            return "border";
        } else {
            return "";
        }
    }

    hasBrowserLink(browserLink)  {
        var context = this;
        if (browserLink) {
            return "all";
        } else {
            return "none";
        }
    }

    setMaxWidth(maxWidth) {
        var context = this;
        if (!maxWidth) {
            return "10000px";
        }
        else {
            return maxWidth + "px";
        }
    }

    setWidth(width) {
        var context = this;
        if (!width) {
            return "100%";
        }
        else {
            return width + "px";
        }
    }

    setHeight(height) {
        var context = this;
        if (!height) {
            return "100%";
        }
        else {
            return height + "px";
        }
    }

    dateEditor(cell, onRendered, success, cancel) {
        //cell - the cell component for the editable cell
        //onRendered - function to call when the editor has been rendered
        //success - function to call to pass the successfuly updated value to Tabulator
        //cancel - function to call to abort the edit and return to a normal cell

        //create and style input
        var cellValue = moment(cell.getValue(), "MM/DD/YYYY").format("YYYY-MM-DD"),
        input = document.createElement("input");

        input.setAttribute("type", "date");

        input.style.padding = "4px";
        input.style.width = "100%";
        input.style.boxSizing = "border-box";

        input.value = cellValue;

        onRendered(function(){
            input.focus();
            input.style.height = "100%";
        });

        function onChange(){
            if(input.value != cellValue){
                success(moment(input.value, "YYYY-MM-DD").format("MM/DD/YYYY"));
            }else{
                cancel();
            }
        }

        //submit new value on blur or change
        input.addEventListener("blur", onChange);

        //submit new value on enter
        input.addEventListener("keydown", function(e){
            if(e.keyCode == 13){
                onChange();
            }

            if(e.keyCode == 27){
                cancel();
            }
        });

        return input;
    }

    dayCell(cell, formatingParams) {
        var table = this;
        var context = table.component;
        var cellValue = cell.getValue();
        var rowIndex = cell._cell.row.data.row;
        var row = cell._cell.row.data;
        var columnDef = cell.getColumn()._column.definition;
        var appointmentsTemplate = columnDef.appointmentsTemplate;
        var appointmentTemplate = columnDef.appointmentTemplate;
        var dayOfWeekTemplate = columnDef.dayOfWeekTemplate;
        var dayTemplate = columnDef.dayTemplate;
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
customElements.define('tabulator-tables', TabulatorTables);
export {TabulatorTables}