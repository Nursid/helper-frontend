import React, { Fragment, useState, useEffect } from 'react';
import { Button, Col, Form, FormGroup, Input, Label, Row } from 'reactstrap';
import { API_URL } from '../../../../config';
import Swal from 'sweetalert2';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import SelectBox from '../../../Elements/SelectBox';
import { GetAllEnquiry } from '../../../../Store/Actions/Dashboard/Customer/CustomerActions';
const AddEnquiryForm = ({toggle,data}) => {
    const [inputValue, setInputValue] = useState({
        name: data?.name || '',
        email: data?.email || '',
        refName: data?.refName || '',
        mobileNo: data?.mobileNo || '',
        message: data?.message || '',
        address: data?.address || '',
        service: data?.service || ''
    });
    const [getAllService, setAllservices] = useState([])
    const [service, setServices] = useState( data?.service || '')
    const [errors, setErrors]= useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();

    const submitForm = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        let errors = {};

        if (!inputValue.name) {
			errors.name = "Name is required";
		}
		
		if (!service) {
			errors.service = "service is required";
		}

		if (!inputValue.mobileNo) {
			errors.mobileNo = "Mobile number is required";
		} else if (!/^\d{10}$/.test(inputValue.mobileNo)) {
			errors.mobileNo = "Mobile number should be 10 digits";
		}

		if (errors && Object.keys(errors).length === 0) {
			console.log("Form submitted successfully!",);
		  } else {
			// Form is invalid, display validation errors
			console.log("Validation Errors:", errors);
			setErrors(errors);
			setIsLoading(false);
			return false;
		  }
          
          const formData = {
            ...inputValue,
            service: service.value
          }
        var apiUrl = "";
		if(data?.id!=null){
			 apiUrl = `${API_URL}/enquiry/update/${data?.id}`;
		}else{
			apiUrl = `${API_URL}/enquiry/register`;
		}

          axios.post(apiUrl, formData)
              .then(response => {
                  if (response.status === 200) {
                    toggle()
                    dispatch(GetAllEnquiry())
                      Swal.fire(
                          'Successfully!',
                          response.data.message,
                          'success'
                      )
                  } else {
                      Swal.fire({
                          title: 'failed to add try again',
                          icon: "error",
                      })
                  }
              
              })
              .catch(error => {
                  console.error('Error:', error);
              });

        setIsLoading(false);
    };

    // const handleChange = (e) => {
    //     const { name, value } = e.target;
    //     setInputValue({ ...inputValue, [name]: value });
    // };


    const handleKeyPress = (e) => {
        const charCode = e.which || e.keyCode;
        const charStr = String.fromCharCode(charCode);
        if (!/^[a-zA-Z\s]+$/.test(charStr)) {
            e.preventDefault();
            }
        };


		const handleChange = (e, maxLength) => {
			const { name, value } = e.target;
			if (value.length <= maxLength) {
				setInputValue({...inputValue, [name]:value})
			}
		};

        
    useEffect(() => {
		getAllServices();
	}, []);

	const getAllServices = async () => {
		const response = await axios.get(API_URL + '/service/getall')
		if (response.status === 200) {
			const transformedData = response.data.data.map(item => ({label: item.serviceName, value: item.serviceName}));
			setAllservices(transformedData);
		}
	}

    return (
        <Fragment>
            <Form onSubmit={submitForm}>
                <Row>
                    <Col md={6}>
                        <FormGroup>
                            <Label>Customer Name <span style={{color: "red"}}>*</span></Label>
                            <Input
                                type="text"
                                name="name"
                                placeholder="Enter Name"
                                value={inputValue.name}
                                onChange={(e) => handleChange(e, 50)}
                                
                                onKeyPress={handleKeyPress}
                            />
                            {errors?.name && (
                        <span className='validationError'>
                            {errors?.name}
                        </span>
                    )}
                        </FormGroup>
                    </Col>
                    <Col md={6}>
                        <FormGroup>
                            <Label>Email</Label>
                            <Input
                                type="email"
                                name="email"
                                placeholder="Enter Email"
                                value={inputValue.email}
                                onChange={(e) => handleChange(e, 50)}
                                
                            />
                        </FormGroup>
                    </Col>
                    <Col md={6}>
                        <FormGroup>
                            <Label>Service <span style={{color: "red"}}>*</span></Label>
                            {/* <Input
                                type="text"
                                name="service"
                                placeholder="Enter Service"
                                value={inputValue.service}
                                onChange={(e) => handleChange(e, 50)}
                                
                            /> */}
                            <SelectBox options={getAllService} setSelcted={setServices} initialValue={service}/>
                            {errors?.service && (
                        <span className='validationError'>
                            {errors?.service}
                        </span>
                    )}
                        </FormGroup>
                    </Col>
                    <Col md={6}>
                        <FormGroup>
                            <Label>Mobile No <span style={{color: "red"}}>*</span></Label>
                            <Input
                                type="number"
                                name="mobileNo"
                                placeholder="Enter Mobile No"
                                value={inputValue.mobileNo}
                                onChange={(e) => handleChange(e, 10)}
                                
                            />
                            {errors?.mobileNo && (
                        <span className='validationError'>
                            {errors?.mobileNo}
                        </span>
                    )}
                        </FormGroup>
                    </Col>
                    <Col md={6}>
                        <FormGroup>
                            <Label>Referral Name</Label>
                            <Input
                                type="text"
                                name="refName"
                                placeholder="Enter Referral Name"
                                value={inputValue.refName}
                                onChange={(e) => handleChange(e, 50)}
                                
                            />
                        </FormGroup>
                    </Col>
                    
                   
                    <Col md={6}>
                        <FormGroup>
                            <Label>Address</Label>
                            <Input
                                type="text"
                                name="address"
                                placeholder="Enter Address"
                                value={inputValue.address}
                                onChange={(e) => handleChange(e, 200)}
                               
                            />
                        </FormGroup>
                    </Col>
                    <Col md={12}>
                        <FormGroup>
                            <Label>Message</Label>
                            <Input
                                type="textarea"
                                name="message"
                                placeholder="Enter Message"
                                value={inputValue.message}
                                onChange={(e) => handleChange(e, 200)}
                                
                            />
                        </FormGroup>
                    </Col>
                    <Button type="submit"  disabled={isLoading} className='bg-primary'>
                        {data?.id ? 'Update' : 'Submit'}
                    </Button>
                </Row>
            </Form>
        </Fragment>
    );
};

export default AddEnquiryForm;
