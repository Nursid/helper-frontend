import React, { Fragment, useState } from 'react'
import { Container, Select, MenuItem } from '@mui/material';
import { Form, Row, Col, Card, FormGroup, Label, Input, Button } from 'reactstrap';
import SelectBox from '../../../Elements/SelectBox';
import { API_URL } from '../../../../config';
import Swal from 'sweetalert2';
import moment from 'moment';
import axios from 'axios';

import { useDispatch, useSelector } from 'react-redux'


const AddNewPost = ({ GetAllPostAction,toggleModal,data }) => {

    const dispatch =useDispatch();
    const [loader, setLoader] = useState(false);
    const [imageFile, setImageFile] = useState(null);
    const [Data, setFormData] = useState({
        type: data.type || 'buy',
        property: data.property || '',
        name: data.name || '', 
        mobile: data.mobile || '',
        address: data.address || '',
        from_date: data.from_date || '',
        end_date:  data.end_date || '',
        refrance_name: data.refrance_name || ''
    });

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
                cust_id: "office"
            }
            const formData = new FormData();
            // Append existing formdata
            for (const key in newFormData) {
                formData.append(key, newFormData[key]);
            }
            var apiUrl=""
            if(data.id!=null){
                apiUrl = `${API_URL}/manage-website/post/update/${data.id}`;
           }else{
               apiUrl = `${API_URL}/manage-website/post/create`;
           }

        axios.post(apiUrl, formData)
			.then(response => {
				if (response.status === 200) {
                    setLoader(false)
                    dispatch(GetAllPostAction())
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

            <div className="p-4 ">
                <div className='AddServiceMan_Main'>
                    <Form>
                        <Row>

                            {/* Personal Info  */}
                            <Col md={6}>
                                <FormGroup>
                                    <Label for="department">To Date.</Label>
                                    {/* <SelectBox options={options} /> */}
                                    <Input type='date' name='from_date' 
                                    value={Data.from_date}
                                    onChange={(e) => handleInputChange(e, 50)} 
                                    />
                                </FormGroup>
                            </Col>
                            <Col md={6}>
                                <FormGroup>
                                    <Label for="designation">End Date.</Label>
                                    {/* <SelectBox options={options} /> */}
                                    <Input type='date' name='end_date'
                                    value={Data.end_date} 
                                    onChange={(e) => handleInputChange(e, 50)} 
                                    />
                                </FormGroup>
                            </Col>
                            <Col md={6}>
                                <FormGroup>
                                    <Label for="refname">Type</Label>
                                    <Select id="stateSelect" name="type" className="form-control" value={Data.type} 
                                    onChange={(e) => handleInputChange(e, 50)} 
                                    >
                                                    <MenuItem value="buy" >Buy</MenuItem>
                                                    <MenuItem value="sell">Sell</MenuItem>
                                                    <MenuItem value="rent">Rent</MenuItem>
                                                </Select>
                                </FormGroup>
                            </Col>
                            <Col md={6}>
                                <FormGroup>
                                    <Label for="name">Name</Label>
                                    <Input
                                        type="text"
                                        name="name"
                                        placeholder='Enter Your Name'
                                        id="name"
                                        value={Data.name}
                                        onChange={(e) => handleInputChange(e, 50)} 
                                        onKeyPress={handleKeyPress}
                                    />
                                </FormGroup>
                            </Col>
                            <Col md={6}>
                                <FormGroup>
                                    <Label for="mobileno">Mobile No</Label>
                                    <Input
                                        type="tel"
                                        name="mobile"
                                        id="mobile"
                                        placeholder='Enter Your Mobile'
                                        value={Data.mobile}
                                        onChange={(e) => handleInputChange(e, 10)} 
                                    />
                                </FormGroup>
                            </Col>
                           
                            <Col md={6}>
                                <FormGroup>
                                    <Label for="image">Select Image</Label>
                                    <Input type='file' onChange={handleImageChange} />
                                </FormGroup>
                            </Col>
                            <Col md={12}>
                                <FormGroup>
                                    <Label for="address">Address</Label>
                                    <Input
                                        type="text"
                                        name="address"
                                        placeholder='Enter Your Address'
                                        id="address"
                                        value={Data.address} 
                                        onChange={(e) => handleInputChange(e, 200)} 
                                    />
                                </FormGroup>
                            </Col>

                            <Col md={12}>
                                <FormGroup>
                                    <Label for="rLocationArea">Discription</Label>
                                    <Input
                                        type="textarea"
                                        name="property"
                                        id="property"
                                        placeholder='Enter your Description'
                                        value={Data.property} 
                                        onChange={(e) => handleInputChange(e, 200)} 
                                    />
                                </FormGroup>
                            </Col>


                        </Row>
                        <Button color="primary" type="button" className="ml-3" onClick={handleSubmit} disabled={loader}>{data.id ? "Update" : "Submit"}</Button>

                    </Form>
                    <div>
                        <div className="mt-4">
                            {imageFile && (
                                <img
                                    src={URL.createObjectURL(imageFile)}
                                    alt="Selected"
                                    style={{ width: '200px' }}
                                />
                            )}
                        </div>
                    </div>
                </div>
            </div>


        </Fragment>
    )
}

export default AddNewPost