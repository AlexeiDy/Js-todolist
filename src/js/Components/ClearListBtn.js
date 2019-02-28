import Component from '../helpers/Component';
import { CLEAR_LIST } from '../events';

export default class ClearListBtn extends Component {
  constructor(length) {
    super();
    this.isDisableDelBtn = length > 0 ? '' : 'disabled';
  }
  render() {
    return `
    <button class="list__btn js-delete-all-btn" ${
      this.isDisableDelBtn
    }>очистить весь список</button>
    `;
  }
  onRender() {
    const { domElement } = this;
    domElement.addEventListener('click', e => {
      e.preventDefault();
      this.triggerEvent(CLEAR_LIST);
    });
  }
}
