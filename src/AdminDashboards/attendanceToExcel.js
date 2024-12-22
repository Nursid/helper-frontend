import * as ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';

export const attendanceToExcel = (columns, rows) => {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('DataGrid Export');

  worksheet.mergeCells('A1:' + String.fromCharCode(64 + columns.length) + '1');
  const titleCell = worksheet.getCell('A1');
  titleCell.value = 'SsQuick Helper'; // Default title
  titleCell.font = { bold: true, size: 16 };
  titleCell.alignment = { vertical: 'middle', horizontal: 'center' };

  // Add Subtitle
  worksheet.mergeCells('A2:' + String.fromCharCode(64 + columns.length) + '2');
  const subtitleCell = worksheet.getCell('A2');
  subtitleCell.value = 'Daily Attendance Report'; // Default subtitle
  subtitleCell.font = { italic: true, size: 12 };
  subtitleCell.alignment = { vertical: 'middle', horizontal: 'center' };

  // Define the starting row for headers
  const startRow = 4;

  // Add headers starting at A4
  worksheet.getRow(startRow).values = columns.map((col) => col.headerName);

  // Apply header styling
  const headerRow = worksheet.getRow(startRow);
  headerRow.eachCell((cell) => {
    cell.font = { bold: true };
    cell.alignment = { vertical: 'middle', horizontal: 'center' };
    cell.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FFFFE0B2' }, // Light orange
    };
  });

  // Set column widths
  worksheet.columns = columns.map((col) => ({
    key: col.field,
    width: col.width / 10 || 15, // Adjust width from DataGrid width
  }));

  // Add rows starting below the header (row 5 onwards)
  rows.forEach((row, rowIndex) => {
    const rowData = {};
    columns.forEach((col) => {
      rowData[col.field] = row[col.field];
    });

    const newRow = worksheet.addRow(rowData);

    // Conditional styling for the entire row
    const creditValue = row.credit;
    const debitValue = row.debit;
    console.log(creditValue, debitValue);

    if (creditValue) {
      newRow.eachCell((cell) => {
        cell.fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: 'FF27AE60' }, // Green
        };
      });
    }
    if(debitValue){
      newRow.eachCell((cell) => {
        cell.fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: 'FFE74C3C' }, // Green
        };
      });
    }
  });

  // Download Excel file
  const date = new Date();
  const formattedDate = date.toISOString().replace(/:/g, '-').replace('T', '_').split('.')[0];
  workbook.xlsx.writeBuffer().then((buffer) => {
    saveAs(new Blob([buffer]), `Attendance_Report_${formattedDate}.xlsx`);
  });
};
