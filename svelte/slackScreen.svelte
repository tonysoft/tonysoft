<div class="flexColumn" style="display: {display};" bind:this={mainContainer}>
    <slack-blocks on:blocksProcessed={blocksProcessed} blocks={blocks} display="" style="width: {width}"  bind:this={slackBlocksElement}></slack-blocks>
</div> 
<div style="display: none;">
    <merge-into-json bind:this={merger}></merge-into-json>
</div>
<style>
    .flexColumn {
        display: flex;
        flex-direction: column;
    }
</style>
<script>
	import {slackBlocks} from "./slackBlocks.js"
	import {mergeIntoJSON} from "./mergeIntoJson.js"

	const dispatch = createEventDispatcher();

    export let display = "block";
    export let definition;
    export let data;
    export let blocks = [];

    let blocksToProcess = [];


    let mainContainer;
    let slackBlocksElement;
    let merger;
    
    let width = "300px";

	$: if (definition) {
        if (definition.split) {
            definition = JSON.parse(definition);
        }
        checkProcess();
	}

	$: if (data) {
        if (data.split) {
            data = JSON.parse(data);
        }
        checkProcess();
	}

    function checkProcess() {
        if (data && definition) {
            process();
        }
    }

	$: if (blocks) {
        if (blocks.split) {
            blocks = JSON.parse(blocks);
        }
	}

	onMount(() => {
        setTimeout(function() {
            var parentComponent = mainContainer.parentNode.host;
            //var width = parentComponent.offsetWidth;
            width = mainContainer.style.width = parentComponent.style.width || "500px";
            slackBlocksElement.width = width;
        });
	});

    function blocksProcessed(e) {
        var blocks = e.detail;
        event("blocksProcessed", blocks);
    }

	function event(eventName, payload) {
        dispatch(eventName, payload);
	}

    function process() {
        var allBlocks = [];
        var def = definition.header || [];
        var dat = data.header || {};
        if (def.length) {
            allBlocks = allBlocks.concat(merger.merge(def, dat));
        }
        def = definition.items || []
        if (def.length) {
            var items = data.items || [];
            items.forEach(function(item) {
                var itemDef = JSON.parse(JSON.stringify(def));
                allBlocks = allBlocks.concat(merger.merge(itemDef, item));
            });
        }
        def = definition.footer || [];
        if (def.length) {
            dat = data.footer || {};
            allBlocks = allBlocks.concat(merger.merge(def, dat));
        }
        blocks = allBlocks;
        event("blocksProcessed", blocks);
    }

</script>
