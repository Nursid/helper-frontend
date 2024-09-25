import React, { Fragment, useEffect, useState } from "react";

import { Button, Input } from "reactstrap";
import { useNavigate, useSearchParams } from "react-router-dom";
import SelectBox from "../../Elements/SelectBox";
import { useDispatch, useSelector } from "react-redux";
import {
  GetAddExpense,
  GetAllHeadExp,
} from "../../../Store/Actions/Dashboard/expenseActions";
import { WaitLoader } from "../../Elements/WaitLoader";
import { BarLoader, ClipLoader, RingLoader } from "react-spinners";
import { API_URL } from "../../../config";
import axios from "axios";
import { AccountListing } from '../../../Store/Actions/Dashboard/AccountAction';


const AddExpense = ({ setActiveAttendance }) => {
 

  const [Loading, setLoading] = useState(false);
  // all head of the expenses
  const expensesHead = useSelector((state) => state.GetAllHeadExpReducer);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [allExpenseHead, SetAllExpenseHead]=useState({})


  const fetchData= async ()=>{
    const transformedData = expensesHead.data.map(item => ({
      label: item.name,
      value: item.name 
    }));
    SetAllExpenseHead(transformedData);
  }

    useEffect(()=>{
      fetchData()
    },[expensesHead.data])






  // data states
  const [selectedHeadExp, setSelectedHeadExp] = useState(null);
  const [selectedPayment, setSelectedPayment] = useState(null);

  const [formData, setFormData] = useState({
    about_payment: "",
    payment_mode:  "",
    amount:  "",
    person_name:"",
    date:  "",
    type_payment: 1
});




  const HandleChange = (e, maxLength) => {
    const { name, value } = e.target;
    if (value.length <= maxLength) {
    setFormData(prevState => ({
        ...prevState,
        [name]: value
    }));
  }
  };

  

  // STATIC PAYMENT METHOD
  const PaymentOptions = [
    { value: "Cash", label: "Cash" },
    { value: "Online", label: "Online" }
  ];

  const GetSubmitAddExpense = async () => {
    setLoading(true);
    try {
        // Ensure formData is updated correctly
        const dataToSubmit = {
            ...formData,
            about_payment: selectedHeadExp.value,
            payment_mode: selectedPayment.value,
        };

        const response = await axios.post(`${API_URL}/api/add-balance`, dataToSubmit);
        if (response.status === 200) {
          dispatch(AccountListing());
            setFormData({});
        } 
        // Optionally handle the response, e.g., show a success message

        setFormData({}); // Clear form data after submission
    } catch (error) {
        console.error('Error adding expense:', error);
        // Optionally handle the error, e.g., show an error message
    } finally {
        setLoading(false); // Ensure loading is reset in both success and error cases
    }
};

  useEffect(() => {
    dispatch(GetAllHeadExp());
  }, []);

  const handleKeyPress = (e) => {
    const charCode = e.which || e.keyCode;
    const charStr = String.fromCharCode(charCode);
    if (!/^[a-zA-Z\s]+$/.test(charStr)) {
        e.preventDefault();
        }
    };


  return (
    <Fragment>
      <WaitLoader loading={Loading} offset={[50, 70]} />
      {/* <DashHeader /> */}
      {/* <h5
        className="pt-4 pb-3 px-4 text-white headingBelowBorder d-flex  flex-nowrap"
        style={{ width: "fit-content" }}
      >
        Add Expense{" "}
      </h5>
      <div className="AttendenceNavBtn w-100 py-2 px-4 gap-3">
        <div
          className={`py-2 px-4 border shadow rounded-2 cursor-p hoverThis text-white Fw_500 d-flex align-items-center justify-content-center `}
          onClick={() => {
            setActiveAttendance("report");
          }}
          style={{ minWidth: "15rem", maxWidth: "15rem" }}
        >
          Transaction Report
        </div>
      </div> */}

      <div className='flex'>
            <h4 className='p-3 px-4 mt-3 bg-transparent text-white headingBelowBorder' style={{ maxWidth: "18rem", minWidth: "18rem" }}> Expense Head List</h4>

            <div className='AttendenceNavBtn w-100 py-2 px-4 gap-3 justify-content-end'>
                <div className={`py-2 px-4 border shadow rounded-2 cursor-p hoverThis text-white Fw_500 d-flex align-items-center justify-content-center `} style={{ minWidth: "15rem", maxWidth: "15rem" }} onClick={() => {
            setActiveAttendance("report");
          }} >
                Add Expense Head
                </div>
            </div>
            </div>


      <div className=" h-100 d-grid pb-5 ">
        <div className="text-blue bg-primary card shadow-lg border-0 MainAttendenceReportForm mt-3 p-4  gap-3">
          <div className=" mt-3 d-flex flex-nowrap ReportFormWhole w-100">
            <div className="d-flex flex-column justify-content-center gap-1 w-100">
              <h6>Expense Head</h6>
              <SelectBox
                options={allExpenseHead}
                setSelcted={setSelectedHeadExp}
                initialValue={formData.about_payment}
              />
            </div>
            <div className="d-flex flex-column   justify-content-center gap-1 w-100">
              <h6>Payment Method</h6>
              <SelectBox
                options={PaymentOptions}
                setSelcted={setSelectedPayment}
                initialValue={formData.payment_mode}
              />
            </div>
            <div className="d-flex flex-column   justify-content-center gap-1 w-100">
              <h6>Enter Amount</h6>
              <Input
              type="number"
                placeholder="Amount"
                name="amount"
                onChange={(e) => HandleChange(e, 20)}
                value={formData.amount || ""}
                
              />
            </div>
            <div className="d-flex flex-column   justify-content-center gap-1 w-100">
              <h6>Person Name</h6>
              <Input
                type="text"
                placeholder="Name"
                name="person_name"
                value={formData.person_name || ""}
                onChange={(e) => HandleChange(e, 50)}
                onKeyPress={handleKeyPress}
              />
            </div>
            <div className="d-flex flex-column justify-content-center gap-1 w-100">
              <h6>Date</h6>
              <Input
                type="date"
                name="date"
                onChange={(e) => HandleChange(e, 50)}
                value={formData.date || ""}
              />
            </div>
            <div className="d-flex flex-column justify-content-center gap-1 w-100">
              <h6>Remark</h6>
              <Input
                type="textarea"
                className="w-100"
                name="remark"
                value={formData.remark || ""}
                onChange={(e) => HandleChange(e, 200)}
              />
            </div>
          </div>
          <Button onClick={GetSubmitAddExpense} className="hoverThis bg-blue">
            Submit
          </Button>
        </div>
      </div>
    </Fragment>
  );
};

export default AddExpense;
