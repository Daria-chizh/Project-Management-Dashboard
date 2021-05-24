import Actions from './actions';

/*
 * Return task for specified id
 */
const findTaskById = (state, id) => {
  for (const project of state) {
    const task = project.tasks.find((item) => item.id === id);
    if (task) {
      return task;
    }
  }

  return null;
};

/*
 * Process "updateDoneState" action
 */
const updateDoneState = (state, payload) => {
  const { id, done } = payload;
  const task = findTaskById(id);
  if (task) {
    task.done = done;
  }

  return state;
};

const applyReducer = (state, action, payload) => {
  switch (action) {
    case Actions.updateDoneState:
      return updateDoneState(state, payload);
    default:
      return state;
  }
};

export default applyReducer;
