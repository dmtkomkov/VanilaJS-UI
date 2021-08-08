export class MyTable extends HTMLElement {
  constructor() {
    super();
    this.data = null;
  }

  connectedCallback() {
    this.render();
    fetch('/api/data')
      .then(response => response.json())
      .then((data) => {
        this.data = data
        this.render();
      });

  }

  render() {
    if (!this.data) {
      this.innerHTML = `
        <h1>Empty table</h1>
      `;
    } else {
      this.innerHTML = `
        <div>${this.data.content[0].id}</div>
        <div>${this.data.content[0].name}</div>
        <div>${this.data.content[0].age}</div>
      `;
    }

  }
}