
import React, { Fragment, useEffect, useState } from 'react'
import { Form, Row, Col, Card, FormGroup, Label, Input, Button } from 'reactstrap';
import { Formik } from 'formik';
import { useDispatch } from 'react-redux'
import Swal from 'sweetalert2'
import { GetAddHeadExp, GetAllHeadExp } from '../../../../Store/Actions/Dashboard/expenseActions'
import { API_URL } from '../../../../config'
import axios from 'axios'
const AdminTransactionForm = ({toggleModal,data,AccountListing,TotalBalance}) => {

    const [errors, setErrors]= useState([]);
    const [isLoading, SetIsLoading]= useState(false)
    const dispatch = useDispatch();

    const [inputValue, setInputValue] = useState({
        about_payment: data?.about_payment || "",
        payment_mode:  data?.payment_mode || "",
        amount: data?.amount || "",
        person_name: data?.person_name || "",
        date: data?.date || "",
        type_payment: false,
        transection_id: data?.transection_id || "",
    });

    const submitForm= async (e) =>{
        e.preventDefault();
        SetIsLoading(true)
        let errors = {};

        if (!inputValue.payment_mode) {
            errors.payment_mode = "Payment Mode is required";
        } 
            // Depending on the payment mode, validating further fields
        // if (inputValue.payment_mode === "Online") {
        //     if (!inputValue.transection_id) {
        //         errors.transection_id = "Transaction Id is required";
        //     }
        // } 
            
        if (!inputValue.amount) {
            errors.amount = "amount is required";
        }

        if (!inputValue?.person_name) {
            errors.person_name = "personName is required";
          } 

        if (!inputValue?.date) {
        errors.date = "date is required";
        } 

        if (errors && Object.keys(errors).length === 0) {
            console.log("Form submitted successfully!",);
        } 
        else {
        setErrors(errors);
        SetIsLoading(false);
        return false;
        }
    
        let api_url=""
        if(!data.id){
            api_url="/api/add-fund"
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
          SetIsLoading(false);
    }

    const HandleChange = (e, maxLength) => {
        const { name, value } = e.target;
        if (value.length <= maxLength) {
            setInputValue(prevState => ({
            ...prevState,
            [name]: value
        }));
      }
      };

    const handleKeyPress = (e) => {
        const charCode = e.which || e.keyCode;
        const charStr = String.fromCharCode(charCode);
        if (!/^[a-zA-Z\s]+$/.test(charStr)) {
            e.preventDefault();
            }
    };

    return (
        <Fragment>
            <Row>
            <Col md={6}>
                <FormGroup>
                    <Label for="name">Person Name <span style={{color: "red"}}>*</span></Label>
                    <Input
                        type="text"
                        name="person_name"
                        onChange={(e) => HandleChange(e, 50)}
                        placeholder='Enter Person Name'
                        defaultValue={inputValue?.person_name}
                        onKeyPress={handleKeyPress}
                    />
                    {errors?.person_name && (
                        <span className='validationError'>
                            {errors?.person_name}
                        </span>
                    )}
                </FormGroup>
            </Col>

            <Col md={6}>
                <FormGroup>
                    <Label for="date">Date <span style={{color: "red"}}>*</span></Label>
                    <Input
                        type="date"
                        name="date"
                        onChange={(e) => HandleChange(e, 50)}
                        defaultValue={inputValue?.date}
                    />
                    {errors?.date && (
                        <span className='validationError'>
                            {errors?.date}
                        </span>
                    )}
                </FormGroup>
            </Col>

            <Col md={6}>
            <FormGroup>
                    <Label for="name">Payment Mode <span style={{color: "red"}}>*</span></Label>
                        <select
                          name="payment_mode"
                          className="form-control"
                          onChange={(e) => HandleChange(e, 50)}
                          defaultValue={inputValue?.payment_mode}
                        >
                          <option value="">--- Select Payment Mode ---</option>
                          <option value="Cash">Cash</option>
                          <option value="Online">Online</option>
                        </select>
                    {errors?.payment_mode && (
                        <span className='validationError'>
                            {errors?.payment_mode}
                        </span>
                    )}
            </FormGroup>
        </Col>
    {inputValue?.payment_mode ==="Online" && ( 
            <Col md={6}>
                <FormGroup>
                    <Label for="name">Transaction ID </Label>
                    <Input
                        type="text"
                        name="transection_id"
                        onChange={(e) => HandleChange(e, 50)}
                        placeholder='Transection Id'
                        defaultValue={inputValue?.transection_id}
                    />  
                </FormGroup>
            </Col>
            )}
            <Col md={6}>
                <FormGroup>
                    <Label for="name">Amount <span style={{color: "red"}}>*</span></Label>
                    <Input
                        type="number"
                        name="amount"
                        onChange={(e) => HandleChange(e, 20)}
                        placeholder='Amount balance'
                        defaultValue={inputValue?.amount}
                    />
                    {errors?.amount && (
                        <span className='validationError'>
                            {errors?.amount}
                        </span>
                    )}
                </FormGroup>
            </Col>

            <Col md={12}>
                <FormGroup>
                    <Label for="about_payment">About Payment </Label>
                    <Input
                        type='textarea'
                        name="about_payment"
                        onChange={(e) => HandleChange(e, 200)}
                        placeholder='Enter Person Name'
                        defaultValue={inputValue?.about_payment}
                    />
                </FormGroup>
            </Col>
            <div className='col-md-12 text-left mt-3'>
                <button type='button' className='btn btn-success' onClick={submitForm} disabled={isLoading} > {(!data.id) ? "Submit":"Update"  }</button>
            </div>
            
            </Row>
        </Fragment>
    )
}

export default AdminTransactionForm