/* global localStorage */
export default class Model {
  init() {
    return new Promise(resolve => {
      if (!localStorage.getItem('list')) {
        localStorage.setItem('list', JSON.stringify([]));
      }
      resolve();
    });
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
    return this.getTasks().then(data => {
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
}
