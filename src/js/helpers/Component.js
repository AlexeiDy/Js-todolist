/* globals CustomEvent */
export default class Component {
  constructor() {
    this.domElement = null;
  }

  renderTo(element) {
    element.innerHTML = this.render();
    this.domElement = element.children[0];
    this.onRender();
  }
  onRender() {}
  render() {}
  triggerEvent(eventName, data) {
    this.domElement.dispatchEvent(
      new CustomEvent(eventName, {
        bubbles: true,
        detail: data
      })
    );
    return false;
  }
}
