import React, { Fragment , useState} from 'react'
import { Button, Col, Form, FormGroup, Input, Label, Row } from 'reactstrap'
import { API_URL } from '../../../../config';
import Swal from 'sweetalert2';
import { useDispatch } from 'react-redux';

const AddEnquiryForm = () => {


    const [inputValue, setInputValue] = useState([]);
    const [errors, setErrors]= useState([]);
    const [isLoading, SetIsLoading]= useState(false)
    const dispatch = useDispatch();

    const submitForm= async (e) =>{
        e.preventDefault();
        SetIsLoading(true)
        let errors = {};

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
        // if(!data.id){
        //     api_url="/api/add-balance"
        // }else{
        //     api_url="/api/edit-balance/"+data.id
        // }

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

    const handleChange = (e)=> {
        const {name, value} = e.target;
        setInputValue({...inputValue, [name]:value})
    }
   
    const handleKeyPress = (e) => {
        const charCode = e.which || e.keyCode;
        const charStr = String.fromCharCode(charCode);
        if (!/^[a-zA-Z]+$/.test(charStr)) {
            e.preventDefault();
            }
    };

    return (
        <Fragment>

            <Form>
                <Row>
                    <Col md={6}>
                        <FormGroup>
                            <Label >Customer Name</Label>
                            <Input placeholder='Enter Name' onKeyPress={handleKeyPress} 
                            onChange={handleChange}
                            defaultValue={inputValue?.payment_mode}
                            />

                        </FormGroup>
                    </Col>
                    <Col md={6}>
                        <FormGroup>
                            <Label >Services</Label>
                            <Input placeholder='Enter number of services'  onKeyPress={handleKeyPress} />
                        </FormGroup>
                    </Col>
                    <Col md={6}>
                        <FormGroup>
                            <Label >Mobile No</Label>
                            <Input placeholder='Enter Type of Service'  onKeyPress={handleKeyPress} />
                        </FormGroup>
                    </Col>
                    <Col md={6}>
                        <FormGroup>
                            <Label >This Month Bill</Label>
                            <Input placeholder='Enter This Month Bill'   />
                        </FormGroup>
                    </Col>
                    <Col md={6}>
                        <FormGroup>
                            <Label >Last Pay Date</Label>
                            <Input type='date' />
                        </FormGroup>
                    </Col>
                    <Col md={6}>
                        <FormGroup>
                            <Label >Remark</Label>
                            <Input type='text' placeholder='Enter Remark' />
                        </FormGroup>
                    </Col>
                    <Button className='bg-primary text-white'>Submit</Button>
                </Row>
            </Form>
        </Fragment>
    )
}

export default AddEnquiryForm