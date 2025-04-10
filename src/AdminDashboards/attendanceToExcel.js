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
  subtitleCell.value = 'Daily Attendance Report';
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

  // Counters for summary
  let totalPresent = 0;
  let totalAbsent = 0;
  let totalWeekOff = 0;
  let totalLeave = 0;

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

  // Determine the row color based on the status
  let rowColor;
  if (row.status === 'Present') {
    totalPresent++;
    rowColor = 'FF27AE60'; // Green
  } else if (row.status === 'Full day Leave' || row.status === 'Half Day Leave') {
    totalLeave++;
    rowColor = 'FFE74C3C'; // Red
  } else if (row.status === 'Absent') {
    totalAbsent++;
    rowColor = 'FF95A5A6'; // Gray
  } else if (row.status === 'Week Off') {
    totalWeekOff++;
    rowColor = 'FFE67E22'; // Orange
  }

    const totalColumns = worksheet.columnCount;

    // Loop through all columns, including null values
    for (let colNumber = 1; colNumber <= totalColumns; colNumber++) {
        const cell = newRow.getCell(colNumber);
        cell.fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: rowColor },
        };
    }

});



  const summaryRow = worksheet.addRow([
    'Summary',
    `Total Present: ${totalPresent}`,
    `Total Absent: ${totalAbsent}`,
    `Total WeekOff: ${totalWeekOff}`,
    `Total Leave: ${totalLeave}`,
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
    saveAs(new Blob([buffer]), `Attendance_Report-${formattedDate}.xlsx`);
  });
};

export default attendanceToExcel;
