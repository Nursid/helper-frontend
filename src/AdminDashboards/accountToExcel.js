import * as ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';

export const accountToExcel = (columns, rows, OrderDate) => {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('Account Report');

  // Title
  worksheet.mergeCells('A1:' + String.fromCharCode(64 + columns.length) + '1');
  const titleCell = worksheet.getCell('A1');
  titleCell.value = 'SsQuick Helper';
  titleCell.font = { bold: true, size: 16 };
  titleCell.alignment = { vertical: 'middle', horizontal: 'center' };

  // Subtitle
  worksheet.mergeCells('A2:' + String.fromCharCode(64 + columns.length) + '2');
  const subtitleCell = worksheet.getCell('A2');
  subtitleCell.value = 'Account Report';
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

  // Variables for summary totals
  let totalCredit = 0.0;
  let totalDebit = 0.0;
  let totalDue = 0.0;

  // Add rows
  rows.forEach((row) => {
    const rowData = {};
    columns.forEach((col) => {
      rowData[col.field] = row[col.field];
    });

    const newRow = worksheet.addRow(rowData);


    // Calculate totals for summary
    totalCredit += parseFloat(row.credit_amount || 0);
    totalDebit += parseFloat(row.debit_amount || 0);
    totalDue += parseFloat(row.balance || 0);

    // Center-align row values
    newRow.eachCell((cell) => {
      cell.alignment = { vertical: 'middle', horizontal: 'center' };
    });


    const totalColumns = worksheet.columnCount;

    // Loop through all columns, including null values
    for (let colNumber = 1; colNumber <= totalColumns; colNumber++) {
        const cell = newRow.getCell(colNumber);
      
        if (row.credit_amount) {
  
            cell.fill = {
              type: 'pattern',
              pattern: 'solid',
              fgColor: { argb: 'FF27AE60' }, // Green
            };
          
        }
        if (row.debit_amount) {
            cell.fill = {
              type: 'pattern',
              pattern: 'solid',
              fgColor: { argb: 'FFE74C3C' }, // Red
            };
        }
    }


    // Conditional styling
    
  });

  const totalBalance = totalCredit - totalDebit;
  // Add summary row
  const summaryRow = worksheet.addRow({
    [columns[0].field]: 'Summary',
    credit_amount: `Total Credit: ${totalCredit.toFixed(2)}`,
    debit_amount: `Total Debit: ${totalDebit.toFixed(2)}`,
    balance_opening: `Total Outstating Balance: ${totalBalance.toFixed(2)}`,
    balance: `Total Due: ${totalDue.toFixed(2)}`,
  });

  // Style the summary row
  summaryRow.eachCell((cell, colNumber) => {
    if (colNumber === 1) {
      cell.font = { bold: true };
      cell.alignment = { vertical: 'middle', horizontal: 'center' };
    } else {
      cell.font = { bold: true };
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FFD5F5E3' }, // Light green
      };
      cell.alignment = { vertical: 'middle', horizontal: 'center' };
    }
  });

  // Download Excel file
  const date = new Date();
  const formattedDate = date.toISOString().replace(/:/g, '-').replace('T', '_').split('.')[0];
  workbook.xlsx.writeBuffer().then((buffer) => {
    saveAs(new Blob([buffer]), `Account_Report_${formattedDate}.xlsx`);
  });
};
