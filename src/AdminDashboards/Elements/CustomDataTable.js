import React, { useState } from 'react';
import { Box, Button, Tooltip, TextField } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import ChevronLeft from '@mui/icons-material/ChevronLeft';
import ChevronRight from '@mui/icons-material/ChevronRight';

const CustomDataTable = ({ columns, rows, frozenFields }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const rowsPerPage = 50;



    const filteredRows = rows.filter((row) =>
        columns.some((col) => {
            const cellValue = row[col.field]?.toString().toLowerCase();
            return cellValue?.includes(searchQuery.toLowerCase());
        })
    );

    const totalPages = Math.ceil(filteredRows.length / rowsPerPage);
    const paginatedData = filteredRows.slice(
        (currentPage - 1) * rowsPerPage,
        currentPage * rowsPerPage
    );

    const getRowClassName = (row) => {
        const status = row.status || row.pending;
        const debit_amount = row.debit_amount;
        const credit_amount = row.credit_amount;

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
        } else if (status === "Present") {
            return "complete-cell";
        } else if (status === 'Full day Leave' || status === 'Half Day Leave') {
            return "hold-cell";
        } else if (status === 'Absent') {
            return "cancel-cell";
        } else if (status === "Week Off") {
            return "pending-cell";
        } else if (debit_amount) {
            return "hold-cell";
        } else if (credit_amount) {
            return "complete-cell";
        }
        return "";
    };

    return (
        <Box
            sx={{
                width: '100%',
                overflow: 'hidden',
                position: 'relative',
                // padding: '10px',
            }}
        >
            {/* Search Input */}
            <TextField
                id="standard-basic"
                label=""
                sx={{ mb: 1, ml: 2 }}
                variant="standard"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchIcon sx={{ color: 'white' }} />
                        </InputAdornment>
                    ),
                }}
            />

            {/* Table Container */}
            <Box
                sx={{
                    display: 'flex',
                    overflowX: 'auto',
                    position: 'relative',
                    width: '100%',
                }}
            >
                {/* Fixed (Frozen) Columns */}
                <Box
                    sx={{
                        position: 'sticky',
                        left: 0,
                        zIndex: 2,
                        backgroundColor: '#112c85',
                        color: '#ffffff',
                        minWidth: frozenFields.length ? 'fit-content' : 'auto',
                    }}
                >
                    {/* Fixed Header */}
                    <Box
                        sx={{
                            display: 'flex',
                            borderBottom: '1px solid #e0e0e0',
                        }}
                    >
                        {columns
                            .filter((col) => frozenFields.includes(col.field))
                            .map((col) => (
                                <Box
                                    key={col.field}
                                    sx={{
                                        minWidth: col.width,
                                        padding: '8px',
                                        fontWeight: 'bold',
                                        textAlign: 'left',
                                        flex: `1 1 ${col.width}px`,
                                        
                                    }}
                                >
                                    {col.headerName}
                                </Box>
                            ))}
                    </Box>

                    {/* Fixed Rows */}
                    {paginatedData.map((row) => (
                        <Box
                            key={row.id}
                            sx={{
                                display: 'flex',
                                borderBottom: '1px solid #e0e0e0',
                            }}
                        >
                            {columns
                                .filter((col) => frozenFields.includes(col.field))
                                .map((col) => (
                                    <Box
                                        key={col.field}
                                        sx={{
                                            minWidth: col.width,
                                            padding: '8px',
                                            backgroundColor: '#f2f0f0',
                                            color: '#000000',
                                            flex: `1 1 ${col.width}px`,
                                            // Apply the className dynamically
                                            ...(col.cellClassName && { className: col.cellClassName({ row }) }),
                                        }}
                                    >
                                        {col.renderCell ? col.renderCell({ row }) : row[col.field]}
                                    </Box>
                                ))}
                        </Box>
                    ))}
                </Box>

                {/* Scrollable Columns */}
                <Box
                    sx={{
                        flex: 1,
                        overflowX: 'auto',
                        width: '100%',
                    }}
                >
                    {/* Scrollable Header */}
                    <Box
                        sx={{
                            display: 'grid',
                            gridTemplateColumns: columns
                                .filter((col) => !frozenFields.includes(col.field))
                                .map((col) => `${col.width}px`)
                                .join(' '),
                            borderBottom: '1px solid #e0e0e0',
                        }}
                    >
                        {columns
                            .filter((col) => !frozenFields.includes(col.field))
                            .map((col) => (
                                <Box
                                    key={col.field}
                                    sx={{
                                        padding: '8px',
                                        fontWeight: 'bold',
                                        backgroundColor: '#112c85',
                                        color: '#ffffff',
                                        textAlign: 'left',
                                    }}
                                >
                                    {col.headerName}
                                </Box>
                            ))}
                    </Box>

                    {/* Scrollable Rows */}
                    {paginatedData.map((row) => (
                        <Box
                            key={row.id}
                            sx={{
                                display: "grid",
                                gridTemplateColumns: columns
                                    .filter((col) => !frozenFields.includes(col.field))
                                    .map((col) => `${col.width}px`)
                                    .join(" "),
                                // borderBottom: "1px solid #e0e0e0",
                            }}
                            className={getRowClassName(row)}
                        >
                           {columns
    .filter((col) => !frozenFields.includes(col.field))
    .map((col) => {
        // Create the params object to pass to cellClassName
        const params = { row, field: col.field, value: row[col.field] };
        
        // Get the className dynamically
        const className = col.cellClassName ? col.cellClassName(params) : undefined;

        return (
            <Tooltip key={col.field} title={row[col.field]} arrow>
                <Box
                    sx={{
                        padding: "8px",
                        backgroundColor: "#f2f0f0",
                        textAlign: "left",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                    }}
                    className={className} // Apply the className dynamically
                >
                    {col.renderCell ? col.renderCell({ row }) : row[col.field]}
                </Box>
            </Tooltip>
        );
    })}
                        </Box>
                    ))}
                </Box>
            </Box>

            {/* Pagination Controls */}
            <Box
                sx={{
                    position: 'sticky',
                    left: 0,
                    zIndex: 2,
                    backgroundColor: '#112c85',
                    color: '#ffffff',
                    padding: '5px',
                }}
            >
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'end',
                    }}
                >
                    {/* Previous Button */}
                    <Button
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage(currentPage - 1)}
                        startIcon={<ChevronLeft />}
                        sx={{ color: '#ffffff' }}
                    >
                        Previous
                    </Button>

                    {/* Page Info */}
                    <Box sx={{ mx: 2, alignSelf: 'center' }}>
                        Page {currentPage} of {totalPages}
                    </Box>

                    {/* Next Button */}
                    <Button
                        disabled={currentPage === totalPages}
                        onClick={() => setCurrentPage(currentPage + 1)}
                        endIcon={<ChevronRight />}
                        sx={{ color: '#ffffff' }}
                    >
                        Next
                    </Button>
                </Box>
            </Box>
        </Box>
    );
};

export default CustomDataTable;