import Component from '../helpers/Component';
import ListItem from './ListItem';
import { TOGGLE_DONE_STATE, DELETE_ITEM } from '../events';
import { TimelineMax } from 'gsap';

export default class TodoList extends Component {
  constructor(data, doneTasks) {
    super();
    this.data = data;
    this.isDisableDelBtn = data.length > 0 ? '' : 'disabled';
  }
  render() {
    return `
      <ul class="list js-list">
        ${this.data
          .map((item, index) => new ListItem(item, index).render())
          .join('')} 
       </ul>
      `.trim();
  }
  onRender() {
    const { domElement } = this;
    const listItems = domElement.querySelectorAll('.js-item-task');
    if (listItems) {
      this.fadeInElements(listItems);
    }
    domElement.addEventListener('click', e => {
      let clickedEl = e.target;
      if (clickedEl.classList.contains('js-item-task')) {
        this.triggerEvent(TOGGLE_DONE_STATE, clickedEl.dataset.id);
        e.target.classList.toggle('list__item--done');
      } else if (clickedEl.parentElement.classList.contains('js-item-task')) {
        this.triggerEvent(
          TOGGLE_DONE_STATE,
          clickedEl.parentElement.dataset.id
        );
        clickedEl.parentElement.classList.toggle('list__item--done');
      }
      if (clickedEl.classList.contains('js-delete-task')) {
        this.triggerEvent(DELETE_ITEM, clickedEl.parentElement.dataset.id);
        this.fadeOutDeletedEl(clickedEl.parentElement);
      } else if (clickedEl.parentElement.classList.contains('js-delete-task')) {
        this.fadeOutDeletedEl(clickedEl.parentElement.parentElement).then(
          () => {
            this.triggerEvent(
              DELETE_ITEM,
              clickedEl.parentElement.parentElement.dataset.id
            );
          }
        );
      }
    });
  }
  fadeInElements(el) {
    return new Promise((resolve, reject) => {
      const tl = new TimelineMax();
      tl.staggerFromTo(
        el,
        0.5,
        {
          opacity: 0
        },
        {
          opacity: 1,
          onComplete: () => {
            resolve();
          }
        }
      );
    });
  }

  fadeOutDeletedEl(el) {
    return new Promise((resolve, reject) => {
      const tl = new TimelineMax();
      tl.to(el, 0.5, {
        opacity: 0,
        left: 30,
        onComplete: () => {
          resolve();
        }
      });
    });
  }
}
