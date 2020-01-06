<script>
	import { createEventDispatcher, onMount } from 'svelte';
	import "./js/slackify-markdown-bundle.js"

	const dispatch = createEventDispatcher();

    export let markdown;    

    export function slackify(markdownIn) {
        var slackified = "";
        var markdownToProcess = markdownIn || markdown;
        if (markdownToProcess) {
            slackified = slackifyMarkdown(markdownToProcess);
            event("slackified", slackified);
        }
        return slackified;
    }
 
	$: if (markdown) {
        slackify();
	}

	onMount(() => {
        setTimeout(function() {
            slackify();
        });
	});

	function event(eventName, payload) {
        dispatch(eventName, payload);
	}

</script>
