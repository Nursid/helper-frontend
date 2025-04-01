import React, { Fragment, useEffect, useState } from 'react'
import AdminHeader from '../AdminHeader'
import AdminNavItems from '../../Elements/AdminNavItems'
import AnimatedBackground from '../../Elements/AnimatedBacground'
import { useUserRoleContext } from '../../../Context/RolesContext'
import { WaitLoader } from '../../Elements/WaitLoader'
import Earning from './Earning'

const AdminEarning = () => {

    const { userRole, setUserRole, UserRoleCalled } = useUserRoleContext();

    useEffect(() => {
        UserRoleCalled()
    }, [])

    return (
        !userRole ? <WaitLoader loading={true} /> :
            <Fragment>
                <AdminHeader />
                <div className='position-relative'>
                    <AnimatedBackground />
                    <div className='BackgroundTopContents'>
                        <AdminNavItems />
                        {/* <div className="AttendenceTabs px-3"> */}
                            <Earning />
                        {/* </div> */}
                    </div>
                </div>
            </Fragment>
    )
}

export default AdminEarning