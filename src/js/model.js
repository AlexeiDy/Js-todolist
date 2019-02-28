/* global localStorage */
export default class Model {
  init() {
    if (localStorage.getItem('list')) {
      return false;
    } else {
      localStorage.setItem('list', JSON.stringify([]));
    }
  }
  async load() {
    let result = await this.getTasks();
    return result;
  }
  async add(obj) {
    let result = await this.addNewItem(obj);
    return result;
  }
  async deleteAllTasks() {
    let result = await this.removeList();
    return result;
  }

  async changeListOfTasks(array) {
    let result = await this.changingList(array);
    return result;
  }

  getTasks() {
    return new Promise((resolve, reject) => {
      let storage = localStorage.getItem('list');
      if (Array.isArray(JSON.parse(storage))) {
        resolve(JSON.parse(storage));
      } else {
        localStorage.setItem('list', JSON.stringify([]));
        resolve(JSON.parse(localStorage.getItem('list')));
      }
    });
  }

  addNewItem(obj) {
    this.getTasks().then(data => {
      return new Promise(resolve => {
        let result = [obj, ...data];
        localStorage.setItem('list', JSON.stringify(result));
        resolve();
      });
    });
  }
  changingList(arr) {
    return new Promise(resolve => {
      localStorage.setItem('list', JSON.stringify(arr));
      resolve(JSON.parse(localStorage.getItem('list')));
    });
  }

  removeList() {
    return new Promise(resolve => {
      localStorage.removeItem('list');
      resolve();
    });
  }
}
