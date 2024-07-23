import React, { useEffect } from 'react'

import { useNavigate } from 'react-router-dom'
import { useUserRoleContext } from '../../Context/RolesContext'
import { CiGrid41, CiViewList } from 'react-icons/ci';
import { GiPayMoney } from 'react-icons/gi';
import { TbReport } from 'react-icons/tb';
import { MdOutlinePeople, MdPeopleOutline } from 'react-icons/md';
import { CgWebsite } from 'react-icons/cg';
import { FaPeopleCarry } from 'react-icons/fa';
import { FaRegClock } from "react-icons/fa";
import { MdReportProblem } from "react-icons/md";

const AdminNavItems = () => {
    const { userRole, setUserRole, UserRoleCalled } = useUserRoleContext();

    const navigate = useNavigate()
    const NavItems = [
        { field: "Dashboard", title: "Dashboard", icon: <CiViewList size={30} /> },
        { field: "Expenses", title: "Account", icon: <GiPayMoney size={30} /> },
        { field: "Attendence", title: "Attendance", icon: <TbReport size={30} /> },
        { field: "ManageHR", title: "Manage HR", icon: <MdPeopleOutline size={30} /> },
        { field: "ManageService", title: "Manage Master", icon: <CiGrid41 size={30} /> },
        { field: "ManagePage", title: "Manage Website", icon: <CgWebsite size={30} /> },
        { field: "Customer", title: "Customer", icon: <FaPeopleCarry size={30} /> },
      
        { field: "RolesAndPermission", title: "Roles & Permission", icon: <MdOutlinePeople size={30}    
        />
    },
    { field: "Complain", title: "Complain", icon: <MdReportProblem size={30} /> },
    { field: "Availability", title: "Availability", icon: <FaRegClock size={30}    
        />
    },
    ]

    return (
        <div>
            <h3 className='pl-4 pt-4 pb-2 text-white  headingBelowBorder fw-bold' style={{ maxWidth: "fit-content" }}>Welcome To Helper Dashboard</h3>
            <div className="AllMenuCards">
                {NavItems.filter(x => userRole ? userRole[x.field] : false === true).map((item, index) => (
                    <div onClick={() => navigate(item.title !== "" ? `/admin/${item.title.toLocaleLowerCase().split(" ").join("-")}` : "/admin")} className={`${""} d-flex cursor-p bg-white  text-blue hoverShadow hoverPrimary flex-column align-items-center justify-content-center gap-1 border rounded-3`}>
                       {console.log(NavItems)}
                        {item.icon}
                        <h6 className='text-center'>{item.title}</h6>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default AdminNavItems