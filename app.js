export class MyApp extends HTMLElement {
  constructor() {
    super();
    this.heading = "";
    this.subheading = "";
  }

  connectedCallback() {
    this.heading = this.getAttribute("heading");
    this.subheading = this.getAttribute("subheading");

    this.render();
  }

  render() {
    this.innerHTML = `
      <div style="text-align: center; font-family: sans-serif">
        <h1>${this.heading}</h1>
        <p>${this.subheading}</p>
      </div>
      <my-table></my-table>
    `;
  }
}