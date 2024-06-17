import React from 'react'
import { AiOutlineCalendar, AiOutlineClockCircle } from "react-icons/ai";
import { Card, CardContent, Grid, Typography } from '@mui/material'


const FourthSections = () => {
    return (
        <div style={{ background: '#99DBF5' }}>
            <div style={{ background: '#eedc30' }} className="text-center pt-3 pb-2">
                <Typography variant='h3' className='txtColour' fontWeight={700}>Our Best Plans</Typography>
            </div>

            <Grid container spacing={3} paddingY={2} justifyContent="center">
                <Grid item>
                    <Card className='planCard' sx={{ minHeight: 400, maxWidth: 400 }}>
                        <div className="text-center p-3">
                            <AiOutlineClockCircle color='#3d5ce8' size={100} />
                        </div>
                        <CardContent>
                            <div className="text-center">
                                <h3 className='fourthsectionCardHeading'>ONE TIME WASH STARTING</h3>
                                <hr style={{ backgroundColor: '#eedc30', width: '300px', height: '1px', margin: '10px auto', color: '#eedc30' }} />
                            </div>
                            <p className='p-3'>
                                <ul>
                                    <li className='fourthsectionCardSubHeading' >1 FULL CAR WASH</li>
                                    <li className='fourthsectionCardSubHeading pt-4'>1 FREE DUSTING ( WITHIN 1 WEEK )</li>
                                </ul>
                            </p>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item>
                    <Card className='planCard' sx={{ minHeight: 400, maxWidth: 400 }}>
                        <div className="text-center p-3">
                            <AiOutlineCalendar color='#3d5ce8' size={100} />
                        </div>
                        <CardContent>
                            <div className="text-center">
                                <h3 className='fourthsectionCardHeading'>MONTHLY PLAN STARTING</h3>
                                <hr style={{ backgroundColor: '#eedc30', width: '300px', height: '1px', margin: '10px auto', color: '#eedc30' }} />
                            </div>
                            <p className='p-3'>
                                <ul>
                                    <li className='fourthsectionCardSubHeading' >4 FULL CAR WASHES ( INTERIOR & EXTERIOR )</li>
                                    <li className='fourthsectionCardSubHeading pt-4'>11 FREE DUSTING</li>
                                </ul>
                            </p>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid >

        </div >
    )
}

export default FourthSections;