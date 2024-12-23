import * as ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';

const attendanceToExcel = (columns, rows, OrderDate) => {
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

  worksheet.mergeCells('A3:' + String.fromCharCode(64 + columns.length) + '3');
  const subtitleCell2 = worksheet.getCell('A3');
  subtitleCell2.value = 'Date:-' + '    ' + OrderDate;
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

  // Add rows with centered alignment
  rows.forEach((row) => {
    const rowData = {};
    columns.forEach((col) => {
      rowData[col.field] = row[col.field];
    });
    const newRow = worksheet.addRow(rowData);

    // Center align all cells in the row
    newRow.eachCell((cell) => {
      cell.alignment = { vertical: 'middle', horizontal: 'center' };
    });

    if (row.status === 'Full day Leave' || row.status === 'Half day Leave' || row.status === 'Absent') {
        newRow.eachCell((cell) => {
          cell.fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: 'FFE74C3C' }, // Green
          };
        });
      }

  });


  




  const date = new Date();
  const formattedDate = date.toISOString().replace(/:/g, '-').replace('T', '_').split('.')[0];

  workbook.xlsx.writeBuffer().then((buffer) => {
    saveAs(new Blob([buffer]), `Attendance_Report-${formattedDate}.xlsx`);
  });
};

export default attendanceToExcel;
