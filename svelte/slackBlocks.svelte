<div class="flexColumn" style="display: {display};" bind:this={mainContainer}>
	{#each blocks as thisBlock, i}
        {#if (thisBlock && (thisBlock.type === "section"))}
            <slack-section on:block={blockProcessed} section={thisBlock} display="" style="width: {width}"></slack-section>
        {/if}
    {/each}
</div> 
<style>
    .flexColumn {
        display: flex;
        flex-direction: column;
    }
</style>
<script>
	import {slackSection} from "./slackSection.js"

	const dispatch = createEventDispatcher();

    export let display = "block";
    export let blocks = [];
    let blocksProcessed = [];


    let mainContainer;
    export let width = "300px";

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
        });
	});

    function blockProcessed(e) {
        var block = e.detail;
        blocksProcessed.push(block);
        if (blocksProcessed.length === blocks.length) {
            event("blocksProcessed", { blocks: blocksProcessed });
        }
    }

	function event(eventName, payload) {
        dispatch(eventName, payload);
	}

</script>
