import React, { Fragment, useEffect, useState } from 'react'

import { Button, Input } from 'reactstrap'
import { useNavigate } from 'react-router-dom'
import SelectBox from '../../Elements/SelectBox'
import { useDispatch, useSelector } from 'react-redux'
import { GetAllServices } from '../../../Store/Actions/Dashboard/servicesAction'
import { GetAllServiceProvider } from '../../../Store/Actions/Dashboard/Authentication/ServiceProviderActions'
import { GetAddCollections } from '../../../Store/Actions/Dashboard/expenseActions'
import { WaitLoader } from '../../Elements/WaitLoader';
import Swal from 'sweetalert2'
import axios from 'axios'
import { API_URL } from '../../../config'

const AddCollections = ({ setActiveAttendance }) => {
    const allservices = useSelector(state => state.GetAllServicesReducer)
    const allServiceProvider = useSelector(state => state.GetAllServiceProviderReducer)
    const [formData, setFormData] = useState({})
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [Loading, setLoading] = useState(false)


    // selectedData States 
    const [selectedServiceProvider, setSelectedServiceProvider] = useState(null);
    const [selectedService, setSelectedService] = useState(null);
    const [selectedPayment, setSelectedPayment] = useState(null);
    const [selectedExpenseType, setSelectedExpenseType] = useState(null)

    const HandleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }



    const OptionModify = (array) => {
        let options = [];
        array.forEach(element => {
            const newEle = { value: element, label: element }
            options.push(newEle)
        });
        return options
    }

    const PaymentOptions = [
        { value: 'cash in hand', label: 'Cash in hand' },
        { value: 'online', label: 'Online' },
        { value: 'cheque', label: 'Cheque' },
    ];
    const ExpenseType = [
        { value: 'dr', label: 'Dr.' },
        { value: 'cr', label: 'Cr.' },
    ];


    const options = [
        { value: 'Date', label: 'Date' },
        { value: 'Name', label: 'Name' },
        { value: 'Designation', label: 'Designation' },
    ];


    const HandleFinalSubmitCollection = async () => {
        try {
            // setLoading(true)
            const data = formData
            data.serviceProvider = selectedServiceProvider?.value
            data.serviceName = selectedService?.value
            data.paymentMethod = selectedPayment?.value
            data.expenseType = selectedExpenseType?.value
    
            const response = await axios.post(API_URL + '/expense/addcollection', data)
    
            if (response.status === 200) {
                setFormData({})
                setSelectedServiceProvider(null)
                setSelectedService(null)
                setSelectedPayment(null)
                setSelectedExpenseType(null)
    
                Swal.fire(
                    'Successfully!',
                    "Added new collection!",
                    'success'
                )
            } else {
                Swal.fire({
                    title: response.data.message,
                    icon: "error",
                })
            }
        } catch (error) {
        
            Swal.fire({
                title: 'Error!',
                text: 'An error occurred while processing your request. Please try again later.',
                icon: "error",
            })
        }
               

        // dispatch(GetAddCollections(data)).then(() => {
        //     // setFormData({})
        //     // setSelectedServiceProvider(null)
        //     // setSelectedService(null)
        //     // setSelectedPayment(null)
        //     // setSelectedExpenseType(null)
        //     setLoading(false)
        // })
    }
    const allSp = allServiceProvider.data
        ? OptionModify(allServiceProvider.data.map(x => x.name))
        : [];

    const allServ = allservices.data && allservices.data.data
        ? OptionModify(allservices.data.data.map(x => x.serviceName))
        : [];

    useEffect(() => {
        dispatch(GetAllServices())
        dispatch(GetAllServiceProvider())
    }, [])


    const handleKeyPress = (e) => {
        const charCode = e.which || e.keyCode;
        const charStr = String.fromCharCode(charCode);
        if (!/^[a-zA-Z]+$/.test(charStr)) {
            e.preventDefault();
            }
        };

    return (
        <Fragment>
            <WaitLoader loading={Loading} offset={[50, 70]} />
            {/* <DashHeader /> */}
            {/* <h5 className='pt-4 pb-3 px-4 text-white headingBelowBorder d-flex flex-nowrap' style={{ width: "fit-content" }}>Add Collection  </h5>
            <div className='AttendenceNavBtn w-100 py-2 px-4 gap-3'>
                <div className={`py-2 px-4 border shadow rounded-2 cursor-p hoverThis text-white Fw_500 d-flex align-items-center justify-content-center `} onClick={() => setActiveAttendance("all")} style={{ minWidth: "15rem", maxWidth: "15rem" }} >
                    Transaction Report
                </div>
            </div> */}


            <div className='flex'>
            <h4 className='p-3 px-4 mt-3 bg-transparent text-white headingBelowBorder' style={{ maxWidth: "18rem", minWidth: "18rem" }}> Add Collection</h4>

            <div className='AttendenceNavBtn w-100 py-2 px-4 gap-3 justify-content-end'>
                <div className={`py-2 px-4 border shadow rounded-2 cursor-p hoverThis text-white Fw_500 d-flex align-items-center justify-content-center `} style={{ minWidth: "15rem", maxWidth: "15rem" }}onClick={() => setActiveAttendance("all")} >
                Transaction Report
                </div>
            </div>
            </div>


            <div className=' h-100 d-grid pb-5'>
                <div className='text-blue bg-primary card shadow-lg border-0 MainAttendenceReportForm mt-3 p-4  gap-3'>
                    <div className=' mt-3 d-flex flex-nowrap ReportFormWhole w-100'>
                        <div className='d-flex flex-column justify-content-center gap-1 w-100'>
                            <h6 >Select Service Provider</h6>
                            <SelectBox options={allSp ? allSp : options} setSelcted={setSelectedServiceProvider} />
                        </div>
                        <div className='d-flex flex-column   justify-content-center gap-1 w-100'>
                            <h6 >Select Service</h6>
                            <SelectBox options={allServ ? allServ : options} setSelcted={setSelectedService} />
                        </div>
                        <div className='d-flex flex-column   justify-content-center gap-1 w-100'>
                            <h6 >Payment Method</h6>
                            <SelectBox options={PaymentOptions} setSelcted={setSelectedPayment} />
                        </div>
                        <div className='d-flex flex-column   justify-content-center gap-1 w-100'>
                            <h6 >Income Type</h6>
                            <SelectBox options={ExpenseType} setSelcted={setSelectedExpenseType} />
                        </div>
                        <div className='d-flex flex-column   justify-content-center gap-1 w-100' >
                            <h6 >Amount</h6>
                            <Input placeholder='Amount' name='amount' value={formData.amount || ''} onChange={HandleChange} type='number'/>
                        </div>
                        <div className='d-flex flex-column   justify-content-center gap-1 w-100' >
                            <h6 >Person Name</h6>
                            <Input type='text' placeholder='Name' name='personName' value={formData.personName || ''} onChange={HandleChange} onKeyPress={handleKeyPress} />
                        </div>
                        <div className='d-flex flex-column   justify-content-center gap-1 w-100' >
                            <h6 >Date</h6>
                            <Input type='date' name='date' onChange={HandleChange} value={formData.date || ''} />
                        </div>
                        <div className='d-flex flex-column   justify-content-center gap-1 w-100' >
                            <h6 >Time(IN)</h6>
                            <Input type='time' name='timeIn' onChange={HandleChange} value={formData.timeIn || ''} />
                        </div>
                        <div className='d-flex flex-column   justify-content-center gap-1 w-100' >
                            <h6 >Time(Out)</h6>
                            <Input type='time' onChange={HandleChange} name='timeOut' value={formData.timeOut || ''} />
                        </div>
                        <div className='d-flex flex-column   justify-content-center gap-1 w-100' >
                            <h6 >Order No.</h6>
                            <Input type='text' placeholder='Order No' className='w-100' name='orderNo' onChange={HandleChange} value={formData.orderNo || ''} />
                        </div>
                        <div className='d-flex flex-column   justify-content-center gap-1 w-100' >
                            <h6 >Remark</h6>
                            <Input type='textarea' className='w-100' onChange={HandleChange} name='remark' value={formData.remark || ''} />
                        </div>
                    </div>
                    <Button onClick={HandleFinalSubmitCollection} className='hoverThis bg-blue'>Submit</Button>
                </div>
            </div>
        </Fragment>
    )
}

export default AddCollections