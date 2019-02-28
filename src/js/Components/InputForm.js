import Component from '../helpers/Component';
import { ADD_NEW_ITEM } from '../events';

export default class InputForm extends Component {
  render() {
    return `
    <form class="form">
      <div class="form__input-wrap">
        <input type="text" class="form__input" id="textInput"  placeholder="type your task">
        <button type="submit" class="form__btn">добавить задачу</button>
      </div>
    </form>
    `.trim();
  }
  handleSubmit = e => {
    e.preventDefault();
    let textField = document.querySelector('#textInput');
    let newObj = {};
    if (textField.value.trim()) {
      newObj.text = textField.value;
      newObj.id = Date.now().toString();
      newObj.done = false;
      textField.value = '';
      this.triggerEvent(ADD_NEW_ITEM, newObj);
    }
  };
  onRender() {
    this.domElement.onsubmit = this.handleSubmit;
  }
}
