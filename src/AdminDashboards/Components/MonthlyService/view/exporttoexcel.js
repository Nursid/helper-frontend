import * as ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';


function getColumnLetter(colNumber) {
    let columnLetter = '';
    while (colNumber > 0) {
        let remainder = (colNumber - 1) % 26;
        columnLetter = String.fromCharCode(65 + remainder) + columnLetter;
        colNumber = Math.floor((colNumber - 1) / 26);
    }
    return columnLetter;
}


export const exportToExcel = (columns, rows) => {
  // Validate inputs
  if (!Array.isArray(rows)) {
    console.error('Invalid rows data - expected array, received:', rows);
    return;
  }

  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('Daily Schedule First Half');

  // Define columns to export
  const columnsToExport = [
    { field: "name", headerName: "Name" },
    { field: "optional", headerName: "Optional" },
    { field: "bike_no", headerName: "Scooty No." },
    { field: "check_in", headerName: "Check In" },
    { field: "check_out", headerName: "Check Out" },
    { field: "07:00-07:30", headerName: "07:00-07:30 AM" },
    { field: "07:30-08:00", headerName: "07:30-08:00 AM" },
    { field: "08:00-08:30", headerName: "08:00-08:30 AM" },
    { field: "08:30-09:00", headerName: "08:30-09:00 AM" },
    { field: "09:00-09:30", headerName: "09:00-09:30 AM" },
    { field: "09:30-10:00", headerName: "09:30-10:00 AM" },
    { field: "10:00-10:30", headerName: "10:00-10:30 AM" },
    { field: "10:30-11:00", headerName: "10:30-11:00 AM" },
    { field: "11:00-11:30", headerName: "11:00-11:30 AM" },
    { field: "11:30-12:00", headerName: "11:30-12:00 AM" },
  ];

  // Calculate last column letter correctly
  const lastColNumber = columnsToExport.length;
  const lastColumnLetter = getColumnLetter(lastColNumber);
//   const lastColumnLetter = String.fromCharCode(64 + lastColNumber);

  // Add main header
  worksheet.mergeCells(`A1:${lastColumnLetter}1`);
  const titleCell = worksheet.getCell('A1');
  titleCell.value = 'SsQuick Helper';
  titleCell.font = { 
    bold: true, 
    size: 22,
    color: { argb: '000000' }
  };
  titleCell.fill = {
    type: 'pattern',
    pattern: 'solid',
    fgColor: { argb: 'D3D3D3' }
  };
  titleCell.alignment = { 
    vertical: 'middle', 
    horizontal: 'center' 
  };
  worksheet.getRow(1).height = 40;

  // Add sub-header
  worksheet.mergeCells(`A2:${lastColumnLetter}2`);
  const subHeader = worksheet.getCell('A2');
  subHeader.value = `Daily Schedule - ${new Date().toLocaleString()}`;
  subHeader.font = {
    bold: true,
    size: 18,
    color: { argb: '000000' }
  };
  subHeader.fill = {
    type: 'pattern',
    pattern: 'solid',
    fgColor: { argb: 'D3D3D3' }
  };
  subHeader.alignment = {
    vertical: 'middle',
    horizontal: 'center'
  };
  worksheet.getRow(1).height = 40;

  // // Add empty row between headers and column titles
  // worksheet.addRow([]);

  // Add column headers
  const headerRow = worksheet.addRow(columnsToExport.map(col => col.headerName));
  headerRow.height = 40;
  headerRow.eachCell(cell => {
    cell.font = {
      bold: true,
      size: 14,
      color: { argb: '000000' }
    };
    cell.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'F0F0F0' }
    };
    cell.alignment = {
      vertical: 'middle',
      horizontal: 'center'
    };
    cell.border = {
        top: {style:'thin'},
        left: {style:'thin'},
        bottom: {style:'thin'},
        right: {style:'thin'}
      };
  });

  // Add data rows
// Add data rows
if (Array.isArray(rows)) {
  rows.forEach(row => {
    const rowData = columnsToExport.map(col => {
      const value = row[col.field];
      if (typeof value === 'string') {
        // Split comma-separated entries, clean each, then rejoin
        return value.split(/,\s*/)
          .map(entry => {
            // Remove status from each individual entry
            return entry.replace(/\s*-\s*(Pending|Hold|Due|Completed|Running|Cancel)$/, '')
                        .trim();
          })
          .join(', ');
      }
      return value;
    });

    const newRow = worksheet.addRow(rowData);
    newRow.height = 40;

    // Apply conditional styling
    columnsToExport.forEach((col, index) => {
      const cell = newRow.getCell(index + 1);
      
      cell.alignment = {
        vertical: 'middle',
        horizontal: 'center'
      };
      cell.border = {
        top: {style:'thin'},
        left: {style:'thin'},
        bottom: {style:'thin'},
        right: {style:'thin'}
      };
    });
  });
}
  // Set column widths
  worksheet.columns = columnsToExport.map(() => ({
    width: 20
  }));

  // Generate filename
  const timestamp = new Date()
    .toISOString()
    .replace(/[:T-]/g, '_')
    .slice(0, 16);

  // Save file
  workbook.xlsx.writeBuffer().then(buffer => {
    saveAs(new Blob([buffer]), `Daily_Schedule_${timestamp}.xlsx`);
  });
};