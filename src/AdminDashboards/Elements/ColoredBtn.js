import { Box, Button } from '@mui/material'
import React from 'react'

const ColoredBtn = ({ btnName, bg, color, onClick }) => {
    return (
        <Box>
            <Button
                onClick={onClick}
                sx={{
                    backgroundColor: bg,
                    color: color,
                    fontSize: "14px",
                    fontWeight: "600",
                    padding: "15px 15px",
                }}
                

                className='shadow-lg'
            >
                {/* <DownloadOutlinedIcon sx={{ mr: "10px" }} /> */}
                {btnName}
            </Button>
        </Box>
    )
}

export default ColoredBtn