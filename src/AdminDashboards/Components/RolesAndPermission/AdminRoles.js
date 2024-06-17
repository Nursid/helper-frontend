import { Switch } from '@mui/material'
import React, { Fragment, useEffect, useState } from 'react'
import { Card, Col, Row } from 'reactstrap'
import { API_URL, roles } from '../../../config'
import Swal from 'sweetalert2'
import axios from 'axios'

const AdminRoles = ({ adminRoles }) => {
    const [subAttendance, setSubAttendance] = useState(false)
    const [subExpense, setSubExpense] = useState(false)
    const [subCustomer, setSubCustomer] = useState(false)
    const [subHr, setSubHr] = useState(false)
    const [subServices, setSubServices] = useState(false)
    const [subWebsite, setSubWebsite] = useState(false)
    const [adminRolesData, setAdminRolesData] = useState(null)


    const role = roles.admin

    const handleTheUpdateRoles = (role, field, value) => {
        Swal.fire({
            title: 'Are you sure?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Change it'
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await axios.get(API_URL + `/roles/update/${role}/${field}/${!value}`)
                    if (response.status === 200) {
                        setAdminRolesData(response.data.data)
                        Swal.fire(
                            'Updated!',
                            'Field has Updated',
                            'success'
                        )
                    } else {

                    }
                } catch (error) {
                    console.log(error)
                }


            }
        })
    }


    let AllRoles;
    if (adminRolesData) {
        AllRoles = [Object.keys(adminRolesData).filter(x => ["_id", "role", "Profile", "__v"].includes(x) === false)]
    }


    useEffect(() => {
        setAdminRolesData(adminRoles)
    }, [adminRoles])
    return (
        <Fragment>
            <div className='p-3'>
                <Card className='bg-glass p-3 mt-2'>
                    <h5 className='text-light p-3'>Roles & Permission (<span className='text-primary'>{adminRolesData && adminRolesData.role ? adminRolesData.role : ""}</span>)</h5>
                    <Row>
                        {/* {console.log(AllRoles)} */}
                        <Col md={12}>
                            <Card className='p-3 shadow-lg d-flex flex-column gap-3'>
                                {/* main role */}
                                {AllRoles ? AllRoles[0].map((item, index) => (
                                    <div className='permissionWithSwitch d-flex align-items-center justify-content-between'>
                                        <h6 className='Fw_600 text-blue'>{item}</h6>
                                        <Switch color="warning" checked={adminRolesData[item]} onChange={() => { handleTheUpdateRoles(role, item, adminRolesData[item]) }} />
                                    </div>
                                )) : ""}

                            </Card>

                        </Col>

                    </Row>
                </Card>
            </div>
        </Fragment>
    )
}

export default AdminRoles