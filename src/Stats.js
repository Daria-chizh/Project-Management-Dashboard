export default class Stats {
  constructor(store) {
    this.tableElement = document.getElementById('statsTable');
    this.store = store;
  }

  run() {
    this.store.subscribe((state) => this.render(state));
  }

  /*
   * Render single table cell (<td>)
   */
  static renderTableCell(row, content, className) {
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
    Stats.renderTableCell(headerRow, 'Project');
    Stats.renderTableCell(headerRow, 'Open');
    this.tableElement.appendChild(headerRow);
  }

  /*
   * Render data row
   */
  renderRow(name, count) {
    const dataRow = document.createElement('tr');
    dataRow.classList.add('tableRow');
    Stats.renderTableCell(dataRow, name);
    Stats.renderTableCell(dataRow, count, 'openTasksCount');
    this.tableElement.appendChild(dataRow);
  }

  render(projects) {
    this.tableElement.replaceChildren();
    this.renderHeaderRow();

    for (const { name, tasks } of projects) {
      let counter = 0;
      for (const element of tasks) {
        if (element.done === false) {
          counter += 1;
        }
      }
      this.renderRow(name, counter);
    }
  }
}
