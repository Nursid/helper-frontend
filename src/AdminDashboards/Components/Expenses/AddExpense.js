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
      value: item.id 
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
    expHead: "",
    paymentMethod:  "",
    amount:  "",
    personName:"",
    date:  "",
    remark:  "",
});



  const HandleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
        ...prevState,
        [name]: value
    }));
  };

  // STATIC PAYMENT METHOD
  const PaymentOptions = [
    { value: "cash in hand", label: "Cash in hand" },
    { value: "online", label: "Online" },
    { value: "cheque", label: "Cheque" },
  ];

  const GetSubmitAddExpense = () => {
    setLoading(true);
    formData.expHead = selectedHeadExp.value;
    formData.paymentMethod = selectedPayment.value;
    dispatch(GetAddExpense(formData)).then(() => {
      setFormData({});
      setLoading(false);
    });
  };

  useEffect(() => {
    dispatch(GetAllHeadExp());
  }, []);


  return (
    <Fragment>
      <WaitLoader loading={Loading} offset={[50, 70]} />
      {/* <DashHeader /> */}
      <h5
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
      </div>
      <div className=" h-100 d-grid pb-5 ">
        <div className="text-blue bg-primary card shadow-lg border-0 MainAttendenceReportForm mt-3 p-4  gap-3">
          <div className=" mt-3 d-flex flex-nowrap ReportFormWhole w-100">
            <div className="d-flex flex-column justify-content-center gap-1 w-100">
              <h6>Expense Head</h6>
              <SelectBox
                options={allExpenseHead}
                setSelcted={setSelectedHeadExp}
                initialValue={formData.expHead}
              />
            </div>
            <div className="d-flex flex-column   justify-content-center gap-1 w-100">
              <h6>Payment Method</h6>
              <SelectBox
                options={PaymentOptions}
                setSelcted={setSelectedPayment}
                initialValue={formData.paymentMethod}
              />
            </div>
            <div className="d-flex flex-column   justify-content-center gap-1 w-100">
              <h6>Enter Amount</h6>
              <Input
                placeholder="Amount"
                name="amount"
                onChange={HandleChange}
                value={formData.amount || ""}
              />
            </div>
            <div className="d-flex flex-column   justify-content-center gap-1 w-100">
              <h6>Person Name</h6>
              <Input
                type="text"
                placeholder="Name"
                name="personName"
                value={formData.personName || ""}
                onChange={HandleChange}
              />
            </div>
            <div className="d-flex flex-column   justify-content-center gap-1 w-100">
              <h6>Date</h6>
              <Input
                type="date"
                name="date"
                onChange={HandleChange}
                value={formData.date || ""}
              />
            </div>
            <div className="d-flex flex-column   justify-content-center gap-1 w-100">
              <h6>Remark</h6>
              <Input
                type="textarea"
                className="w-100"
                name="remark"
                value={formData.remark || ""}
                onChange={HandleChange}
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
