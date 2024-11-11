import React, { Fragment, useEffect, useState } from 'react'
import { Form, Row, Col, Card, FormGroup, Label, Input, Button } from 'reactstrap';
import { Formik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { ImageUploadAction } from '../../../../Store/Actions/ImageUploadAction';
import { GetRegEmployee } from '../../../../Store/Actions/Dashboard/EmployeeActions/EmployeeRegAction';
import { useAuth } from '../../../../Context/userAuthContext';
import { API_URL } from '../../../../config';
import axios from 'axios';
import SelectBox from '../../../Elements/SelectBox';
import Select from 'react-select';
import { GetAllEmployeeAction } from '../../../../Store/Actions/Dashboard/EmployeeActions/GetAllEmployee';
import Swal from 'sweetalert2';
import moment from 'moment';

const AdminAddEmployeeForm = ({ toggleModal,data }) => {

    const [formData, setFormData] = useState({
        name: data.name || "",
        mobile_no: data.mobile_no || "",
        email: data.email || "",
        aadhar_no:  data.aadhar_no ||"",
        pan_no: data.pan_no || "",
        createdAt: moment(data.createdAt).format('YYYY-MM-DD') || "",
        address: data.address ||"",
        about: data.address || "",
        salary: data.salary || "",
        duty_hours: data.duty_hours || "",
        week_off: data.week_off || "",
        alterno: data.alterno || "",
        f_name: data.f_name || "",
        f_mobile: data.f_mobile || "",
        m_name: data.m_name || "",
        m_mobile: data.m_mobile || "",
        v_name: data.v_name || "",
        v_date: data.v_date || "",
        gender: data.gender || "",
    });

    const [selectedOptions, setSelectedOptions] = useState([]);
    const [allDepartments,setAllDepartments]=useState({});
    const [allServices, setAllServices]= useState({})
    const [pan_image, setPanFile] = useState(data?.pan_no || '');
    const [adhar_image, setAadhar] = useState(data?.aadhar_no || '');
    const [image, setImage] = useState(data?.image || '');
    const [errors, setErrors]= useState([]);
    const [isLoading, SetIsLoading]= useState(false)
    const [department, setDepartment] = useState(data?.department?.id || '');
    const [slectedDesignation, setSelectedDesignation] = useState(data?.designation?.id || '')


    const handleSubmit = (e) => {

        e.preventDefault();
        SetIsLoading(true)
        let errors = {};

		if (!formData.name) {
            errors.name = "Name is required";
        }
		if (!formData.mobile_no) {
			errors.mobile_no = "Mobile number is required";
		} else if (!/^\d{10}$/.test(formData.mobile_no)) {
			errors.mobile_no = "Mobile number should be 10 digits";
		}

        if (!department) {
            errors.department = "Department is required";
        }
        

       if (parseInt(department?.value) === 1) {
            if (!slectedDesignation) {
                errors.designation = "Designation is required";
            }
        } 
        if(parseInt(department?.value) === 2 || parseInt(department?.value) === 3 ) {
            if (!selectedOptions || !Array.isArray(selectedOptions) || selectedOptions.length === 0) {
                errors.designation = "Service is required";
            }
        }


		if (errors && Object.keys(errors).length === 0) {
			// Form is valid, handle form submission here
			console.log("Form submitted successfully!",);
		  } else {
			// Form is invalid, display validation errors
			console.log("Validation Errors:", errors);
			setErrors(errors);
			SetIsLoading(false);
			return false;
		  }

        const serviceValues = selectedOptions.map(option => option.value);
        const newFormData = {
            ...formData,
            department_id: department?.value,
            designation_id: (department?.value === 2 || department?.value === 3) ? 3 : slectedDesignation?.value,
            pan_image: pan_image,
            adhar_image: adhar_image, 
            image: image, 
            multiServices: JSON.stringify(serviceValues)
          };

        const formData2 = new FormData();

        for (const key in newFormData) {
            formData2.append(key, newFormData[key]);
        }

        var apiUrl = "";
		if(data.id!=null){
			 apiUrl = `${API_URL}/employee/update/${data.id}`;
		}else{
			apiUrl = `${API_URL}/employee/add`;
		}
		axios.post(apiUrl, formData2, {
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
					dispatch(GetAllEmployeeAction())
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
    }

    const handleChange = (e, maxLength) => {
        const { name, value } = e.target;

        if (value.length <= maxLength) {
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
        }
    };

   
    // const ImageResult = useSelector(state => state.ImageUploadReducer)
    const dispatch = useDispatch()
    const Departments = async () =>{
		const response = await axios.get(API_URL + '/department/getall')
		if (response.status === 200) {
			  const transformedData = response.data.map(item => ({
				label: item.name,
				value: item.id 
			}));
			setAllDepartments(transformedData);
		}
	}
    const Designation = async () => {
		const response = await axios.get(API_URL + '/designation/getall')
		if (response.status === 200) {
            const filteredData = response.data.filter(item => item.id !== 1 && item.id !== 7 && item.id !== 3);
            const transformedData = filteredData.map(item => ({
                label: item.name,
                value: item.id
            }));
			setAllServices(transformedData);
		}
	}

    useEffect(() => {
		Departments();
	}, []);
    useEffect(() => {
		Designation();
	}, []);


    useEffect(() => {
        const fetchData = async () => {
            const deptValue = parseInt(department?.value);
            console.log(deptValue)
            if (deptValue === 2 || deptValue === 3) {
                try {
                    const response = await axios.get(`${API_URL}/service/get-service/${deptValue}`);
                
                    const transformedData = response.data.data.map(item => ({
                        label: item.serviceName,
                        value: item.serviceName 
                    }));
                    setAllServices(transformedData);

                } catch (error) {
                    console.error(`Error fetching data for department ${deptValue}:`, error);
                }
            }

            if(deptValue===1){
                Designation()
            }
        };

        if (department?.value !== undefined) {
            fetchData();
        }
    }, [department?.value]);

   

    const handleFileChange = (e,fileName) => {
        const selectedFile = e.target.files[0];
        if(fileName==="adhar_image"){
            setAadhar(selectedFile)
            }
        else if(fileName==="pan_image"){
             setPanFile(selectedFile);
        }
        else if(fileName==="image"){
             setImage(selectedFile);
        }
      };

      const handleChangeservices = (selected) => {
        setSelectedOptions(selected);
      };

        useEffect(() => {
        if (data?.empservices && Array.isArray(data.empservices)) {
            const transformedData = data.empservices.map(item => ({
                label: item.service_name,
                value: item.service_name 
            }));
            setSelectedOptions(transformedData);
        } else {
            setSelectedOptions([]); 
        }
    }, [data?.empservices]);

    const handleKeyPress = (e) => {
		const charCode = e.which || e.keyCode;
		const charStr = String.fromCharCode(charCode);
		if (!/^[a-zA-Z\s]+$/.test(charStr)) {
			e.preventDefault();
		}
	};
      
    const formattedDate = formData.createdAt ? new Date(formData.createdAt).toISOString().slice(0, 10) : "";

    return (
        <Fragment>
            <div className='d-grid place-items-center'>
                <Card className=" p-4 border-0">
                    <div className='AddServiceMan_Main'>
                        <Formik >
                                <Form >
                                    <Row>
                                        <h6 className='pb-3 fw-bold fs-5'>Personal Info</h6>
                                        <Col md={6}>
                                            <FormGroup>
                                                <Label for="department">Department Name <span style={{color: "red"}}>*</span></Label>
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
                                                <Label for="designation"> {department?.value===1 ?   " Designation Name " : " Service Name "}

                                                <span style={{color: "red"}}>*</span>

                                                </Label>
                                                { department?.value===1 ? 
                                                <>
                                                <SelectBox options={allServices} setSelcted={setSelectedDesignation} initialValue={slectedDesignation}/> 
                                                {errors?.designation && (
                                                    <span className='validationError'>
                                                        {errors?.designation}
                                                    </span>
                                                )}
                                                </>
                                                    :
                                                    <>
                                                <Select
                                                isMulti
                                                value={selectedOptions}
                                                onChange={handleChangeservices}
                                                options={allServices}
                                                className="basic-multi-select"
                                                classNamePrefix="select"
                                                />
                                               {errors?.designation && (
                                                    <span className='validationError'>
                                                        {errors?.designation}
                                                    </span>
                                                )}
                                                </>

                                                
                                            }
                        
                                            </FormGroup>
                                        </Col>

                                        <Col md={6}>
                                            <FormGroup>
                                                <Label for="name">Name <span style={{color: "red"}}>*</span></Label>
                                                <Input
                                                   onKeyPress={handleKeyPress}
                                                    name="name"
                                                    onChange={(e) => handleChange(e, 50)}
                                                    
                                                    placeholder='Enter Employee Name'
                                                    value={formData?.name}
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
                                                <Label for="mobileno">Mobile No <span style={{color: "red"}}>*</span></Label>
                                                <Input
                                                    type="number"
                                                    name="mobile_no"
                                                    onChange={(e) => handleChange(e, 10)}
                                                    placeholder='Enter Employee Mobile No'
                                                    value={formData?.mobile_no}
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
                                                <Label for="mobileno">Alternate No </Label>
                                                <Input
                                                    type="number"
                                                    name="alterno"
                                                    onChange={(e) => handleChange(e, 10)}
                                                    placeholder='Enter ALternate No'
                                                    value={formData?.alterno}
                                                />
                                            </FormGroup>
                                        </Col>
                                        <Col md={6}>
                                            <FormGroup>
                                                <Label for="emai">Email</Label>
                                                <Input
                                                    type="email"
                                                    name="email"
                                                    onChange={(e) => handleChange(e, 50)}
                                                    value={formData.email}
                                                    id="email"
                                                    placeholder='Enter Employee Email'
                                                />
                                            </FormGroup>
                                        </Col>
                                        <Col md={6}>
                                            <FormGroup>
                                                <Label for="emai">Gender</Label>
                                                <Input
                                                    type="text"
                                                    name="gender"
                                                    onChange={(e) => handleChange(e, 50)}
                                                    value={formData.gender}
                                                    id="gender"
                                                    placeholder='Enter gender'
                                                />
                                            </FormGroup>
                                        </Col>
                                        <Col md={6}>
                                            <FormGroup>
                                                <Label for="aadhar_no">Aadhar No.</Label>
                                                <Input
                                                    type="number"
                                                    name="aadhar_no"
                                                    onChange={(e) => handleChange(e, 12)}
                                                    placeholder='Employee Aadhar No'
                                                    value={formData.aadhar_no}
                                                    maxLength={12}
                                                />
                                            </FormGroup>
                                        </Col>
                                        <Col md={6}>
                                            <FormGroup>
                                                <Label for="pannumber">Pan No.</Label>
                                                <Input
                                                    type="text"
                                                    name="pan_no"
                                                    onChange={(e) => handleChange(e, 10)}
                                                    value={formData.pan_no}
                                                    placeholder='Employee Pan No'
                                                />
                                            </FormGroup>
                                        </Col>
                                        <Col md={6}>
                                            <FormGroup>
                                                <Label for="pannumber">Join Date</Label>
                                                <Input
                                                    type="date"
                                                    name="createdAt"
                                                    onChange={(e) => handleChange(e, 50)}
                                                    value={formattedDate}
                                                />
                                            </FormGroup>
                                        </Col>
                                        <Col md={6}>
                                            <FormGroup>
                                                <Label for="address">Address</Label>
                                                <Input
                                                    type="text"
                                                    name="address"
                                                    onChange={(e) => handleChange(e, 200)}
                                                    placeholder='Employee Address'
                                                    value={formData.address}
                                                />
                                            </FormGroup>
                                        </Col>

                                        <Col md={6}>
                                            <FormGroup>
                                                <Label for="image">Aadhar Image</Label>
                                                <Input
                                                    type="file"
                                                    name="adhar_image"
                                                    onChange={(e) => handleFileChange(e, 'adhar_image')}
                                                />
                                            </FormGroup>
                                        </Col>
                                        <Col md={6}>
                                            <FormGroup>
                                                <Label for="image">Image</Label>
                                                <Input
                                                    type="file"
                                                    name="image"
                                                    onChange={(e) => handleFileChange(e, 'image')}
                                                />
                                            </FormGroup>
                                        </Col>
                                       
                                        <Col md={6}>
                                            <FormGroup>
                                                <Label for="image">Pan Image</Label>
                                                <Input
                                                    type="file"
                                                    name="pan_image"
                                                    onChange={(e) => handleFileChange(e, 'pan_image')}
                                                />
                                            </FormGroup>
                                        </Col>
                                        <Col md={6}>
                                            <FormGroup>
                                                <Label for="about">Salary</Label>
                                                <Input
                                                    type="number"
                                                    name="salary"
                                                    onChange={(e) => handleChange(e, 10)}
                                                    placeholder='Salary'
                                                    value={formData.salary}
                                                />
                                            </FormGroup>
                                        </Col>


                                        <Col md={6}>
                                            <FormGroup>
                                                <Label for="name">Father Name </Label>
                                                <Input
                                                   onKeyPress={handleKeyPress}
                                                    name="f_name"
                                                    onChange={(e) => handleChange(e, 50)}
                                                    
                                                    placeholder='Enter Father Name'
                                                    value={formData?.f_name}
                                                />
                                                
                                            </FormGroup>
                                        </Col>

                                        <Col md={6}>
                                            <FormGroup>
                                                <Label for="name">Mobile No </Label>
                                                <Input
                                               
                                                    name="f_mobile"
                                                    onChange={(e) => handleChange(e, 10)}
                                                    type='number'
                                                    placeholder='Enter Father Mobile No'
                                                    value={formData?.f_mobile}
                                                />
                                                
                                            </FormGroup>
                                        </Col>
                                        <Col md={6}>
                                            <FormGroup>
                                                <Label for="name">Mother Name </Label>
                                                <Input
                                                   onKeyPress={handleKeyPress}
                                                    name="m_name"
                                                    onChange={(e) => handleChange(e, 50)}
                                                    
                                                    placeholder='Enter Mother Name'
                                                    value={formData?.m_name}
                                                />
                                                
                                            </FormGroup>
                                        </Col>

                                        <Col md={6}>
                                            <FormGroup>
                                                <Label for="name">Mobile No </Label>
                                                <Input
                                                 
                                                    name="m_mobile"
                                                    onChange={(e) => handleChange(e, 10)}
                                                    type='number'
                                                    placeholder='Enter Mother Mobile No'
                                                    value={formData?.m_mobile}
                                                />
                                                
                                            </FormGroup>
                                        </Col>

                                        <Col md={6}>
                                            <FormGroup>
                                                <Label for="about">Duty Hours</Label>
                                                <Input
                                                    type="text"
                                                    name="duty_hours"
                                                    onChange={(e) => handleChange(e, 10)}
                                                    placeholder='Duty Hours'
                                                    value={formData.duty_hours}
                                                />
                                            </FormGroup>
                                        </Col>
                                        <Col md={6}>
                                            <FormGroup>
                                                <Label for="about">Week Off</Label>
                                                <Input
                                                    type="text"
                                                    name="week_off"
                                                    onChange={(e) => handleChange(e, 10)}
                                                    placeholder='Week Off'
                                                    value={formData.week_off}
                                                />
                                            </FormGroup>
                                        </Col>
                                        <Col md={6}>
                                            <FormGroup>
                                                <Label for="about">About Employee</Label>
                                                <Input
                                                    type="textarea"
                                                    name="about"
                                                    onChange={(e) => handleChange(e, 200)}
                                                    placeholder='About Employee'
                                                    value={formData.about}
                                                />
                                            </FormGroup>
                                        </Col>

                                    </Row>
                                    <Row>

                                        <h2 className='text-center'>Verification</h2>
                                        <Col md={6}>
                                            <FormGroup>
                                                <Label for="about">Name</Label>
                                                <Input
                                                    type="text"
                                                    name="v_name"
                                                    onChange={(e) => handleChange(e, 50)}
                                                    placeholder=' Name'
                                                    value={formData.v_name}
                                                />
                                            </FormGroup>
                                        </Col>
                                        <Col md={6}>
                                            <FormGroup>
                                                <Label for="about">Date</Label>
                                                <Input
                                                    type="date"
                                                    name="v_date"
                                                    onChange={(e) => handleChange(e, 10)}
                                                    placeholder='Week Off'
                                                    value={formData?.v_date}
                                                />
                                            </FormGroup>
                                        </Col>
                                    </Row>


                                    <Button
                                        color="primary"
                                        onClick={handleSubmit}
                                        className="ml-3"
                                        >
                                        {data && data.id ? "Update" : "Submit"}
                                        </Button>
                                </Form>

                        </Formik>
                    </div>
                </Card>
            </div>
        </Fragment>
    )
}


export default AdminAddEmployeeForm