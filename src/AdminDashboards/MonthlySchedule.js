import * as ExcelJS from 'exceljs';
import {saveAs} from 'file-saver';

const MonthlySchedule = (columns, rows) => {
	const workbook = new ExcelJS.Workbook();
	const worksheet = workbook.addWorksheet('DataGrid Export');

	// Title and Subtitle
	const lastColumnLetter = String.fromCharCode(64 + 22); 
	

	worksheet.mergeCells(`A1:${lastColumnLetter}1`);
	const titleCell = worksheet.getCell('A1');
	titleCell.value = 'SsQuick Helper';
	titleCell.font = {
		bold: true,
		size: 16
	};
	titleCell.alignment = {
		vertical: 'middle',
		horizontal: 'center'
	};

	worksheet.mergeCells(`A2:${lastColumnLetter}2`);
	const subtitleCell = worksheet.getCell('A2');
	subtitleCell.value = 'Daily Schedule';
	subtitleCell.font = {
		italic: true,
		size: 18,
		color: {
			argb: 'FFFFFFFF'
		}
	}; // White text
	subtitleCell.alignment = {
		vertical: 'middle',
		horizontal: 'center'
	};
	subtitleCell.fill = {
		type: 'pattern',
		pattern: 'solid',
		fgColor: {
			argb: 'FF000000'
		} // Black background
	};

	const currentDateTime = new Date();
	const currentDay = currentDateTime.toLocaleDateString('en-US', {weekday: 'long'}); // Get the current day name
	const currentTime = currentDateTime.toLocaleTimeString('en-US', {
		hour: '2-digit',
		minute: '2-digit'
	}); // Get the current time


	worksheet.mergeCells(`A3:${lastColumnLetter}3`);
	const subtitleCell2 = worksheet.getCell('A3');
	subtitleCell2.value = `Date: ${currentDateTime}    Day: ${currentDay}    Time: ${currentTime}`;
	subtitleCell2.font = {
		italic: true,
		size: 12
	};
	subtitleCell2.alignment = {
		vertical: 'middle',
		horizontal: 'center'
	};

	// Headers
	const startRow = 4;
	worksheet.getRow(startRow).values = columns.map((col) => col.headerName);

	const headerRow = worksheet.getRow(startRow);
	headerRow.eachCell((cell) => {
		cell.font = {
			bold: true
		};
		cell.fill = {
			type: 'pattern',
			pattern: 'solid',
			fgColor: {
				argb: 'FFFFE0B2'
			}, // Light orange
		};
	});

	// Column widths
	worksheet.columns = columns.map((col) => ({
		key: col.field,
		width: col.width / 10 || 15
	}));

	// Conditional styling for "Order Status" column
	const statusColors = {
		Pending: 'FFE67E22',
		Hold: 'FFE74C3C',
		Due: 'FFA29BFE',
		Completed: 'FF27AE60',
		Running: 'FFF1C40F',
		Cancel: 'FF95A5A6'
	};

	rows.forEach((row) => {
		const rowData = {};
		columns.forEach((col) => {
			rowData[col.field] = row[col.field];
		});

		const newRow = worksheet.addRow(rowData);

		// Center-align row values
		newRow.eachCell((cell) => {
			cell.alignment = {
				vertical: 'middle',
				horizontal: 'center'
			};
		});

		let status;
		if (row[row.selectedTimeSlot].includes(' - ')) {
			console.log(row[row.selectedTimeSlot]);
			const statusParts = row[row.selectedTimeSlot].split(' - ');
			status = statusParts[statusParts.length - 1].trim();
			const color = statusColors[status];
			if (color) {
				newRow.eachCell((cell) => {
					cell.fill = {
						type: 'pattern',
						pattern: 'solid',
						fgColor: {
							argb: color
						}
					};
				});
			}
		}
	});

	const date = new Date();
	const formattedDate = date.toISOString().replace(/:/g, '-').replace('T', '_').split('.')[0];

	workbook.xlsx.writeBuffer().then((buffer) => {
		saveAs(new Blob([buffer]), `Daily_Schedule-${formattedDate}.xlsx`);
	});
};

export default MonthlySchedule;
