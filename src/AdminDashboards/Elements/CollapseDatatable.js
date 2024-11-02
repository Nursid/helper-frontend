import { Box } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import React, { useState } from 'react';
import './AnimatedBackground.css';

// History component to render the history data


const CollapseDatatable = ({ rows, columns, CustomToolbar, ...args }) => {
  const [expandedRow, setExpandedRow] = useState(null);

  const handleRowClick = (id) => {
    setExpandedRow(expandedRow === id ? null : id);
  };

  const getRowClassName = (params) => {
    const status = params.row.pending;
    if (status === "Completed") {
      return "complete-cell";
    } else if (status === "Running") {
      return "running-cell";
    } else if (status === "Cancel") {
      return "cancel-cell";
    } else if (status === "Hold") {
      return "hold-cell";
    } else if (status === "Due") {
      return "due-cell";
    } else if (status === "Pending") {
      return "pending-cell";
    }
    return "";
  };

  const renderExpandColumn = (params) => {
    // Only show the toggle for main rows that have a history property
    const isMainRow = params.row.history && params.row.history.length > 0;
  
    return isMainRow ? (
      <Box onClick={() => handleRowClick(params.row.id)} sx={{ cursor: 'pointer' }}>
        {expandedRow === params.row.id ? '▼' : '►'}
      </Box>
    ) : null; // No toggle for history rows
  };

  const expandableColumns = [
    { field: 'expand', headerName: '', width: 50, renderCell: renderExpandColumn },
    ...columns,
  ];

  const processedRows = rows.flatMap((row) => {
    // Start with the current row
    const result = [row];
  
    // If the current row is expanded, add its history
    if (expandedRow === row.id) {
      result.push(...row.history);
    }
  
    return result;
  });
 

  return (
    <Box
            m="0px 0 0 0"
            height="75vh"
            sx={{
                "& .MuiDataGrid-root": {
                    border: "none",
                    
                },
                "& .MuiDataGrid-cell": {
                    borderBottom: "none",
                    // backgroundColor: "red",
                },
                "& .name-column--cell": {
                    // color: colors.greenAccent[300],
                    color: "#e52c2a",
                },
                "& .MuiDataGrid-columnHeaders": {
                
                    backgroundColor: "#112c85",
                    borderBottom: "none",
                    color: "#ffffff",
                },
                "& .MuiDataGrid-virtualScroller": {
                    backgroundColor: "#f2f0f0",
                },
                "& .MuiDataGrid-footerContainer": {
                    borderTop: "none",
                
                    backgroundColor: "#112c85",
                    color: "#ffffff",
                },
                "& .MuiCheckbox-root": {
                    color: `#1e5245 !important`,
                },
                "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                    color: `#ffffff !important`,
                },
                "& .MuiSvgIcon-root": {
                    fill: "#ffffff",
                },
                "& .MuiTablePagination-root": {
                    color: "#ffffff",
                },
                "& .MuiInputBase-input-MuiInput-input": {
                    color: '#ffffff !important'
                }
            }}
        >
      <DataGrid
        rows={processedRows}
        columns={expandableColumns}
        components={{ Toolbar: CustomToolbar }}
        getRowClassName={(params) => getRowClassName(params)}
        {...args}
      />
    </Box>
  );
};

export default CollapseDatatable;
