import React, { Fragment, useEffect, useState } from 'react';
import { Button, Col, FormGroup, Input, Label, Row } from 'reactstrap';
import { ClockLoader } from 'react-spinners';
import axios from 'axios';
import { API_URL } from '../../../config';
import Swal from 'sweetalert2';
import { useAuth } from '../../../Context/userAuthContext';

const ResetPassword = ({toggle}) => {
    const [password, setPassword] = useState('');
    const { currentUser, setCurrentUser } = useAuth();
    const [confirmPassword, setConfirmPassword] = useState('');
    const [currentPassword, setCurrentPassword] = useState('');
    const [loader, setLoader] = useState(false);
    const [errors, setErrors] = useState([])
    const token = currentUser.token


    const onsubmitPassword = async (e) => {
        // Add your password reset logic here
        e.preventDefault();
        setLoader(true)
        let errors = {};

        if (!currentPassword) {
                errors.currentPassword = "current Password is required";
            }
        if (!confirmPassword) {
                errors.confirmPassword = "Confirm Password is required";

            }
        if (!password) {
                errors.password = " New password is required";
            }

        if(password !== confirmPassword){
            Swal.fire('New Password and Confirm Password Should be Match', '', 'error');
            setLoader(false)
            return;
        }
        
        if (errors && Object.keys(errors).length === 0) {
            // Form is valid, handle form submission here
            console.log("Form submitted successfully!");
            setLoader(false)
        } else {
        // Form is invalid, display validation errors
        console.log("Validation Errors:", errors);
        setErrors(errors);
        setLoader(false)
        return false;
        }

        const data =  {
            password: password,
            confirmPassword: confirmPassword,
            currentPassword: currentPassword,
            email: currentUser?.email
        }

        try {
            const response = await axios.put(`${API_URL}/admin/reset-password`, data,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
            );
            if (response.status === 200) {
              Swal.fire('Updated!', response.data.message, 'success');
              toggle()
            } else {
              Swal.fire(response.data.message, '', 'error');
            }
            setCurrentPassword('') 
            setConfirmPassword('') 
            setPassword('') 
          } catch (error) {
            Swal.fire('Failed to update, try again', '', 'error');
            console.error('Error:', error);
          }
    };

    return (
        <Fragment>
        <Row>
        <Col md={12}>
            <FormGroup>
            <Label for="newPassword">Email</Label>
                <Input 
                    type="email" 
                    name="email" 
                    id="email"
                    value={currentUser?.email}
                    readOnly={true}
                />
             </FormGroup>
             </Col>
            
          <Col md={12}>
            <FormGroup>
            <Label for="newPassword">Current Password <span style={{ color: "red" }}> *</span></Label>
                <Input 
                    type="password" 
                    name="current_password" 
                    id="current_password"
                    value={currentPassword}
                    placeholder="current password"
                    onChange={(e) => setCurrentPassword(e.target.value)}
                />
                {errors?.currentPassword && (
							<span className='validationError'>
								{errors?.currentPassword}
							</span>
						)}
             </FormGroup>
             </Col>
             <Col md={12}>
                 <FormGroup >
                        <Label for="newPassword">New Password <span style={{ color: "red" }}> *</span></Label>
                        <Input 
                            type="password" 
                            name="newPassword" 
                            id="newPassword"
                            value={password}
                            placeholder="New password"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        {errors?.password && (
							<span className='validationError'>
								{errors?.password}
							</span>
						)}
                    </FormGroup>
            </Col>
            <Col md={12}>
            <FormGroup>
                <Label for="confirmPassword">Confirm Password <span style={{ color: "red" }}> *</span></Label>
                <Input 
                    type="password" 
                    name="confirmPassword" 
                    id="confirmPassword"
                    value={confirmPassword}
                    placeholder="Confirm password"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
                {errors?.confirmPassword && (
							<span className='validationError'>
								{errors?.confirmPassword}
							</span>
						)}
            </FormGroup>
            </Col>

            <Button 
                type="button" 
                className="bg-primary w-100"
                onClick={onsubmitPassword}
                disabled={loader}
            >
                Change Password
            </Button>
            </Row>
        </Fragment>
    );
};

export default ResetPassword;
