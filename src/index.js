import initialState from './initialState';
import Store from './Store';
import Stats from './Stats';
import Tasks from './Tasks';

const store = new Store(initialState);
const stats = new Stats(store);
const tasks = new Tasks(store);

stats.run();
tasks.run();
