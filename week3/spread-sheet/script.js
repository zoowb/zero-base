const rows = 9;
const cols = 9;
const container = document.getElementById("spreadsheet-container");
const cellStatus = document.getElementById("cell-status");

function getColumnName(index) {
  return String.fromCharCode("A".charCodeAt(0) + index - 1);
}

function createSpreadsheet() {
  const table = document.createElement("table");
  table.className = "table";

  for (let i = 0; i <= rows; i++) {
    const tr = document.createElement("tr");

    for (let j = 0; j <= cols; j++) {
      const td = document.createElement("td");

      if (i === 0 && j === 0) {
        td.className = "header";
      } else if (i === 0) {
        td.textContent = getColumnName(j);
        td.className = "header";
      } else if (j === 0) {
        td.textContent = i;
        td.className = "row-header";
      } else {
        td.className = "cell";
        td.contentEditable = true;
        td.dataset.row = i;
        td.dataset.col = getColumnName(j);

        td.addEventListener("focus", function () {
          updateSelection(this);
        });
      }

      tr.appendChild(td);
    }

    table.appendChild(tr);
  }

  container.appendChild(table);
}

function updateSelection(cell) {
  document.querySelectorAll(".selected").forEach((c) => c.classList.remove("selected"));
  cell.classList.add("selected");
  const row = cell.dataset.row;
  const col = cell.dataset.col;
  cellStatus.textContent = `${col}${row}`;
}

// 엑셀 다운로드 기능 추가
document.getElementById("export-btn").addEventListener("click", function () {
  const data = [];

  for (let i = 1; i <= rows; i++) {
    const row = [];
    for (let j = 1; j <= cols; j++) {
      const colName = getColumnName(j);
      const cell = document.querySelector(`.cell[data-row='${i}'][data-col='${colName}']`);
      row.push(cell.textContent.trim());
    }
    data.push(row);
  }

  const worksheet = XLSX.utils.aoa_to_sheet(data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

  XLSX.writeFile(workbook, "spreadsheet.xlsx");
});

// 초기 실행
createSpreadsheet();
