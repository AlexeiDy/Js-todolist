import Component from './helpers/Component.js';
import Header from './Components/Header';
import TodoList from './Components/TodoList';
import InputForm from './Components/InputForm';
import Footer from './Components/Footer';
import ClearDoneListBtn from './Components/ClearDoneListBtn.js';
import ClearListBtn from './Components/ClearListBtn.js';
import CountDoneItems from './Components/CountDoneItems.js';
import CountAllItems from './Components/CountAllItems.js';
import Model from './model';
import {
  ADD_NEW_ITEM,
  DELETE_ITEM,
  CLEAR_LIST,
  DELETE_DONE_ITEMS,
  TOGGLE_DONE_STATE
} from './events';
/* global location */
class App extends Component {
  constructor() {
    super();
    this.model = new Model();
    this.data = null;
    this.doneTasks = null;
  }
  render() {
    return `
    <div id="app" class="app">
      <div class="app__top">
        <div data-child="header">
        </div>
        <section class="main">
          <div class="main__form" data-child="input-form"></div>
          <div class="counts"">
            <div data-child="count-all" class="counts__count"></div>
            <div data-child="count-done" class="counts__count"></div>
          </div>
          <div class="list__buttons">
            <div data-child="clear-list-btn"></div>
            <div data-child="clear-done-list-btn"></div>
          </div>
          <div data-child="list">
          </div>
        </section>
      </div>
      <div data-child="footer" class="app__footer"></div>
    </div>
   `.trim();
  }
  get headerElement() {
    return (this.domElement = document.querySelector('[data-child="header"]'));
  }
  get inputFormElement() {
    return (this.domElement = document.querySelector(
      '[data-child="input-form"]'
    ));
  }
  get countAllElement() {
    return (this.domElement = document.querySelector(
      '[data-child="count-all"]'
    ));
  }
  get countDoneElement() {
    return (this.domElement = document.querySelector(
      '[data-child="count-done"]'
    ));
  }
  get clearListBtnElement() {
    return (this.domElement = document.querySelector(
      '[data-child="clear-list-btn"]'
    ));
  }
  get clearDoneListBtnElement() {
    return (this.domElement = document.querySelector(
      '[data-child="clear-done-list-btn"]'
    ));
  }
  get listElement() {
    return (this.domElement = document.querySelector('[data-child="list"]'));
  }
  get footerElement() {
    return (this.domElement = document.querySelector('[data-child="footer"]'));
  }

  renderHeader() {
    const header = new Header();
    header.renderTo(this.headerElement);
  }
  renderForm() {
    const inputForm = new InputForm();
    inputForm.renderTo(this.inputFormElement);
  }
  renderCountAllItems() {
    const count = new CountAllItems(this.data.length);
    count.renderTo(this.countAllElement);
  }
  renderCountDoneItems() {
    const count = new CountDoneItems(this.doneTasks.length);
    count.renderTo(this.countDoneElement);
  }
  renderClearDoneListBtn() {
    const clearListBtn = new ClearDoneListBtn(this.doneTasks.length);
    clearListBtn.renderTo(this.clearDoneListBtnElement);
  }
  renderClearListBtn() {
    const clearListBtn = new ClearListBtn(this.data.length);
    clearListBtn.renderTo(this.clearListBtnElement);
  }
  renderList() {
    this.listElement.innerHTML = '';
    this.initData().then(() => {
      const todoList = new TodoList(this.data, this.doneTasks);
      todoList.renderTo(this.listElement);
    });
  }
  renderFooter() {
    const footer = new Footer();
    footer.renderTo(this.footerElement);
  }
  initDoneTasksArray(arr) {
    if (Array.isArray(arr)) {
      return arr.filter(item => {
        if (item.done) {
          return item;
        }
      });
    }
  }
  initData() {
    return new Promise(resolve => {
      this.model.load().then(data => {
        this.data = data;
        this.doneTasks = this.initDoneTasksArray(this.data);
        resolve(data);
      });
    });
  }

  handleAddNewItem = e => {
    this.model.add(e.detail).then(() => {
      this.initData().then(() => {
        this.renderList();
        this.renderClearListBtn();
        this.renderCountAllItems();
      });
    });
  };

  handleToggleDoneState = e => {
    let doneElement = parseInt(e.detail);
    let filtered = this.data.filter(item => {
      if (parseInt(item.id) === doneElement) {
        item.done = !item.done;
      }
      return item;
    });

    this.model.changeListOfTasks(filtered).then(() => {
      this.initData().then(() => {
        this.renderCountDoneItems();
        this.renderClearDoneListBtn();
      });
    });
  };

  handleDeletItem = e => {
    let oldDoneListLength = this.doneTasks.length;
    let currentItem = parseInt(e.detail);
    let filtered = this.data.filter(item => {
      if (parseInt(item.id) !== currentItem) {
        return item;
      }
    });
    this.model.changeListOfTasks(filtered).then(() => {
      this.initData().then(() => {
        if (oldDoneListLength !== this.doneTasks.length) {
          this.renderCountDoneItems();
        }
        this.renderCountAllItems();
        this.renderClearListBtn();
        this.renderClearDoneListBtn();
        this.renderList();
      });
    });
  };

  handleClearList = () => {
    let filtered = [];
    this.model.changeListOfTasks(filtered).then(() => {
      this.initData().then(() => {
        this.renderCountAllItems();
        this.renderCountDoneItems();
        this.renderClearListBtn();
        this.renderClearDoneListBtn();
        this.renderList();
      });
    });
  };
  handleDeleteDoneItems = e => {
    let filtered = this.data.filter(item => {
      if (item.done !== true) {
        return item;
      }
    });
    this.model.changeListOfTasks(filtered).then(() => {
      this.initData().then(() => {
        this.renderCountDoneItems();
        this.renderCountAllItems();
        this.renderClearListBtn();
        this.renderClearDoneListBtn();
        this.renderList();
      });
    });
  };

  onRender() {
    this.model.init();
    const { domElement } = this;
    this.initData()
      .then(() => {
        this.renderHeader();
        this.renderForm();
        this.renderCountDoneItems();
        this.renderCountAllItems();
        this.renderClearDoneListBtn();
        this.renderClearListBtn();
        this.renderList();
        this.renderFooter();
        domElement.addEventListener(ADD_NEW_ITEM, this.handleAddNewItem);
        domElement.addEventListener(
          TOGGLE_DONE_STATE,
          this.handleToggleDoneState
        );
        domElement.addEventListener(DELETE_ITEM, this.handleDeletItem);
        domElement.addEventListener(CLEAR_LIST, this.handleClearList);
        domElement.addEventListener(
          DELETE_DONE_ITEMS,
          this.handleDeleteDoneItems
        );
      })
      .catch(err => {
        console.log(err);
        let div = document.createElement('div');
        let link = document.createElement('a');
        let root = document.querySelector('#root');
        root.innerHTML = '';
        link.innerHTML = 'Произошла ошибка, перезагрузите страничку';
        link.addEventListener('click', e => {
          e.preventDefault();
          location.reload();
        });
        div.classList.add('error');
        div.appendChild(link);
        root.appendChild(div);
      });
  }
}

let app = new App();
export default app;
