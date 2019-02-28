import Component from '../helpers/Component';
import { DELETE_DONE_ITEMS } from '../events';
export default class ClearDoneListBtn extends Component {
  constructor(data) {
    super();
    this.isDisableDelAllDoneBtn = data > 0 ? '' : 'disabled';
  }
  render() {
    return `
    <button class="list__btn js-delete-all-done-btn" ${
      this.isDisableDelAllDoneBtn
    }>удалить выполненные задачи</button>
    `.trim();
  }
  onRender() {
    const { domElement } = this;

    domElement.addEventListener('click', e => {
      e.preventDefault();
      this.triggerEvent(DELETE_DONE_ITEMS);
    });
  }
}
