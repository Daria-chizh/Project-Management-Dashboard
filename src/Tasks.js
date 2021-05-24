import Actions from './actions';

export default class Tasks {
  constructor(store) {
    this.tableElement = document.getElementById('tasksTable');
    this.store = store;
    this.projectId = null;
  }

  run() {
    this.store.subscribe(() => this.render());
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
      this.render();
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
      if (id === this.projectId) {
        continue;
      }

      this.renderProjectDropdownItem(name, id, dropdownList);
    }

    dropdown.appendChild(dropdownList);
  }

  /*
   * Render dropdown to select project
   */
  renderProjectDropdown(projects, selectedProject, containerElement) {
    const dropdownTitle = document.createTextNode('Project:');

    const dropdownValue = document.createElement('div');
    dropdownValue.textContent = selectedProject.name;
    dropdownValue.classList.add('dropdownValue');
    dropdownValue.addEventListener('click', () => this.renderProjectDropdownList(projects, dropdownElement));

    const dropdownElement = document.createElement('div');
    dropdownElement.classList.add('dropdown');
    dropdownElement.appendChild(dropdownTitle);
    dropdownElement.appendChild(dropdownValue);

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
   * Render data row
   */
  renderRow(name, done, id) {
    console.log('renderRow()', name, done);

    const newContainerTr = document.createElement('tr');
    newContainerTr.classList.add('tableRow');
    this.tableElement.appendChild(newContainerTr);

    const newContainerTd = document.createElement('td');
    newContainerTd.classList.add('tableCell');
    newContainerTr.appendChild(newContainerTd);

    const checkBoxElement = document.createElement('input');
    checkBoxElement.setAttribute('type', 'checkbox');
    checkBoxElement.classList.add('checkBoxElement');
    newContainerTd.appendChild(checkBoxElement);



    const divContainer = document.createElement('span');
    divContainer.textContent = name;
    divContainer.classList.add('elementsTableTd');
    newContainerTd.appendChild(divContainer);

    checkBoxElement.addEventListener('click', (event) => {
      event.stopPropagation();
      console.log(id);
      this.store.dispatch(Actions.updateDoneState, { id, done });
    });
    if (done === true) {
      checkBoxElement.setAttribute('checked', 'checked');
    }



    // когда кликают на checkbox:
    // this.store.dispatch(Actions.updateDoneState, { id, done });
  }

  render() {
    const projects = this.store.getState();

    this.tableElement.replaceChildren();

    // select first project, if it's initial run
    if (this.projectId === null) {
      this.projectId = projects[0].id;
    }

    const project = projects.find((item) => item.id === this.projectId);
    this.renderHeaderRow(projects, project);
    for (const { name, done } of project.tasks) {
      this.renderRow(name, done);
    }
  }
};
