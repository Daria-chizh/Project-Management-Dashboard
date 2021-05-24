import applyReducer from './reducers';

export default class Store {
  constructor(initialState) {
    this.state = initialState || [];
    this.subscribers = [];
  }

  subscribe(fn) {
    this.subscribers.push(fn);

    // call first time with current state
    fn(this.state);
  }

  dispatch(action, payload) {
    this.state = applyReducer(this.state, action, payload);

    for (const fn of this.subscribers) {
      fn();
    }
  }

  getState() {
    return this.state;
  }
}
