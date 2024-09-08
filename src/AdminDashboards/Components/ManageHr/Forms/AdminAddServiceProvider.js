import React, { Fragment, useEffect, useState } from 'react'

import { Form, Row, Col, Card, FormGroup, Label, Input, Button } from 'reactstrap';
import SelectBox from '../../../Elements/SelectBox';
import { Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import GetAllServicesReducer from '../../../../Store/Reducers/Dashboard/GetAllServicesReducer';
import { GetAllServices } from '../../../../Store/Actions/Dashboard/servicesAction';
import { ImageUploadAction } from '../../../../Store/Actions/ImageUploadAction';
import ImageUploadReducer from '../../../../Store/Reducers/ImageUploadReducers';
import { GetServiceProviderSignupAction } from '../../../../Store/Actions/Dashboard/Authentication/ServiceProviderActions';
import { WaitLoader } from '../../../Elements/WaitLoader';
import { useStateManager } from 'react-select';
import { useAuth } from '../../../../Context/userAuthContext';
import { API_URL } from '../../../../config';
import Swal from 'sweetalert2';
import { GetAllServiceProvider } from '../../../../Store/Actions/Dashboard/Authentication/ServiceProviderActions';
import axios from 'axios';
import Select from 'react-select';

const AdminAddServiceProvider = ({ toggleModal,data2 }) => {

    const dispatch = useDispatch();
    const [allServices, setAllServices]= useState({})
    const [isLoading, setIsLoading] = useState(false)
    const { isSuccess, data } = useSelector(pre => pre.GetAllServicesReducer);
    const [errors, setErrors]= useState([]);
    const [department, setDepartment] = useState(data2.supervisor_type || "");


    const [allDepartments,setAllDepartments]=useState([
        {
            label: 'HELPER',
            value: 'HELPER',
        },
        {
            label: 'Technician',
            value: 'Technician',
        },
    ]);

    const DataWithID = (data) => {
        if (data && Array.isArray(data.data)) {
            const transformedData = data.data.map(item => ({
                label: item.serviceName,
                value: item.id 
            }));
            setAllServices(transformedData);
        } else {
            setAllServices([]); 
        }
    };

    useEffect(() => {
        if (isSuccess && data) {
            DataWithID(data);
        }
    }, [data, isSuccess]);


    useEffect(() => {
        if (data2?.sp_services && Array.isArray(data2.sp_services)) {
            const transformedData = data2.sp_services.map(item => ({
                label: item.service_name,
                value: item.service_name 
            }));
            setSelected(transformedData);
        } else {
            setSelected([]); // Optionally clear the state if data2.sp_services is invalid
        }
    }, [data2?.sp_services]);

    const [files, setFiles] = useState({
        image: null,
        document1: null,
        document2: null
    });

    // current user data
    const { currentUser, setCurrentUser } = useAuth()
    // Image Uploaded Record 
    const [uploadedImage, setUploadedImage] = useState({})
    

    useEffect(() => {
        dispatch(GetAllServices())
        
    }, []);

    const [selectedCity, setSelectedCity] = useState(null)
    const [selectedServiceType, setSeletedServiceType] = useState(data2.provider_type || '')
   // selected services
   const [selectedServices, setSelected] = useState([]);

    

    const [formData, setFormData] = useState({
        name: data2.name || "", 
        first_name: data2.first_name || "",
        last_name: data2.last_name || "",
        username: data2.username || "",   
        mobile_no: data2.mobile_no || "",
        aadhar_no: data2.aadhar_no || "",
        pan_no: data2.pan_no || "",
        email: data2.email || "",
        doj: data2.doj || "",
        permanent_address: data2.permanent_address || "",
        current_address: data2.current_address || "",
        ref_name: data2.ref_name || "",
        ref_address: data2.ref_address || "",
        ref_aadhar_no: data2.ref_aadhar_no || "",
        ref_mobile_no: data2.ref_mobile_no || "",
        ref_city: data2.ref_city || "",
        ref_area: data2.ref_area || "",
        location: data2.location || "",
        service_id: data2.service_id || "",
        about: data2.about || "",
        password: data2.password || "",
        document1_name: data2.document1_name || "",
        document1: data2.document1 || "",
        document2_name: data2.document2_name || "",
        document2: data2.document2 || "",
        document3_name: data2.document3_name || "",
        document3: data2.document3 || "",
        provider_type: data2.provider_type || "",
        supervisor_type: data2.supervisor_type || ""
    });
   const [checkbox , setCheckbox]=useState(false);

    const handleChange = (e, maxLength) => {
        const { name, value } = e.target;
        if (value.length <= maxLength) {
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
        }
    };

    
    const ServiceProviderSubmit = (e) => {

        setIsLoading(true)

        e.preventDefault();
        let errors = {};

		if (!formData.name) {
            errors.name = "Name is required";
        }
        if (!formData.mobile_no) {
            errors.mobile_no = "Mobile Number is required";
        }
        if (!selectedServiceType.value) {
            errors.selectedServiceType = "ServiceProvider type is required";
        }

        if (errors && Object.keys(errors).length === 0) {
			// Form is valid, handle form submission here
			console.log("Form submitted successfully!",);
		  } else {
			// Form is invalid, display validation errors
			console.log("Validation Errors:", errors);
			setErrors(errors);
			setIsLoading(false)
			return false;
		  }

        const serviceValues = selectedServices.map(option => option.label);
        const updatedFormData = {
            ...formData,
            multiServices: JSON.stringify(serviceValues),
            provider_type: selectedServiceType.value,
            supervisor_type: department?.value,
            ...files
        };

        const formData2 = new FormData();
        // Append existing formdata
        for (const key in updatedFormData) {
            formData2.append(key, updatedFormData[key]);
        }

        var apiUrl = "";
		if(data2.id!=null){
			 apiUrl = `${API_URL}/service-provider/update/${data2.id}`;
		}else{
			apiUrl = `${API_URL}/service-provider/add`;
		}
		axios.post(apiUrl, formData2,{
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          })
			.then(response => {
				if (response.data.status === true) {
					toggleModal();
					Swal.fire(
						'Successfully!',
						response.data.message,
						'success'
					)
					dispatch(GetAllServiceProvider())
                    setIsLoading(false)
				} else {
					Swal.fire({
						title: response.data.message,
						icon: "error",
					})
				}
			})
			.catch(error => {
				console.error('Error:', error);
			});
            setIsLoading(false)
    };
   
    const handleChangeservices = (selected) => {
        setSelected(selected);
      };



    const ServiceProviderType = [
        { value: 'staff', label: 'Staff' },
        { value: 'outsource', label: 'Outsource' },
    ];

    const handleFileChange = (e) => {
        const { name, files: newFiles } = e.target;
        setFiles(prevFiles => ({
            ...prevFiles,
            [name]: newFiles[0]
        }));
    };


        const handleKeyPress = (e) => {
            const charCode = e.which || e.keyCode;
            const charStr = String.fromCharCode(charCode);
            if (!/^[a-zA-Z\s]+$/.test(charStr)) {
                e.preventDefault();
            }
        };

    const formattedDate = formData.doj ? new Date(formData.doj).toISOString().slice(0, 10) : "";

    return (
        <Fragment>

            <h3 className='p-3 mt-3 bg-transparent headingBelowBorder text-blue' style={{ maxWidth: "fit-content" }}> {data2.id ? "Edit": "Add"} Service Provider</h3>
            <div className='d-grid place-items-center'>
                <Card className=" border-0 p-4">

                    <div className='AddServiceMan_Main'>
                        <Formik >
                                <Form>
                                    <Row>
                                        <h6 className='pb-3 fw-bold fs-5'>Personal Info</h6>
                                        
                                        <Col md={6}>
                                            <FormGroup>
                                            <Label for="first_name">Service Provider Type</Label>
                                            <SelectBox options={allDepartments} setSelcted={setDepartment} initialValue={department} />
                                                {errors?.department && (
                                            <span className='validationError'>
                                                {errors?.department}
                                            </span>
                                        )}
                                    
                                            </FormGroup>
                                        </Col>

                                        <Col md={6}>
                                            <FormGroup>
                                                <Label for="firstname">Name <span style={{color: "red"}}>*</span></Label>
                                                <Input
                                                    type="text"
                                                    name="name"
                                                    id="name"
                                                    onChange={(e) => handleChange(e, 50)}
                                                    value={formData.name}
                                                    placeholder='Enter Your Name'
                                                    onKeyPress={handleKeyPress}
                                                />
                                                {errors?.name && (
                                                    <span className='validationError'>
                                                        {errors?.name}
                                                    </span>
                                                )}
                                            </FormGroup>
                                        </Col>

                                        

                                        {/* <Col md={6}>
                                            <FormGroup>
                                                <Label for="first_name">First Name</Label>
                                                <Input
                                                    type="text"
                                                    name="first_name"
                                                    id="first_name"
                                                    onChange={(e) => handleChange(e, 50)}
                                                    value={formData?.first_name}
                                                    placeholder='Enter First Name'
                                                    onKeyPress={handleKeyPress}
                                                />
                                            </FormGroup>
                                        </Col>
                                        <Col md={6}>
                                            <FormGroup>
                                                <Label for="lastName">Last Name</Label>
                                                <Input
                                                    type="text"
                                                    name="last_name"
                                                    id="first_name"
                                                    onChange={(e) => handleChange(e, 50)}
                                                    value={formData?.last_name}
                                                    placeholder='Enter First Name'
                                                    onKeyPress={handleKeyPress}
                                                />
                                            </FormGroup>
                                        </Col> */}
                                        <Col md={6}>
                                            <FormGroup>
                                                <Label for="image">Select Image</Label>
                                                <Input
                                                    type="file"
                                                    name="image"
                                                    id="image"
                                                    onChange={handleFileChange}
                                                />
                                            </FormGroup>
                                        </Col>
                                        <Col md={6}>
                                            <FormGroup>
                                               
                                                <Label for="mobileno">Mobile No <span style={{color: "red"}}>*</span></Label>
                                                <Input
                                                    type="number"
                                                    name="mobile_no"
                                                    id="mobile_no"
                                                    onChange={(e) => handleChange(e, 10)}
                                                    value={formData?.mobile_no}
                                                    placeholder='Enter Mobile No'
                                                />
                                                 {errors?.mobile_no && (
                                                    <span className='validationError'>
                                                        {errors?.mobile_no}
                                                    </span>
                                                )}
                                            </FormGroup>
                                        </Col>
                                        <Col md={6}>
                                            <FormGroup>
                                                <Label for="serviceprovidertype">Service Provider Type <span style={{color: "red"}}>*</span></Label>
                                                <SelectBox options={ServiceProviderType} setSelcted={setSeletedServiceType} initialValue={selectedServiceType} />
                                                {errors?.selectedServiceType && (
                                                    <span className='validationError'>
                                                        {errors?.selectedServiceType}
                                                    </span>
                                                )}
                                            </FormGroup>
                                        </Col>
                                        <Col md={6}>
                                            <FormGroup>
                                                <Label for="aadharno">Aadhar No.</Label>
                                                <Input
                                                    type="number"
                                                    name="aadhar_no"
                                                    id="aadharNo"
                                                    onChange={(e) => handleChange(e, 12)}
                                                    value={formData?.aadhar_no}
                                                    placeholder='Enter Aadhar No.'
                                                />
                                            </FormGroup>
                                        </Col>
                                        <Col md={6}>
                                            <FormGroup>
                                                <Label for="pannumber">PAN No.</Label>
                                                <Input
                                                    type="text"
                                                    name="pan_no"
                                                    id="pan_no"
                                                    onChange={(e) => handleChange(e, 10)}
                                                    value={formData?.pan_no}
                                                    placeholder='Enter Pan No.'
                                                />
                                            </FormGroup>
                                        </Col>
                                        <Col md={6}>
                                            <FormGroup>
                                                <Label for="email">Email</Label>
                                                <Input
                                                    type="email"
                                                    name="email"
                                                    id="email"
                                                    onChange={(e) => handleChange(e, 50)}
                                                    value={formData?.email}
                                                    placeholder='Enter Email'
                                                />
                                            </FormGroup>
                                        </Col>
                                        <Col md={6}>
                                            <FormGroup>
                                                <Label for="doj">Date Of Joining</Label>
                                                <Input
                                                    type="date"
                                                    name="doj"
                                                    onChange={(e) => handleChange(e, 50)}
                                                    value={formattedDate}
                                                    id="doj"
                                                    placeholder='Enter Date Of Joining'
                                                />
                                            </FormGroup>
                                        </Col>
                                        {/* <Col md={6}>
                                            <FormGroup>
                                                <Label for="password">Password</Label>
                                                <Input
                                                    type="password"
                                                    name="password"
                                                    id="password"
                                                    onChange={(e) => handleChange(e, 50)}
                                                    value={formData?.password}
                                                    placeholder='Enter Password'
                                                />
                                            </FormGroup>
                                        </Col> */}
                                        <Col md={12}>
                                            <FormGroup>
                                                <Label for="paddress">Parmanent Address</Label>
                                                <Input
                                                    type="text"
                                                    name="permanent_address"
                                                    onChange={(e) => handleChange(e, 100)}
                                                    value={formData?.permanent_address}
                                                    id="permanent_address"
                                                    placeholder='Enter Parmanent Address'
                                                />
                                            </FormGroup>
                                        </Col>
                                        <Col md={12}>
                                            <FormGroup>
                                                <Label className="d-flex flex-nowrap" for="caddress">Current Address &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<small><Input type="checkbox" onClick={()=>setCheckbox(!checkbox)} /> same as parmarent address</small></Label>
                                                <Input
                                                    type="text"
                                                    name="current_address"
                                                    id="current_address"
                                                    value={checkbox?formData.permanent_address:formData.current_address}

                                                    onChange={(e) => handleChange(e, 200)}
                                                    placeholder='Enter Current Address'
                                                />
                                            </FormGroup>
                                        </Col>
                                        <h6 className='fw-bold fs-5 pb-3'>Reference Details</h6>
                                        <Col md={6}>
                                            <FormGroup>
                                                <Label for="referencename">Reference Name</Label>
                                                <Input
                                                    type="text"
                                                    name="ref_name"
                                                    id="referenceName"
                                                    onChange={(e) => handleChange(e, 50)}
                                                    value={formData?.ref_name}
                                                    placeholder='Enter Refrence Name '
                                                />
                                            </FormGroup>
                                        </Col>
                                        <Col md={6}>
                                            <FormGroup>
                                                <Label for="radderess">Address</Label>
                                                <Input
                                                    type="text"
                                                    name="ref_address"
                                                    id="referenceAddress"
                                                    onChange={(e) => handleChange(e, 200)}
                                                    value={formData?.ref_address}
                                                    placeholder='Enter Address'
                                                />
                                            </FormGroup>
                                        </Col>
                                        <Col md={6}>
                                            <FormGroup>
                                                <Label for="radderess"> Ref Aadhar No.</Label>
                                                <Input
                                                    type="text"
                                                    name="ref_aadhar_no"
                                                    onChange={(e) => handleChange(e, 12)}
                                                    value={formData.ref_aadhar_no}
                                                    id="ref_aadhar_no"
                                                    placeholder='Enter Ref Aadhar No.'
                                                />
                                            </FormGroup>
                                        </Col>
                                        <Col md={6}>
                                            <FormGroup>
                                                <Label for="referenceMobileNo"> Ref Mobile No.</Label>
                                                <Input
                                                    type="text"
                                                    name="ref_mobile_no"
                                                    id="ref_mobile_no"
                                                    onChange={(e) => handleChange(e, 10)}
                                                    value={formData.ref_mobile_no}
                                                    placeholder='Enter Ref Mobile No '
                                                />
                                            </FormGroup>
                                        </Col>
                                        <Col md={6}>
                                            <FormGroup>
                                                <Label for="rcity">Ref City.</Label>
                                                <Input type='text'
                                                    placeholder='City'
                                                    name="ref_city"
                                                    id="ref_city"
                                                    onChange={(e) => handleChange(e, 50)}
                                                    value={formData.ref_city}
                                                />
                                            </FormGroup>
                                        </Col>
                                        <Col md={6}>
                                            <FormGroup>
                                                <Label for="referenceArea">Select Area</Label>
                                                <Input
                                                    type="text"
                                                    name="ref_area"
                                                    id="referenceArea"
                                                    onChange={(e) => handleChange(e, 50)}
                                                    value={formData.ref_area}
                                                    placeholder='Enter Referance Area '
                                                />
                                            </FormGroup>
                                        </Col>
                                        <Col md={6}>
                                            <FormGroup>
                                                <Label for="rLocationArea">Location Area</Label>
                                                <Input
                                                    type="text"
                                                    name="location"
                                                    id="location"
                                                    onChange={(e) => handleChange(e, 50)}
                                                    value={formData.location}
                                                    placeholder='Enter Location Area '
                                                />
                                            </FormGroup>
                                        </Col>

                                        <Col md={6}>
                                            <FormGroup>
                                                <Label for="designation"> Services</Label>
                                        <Select
                                                isMulti
                                                value={selectedServices}
                                                onChange={handleChangeservices}
                                                options={allServices}
                                                className="basic-multi-select"
                                                classNamePrefix="select"
                                                /> 
                                                </FormGroup>
                                        </Col>
                                          
                                        {/* Document Upload Section  */}

                                        <h6 className='fw-bold fs-5 py-3'>Documents</h6>
                                        <Col md={6}>
                                            <FormGroup>
                                                <Label for="documentOne">Document 1</Label>
                                                <Input
                                                    type="text"
                                                    name="document1_name"
                                                    id="document1_name"
                                                    onChange={(e) => handleChange(e, 50)}
                                                    value={formData.document1_name}
                                                />
                                            </FormGroup>
                                        </Col>
                                        <Col md={6}>
                                            <FormGroup>
                                                <Label for="image">Document Image</Label>
                                                <Input
                                                    type="file"
                                                    name="document1"
                                                    id="image"
                                                    onChange={handleFileChange}

                                                />
                                            </FormGroup>
                                        </Col>
                                        <Col md={6}>
                                            <FormGroup>
                                                <Label for="documentTwo">Document 2</Label>
                                                <Input
                                                    type="text"
                                                    onChange={(e) => handleChange(e, 50)}
                                                    value={formData.document2_name}
                                                    name="document2_name"
                                                    id="documentTwo"
                                                />
                                            </FormGroup>
                                        </Col>
                                        <Col md={6}>
                                            <FormGroup>
                                                <Label for="image">Document Image</Label>
                                                <Input
                                                    type="file"
                                                    name="document2"
                                                    onChange={handleFileChange}
                                                    id="image"

                                                />
                                            </FormGroup>
                                        </Col>
                                        <Col md={6}>
                                            <FormGroup>
                                                <Label for="documentThree">Document 3</Label>
                                                <Input
                                                    type="text"
                                                    name="documentThree"
                                                    id="documentThree"
                                                    onChange={(e) => handleChange(e, 50)}
                                                    value={formData.documentThree}
                                                />
                                            </FormGroup>
                                        </Col>
                                        <Col md={6}>
                                            <FormGroup>
                                                <Label for="document3">Document Image</Label>
                                                <Input
                                                    type="file"
                                                    name="document3"
                                                    onChange={handleFileChange}
                                                    id="document3"

                                                />
                                            </FormGroup>
                                        </Col>
                                       
                                        <Col md={12}>
                                            <FormGroup>
                                                <Label for="aboutserviceprover">About Service Provider</Label>
                                                <Input
                                                    type="textarea"
                                                    name="about"
                                                    onChange={(e) => handleChange(e, 200)}
                                                    value={formData.about}
                                                    placeholder='Enteer About Service'
                                                />
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Button color="primary" onClick={ServiceProviderSubmit} className="ml-3" disabled={isLoading}> {data2.id ? "Update": "Submit"}</Button>

                                </Form>
                        </Formik>

                        {/* <div>
                            <div className="mt-4">
                                {image && (
                                    <img
                                        src={URL.createObjectURL(image)}
                                        alt="Selected"
                                        style={{ width: '200px' }}
                                    />
                                )}
                            </div>
                        </div> */}

                    </div>
                </Card>
            </div>

        </Fragment>
    )
}

export default AdminAddServiceProvider