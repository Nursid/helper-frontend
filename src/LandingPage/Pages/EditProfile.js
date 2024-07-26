import { Container, Select, MenuItem,Button  } from '@mui/material';
import { useAuth } from '../../Context/userAuthContext';
import { useDispatch, useSelector } from 'react-redux';
import { GetUpdateTheCustomer } from '../../Store/Actions/Dashboard/Customer/CustomerActions';
import Swal from 'sweetalert2';
import SelectBox from '../../AdminDashboards/Elements/SelectBox';
import React, {Fragment, useEffect, useState} from 'react'
import { API_URL } from '../../config';
// import { Axios } from 'axios';
import axios from 'axios';
import {
	Col,
	FormGroup,
	Input,
	Label,
	Row,
} from 'reactstrap';

const EditProfile = ({ serviceData }) => {
    const { currentUser, setCurrentUser } = useAuth();

    const updateResult = useSelector(state => state.GetCustomerUpdateReducer);
    const [imageFile, setImageFile] = useState(null);
    const [formData, setFormData] = useState({
        name: serviceData.NewCustomer.name,
        age: serviceData.age,
        mobileno: serviceData.NewCustomer.mobileno,
        email: serviceData.NewCustomer.email,
        address: serviceData.address,
        aadhar_no: serviceData.aadhar_no,
    });

    const [gender, setGender] = useState(serviceData.gender,)

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setImageFile(file);
        }
    };


    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value
        }));
    };

    const dispatch = useDispatch()

    const handleSubmit = (event) => {

        event.preventDefault();
        const formData1 = new FormData();
        formData1.append('name', formData.name);
		formData1.append('gender', gender.value);
		formData1.append('age', formData.age);
		formData1.append('address', formData.address);
		formData1.append('email',formData.email);
        formData1.append('mobile',formData.mobileno);
        formData1.append('aadhar_no',formData.aadhar_no);
        formData1.append('image',imageFile);

        axios.put(`${API_URL}/customer/getupdate/${serviceData.user_id}`,formData1 )
			.then(response => {
				if (response.data.status === true) {
					Swal.fire(
						'Successfully!',
                        response.data.message,
						'success'
					)
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
    };


    const gender_option = [
		{
			value: 'Male',
			label: 'Male'
		}, {
			value: 'Female',
			label: 'Female'
		},
		{
			value: 'other',
			label: 'Other'
		},
	];

    return (
        <Container maxWidth='md' sx={{ paddingY: 2 }}>
            <Row>
                <Col xs={12}>
                    <div className="card">
                        <div className="card-body text-center">
                            <form onSubmit={handleSubmit}>
                                {
                                imageFile && <img
                                src={URL.createObjectURL(imageFile) || "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"}
                                alt="avatar"
                                className="rounded-circle img-fluid"
                                style={{ width: '150px', height: '150px' }}
                                />
                                }
                               
                                <div className='text-left'>
                                    <Row className="mb-4">
                                        <Col>
                                            <div className="form-outline mb-4">
                                                <label className="form-label" htmlFor="form3Example1">Name</label>
                                                <Input type="text" id="form3Example1" name="name" className="form-control" value={formData.name} onChange={handleInputChange} />
                                            </div>
                                        </Col>
                                        <Col>
                                            <div className="form-outline mb-4">
                                                <label className="form-label" htmlFor="form3Example2">Age</label>
                                                <Input type="text" id="form3Example2" name="age" className="form-control" value={formData.age} onChange={handleInputChange} />
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row className="mb-4">
                                        <Col>
                                            <div className="form-outline mb-4">
                                                <label className="form-label" htmlFor="form3Example1">Upload Profile</label>
                                                <Input type='file' name='image' onChange={handleImageChange} />
                                            </div>
                                        </Col>
                                        <Col>
                                        <FormGroup>
                                            <div className="form-outline mb-4">
                                                <label className="form-label" htmlFor="stateSelect">Gender</label>              
						<Label for="gender">Gender</Label>
                        <SelectBox options={gender_option} setSelcted={setGender} initialValue={gender}/>
                        </div>
					</FormGroup>
                                         
                                        </Col>
                                    </Row>
                                    <Row className="mb-4">
                                        <Col>
                                            <div className="form-outline mb-4">
                                                <label className="form-label" htmlFor="form3Example3">Mobile No.</label>
                                                <Input  
                                                    id="form3Example3" 
                                                    name="mobileNo" 
                                                    className="form-control" 
                                                    value={formData.mobileno} 
                                                    onChange={(e) => {
                                                        const value = e.target.value.replace(/\D/g, '').slice(0, 10)
                                                        handleInputChange({
                                                            ...e,
                                                            target: {
                                                                ...e.target,
                                                                value,
                                                                name: 'mobileno'
                                                            }
                                                        })
                                                    }}
                                                    pattern="[0-9]{10}"
                                                />

                                        </div>
                                        </Col>
                                        <Col>
                                            <div className="form-outline mb-4">
                                                <label className="form-label" htmlFor="form3Example4">Email address</label>
                                                <Input type="email" id="form3Example4" name="email" className="form-control" value={formData.email} onChange={handleInputChange} />
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row>
                                    <Col>
                                            <div className="form-outline mb-4">
                                                <label className="form-label" htmlFor="form3Example6">Aadhar</label>
                                                <Input id="form3Example6" name="aadhar_no" className="form-control" value={formData.aadhar_no} 
                                                onChange={(e) => {
                                                    const value = e.target.value.replace(/\D/g, '').slice(0, 12)
                                                    handleInputChange({
                                                        ...e,
                                                        target: {
                                                            ...e.target,
                                                            value,
                                                            name: 'aadhar_no'
                                                        }
                                                    })
                                                }}
                                                pattern="[0-9]{12}"
                                                />
                                            </div>
                                        </Col>
                                       
                                        <Col>
                                            <div className="form-outline mb-4">
                                                <label className="form-label" htmlFor="form3Example5">Address</label>
                                                <Input type="text" id="form3Example5" name="address" className="form-control" value={formData.address} onChange={handleInputChange} />
                                            </div>
                                        </Col>
                                 
    
                    
                                    </Row>
                                    <Button type="submit" variant='contained' className="mb-4 btn-block"> Save Changes</Button>
                                </div>
                            </form>
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

export default EditProfile;
