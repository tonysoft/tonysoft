<link href="https://unpkg.com/jsoneditor@7.0.3/dist/jsoneditor.css" rel="stylesheet" type="text/css">
<style>
    .editor {
        width: 100%;
        height: 100%;
    }
</style>

<div class="editor" bind:this={container}></div>

<script>
	import { createEventDispatcher, onMount } from 'svelte';
	import "https://unpkg.com/jsoneditor@7.0.3/dist/jsoneditor.js"

    let options;
	let container;

	export let width = null; 
	export let height = null; 
	export let editor; 
    export let json = {};

    export function getJSON() {
        if (editor) {
            editorEvent("json", editor.get());
        }
    }
 
	export let getjson = false;

	$: if (getjson && (getjson !== "false")) {
        getJSON();
	}

	$: if (json && editor) {
        setJSON();
	}

	const dispatch = createEventDispatcher();
	export let mode = 'tree';
	onMount(() => {
        setTimeout(function() {
            createEditor();
        });

		return () => {
			// map.remove();
		};
	});
	function editorEvent(eventName, payload) {
        dispatch(eventName, payload);
	}

    function createEditor() {
        options = { 
            mode: mode,
            onEvent: function(node, event) {
                if (event.type === 'click') {
                    editorEvent("node", node);
                    if (node.value) {
                        editorEvent("nodeValue", node.value);
                    }
                }
            }
        };
        if (width) {
            var widthStyle = width;
            if (!isNaN(widthStyle)) {
                widthStyle += "px";
            }
            container.style.width = widthStyle;
        }
        if (height) {
            var heightStyle = height;
            if (!isNaN(heightStyle)) {
                heightStyle += "px";
            }
            container.style.height = heightStyle;
        }
        editor = new JSONEditor(container, options);
        setJSON();
    }
    function setJSON() {
        if (json.split) {
            json = JSON.parse(json);
        }
        editor.set(json);
    }
</script>
