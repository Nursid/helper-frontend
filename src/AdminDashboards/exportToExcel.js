import * as ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';

const exportToExcel = (columns, rows) => {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('DataGrid Export');

  // Add headers
  worksheet.columns = columns.map((col) => ({
    header: col.headerName,
    key: col.field,
    width: col.width / 10 || 15, // Adjust width from DataGrid width
  }));

  // Add rows
  rows.forEach((row) => {
    const rowData = {};
    columns.forEach((col) => {
      rowData[col.field] = row[col.field];
    });
    worksheet.addRow(rowData);
  });

  // Apply header styling
  worksheet.getRow(1).eachCell((cell) => {
    cell.font = { bold: true };
    cell.alignment = { vertical: 'middle', horizontal: 'center' };
    cell.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FFFFE0B2' }, // Light orange
    };
  });

  const statusColors = {
    Pending: 'FFE67E22', // Orange
    Hold: 'FFE74C3C', // Red
    Due: 'FFA29BFE', // Light Purple
    Completed: 'FF27AE60', // Green
    Running: 'FFF1C40F', // Yellow
    Cancel: 'FF95A5A6' // Gray
  };
  
  

  // Conditional styling for "Order Status" column
  const statusColumnIndex = columns.findIndex((col) => col.field === 'pending') + 1; // Get index of "Order Status" column
  worksheet.eachRow((row, rowIndex) => {
    if (rowIndex === 1) return; // Skip header row
    const cell = row.getCell(statusColumnIndex);
        // Apply colors based on the `cell.value`
      if (statusColors[cell.value]) {
        cell.fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: statusColors[cell.value] },
        };
      }
  });

  // Download Excel file
  workbook.xlsx.writeBuffer().then((buffer) => {
    saveAs(new Blob([buffer]), 'DataGridExport.xlsx');
  });
};

export default exportToExcel;
