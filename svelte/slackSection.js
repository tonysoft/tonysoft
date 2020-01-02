/* slackSection.svelte generated by Svelte v3.12.1 */
import {
	SvelteElement,
	append,
	attr,
	binding_callbacks,
	detach,
	element,
	flush,
	init,
	insert,
	noop,
	safe_not_equal,
	set_style,
	space
} from "./svelte/internal.js";
import { createEventDispatcher, onMount } from "./svelte/svelte.js";

import {markdownSlackified} from "./markdownSlackified.js"
import {MarkdownMarkup} from "https://unpkg.com/tonysoft@^1.55.27/markdown-markup.js?module"

function create_fragment(ctx) {
	var div4, div3, div2, div1, div0, span, t0, div5, markdown_slackified, t1, markdown_markup, t2, link0, t3, link1, t4, link2;

	return {
		c() {
			div4 = element("div");
			div3 = element("div");
			div2 = element("div");
			div1 = element("div");
			div0 = element("div");
			span = element("span");
			t0 = space();
			div5 = element("div");
			markdown_slackified = element("markdown-slackified");
			t1 = space();
			markdown_markup = element("markdown-markup");
			t2 = space();
			link0 = element("link");
			t3 = space();
			link1 = element("link");
			t4 = space();
			link2 = element("link");
			this.c = noop;
			attr(span, "dir", "auto");
			attr(div0, "class", "p-mrkdwn_element");
			attr(div1, "class", "p-section_block__text");
			attr(div2, "class", "p-section_block_text_content");
			attr(div3, "data-qa", "bk_section_block");
			attr(div3, "class", "p-section_block p-section_block--no_top_margin");
			attr(div4, "class", "p-block_kit_renderer__block_wrapper");
			set_style(div5, "display", "none");
			attr(link0, "href", "https://unpkg.com/tonysoft@1.55.21/css/rollup-slack_kit_base.css");
			attr(link0, "rel", "stylesheet");
			attr(link0, "type", "text/css");
			attr(link1, "href", "https://unpkg.com/tonysoft@1.55.21/css/slackBlockKit.css");
			attr(link1, "rel", "stylesheet");
			attr(link1, "type", "text/css");
			attr(link2, "href", "https://unpkg.com/tonysoft@1.55.21/css/slackBlockKitBuilder.css");
			attr(link2, "rel", "stylesheet");
			attr(link2, "type", "text/css");
		},

		m(target, anchor) {
			insert(target, div4, anchor);
			append(div4, div3);
			append(div3, div2);
			append(div2, div1);
			append(div1, div0);
			append(div0, span);
			ctx.span_binding(span);
			insert(target, t0, anchor);
			insert(target, div5, anchor);
			append(div5, markdown_slackified);
			ctx.markdown_slackified_binding(markdown_slackified);
			append(div5, t1);
			append(div5, markdown_markup);
			ctx.markdown_markup_binding(markdown_markup);
			insert(target, t2, anchor);
			insert(target, link0, anchor);
			insert(target, t3, anchor);
			insert(target, link1, anchor);
			insert(target, t4, anchor);
			insert(target, link2, anchor);
		},

		p: noop,
		i: noop,
		o: noop,

		d(detaching) {
			if (detaching) {
				detach(div4);
			}

			ctx.span_binding(null);

			if (detaching) {
				detach(t0);
				detach(div5);
			}

			ctx.markdown_slackified_binding(null);
			ctx.markdown_markup_binding(null);

			if (detaching) {
				detach(t2);
				detach(link0);
				detach(t3);
				detach(link1);
				detach(t4);
				detach(link2);
			}
		}
	};
}

function instance($$self, $$props, $$invalidate) {
	

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

    let { markdown } = $$props;

    let sectionMarkup;

    function markdownToMarkup() {
        var blockKit = null;
        if (markdown) {
            var markup = markdownMarkupConverter.convertMarkdown(markdown);
            $$invalidate('sectionMarkup', sectionMarkup.innerHTML = markup, sectionMarkup);
            var slackified = markdownSlackifiedConverter.slackify(markdown);
            blockKit = JSON.parse(JSON.stringify(blockKitJSON));
            blockKit.text.text = slackified;
			event("slackified", JSON.stringify(slackified));
			setTimeout(function() {
				setTimeout(function() {
					event("blockKit", blockKit);
				}, 200);
				event("markup", markup);
			}, 200);
        }
        return blockKit;
    }

	onMount(() => {
        setTimeout(function() {
            markdownToMarkup();
        });
	});

	function event(eventName, payload) {
        dispatch(eventName, payload);
	}

	function span_binding($$value) {
		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
			$$invalidate('sectionMarkup', sectionMarkup = $$value);
		});
	}

	function markdown_slackified_binding($$value) {
		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
			$$invalidate('markdownSlackifiedConverter', markdownSlackifiedConverter = $$value);
		});
	}

	function markdown_markup_binding($$value) {
		binding_callbacks[$$value ? 'unshift' : 'push'](() => {
			$$invalidate('markdownMarkupConverter', markdownMarkupConverter = $$value);
		});
	}

	$$self.$set = $$props => {
		if ('markdown' in $$props) $$invalidate('markdown', markdown = $$props.markdown);
	};

	$$self.$$.update = ($$dirty = { markdown: 1 }) => {
		if ($$dirty.markdown) { if (markdown) {
                markdownToMarkup();
        	} }
	};

	return {
		markdownSlackifiedConverter,
		markdownMarkupConverter,
		markdown,
		sectionMarkup,
		span_binding,
		markdown_slackified_binding,
		markdown_markup_binding
	};
}

class slackSection extends SvelteElement {
	constructor(options) {
		super();

		this.shadowRoot.innerHTML = `<style>*{font-family:Slack-Lato, appleLogo, sans-serif}</style>`;

		init(this, { target: this.shadowRoot }, instance, create_fragment, safe_not_equal, ["markdown"]);

		if (options) {
			if (options.target) {
				insert(options.target, this, options.anchor);
			}

			if (options.props) {
				this.$set(options.props);
				flush();
			}
		}
	}

	static get observedAttributes() {
		return ["markdown"];
	}

	get markdown() {
		return this.$$.ctx.markdown;
	}

	set markdown(markdown) {
		this.$set({ markdown });
		flush();
	}
}

export default slackSection;
window.customElements.define('slack-section', slackSection);