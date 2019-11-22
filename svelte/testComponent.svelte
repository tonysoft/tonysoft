<div class="wrapper" bind:this={wrapper}>
    <div class="editor" bind:this={container}></div>
    <button on:click={readJSON} class="readJSON buttonActive">Get</button>
    <button on:click={treeMode} class="treeMode buttonActive buttonInactive" bind:this={buttonTreeMode}>Tree</button>
    <button on:click={textMode} class="textMode buttonActive" bind:this={buttonTextMode}>Text</button>
</div>

<link href="https://unpkg.com/jsoneditor@7.0.3/dist/jsoneditor.css" rel="stylesheet" type="text/css">
<style>
    .wrapper {
        position: relative; width: 100%; height: 100%;
    }
    .editor {
        width: 100%; height: 100%; font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Ubuntu, "Helvetica Neue", sans-serif, Helvetica; font-weight: 300; border: 1px solid #444444;        
    }
    .buttonActive {
        opacity: 1.0; pointer-events: all; cursor: pointer;
    }
    .buttonInactive {
        opacity: 0.4; pointer-events: none; cursor: default;
    }
    .readJSON {
        position: absolute; bottom: 4px; right:23px;;
    }
    .treeMode {
        position: absolute; bottom: 4px; right:83px;
    }
    .textMode {
        position: absolute; bottom: 4px; right:143px;
    }
</style>

<script>
	import { createEventDispatcher, onMount } from 'svelte';
	import "https://unpkg.com/jsoneditor@7.0.3/dist/jsoneditor-minimalist.js"

    let options;
    let container;
    let wrapper;
	let buttonTreeMode;
	let buttonTextMode;

    let minHeight = 250;
	export let width = null; 
	export let height = null; 
	export let editor; 
    export let json = {};
	export let getjson = false;
	export let mode = 'tree';
    export let editable;
    

    export function readJSON() {
        if (editor) {
            editorEvent("json", editor.get());
        }
    }
 
    function treeMode() {
        mode = "tree";
    }
 
    function textMode() {
        mode = "text";
    }
 
	$: if (getjson && (getjson !== "false")) {
        readJSON();
	}

	$: if (json && editor) {
        setJSON();
	}

	$: if (mode && editor) {
        options.mode = mode;
        newEditor();
        if (mode === "tree") {
            buttonTreeMode.classList.add("buttonInactive");
            buttonTextMode.classList.remove("buttonInactive");
        } else {
            buttonTreeMode.classList.remove("buttonInactive");
            buttonTextMode.classList.add("buttonInactive");
        }
	}

	const dispatch = createEventDispatcher();
	onMount(() => {
        setTimeout(function() {
            createEditor();
        });
		return () => {
		};
	});

	function editorEvent(eventName, payload) {
        dispatch(eventName, payload);
	}

    function createEditor() {
        options = { 
            mode: mode,
            onEditable: function(node) {
                return (((editable !== "false") && (editable !== false) && (editable !== null)) || (editable === undefined));
            },
            onEvent: function(node, event) {
                if (event.type === 'click') {
                    if (node.value) {
                        editorEvent("nodeValue", node.value);
                    }
                    editorEvent("node", node);
                }
            }
        };
        if (width) {
            var widthStyle = width;
            if (!isNaN(widthStyle)) {
                widthStyle += "px";
            }
            wrapper.style.width = widthStyle;
        }
        if (!height) {
            var offsetHeight = container.offsetHeight;
            if (offsetHeight < minHeight) {
                height = minHeight;
            }
        }
        if (height) {
            var heightStyle = height;
            if (!isNaN(heightStyle)) {
                heightStyle += "px";
            }
            wrapper.style.height = heightStyle;
        }
        newEditor();
    }

    function newEditor() {
        container.innerHTML = "";
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
