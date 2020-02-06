<script>
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

    export let filename = "data";
    export let rows;
    export let fields;
    export let autorun = false;
    export let download = false;

	$: if (autorun !== false) {
        if ((autorun === true) || (autorun === "true") || (autorun === "")) {
            autorun = true;
        } else {
            autorun = false;
        }
	}

	$: if (download !== false) {
        if ((download === true) || (download === "true") || (download === "")) {
            download = true;
        } else {
            download = false;
        }
	}

	$: if (rows) {
        if (rows.split) {
            rows = JSON.parse(rows);
        }
        if (autorun) {
            jsonToCSVTransform();
        }
	}

	$: if (fields) {
        if (fields.split) {
            fields = JSON.parse(fields);
        }
        if (autorun) {
            jsonToCSVTransform();
        }
	}

    export function jsonToCSVTransform(jsonIn, fieldsIn) {
        var jsonToProcess = jsonIn || rows;
        var fieldsToProcess = fieldsIn || fields;
        if (jsonToProcess && fieldsToProcess) {
            if (!jsonToProcess.length) {
                jsonToProcess = [jsonToProcess];
            }
            var fieldNames = []
            if (Array.isArray(fieldsToProcess)) {
                fieldNames = fieldsToProcess;
            } else {
                if (typeof fieldsToProcess === 'object') {
                    fieldNames = Object.getOwnPropertyNames(fieldsToProcess);
                }
            }
            var content = fieldNames.join(",");
            jsonToProcess.forEach(function(row) {
                var rowValues = [];
                fieldNames.forEach(function(field) {
                    var fieldValue = (row[field] === false) ? false : row[field] || "";
                    if (fieldValue.indexOf) {
                        while (fieldValue.indexOf(",") >= 0) {
                            fieldValue = fieldValue.replace(",", "|");
                        }
                        while (fieldValue.indexOf("| ") >= 0) {
                            fieldValue = fieldValue.replace("| ", "|");
                        }
                    }
                    rowValues.push(fieldValue)
                })
                content = content + "\n" + rowValues.join(",");
            })
            if (download) {
                setTimeout(function() {
                    downloadContent(content, "text/plain");
                });
            }
            event("csv", content);
        }
	}

    function downloadContent(content, contentType) {
        var blob = toBlob(content, contentType);
        var url = window.URL.createObjectURL(blob);

        var a = document.createElement("a");
        a.style = "display: none";
        a.href = url;
        a.download = filename + ".csv";

        document.body.appendChild(a);
        a.click();

        window.URL.revokeObjectURL(url);
    }

    function toBlob(content, contentType) {
        // Code taken from https://github.com/ebidel/filer.js
        var rawLength = content.length;
        var uInt8Array = new Uint8Array(rawLength);

        for (var i = 0; i < rawLength; ++i) {
            uInt8Array[i] = content.charCodeAt(i);
        }

        return new Blob([uInt8Array], { type: contentType });
    }

	function event(eventName, payload) {
        dispatch(eventName, payload);
	}

</script>
