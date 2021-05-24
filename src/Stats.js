export default class Stats {
  constructor(store) {
    this.tableElement = document.getElementById('statsTable');
    this.store = store;
  }

  run() {
    this.store.subscribe(() => this.render());
  }

  /*
   * Render single table cell (<td>)
   */
  renderTableCell(row, content, className) {

    const innerElement = document.createElement('span');
    if (className) {
      innerElement.classList.add(className);
    }
    innerElement.textContent = content;

    const cellElement = document.createElement('td');
    cellElement.classList.add('tableCell');
    cellElement.appendChild(innerElement);

    row.appendChild(cellElement);
  }

  /*
   * Render table header
   */
  renderHeaderRow() {
    const headerRow = document.createElement('tr');
    headerRow.classList.add('tableRow');
    this.renderTableCell(headerRow, 'Project');
    this.renderTableCell(headerRow, 'Open');
    this.tableElement.appendChild(headerRow);
  }

  /*
   * Render data row
   */
  renderRow(name, count) {
    const dataRow = document.createElement('tr');
    dataRow.classList.add('tableRow');
    this.renderTableCell(dataRow, name);
    this.renderTableCell(dataRow, count, 'openTasksCount');
    this.tableElement.appendChild(dataRow);
  }
  render() {
    this.tableElement.replaceChildren();
    this.renderHeaderRow();
    let counter = 0;

    for (const { name, tasks } of this.store.getState()) {
      for(const element of tasks) {
        if (element.done === false) {
          counter++;
        }
      }
          this.renderRow(name, counter);
        }
    }
};
