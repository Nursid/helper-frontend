import React, { Fragment } from 'react'
import AdminHeader from './Components/AdminHeader';
import AdminDashboard from './AdminDashboard';

const AdminPannel = () => {
    return (
        <Fragment>
            <AdminHeader />
            <AdminDashboard />
        </Fragment>
    )
}

export default AdminPannel;