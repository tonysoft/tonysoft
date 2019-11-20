<script>
	import { createEventDispatcher } from 'svelte';
	import { Grail } from "./js/grail.js"

    let grail;

    export let pointsets = [];

	const dispatch = createEventDispatcher();

    $: if (pointsets.length > 0) {
        if (!grail) {
            grail = new Grail();
        }
        if (typeof pointsets === "string") {  // data passed in a string rather than array
            pointsets = JSON.parse(pointsets);
        }
        var recognized = grail.Recognize(pointsets, true);
        dispatch("recognized", recognized);
	}
</script>
