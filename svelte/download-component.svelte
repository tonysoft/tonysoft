<script>
	import { createEventDispatcher } from 'svelte';

    export let filename = "test.json";
    export let json;
    export let text;

    export function downloadJSON() {
        setTimeout(function() {
            var content = "{}";
            if (!json.length) {
                content = JSON.stringify(json);
            } else {
                content = json;
            }
            if (content !== "{}") {
                download(content, "application/json");
                json = {};
            }
        });
    }
 
    export function downloadText() {
        setTimeout(function() {
            if (text !== "") {
                var content = text;
                download(content, "text/plain");
                text = "";
            }
        });
	}

	const dispatch = createEventDispatcher();

    function download(content, contentType) {
        var blob = toBlob(content, contentType);
        var url = window.URL.createObjectURL(blob);

        var a = document.createElement("a");
        a.style = "display: none";
        a.href = url;
        a.download = filename;

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
</script>
