import Component from '../helpers/Component';

export default class ListItem extends Component {
  constructor(item, index) {
    super();
    this.item = item;
    this.index = index + 1;
  }

  render() {
    if (this.item.done) {
      return `<li class="list__item list__item--done js-item-task"  data-id=${
        this.item.id
      } data-done=${this.item.done}><span class="list__item-num">${
        this.index
      }.</span><span class="list__item-text">${this.item.text}</span>
      <button class="js-delete-task list__item-btn"><i class="fas fa-trash-alt"></i></button></li>`.trim();
    } else {
      return `<li class="list__item js-item-task"  data-id=${
        this.item.id
      } data-done=${this.item.done}><span class="list__item-num">${
        this.index
      }.</span><span class="list__item-text">${this.item.text}</span>
      <button class="js-delete-task list__item-btn"><i class="fas fa-trash-alt"></i></button></li>`.trim();
    }
  }
}
