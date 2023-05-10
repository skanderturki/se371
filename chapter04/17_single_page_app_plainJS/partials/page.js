class Page {
  constructor() {
    this.#html = {header: "<div></div>", main: "<div></div>", footer: "<div></div>"};
    this.getPageAsDOMElement = () => {

    };
    this.getPageAsHTML = () => {
      return this.#html.header + "<br>" + this.#html.main + "<br>" +
          this.#html.footer;
    };
  }

}