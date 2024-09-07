import React, { Fragment,useState, useEffect } from 'react'
import { Button, Col, FormGroup, Input, Label, Row , Form} from 'reactstrap'
import { API_URL } from '../../../../config';
import Swal from 'sweetalert2';
import moment from 'moment';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux'


const AddAdvertisementForm = ({GetAllAdvertisementAction,data,toggleModal}) => {
    // selected services
    const options = [
        { value: 'Date', label: 'Date' },
        { value: 'Name', label: 'Name' },
        { value: 'Designation', label: 'Designation' },
    ];

    const dispatch =useDispatch();
    const [loader, setLoader] = useState(false);
    const [imageFile, setImageFile] = useState(null);
    const [Data, setFormData] = useState({
        company_name: data.company_name || '',
        gst_no: data.gst_no || '',
        payment: data.payment || '', 
        mobile: data.mobile || '',
        start_date: data.start_date ? moment(data.start_date, "DD-MM-YYYY").format("YYYY-MM-DD") : null,
        end_date: data.end_date ? moment(data.end_date, "DD-MM-YYYY").format("YYYY-MM-DD") : null
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
            }
            const formData = new FormData();
            // Append existing formdata
            for (const key in newFormData) {
                formData.append(key, newFormData[key]);
            }
            var apiUrl=""
            if(data.id!=null){
                apiUrl = `${API_URL}/manage-website/advertisements/update/${data.id}`;
           }else{
               apiUrl = `${API_URL}/manage-website/advertisements/create`;
           }

        axios.post(apiUrl, formData)
			.then(response => {
				if (response.status === 200) {
                    setLoader(false)
                    dispatch(GetAllAdvertisementAction())
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
                                    <Label for="department">Company Name</Label>
                                    {/* <SelectBox options={options} /> */}
                                    <Input type='text' name='company_name'
                                    onChange={(e) => handleInputChange(e, 50)} 
                                     value={Data.company_name} placeholder='Enter Your Company Name' onKeyPress={handleKeyPress}/>
                                </FormGroup>
                            </Col>
                            <Col md={6}>
                                <FormGroup>
                                    <Label for="designation">GST No.</Label>
                                    {/* <SelectBox options={options} /> */}
                                    <Input type='text'
                                    name='gst_no' 
                                    onChange={(e) => handleInputChange(e, 15)} 
                                    value={Data.gst_no}
                                    placeholder='Enter Your GST No.'/>
                                </FormGroup>
                            </Col>
                            <Col md={6}>
                                <FormGroup>
                                    <Label for="payment">Payment</Label>
                                    {/* <SelectBox options={options} /> */}
                                    <Input type='number' name='payment'
                                     onChange={(e) => handleInputChange(e, 10)} 
                                     value={Data.payment}
                                     placeholder='Enter Your Payment'/>
                                </FormGroup>
                            </Col>
                            <Col md={6}>
                                <FormGroup>
                                    <Label for="contact">Mobile No.</Label>
                                    {/* <SelectBox options={options} /> */}
                                    <Input type='number' name='mobile'
                                   onChange={(e) => handleInputChange(e, 10)} 
                                   value={Data.mobile}
                                    placeholder='Enter Your Mobile No.'/>
                                </FormGroup>
                            </Col>
                            <Col md={6}>
                                <FormGroup>
                                    <Label for="fromdate">From Date</Label>
                                    {/* <SelectBox options={options} /> */}
                                    <Input type='date' name='start_date'
                                    onChange={(e) => handleInputChange(e, 50)} 
                                     value={Data.start_date}/>
                                </FormGroup>
                            </Col>
                            <Col md={6}>
                                <FormGroup>
                                    <Label for="enddate">End Date</Label>
                                    {/* <SelectBox options={options} /> */}
                                    <Input type='date' name='end_date' 
                                    onChange={(e) => handleInputChange(e, 50)} 
                                     value={Data.end_date} />
                                </FormGroup>
                            </Col>
                            <Col md={6}>
                                <FormGroup>
                                    <Label for="image">Select Image</Label>
                                    <Input
                                        type="file"
                                        name="image"
                                        id="image"
                                        onChange={handleImageChange}
                                    />
                                </FormGroup>
                            </Col>
                        </Row>
                        <Button color="primary" type="button" className="ml-3" onClick={handleSubmit} disabled={loader}> {data.id ? "Update" :"submit"}</Button>
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


export default AddAdvertisementForm