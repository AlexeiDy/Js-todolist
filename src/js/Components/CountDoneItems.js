import Component from '../helpers/Component';

export default class CountDoneItems extends Component {
  constructor(count) {
    super();
    this.count = count;
  }
  render() {
    return `
    <div class="counts__item">
      <span class="counts__item-text">задач выполненно: </span>
      <span class="counts__item-count"><i class="js-item-count-done">${
        this.count
      }</i></span>
    </div>
    `.trim();
  }
  onRender() {
    const { domElement } = this;
    const count = domElement.querySelector('.js-item-count-done');
    this.animateCount(count);
  }

  animateCount(el) {
    const tl = new TimelineMax();
    tl.fromTo(el, 0.4, { opacity: 0, zoom: 3 }, { opacity: 1, zoom: 1 });
  }
}
