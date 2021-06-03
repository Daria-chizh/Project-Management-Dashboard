import Actions from './actions';

export default class Tasks {
  constructor(store) {
    this.tableElement = document.getElementById('tasksTable');
    this.store = store;
    this.projectId = null;
  }

  run() {
    this.store.subscribe((state) => this.render(state));
  }

  /*
   * Render single item of dropdown
   */
  renderProjectDropdownItem(name, id, dropdownList) {
    const itemElement = document.createElement('a');
    itemElement.setAttribute('href', '');
    itemElement.classList.add('dropdownItem');
    itemElement.textContent = name;
    itemElement.addEventListener('click', (event) => {
      this.projectId = id;
      this.render(this.store.getState());
      event.preventDefault();
    });

    const itemContainerElement = document.createElement('li');
    itemContainerElement.appendChild(itemElement);

    dropdownList.appendChild(itemContainerElement);
  }

  /*
   * Expand dropdown to select project
   */
  renderProjectDropdownList(projects, dropdown) {
    const dropdownList = document.createElement('ul');
    dropdownList.classList.add('dropdownList');

    for (const { name, id } of projects) {
      if (id !== this.projectId) {
        this.renderProjectDropdownItem(name, id, dropdownList);
      }
    }

    dropdown.appendChild(dropdownList);
  }

  /*
   * Render dropdown currently selected item
   */
  renderProjectDropdownCurrentValue(projects, selectedProject, dropdownElement) {
    const dropdownValue = document.createElement('div');
    dropdownValue.textContent = selectedProject.name;
    dropdownValue.classList.add('dropdownValue');
    dropdownValue.addEventListener('click', () => {
      const existingList = dropdownElement.querySelector('.dropdownList');
      if (existingList) {
        existingList.parentNode.removeChild(existingList);
      } else {
        this.renderProjectDropdownList(projects, dropdownElement);
      }
    });
  }

  /*
   * Render dropdown to select project
   */
  renderProjectDropdown(projects, selectedProject, containerElement) {
    const dropdownTitle = document.createTextNode('Project:');

    const dropdownElement = document.createElement('div');
    dropdownElement.classList.add('dropdown');
    dropdownElement.appendChild(dropdownTitle);
    this.renderProjectDropdownCurrentValue(projects, selectedProject, dropdownElement);

    containerElement.appendChild(dropdownElement);
  }

  /*
   * Render table header
   */
  renderHeaderRow(projects, selectedProject) {
    const cellElement = document.createElement('td');
    this.renderProjectDropdown(projects, selectedProject, cellElement);

    const headerRow = document.createElement('tr');
    headerRow.classList.add('tableRow');
    headerRow.appendChild(cellElement);

    this.tableElement.appendChild(headerRow);
  }

  /*
   * Render task name
   */
  static renderTaskName(task, containerElement) {
    const taskNameElement = document.createElement('span');
    taskNameElement.textContent = task.name;
    containerElement.appendChild(taskNameElement);
  }

  /*
   * Render checkbox to mark task as done
   */
  renderDoneCheckbox(task, containerElement) {
    const { id, done } = task;

    const doneCheckbox = document.createElement('input');
    doneCheckbox.setAttribute('type', 'checkbox');
    doneCheckbox.classList.add('doneCheckbox');

    doneCheckbox.addEventListener('change', (event) => {
      this.store.dispatch(Actions.updateDoneState, { id, done: doneCheckbox.checked });
      event.stopPropagation();
    });

    if (done === true) {
      doneCheckbox.setAttribute('checked', 'checked');
    }

    containerElement.appendChild(doneCheckbox);
  }

  /*
   * Render data row
   */
  renderRow(task) {
    const cellElement = document.createElement('td');
    cellElement.classList.add('tableCell');
    this.renderDoneCheckbox(task, cellElement);
    Tasks.renderTaskName(task, cellElement);

    const dataRow = document.createElement('tr');
    dataRow.classList.add('tableRow');
    dataRow.appendChild(cellElement);

    this.tableElement.appendChild(dataRow);
  }

  render(projects) {
    this.tableElement.replaceChildren();

    // select first project, if it's initial run
    if (this.projectId === null) {
      this.projectId = projects[0].id;
    }

    const project = projects.find((item) => item.id === this.projectId);
    this.renderHeaderRow(projects, project);
    for (const task of project.tasks) {
      this.renderRow(task);
    }
  }
}
