import initialState from './initialState';
import Store from './Store';
import Stats from './Stats';
import Tasks from './Tasks';

const store = new Store(initialState);
const stats = new Stats(store);
const tasks = new Tasks(store);

stats.run();
tasks.run();



    // const dataRow = document.createElement('tr');
    // dataRow.classList.add('projectTr');
    // renderCell(dataRow, name);
    // renderCell(dataRow, '1');
    // tableStatus.appendChild(dataRow);



// const tasks = document.createElement('td');
// tasks.classList.add('tasks');
//
// dataRow.appendChild(tasks)

// const cellElement = document.createElement('td');
//
// cellElement.classList.add('renderCell');
// cellElement.textContent = 'Project:';
// tableTasks.appendChild(cellElement);

// const newElement = document.createElement('tr');
// statusApplication.appendChild(newElement);
//
// const newElementProject = document.createElement('td');
// newElementProject.classList.add('newElementProject');
// newElementProject.textContent = 'Project';
// newElement.appendChild(newElementProject);
//
// const newElementOpen = document.createElement('td');
// newElementOpen.classList.add('newElementOpen');
// newElementOpen.textContent = 'Open';
// newElement.appendChild(newElementOpen);
//
// for (const { projects } of projectsData) {
//   for (const { name } of projects) {
//     const projectTr = document.createElement('tr');
//     projectTr.classList.add('projectTr');
//     projectTr.textContent = name;
//     table.appendChild(projectTr);
//   }
// }


// const newCellElement = document.createElement('td');
// newCellElement.classList.add('newCellElement');
//
// newCellElement.textContent = '1';
// dataRow.appendChild(newCellElement);
