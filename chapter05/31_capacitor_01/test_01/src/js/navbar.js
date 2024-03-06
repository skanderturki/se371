window.customElements.define(
  "custom-navbar", 
  class extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: "open"});
      this.shadowRoot.innerHTML = `
        <style>
          :host {
            display: block;
            background-color: #333;
            color: white;
            padding: 15px;
          }
        </style>
        <slot></slot>
      `;
    }
  }
)