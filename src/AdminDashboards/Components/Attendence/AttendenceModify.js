import React, { Fragment } from 'react'
// import DashHeader from '../../DashboardComponents/Global/DashHeader'
import { Button, Container, Input } from 'reactstrap';
import SelectBox from '../../Elements/SelectBox';


const AttendenceModify = () => {
    const options = [
        { value: 'Date', label: 'Date' },
        { value: 'Name', label: 'Name' },
        { value: 'Designation', label: 'Designation' },
    ];
    return (
        <Fragment>
            <Container>
                {/* <DashHeader /> */}
                <div className=' h-100 d-grid pb-5'>
                    <h3 className='p-3 mt-3 bg-transparent headingBelowBorder text-white' style={{ maxWidth: "fit-content" }}>Attendence Modify</h3>
                    <div className='text-blue bg-primary card shadow-lg border-0 MainAttendenceReportForm mt-3 p-4  gap-3'>
                        <div className=' mt-3 d-flex flex-nowrap ReportFormWhole w-100'>
                            <div className='d-flex flex-column justify-content-center gap-1 w-100'>
                                <h6 >Type</h6>
                                <SelectBox options={options} />
                            </div>
                            <div className='d-flex flex-column   justify-content-center gap-1 w-100'>
                                <h6 >Name</h6>
                                <SelectBox options={options} />
                            </div>
                            <div className='d-flex flex-column   justify-content-center gap-1 w-100' >
                                <h6 >Attendence</h6>
                                <SelectBox options={options} />
                            </div>
                            <div className='d-flex flex-column   justify-content-center gap-1 w-100' >
                                <h6 >Date</h6>
                                <Input type='date' />
                            </div>
                        </div>
                        <Button className='hoverThis bg-blue'>Submit</Button>
                    </div>
                </div>
            </Container>
        </Fragment>
    )
}

export default AttendenceModify