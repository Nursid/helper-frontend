import * as ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';

const exportToExcel = (columns, rows, OrderDate) => {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('DataGrid Export');

  // Title and Subtitle
  worksheet.mergeCells('A1:' + String.fromCharCode(64 + columns.length) + '1');
  const titleCell = worksheet.getCell('A1');
  titleCell.value = 'SsQuick Helper';
  titleCell.font = { bold: true, size: 16 };
  titleCell.alignment = { vertical: 'middle', horizontal: 'center' };

  worksheet.mergeCells('A2:' + String.fromCharCode(64 + columns.length) + '2');
  const subtitleCell = worksheet.getCell('A2');
  subtitleCell.value = 'Daily Order Report';
  subtitleCell.font = { italic: true, size: 12 };
  subtitleCell.alignment = { vertical: 'middle', horizontal: 'center' };

  const currentDateTime = new Date();
  const currentDay = currentDateTime.toLocaleDateString('en-US', { weekday: 'long' }); // Get the current day name
  const currentTime = currentDateTime.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }); // Get the current time

  worksheet.mergeCells('A3:' + String.fromCharCode(64 + columns.length) + '3');
  const subtitleCell2 = worksheet.getCell('A3');
  subtitleCell2.value = `Date: ${OrderDate}    Day: ${currentDay}    Time: ${currentTime}`;
  subtitleCell2.font = { italic: true, size: 12 };
  subtitleCell2.alignment = { vertical: 'middle', horizontal: 'center' };

  // Headers
  const startRow = 4;
  worksheet.getRow(startRow).values = columns.map((col) => col.headerName);

  const headerRow = worksheet.getRow(startRow);
  headerRow.eachCell((cell) => {
    cell.font = { bold: true };
    cell.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FFFFE0B2' }, // Light orange
    };
  });

  // Column widths
  worksheet.columns = columns.map((col) => ({
    key: col.field,
    width: col.width / 10 || 15,
  }));

  // // Add rows with centered alignment
  // rows.forEach((row) => {
  //   const rowData = {};
  //   columns.forEach((col) => {
  //     rowData[col.field] = row[col.field];
  //   });
  //   const newRow = worksheet.addRow(rowData);

  //   // Center align all cells in the row
  //   newRow.eachCell((cell) => {
  //     cell.alignment = { vertical: 'middle', horizontal: 'center' };
  //   });
  // });

  // Conditional styling for "Order Status" column
  const statusColors = {
    Pending: 'FFE67E22',
    Hold: 'FFE74C3C',
    Due: 'FFA29BFE',
    Completed: 'FF27AE60',
    Running: 'FFF1C40F',
    Cancel: 'FF95A5A6',
  };


  rows.forEach((row) => {
    const rowData = {};
    columns.forEach((col) => {
      rowData[col.field] = row[col.field];
    });

    const newRow = worksheet.addRow(rowData);

    // Center-align row values
    newRow.eachCell((cell) => {
      cell.alignment = { vertical: 'middle', horizontal: 'center' };
    });

    // Get the total number of columns
    const totalColumns = worksheet.columnCount;

    // Loop through all columns, including null values
    for (let colNumber = 1; colNumber <= totalColumns; colNumber++) {
        const cell = newRow.getCell(colNumber);

    // Conditional styling
    if (row.pending) {
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: statusColors[row.pending] },
    };
    }
    }
  });

  // Add summary row
  const summary = {
    Pending: 0,
    Hold: 0,
    Due: 0,
    Completed: 0,
    Running: 0,
    Cancel: 0,
  };

  rows.forEach((row) => {
    if (row.pending && summary[row.pending] !== undefined) {
      summary[row.pending]++;
    }
  });

  const summaryRow = worksheet.addRow([
    'Summary',
    `Total Pending: ${summary.Pending}`,
    `Total Hold: ${summary.Hold}`,
    `Total Due: ${summary.Due}`,
    `Total Completed: ${summary.Completed}`,
    `Total Running: ${summary.Running}`,
    `Total Cancel: ${summary.Cancel}`,
  ]);

  summaryRow.eachCell((cell) => {
    cell.font = { bold: true };
    cell.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FFD5F5E3' }, // Light green
    };
  });

  const date = new Date();
  const formattedDate = date.toISOString().replace(/:/g, '-').replace('T', '_').split('.')[0];

  workbook.xlsx.writeBuffer().then((buffer) => {
    saveAs(new Blob([buffer]), `Order_Report-${formattedDate}.xlsx`);
  });
};

export default exportToExcel;
