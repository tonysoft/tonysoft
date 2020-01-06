<div class="flexRow" style="display: {display};">
    <button class="c-button c-button--outline c-button--small p-block_kit_button_element null--outline null--small" type="button" data-qa-block-id="l07=" data-qa-action-id="2JA2A">
        <div class="p-plain_text_element" data-qa="bk-plain_text_element">
            <span dir="auto" bind:this={sectionMarkup}></span>
        </div>
    </button>
</div>

<div style="display: none;">
    <markdown-markup bind:this={markdownMarkupConverter}></markdown-markup>
</div>
<style>
    * {
        font-family: Slack-Lato, appleLogo, sans-serif;
    }

    .flexRow {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }

</style>
<link href="https://unpkg.com/tonysoft@1.55.21/css/rollup-slack_kit_base.css" rel="stylesheet" type="text/css">
<link href="https://unpkg.com/tonysoft@1.55.21/css/slackBlockKit.css" rel="stylesheet" type="text/css">
<link href="https://unpkg.com/tonysoft@1.55.21/css/slackBlockKitBuilder.css" rel="stylesheet" type="text/css">
<script>
    import {MarkdownMarkup} from "https://unpkg.com/tonysoft@^1.55.47/markdown-markup.js?module"

	const dispatch = createEventDispatcher();

    let markdownMarkupConverter;

    let blockKitJSON = {
        "type": "button",
        "text": {
            "type": "plain_text",
            "text": "",
            "emoji": true
        },
        "value": ""
    }

    export let label;
    export let value = "buttonClick";
    export let display = "block";
    export let block;

    let mainContainer;
    let sectionMarkup;

    function textToMarkup() {
        var blockKit = null;
        if (label) {
            var markup = markdownMarkupConverter.convertMarkdown(label, 20, 1);
            if (display !== "none") {
                markup = markup.replace("<p>", "");
                markup = markup.replace("</p>", "");
                sectionMarkup.innerHTML = markup;
            }
            blockKit = JSON.parse(JSON.stringify(blockKitJSON));
            blockKit.text.text = label;
            blockKit.value = value;
			event("block", blockKit);
        }
        return blockKit;
    }
 
	$: if (label) {
        textToMarkup();
	}

	onMount(() => {
        setTimeout(function() {
            textToMarkup();
        });
	});

	$: if (block) {
        if (block.split) {
            block = JSON.parse(block);
        }
        blockKitJSON = block;
        label = block.text.text;
        value = block.value;
	}

	function event(eventName, payload) {
        dispatch(eventName, payload);
	}
</script>
