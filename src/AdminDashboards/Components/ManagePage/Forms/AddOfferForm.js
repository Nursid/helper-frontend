import React, { Fragment,useState, useEffect } from 'react'
import { Button, Col, FormGroup, Input, Label, Row } from 'reactstrap'
import { API_URL } from '../../../../config';
import Swal from 'sweetalert2';
import moment from 'moment';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux'

const AddOfferForm = ({GetAllOfferAction,data,toggleModal}) => {
    const dispatch =useDispatch();
    const [loader, setLoader] = useState(false);
    const [imageFile, setImageFile] = useState(null);
    const [description, setDescription] = useState(data.description || '');
    const handleSubmit =()=> {
        setLoader(true)
        try{
        const formData =new FormData();
        formData.append("image",imageFile);
        formData.append("description",description)

        var apiUrl=""
            if(data.id!=null){
                apiUrl = `${API_URL}/manage-website/offer/update/${data.id}`;
           }else{
               apiUrl = `${API_URL}/manage-website/offer/create`;
           }
        axios.post(apiUrl, formData)
			.then(response => {
				if (response.status === 200) {
                    setLoader(false)
                    dispatch(GetAllOfferAction())
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
    }


   
    
    return (
        <Fragment>
            <Row>
                <Col md={12}>
                    <FormGroup>
                        <Label for="image">Image</Label>
                        <Input
                            type="file"
                            name="image"
                            id="image"
            onChange={(e)=>{setImageFile(e.target.files[0])}}
                        />
                    </FormGroup>
                </Col>
                <Col md={12}>
                    <FormGroup>
                        <Label for="disc">Discription</Label>
                        <Input type='textarea' name='description' placeholder='Discription' value={description} onChange={(e)=>{setDescription(e.target.value)}} />
                    </FormGroup>
                </Col>
                <Button className='text-blue bg-primary' onClick={handleSubmit} disabled={loader}>  { data.id ? "Update": "Submit"}</Button>
            </Row>
        </Fragment>
    )
}

export default AddOfferForm