/* markdownSlackified.svelte generated by Svelte v3.12.1 */
import {
	SvelteElement,
	flush,
	init,
	insert,
	noop,
	safe_not_equal
} from "./svelte/internal.js";
import { createEventDispatcher, onMount } from "./svelte/svelte.js";
import "./js/slackify-markdown-bundle.js"

import "./js/slackify-markdown-bundle.js"

function create_fragment(ctx) {
	return {
		c() {
			this.c = noop;
		},

		m: noop,
		p: noop,
		i: noop,
		o: noop,
		d: noop
	};
}

function instance($$self, $$props, $$invalidate) {
	

	const dispatch = createEventDispatcher();

    let { markdown } = $$props;    

    function slackify(markdownIn) {
        var slackified = "";
        var markdownToProcess = markdownIn || markdown;
        if (markdownToProcess) {
            slackified = slackifyMarkdown(markdownToProcess);
            event("slackified", slackified);
        }
        return slackified;
    }

	onMount(() => {
        setTimeout(function() {
            slackify();
        });
	});

	function event(eventName, payload) {
        dispatch(eventName, payload);
	}

	$$self.$set = $$props => {
		if ('markdown' in $$props) $$invalidate('markdown', markdown = $$props.markdown);
	};

	$$self.$$.update = ($$dirty = { markdown: 1 }) => {
		if ($$dirty.markdown) { if (markdown) {
                slackify();
        	} }
	};

	return { markdown, slackify };
}

class markdownSlackified extends SvelteElement {
	constructor(options) {
		super();

		init(this, { target: this.shadowRoot }, instance, create_fragment, safe_not_equal, ["markdown", "slackify"]);

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
		return ["markdown","slackify"];
	}

	get markdown() {
		return this.$$.ctx.markdown;
	}

	set markdown(markdown) {
		this.$set({ markdown });
		flush();
	}

	get slackify() {
		return this.$$.ctx.slackify;
	}
}

export {markdownSlackified};
window.customElements.define('markdown-slackified', markdownSlackified);