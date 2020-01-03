<div class="p-block_kit_renderer__block_wrapper" style="display: {display};">
    <div data-qa="bk_section_block" class="p-section_block p-section_block--no_top_margin">
        <div class="p-section_block_text_content">
            <div class="p-section_block__text">
                <div class="p-mrkdwn_element">
                    <span dir="auto" bind:this={sectionMarkup}></span>
                </div>
            </div>
        </div>
    </div>
</div>
<div style="display: none;">
    <markdown-slackified bind:this={markdownSlackifiedConverter}></markdown-slackified>
    <markdown-markup bind:this={markdownMarkupConverter}></markdown-markup>
</div>
<style>
    * {
        font-family: Slack-Lato, appleLogo, sans-serif;
    }
</style>
<link href="https://unpkg.com/tonysoft@1.55.21/css/rollup-slack_kit_base.css" rel="stylesheet" type="text/css">
<link href="https://unpkg.com/tonysoft@1.55.21/css/slackBlockKit.css" rel="stylesheet" type="text/css">
<link href="https://unpkg.com/tonysoft@1.55.21/css/slackBlockKitBuilder.css" rel="stylesheet" type="text/css">
<script>
	import {markdownSlackified} from "./markdownSlackified.js"
    import {MarkdownMarkup} from "https://unpkg.com/tonysoft@^1.55.27/markdown-markup.js?module"

	const dispatch = createEventDispatcher();

    let markdownSlackifiedConverter;
    let markdownMarkupConverter;

    //const markdownSlackifiedConverter = new markdownSlackified();
    //const markdownMarkupConverter = new MarkdownMarkup();

    const blockKitJSON = {
        "type": "section",
        "text": {
            "type": "mrkdwn",
            "text": ""
        }
	}

    export let markdown;
    export let display = "block";

    let sectionMarkup;

    function markdownToMarkup() {
        var blockKit = null;
        if (markdown) {
            var markup = markdownMarkupConverter.convertMarkdown(markdown);
            if (display !== "none") {
                sectionMarkup.innerHTML = markup;
            }
            var slackified = markdownSlackifiedConverter.slackify(markdown);
            if (slackified.lastIndexOf("\n") === (slackified.length - 1)) {
                slackified = slackified.substring(0, slackified.length - 1);
            }
            blockKit = JSON.parse(JSON.stringify(blockKitJSON));
            blockKit.text.text = slackified;
			event("slackified", slackified);
			setTimeout(function() {
				setTimeout(function() {
					event("blockKit", blockKit);
				}, 200);
				event("markup", markup);
			}, 200);
        }
        return blockKit;
    }
 
	$: if (markdown) {
        markdownToMarkup();
	}

	onMount(() => {
        setTimeout(function() {
            markdownToMarkup();
        });
	});

	function event(eventName, payload) {
        dispatch(eventName, payload);
	}
</script>
