<link href="https://unpkg.com/jsoneditor@7.0.3/dist/jsoneditor.css" rel="stylesheet" type="text/css">
<script>
	import { createEventDispatcher, onMount } from 'svelte';
	import "https://unpkg.com/jsoneditor@7.0.3/dist/jsoneditor.js"

    let options;
	let container;

	export let width = 500; 
	export let height = 350; 
	export let editor; 
    export let json = { "test": "testing" };

	
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
        container.style.width = width + "px";
        container.style.height = height + "px";
        editor = new JSONEditor(container, options);
        if (json.split) {
            json = JSON.parse(json);
        }
        editor.set(json);
    }
</script>

<div bind:this={container}></div>
