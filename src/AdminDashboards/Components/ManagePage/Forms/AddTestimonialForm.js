import React, { Fragment, useState } from 'react'
import { Button, Col, FormGroup, Input, Label, Row } from 'reactstrap'


import { API_URL } from '../../../../config';
import Swal from 'sweetalert2';
import moment from 'moment';
import axios from 'axios';

import { useDispatch, useSelector } from 'react-redux'


const AddTestimonialForm = ({GetAllTestimonialsAction,toggleModal,data}) => {

    const dispatch =useDispatch();
    const [loader, setLoader] = useState(false);
    const [imageFile, setImageFile] = useState(null);
    const [Data, setFormData] = useState({
        name: data.name || '', 
        mobile: data.mobile || '',
        address: data.address || '',
        email: data.email || '',
        occupation:  data.occupation || '',
        about: data.about || ''
    });

    // `name`, `mobile`, `email`, `occupation`, `image`, `address`, `about`,

    const handleImageChange = (event) => {
        const file = event.target.files[0];

        if (file) {
            setImageFile(file);
        }
    };
   
    const handleInputChange = (e, maxLength) => {
        const { name, value } = e.target;
        if (value.length <= maxLength) {
            setFormData(prevFormData => ({
                ...prevFormData,
                [name]: value
            }));
        }
    };

    const handleSubmit = async (event) => {
        setLoader(true)
        try {
            const newFormData = {
                ...Data,
                image: imageFile,
            }
            const formData = new FormData();
            // Append existing formdata
            for (const key in newFormData) {
                formData.append(key, newFormData[key]);
            }
            var apiUrl=""
            if(data.id!=null){
                apiUrl = `${API_URL}/manage-website/testimonial/update/${data.id}`;
           }else{
               apiUrl = `${API_URL}/manage-website/testimonial/create`;
           }

        axios.post(apiUrl, formData)
			.then(response => {
				if (response.status === 200) {
                    setLoader(false)
                    dispatch(GetAllTestimonialsAction())
					Swal.fire(
						'Successfully!',
						response.data.message,
						'success'
					)
                    toggleModal();
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
        } catch (error) {
            console.error('Error:', error.message);
        }
    };

    const handleKeyPress = (e) => {
        const charCode = e.which || e.keyCode;
        const charStr = String.fromCharCode(charCode);
        if (!/^[a-zA-Z]+$/.test(charStr)) {
            e.preventDefault();
            }
        };


    return (
        <Fragment>
            <div>
                <Row>
                    <Col md={12}>
                        <FormGroup>
                            <Label for="name">Name</Label>
                            <Input name='name' placeholder='Name' 
                           onChange={(e) => handleInputChange(e, 50)} 
                            value={Data.name} onKeyPress={handleKeyPress}  />
                        </FormGroup>
                    </Col>
                    <Col md={6}>
                        <FormGroup>
                            <Label for="mobno">Mobile No.</Label>
                            <Input type='number' name='mobile' placeholder='Mobile No' 
                             onChange={(e) => handleInputChange(e, 10)} 
                              value={Data.mobile}/>
                        </FormGroup>
                    </Col>
                    <Col md={6}>
                        <FormGroup>
                            <Label for="email">Email</Label>
                            <Input type='email' name='email' placeholder='Email' 
                            onChange={(e) => handleInputChange(e, 50)} 
                            value={Data.email} />
                        </FormGroup>
                    </Col>
                    <Col md={6}>
                        <FormGroup>
                            <Label for="occupation">Occupation</Label>
                            <Input type='text' name='occupation' placeholder='Occupation'
                            onChange={(e) => handleInputChange(e, 50)}  
                            value={Data.occupation} />
                        </FormGroup>
                    </Col>
                    <Col md={6}>
                        <FormGroup>
                            <Label for="image">Document Image</Label>
                            <Input
                                type="file"
                                name="image"
                                id="image"
                            onChange={handleImageChange}
                            />
                        </FormGroup>
                    </Col>
                    <Col md={6}>
                        <FormGroup>
                            <Label for="address">Address</Label>
                            <Input type='textarea' name='address' placeholder='Address' 
                            onChange={(e) => handleInputChange(e, 200)} 
                             value={Data.address}
                            />
                        </FormGroup>
                    </Col>
                    <Col md={6}>
                        <FormGroup>
                            <Label for="about">About The Testimonial</Label>
                            <Input type='textarea' name='about' placeholder='Type....' 
                             onChange={(e) => handleInputChange(e, 50)} 
                              value={Data.about}
                            />
                        </FormGroup>
                    </Col>
                    <Button className='bg-primary text-blue' type='button' onClick={handleSubmit} disabled={loader}> {data.id ? "Update" : "Submit"}</Button>
                </Row>
            </div>
        </Fragment>
    )
}

export default AddTestimonialForm