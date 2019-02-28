import Component from '../helpers/Component';
import { TimelineMax } from 'gsap';
export default class CountAllItems extends Component {
  constructor(count) {
    super();
    this.count = count;
  }
  render() {
    return `
    <div class="counts__item">
      <span class="counts__item-text">всего задач: </span>
      <span class="counts__item-count"><i class="js-item-count-all">${
        this.count
      }</i></span>
    </div>
    `.trim();
  }
  onRender() {
    const { domElement } = this;
    const count = domElement.querySelector('.js-item-count-all');
    this.animateCount(count);
  }

  animateCount(el) {
    const tl = new TimelineMax();
    tl.fromTo(el, 0.4, { opacity: 0, zoom: 3 }, { opacity: 1, zoom: 1 });
  }
}
