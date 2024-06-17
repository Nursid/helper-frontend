import { Container, Select, MenuItem, Button } from '@mui/material';
import React, { useState } from 'react';
import { Col, Input, Row } from 'reactstrap';
import { API_URL } from '../../config';
import axios from 'axios';
import Swal from 'sweetalert2';
const ManagePost = ({registerId}) => {
    const [imageFile, setImageFile] = useState(null);
    const [Data, setFormData] = useState({
        type: 'buy',
        property: '',
        name: '',
        mobile: '',
        address: '',
        from_date: '',
        end_date: '',
        refrance_name: ''
    });

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


    const handleSubmit = async (event) => {
        // event.preventDefault();
        try {
            const newFormData = {
                ...Data,
                image: imageFile,
                cust_id: registerId
            }
            const formData = new FormData();
            // Append existing formdata
            for (const key in newFormData) {
                formData.append(key, newFormData[key]);
            }

        axios.post(`${API_URL}/post/create`, formData)
			.then(response => {
				if (response.status === 200) {
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
        } catch (error) {
            console.error('Error:', error.message);
        }
    };

    return (
        <Container maxWidth='md' sx={{ paddingY: 2 }}>
            <Row>
                <Col xs={12}>
                    <div className="card">
                        <div className="card-body text-center">
                            <form>

                                <div className='text-left'>
                                    <Row className="mb-4">
                                        <Col style={{ display: 'grid', placeItems: 'center' }}>
                                            <div className="form-outline mb-4">
                                                <label className="form-label" htmlFor="form3Example1">Upload Post Image</label>
                                                <Input type='file' onChange={handleImageChange} />
                                            </div>
                                        </Col>
                                        <Col style={{ display: 'grid', placeItems: 'center' }}>
                                            <div className="form-outline mb-4">
                                                <img
                                                    src={"https://www.investopedia.com/thmb/OQxvtmsJwBCy6kVw86E-ooDRVqs=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/rent_house_73089751-5bfc333346e0fb002602ddbe.jpg"}
                                                    alt="avatar"
                                                    className="img-fluid"
                                                    style={{ width: '250px', height: '150px' }}

                                                />
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row className="mb-4">
                                        <Col>
                                            <div className="form-outline mb-4">
                                                <label className="form-label" htmlFor="stateSelect">Type</label>
                                                <Select id="stateSelect" name="type" className="form-control" value={Data.type} onChange={handleInputChange}>
                                                    <MenuItem value="buy" >Buy</MenuItem>
                                                    <MenuItem value="sell">Sell</MenuItem>
                                                    <MenuItem value="rent">Rent</MenuItem>
                                                </Select>
                                            </div>
                                        </Col>
                                        <Col>
                                            <div className="form-outline mb-4">
                                                <label className="form-label" htmlFor="form3Example1">Property</label>
                                                <Input type="text" id="form3Example1" name="property" placeholder='Enter Your Property' className="form-control" value={Data.property} onChange={handleInputChange} />
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row className="mb-4">
                                        <Col>
                                            <div className="form-outline mb-4">
                                                <label className="form-label" htmlFor="form3Example1">Name</label>
                                                <Input type="text" id="form3Example1" name="name"  placeholder ="Enter Your Name " className="form-control" value={Data.name} onChange={handleInputChange} />
                                            </div>
                                        </Col>
                                        <Col>
                                            <div className="form-outline mb-4">
                                                <label className="form-label" htmlFor="form3Example1">Mobile</label>
                                                <Input type="number" id="form3Example1" name="mobile"  placeholder="Enter Your Mobile" className="form-control" value={Data.mobile} onChange={handleInputChange} />
                                            </div>
                                        </Col>
                                    </Row>
                                    <Row className="mb-4">
                                        <Col>
                                            <div className="form-outline mb-4">
                                                <label className="form-label" htmlFor="form3Example1">From Date</label>
                                                <Input type="date" id="form3Example1" name="from_date"  placeholder ="From Date " className="form-control" value={Data.from_date} onChange={handleInputChange} />
                                            </div>
                                        </Col>
                                        <Col>
                                            <div className="form-outline mb-4">
                                                <label className="form-label" htmlFor="form3Example1">End  Date</label>
                                                <Input type="date" id="form3Example1" name="end_date"  placeholder="End Date" className="form-control" value={Data.end_date} onChange={handleInputChange} />
                                            </div>
                                        </Col>
                                    </Row>

                                    <Row className="mb-4">
                                        <Col>
                                            <div className="form-outline mb-4">
                                                <label className="form-label" htmlFor="form3Example1">Address</label>
                                                <Input type="text" id="form3Example1" name="address"  placeholder ="Enter Your Address " className="form-control" value={Data.address} onChange={handleInputChange} />
                                            </div>
                                        </Col>
                                        <Col>
                                            <div className="form-outline mb-4">
                                                <label className="form-label" htmlFor="form3Example1">Ref. Name</label>
                                                <Input type="text" id="form3Example1" name="refrance_name"  placeholder="Enter Ref. Name" className="form-control" value={Data.refrance_name} onChange={handleInputChange} />
                                            </div>
                                        </Col>
                                    </Row>
                                    <Button type="button" onClick={handleSubmit} variant='contained' className="mb-4 btn-block"> Add Post</Button>
                                </div>
                            </form>
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

export default ManagePost;
