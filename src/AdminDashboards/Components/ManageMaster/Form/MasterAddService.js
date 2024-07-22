import React, { useEffect, useState } from 'react'
import { Label, FormGroup, Input, Button } from "reactstrap";
import * as ALlIcon from "react-icons/fa"
import SelectBox from '../../../Elements/SelectBox';
import { useDispatch, useSelector } from 'react-redux';

import axios from 'axios';
import { API_URL } from '../../../../config';

import Swal from 'sweetalert2';
import { GetAllServices } from '../../../../Store/Actions/Dashboard/servicesAction';

import { BounceLoader } from 'react-spinners';

const MasterAddService = ({ ToggleMasterAddService , data}) => {

    const dispatch = useDispatch();
    const [Loading, setLoading] = useState(false);
    const [type, setType] = useState(data?.service_role || '')
    const serviceType= [
        {
            label: "Helper",
            value: "3"
        },
        {
            label: "Technician",
            value: "2"
        }
    ]
    const [formData, setFormData] = useState({
        serviceName: data?.serviceName || '',
        icon: data?.icon || null,
        image: data?.image || null,
        details: data?.details || '',
        service_role: data?.service_role || ''
    });

    const handlechange = (e, maxLenght) => {
        const { value, name } = e.target;
        if (value.length <= maxLenght) {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleImageUpload = (e, type) => {
        const file = e.target.files[0];
        setFormData({ ...formData, [type]: file });
    };

    const handleKeyPress = (e) => {
        const charCode = e.which || e.keyCode;
        const charStr = String.fromCharCode(charCode);
        if (!/^[a-zA-Z\s]+$/.test(charStr)) {
            e.preventDefault();
        }
    };

    const HandleSubmit = () => {
        const data2 = {
            ...formData,
            service_role: type?.value
        }
        
        setLoading(true);    
        const formDataSubmit = new FormData();
        formDataSubmit.append('serviceName', data2.serviceName);
        formDataSubmit.append('icon', data2.icon);
        formDataSubmit.append('image', data2.image);
        formDataSubmit.append('details', data2.details);
        formDataSubmit.append('service_role', data2.service_role);

        var apiUrl = "";
		if(data?.id!=null){
			 apiUrl = `${API_URL}/service/update/${data.id}`;
		}else{
			apiUrl = `${API_URL}/service/add`;
		}

        axios.post(apiUrl, formDataSubmit)
            .then(response => {
                console.log(response)
                setLoading(false);
                ToggleMasterAddService();
                Swal.fire(
                    'Successfully',
                    response.data.message,
                    'success'
                );
                dispatch(GetAllServices());
            })
            .catch(error => {
                setLoading(false);
                console.error('Error adding service:', error);
                Swal.fire(
                    'Error',
                    error,
                    'error'
                );
            });
    };

    return (
        <div className='position-relative'>
            <div className={`${Loading ? "d-flex" : "d-none"} align-items-center justify-content-center`} style={{ zIndex: "10", background: "rgba(0,0,0,0.6)", position: "absolute", top: "0", left: "0", width: "100%", height: "100%" }}>
                <BounceLoader
                    color="#fff83f"
                    loading={Loading}
                />
            </div>
            <FormGroup>
                <Label for="serviceName">Service Name</Label>
                <Input
                    type="text"
                    name="serviceName"
                    defaultValue={formData?.serviceName}
                    onChange={(e) => handlechange(e, 50)}
                    onKeyPress={handleKeyPress}
                    placeholder="Service Name"
                />
            </FormGroup>
            <FormGroup>
                <Label for="icon">Upload Icon</Label>
                <Input
                    type="file"
                    name="icon"
                    
                    onChange={(e) => handleImageUpload(e, 'icon')}
                />
            </FormGroup>
            <FormGroup>
                <Label for="image">Choose Image</Label>
                <Input
                    type="file"
                    name="image"
                    onChange={(e) => handleImageUpload(e, 'image')}
                />
            </FormGroup>
            <FormGroup>
                <Label for="details">Details (360 characters)</Label>
                <Input
                    type='textarea'
                    name='details'
                    defaultValue={formData?.details}
                    onChange={(e) => handlechange(e, 360)}
                    placeholder='Type details here...'
                />
            </FormGroup>
            <FormGroup>
                <Label for="details">Service Type</Label>
                <SelectBox
                    initialValue={type}
                    options={serviceType}
                    setSelcted={setType}
                />
            </FormGroup>
            <Button type='button' onClick={HandleSubmit}> {data?.id ? 'Update' : 'Submit'}</Button>
        </div>
    );
};
export default MasterAddService