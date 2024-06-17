
import React, { Fragment, useEffect, useState } from 'react'
import { Form, Row, Col, Card, FormGroup, Label, Input, Button } from 'reactstrap';
import { Formik } from 'formik';
import { useDispatch } from 'react-redux'
import Swal from 'sweetalert2'
import { GetAddHeadExp, GetAllHeadExp } from '../../../../Store/Actions/Dashboard/expenseActions'
import { API_URL } from '../../../../config'
import axios from 'axios'
const AdminTransactionForm = ({toggleModal,data,AccountListing,TotalBalance}) => {

    const [inputValue, setInputValue] = useState({...data});
    const [errors, setErrors]= useState([]);
    const [isLoading, SetIsLoading]= useState(false)
    const dispatch = useDispatch();

    const submitForm= async (e) =>{
        e.preventDefault();
        SetIsLoading(true)
        let errors = {};

// Checking if payment mode is provided
        if (!inputValue.payment_mode) {
            errors.payment_mode = "Payment Mode is required";
        } else {
            // Depending on the payment mode, validating further fields
            if (inputValue.payment_mode === "cash") {
                if (!inputValue.cash) {
                    errors.cash = "Amount Cash is required";
                }
            } else {
                if (!inputValue.transaction_id) {
                    errors.transaction_id = "Transaction Id is required";
                }
                if (!inputValue.upi) {
                    errors.upi = "UPI is required";
                }
            }
        }
        let api_url=""
        if(!data.id){
            api_url="/api/add-balance"
        }else{
            api_url="/api/edit-balance/"+data.id
        }

        const response = await fetch(API_URL + api_url, {
            method: "POST", // or 'PUT'
            headers: {
              // "Content-Type": "multipart/form-data",
              "Content-Type": "application/json",
            },
            body: JSON.stringify(inputValue),
          });
          const balance_details = await response.json();
      
          if (balance_details.status === true) {
            Swal.fire({
                icon: "success",
                title: balance_details.message,
                showConfirmButton: false,
                timer: 1500
              });
            setErrors([]);
            setTimeout(() => SetIsLoading(false), 5000);
            toggleModal();
            dispatch(AccountListing());
            TotalBalance();
          } else {
            SetIsLoading(false);
            Swal.fire({
                icon: "Error",
                title: balance_details.message,
                showConfirmButton: false,
                timer: 1500
              });
          }
    }

    const handleChange = (e)=>{
        const {name, value} = e.target;
        setInputValue({...inputValue, [name]:value})
    }

    return (
        <Fragment>
            <Row>
            <Col md={6}>
            <FormGroup>
                    <Label for="name">Payment Mode <span style={{color: "red"}}>*</span></Label>
                        <select
                          name="payment_mode"
                          className="form-control"
                          onChange={handleChange}
                          defaultValue={inputValue?.payment_mode}
                        >
                          <option value="">--- Select Payment Mode ---</option>
                          <option value="cash">Cash</option>
                          <option value="upi">UPI</option>
                          <option value="debit">Debit Card</option>
                          <option value="credit">Credit Card</option>
                        </select>

                    {errors?.payment_mode && (
                        <span className='validationError'>
                            {errors?.payment_mode}
                        </span>
                    )}
            </FormGroup>
            </Col>
            {inputValue?.payment_mode!=="cash" && ( 
            <Col md={6}>
                <FormGroup>
                    <Label for="name">Transaction ID <span style={{color: "red"}}>*</span></Label>
                    <Input
                        type="text"
                        name="transection_id"
                        onChange={handleChange}
                        placeholder='Transection Id'
                        defaultValue={inputValue?.transection_id}
                    />
                    {errors?.transection_id && (
                        <span className='validationError'>
                            {errors?.transection_id}
                        </span>
                    )}
                </FormGroup>
            </Col>
            )}

            {inputValue?.payment_mode!=="cash" && ( 
            <Col md={6}>
                <FormGroup>
                    <Label for="name">Amount Online<span style={{color: "red"}}>*</span></Label>
                    <Input
                        type="text"
                        name="upi"
                        onChange={handleChange}
                        placeholder='Amount balance'
                        defaultValue={inputValue?.upi}
                    />
                    {errors?.upi && (
                        <span className='validationError'>
                            {errors?.upi}
                        </span>
                    )}
                </FormGroup>
            </Col>
            )}

           {inputValue?.payment_mode==="cash" && ( <Col md={6}>
                <FormGroup>
                    <Label for="name">Amount Cash<span style={{color: "red"}}>*</span></Label>
                    <Input
                        type="text"
                        name="cash"
                        onChange={handleChange}
                        placeholder='Amount balance'
                        defaultValue={inputValue?.cash}
                    />
                    {errors?.cash && (
                        <span className='validationError'>
                            {errors?.cash}
                        </span>
                    )}
                </FormGroup>
            </Col>
           )}

            <div className='col-md-12 text-left mt-3'>
                <button type='button' className='btn btn-success' onClick={submitForm} disabled={isLoading} > {(!data.id) ? "Submit":"Update"  }</button>
            </div>
            
            </Row>
        </Fragment>
    )
}

export default AdminTransactionForm