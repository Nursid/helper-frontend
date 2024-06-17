import { createContext, useContext, useEffect, useState } from "react";
import { API_URL } from "../config";
import axios from "axios";

const roles = {
    super: "super",
    admin: "admin",
    office: "office",
    service: "service",
    supervisor: "supervisor"
}


const RolesContext = createContext()

const RolesProvider = ({ children }) => {

    const [activeUser, setActiveUser] = useState(null)
    const [userRole, setUserRole] = useState(
        JSON.parse(sessionStorage.getItem("roles"))
    )
    // every roles
    const [adminRoles, setAdminRoles] = useState(null)
    const [supervisorRoles, setSupervisorRoles] = useState(null)
    const [backOfficeRoles, setBackOfficeRoles] = useState(null)
    const [serviceProviderRoles, setServiceProviderRoles] = useState(null)


    // Role retrieval function
    const getRolesByType = async (roleType) => {
        try {
            const response = await axios.get(`${API_URL}/roles/get/${roleType}`);
            if (response.status === 200) {
                return response.data.data;
            }
        } catch (error) {
            console.log(error);
        }
    };

    const UserRoleCalled = async (Role) => {
        const role = Role ? Role : sessionStorage.getItem("role");
        if (role) {
            const rolesData = await getRolesByType(role);
            if (rolesData) {
                sessionStorage.setItem("roles", JSON.stringify(rolesData));
                setUserRole(rolesData);
                // console.log(rolesData);
            }
        }
    };

    // Use the useEffect hook to call UserRoleCalled when the person logs in for the first time
    useEffect(() => {
        UserRoleCalled();
    }, []);

    // Use the useEffect hook to call other role retrieval functions on component mount
    useEffect(() => {
        getAdminRoles();
        getSupervisorRole();
        GetBackofficeRoles();
        GetServiceProvider();
    }, []);

    // Other role retrieval functions
    const getAdminRoles = async () => {
        const rolesData = await getRolesByType("admin");
        if (rolesData) {
            setAdminRoles(rolesData);
        }
    };

    const getSupervisorRole = async () => {
        const rolesData = await getRolesByType("supervisor");
        if (rolesData) {
            setSupervisorRoles(rolesData);
        }
    };

    const GetBackofficeRoles = async () => {
        const rolesData = await getRolesByType("office");
        if (rolesData) {
            setBackOfficeRoles(rolesData);
        }
    };

    const GetServiceProvider = async () => {
        const rolesData = await getRolesByType("service");
        if (rolesData) {
            setServiceProviderRoles(rolesData);
        }
    };



    return <RolesContext.Provider value={{
        UserRoleCalled,
        userRole,
        activeUser,
        setUserRole,
        supervisorRoles,
        backOfficeRoles,
        serviceProviderRoles,
        adminRoles,
        setActiveUser,
        getAdminRoles,
        getSupervisorRole,
        GetBackofficeRoles,
        GetServiceProvider,
    }}>
        {children}
    </RolesContext.Provider>
}




const useUserRoleContext = () => {
    return useContext(RolesContext)
}


export { RolesProvider, useUserRoleContext }