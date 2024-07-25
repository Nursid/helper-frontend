import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Navbar from '../../Components/Navbar'
import Header from '../../Components/Header'
import Footer from '../../Components/Footer'
import axios from 'axios'
import { API_URL } from '../../config'
import { Button } from '@mui/material'
import MyProfile from './MyProfile'
import EditProfile from './EditProfile'
import ManagePost from './ManagePost'
import Swal from 'sweetalert2'
import FreeService from './FreeService'
import { isMobile, isMobileOnly } from 'react-device-detect'
import { AddComplainModal } from '../../Components/Modal'

const ProfileHistory = () => {
    const navigate = useNavigate();
    const [serviceData, setServiceData] = useState([]);
    const [currentUser, setCurrentUser] = useState(
        JSON.parse(sessionStorage.getItem('customer'))
    );
 

    useEffect(() => {
        axios.get(`${API_URL}/customer/getbyid/${currentUser.id}`)
            .then(response => {
                if (response.status === 200) {
                    setServiceData(response.data.data);
                    setActive('1')
                }
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, [currentUser]);    

    const [active, setActive] = useState('')
    const toggle = tab => {
        if (active !== tab) {
            setActive(tab)
        }
    }

    const GetLogOut = () => {
        sessionStorage.removeItem('user');
        setCurrentUser(null);
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Logout Successfully',
            showConfirmButton: false,
            timer: 1500,
        });
        navigate('/')
    };

    return (
        <div>
            <Navbar />
            <Header />
            <div>
                <div style={{ background: '#3d5ce8', borderRadius: '0px 0px 50px 50px', padding: '15px', textAlign: 'center' }}>
                    <Button active={active === '1'}
                        onClick={() => {
                            toggle('1')
                        }}
                        sx={{ color: active === '1' ? '#eedc30' : '#fff' }} >My Profile</Button>
                    <Button active={active === '2'}
                        onClick={() => {
                            toggle('2')
                        }}
                        sx={{ color: active === '2' ? '#eedc30' : '#fff' }} >Edit Profile</Button>
                    {serviceData.freeServices && serviceData.freeServices.length === 1 ? null : <Button active={active === '3'}
                        onClick={() => {
                            toggle('3')
                        }}
                        sx={{ color: active === '3' ? '#eedc30' : '#fff' }} >Free Services</Button>}
                    <Button active={active === '4'}
                        onClick={() => {
                            toggle('4')
                        }}
                        sx={{ color: active === '4' ? '#eedc30' : '#fff' }} >Manage Post</Button>

                    <Button
                        onClick={() => GetLogOut()}
                        sx={{ color: '#fff' }} >Logout</Button>
                </div>
            </div>
            {
                 active === '1' ? <MyProfile serviceData={serviceData} /> :
                    active === '2' ? <EditProfile serviceData={serviceData} /> :
                        active === '3' ? <FreeService  registerId={serviceData.user_id}/> :
                            active === '4' ? <ManagePost registerId={serviceData.user_id} /> : null
            } 
            {/* <div className={isMobile ? 'd-none' : 'mt-5'}>
                <Footer reqrem={'d-none'} hide={'d-none'}  />
            </div> */}
            <div className={isMobile ? 'd-none' : ''}>
                <Footer reqrem={'d-none'}/>
            </div>
        </div >
    )
}

export default ProfileHistory