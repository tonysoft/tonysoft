class MyComponent extends HTMLElement {
    constructor() {
        super();

        var shadowRoot = this.attachShadow({ mode: "open" });
    }

    connectedCallback() {
        this.shadowRoot.innerHTML = `
            <div>
                <h1>I see my children below...</h1>
                <slot></slot>
            </div>`;
    }
}

customElements.define("with-children", MyComponent);
