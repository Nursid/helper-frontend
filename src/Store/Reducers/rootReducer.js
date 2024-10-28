import { combineReducers } from "redux";
import SeviceAddReducer from "./Dashboard/ServiceAddReducer";
import GetAllServicesReducer from "./Dashboard/GetAllServicesReducer";
import ImageUploadReducer from "./ImageUploadReducers";
import GetLogInReducers from "./LandingPage/AuthReducer";
import DeleterTheServiceReducer from "./Dashboard/DeleteServiceReducer";
import GetSearchReducer from "./LandingPage/SearchReducer";
import GetEmployeeRegReducer from "./Dashboard/EmployeeReducers/EmployeeRegReducer";
import GetAllEmployeeDataReducer from "./Dashboard/EmployeeReducers/GetAllEmployeeReducer";
import GetAllServiceProviderReducer from "./Dashboard/Authentication/AllServiceProviderReducer";
import GetAllCustomerReducer from "./CustomersReducers.js/GetAllCustomerReducers";
import GetAllEnquiryReducer from "./CustomersReducers.js/GetAllEnquiryReducers";
import GetAllMembersReducer from "./CustomersReducers.js/GetAllMembersReducer";
import GetCustomerUpdateReducer from "./CustomersReducers.js/GetCustomerUpdateReducer";
import { GetAddHeadExpReducers, GetAllHeadExpReducer, GetAddExpenseReducer, GetAddCollectionReducer, GetAllExpenseReducers, GetAllCollectionReducers } from "./Dashboard/ExpensesReducers/headExpReducers";
import GetAllOrderReducer from "./Dashboard/OrderReducers/GetAllOrderReducer";
import GetAllMonthlyServiceDataReducer from "./Dashboard/EmployeeReducers/GetAllMonthlyServiceReducer";
import { GetAllTestimonialsReducer,GetAllPostReducer,GetAllOfferReducer,GetAllAdvertisementReducer } from "./Dashboard/ManageWebstiteReducers/TestimonialsReducers";
// import { GetAllOrdersByID } from "../Actions/Dashboard/Orders/OrderAction";
import { GetAllOrderByIdReducer, GetAllTimeSlotReducer } from "./Dashboard/OrderReducers/GetAllOrderReducer";
import {GetAllInventryReducers,GetAllAllotedItemReducers} from "./Dashboard/GetAllInventryReducers";
import GetALLLastServicesReducers from "./CustomersReducers.js/GetALLLastServicesReducers"
import AccountReducers from "./Dashboard/AccountReducers";
import AvailabilityReducers from "./Dashboard/AvailabilityReduces";

import AttendanceReducers from "./Dashboard/AttendanceReducers";
import { ServiceProviderAttendanceReducers, AttendanceReportReducers, ServiceProviderAttendanceReportReducers } from "./Dashboard/AttendanceReducers";
import SupervisorAvailabilityReducers from '../Reducers/Dashboard/SupervisorAvailabilityReducers'


const rootReducer = combineReducers({
    SeviceAddReducer: SeviceAddReducer,
    GetAllServicesReducer: GetAllServicesReducer,
    ImageUploadReducer: ImageUploadReducer,
    DeleterTheServiceReducer: DeleterTheServiceReducer,
    GetEmployeeRegReducer: GetEmployeeRegReducer,
    GetAllMonthlyServiceDataReducer:GetAllMonthlyServiceDataReducer,
    GetAllEmployeeDataReducer: GetAllEmployeeDataReducer,
    GetAllServiceProviderReducer: GetAllServiceProviderReducer,
    GetAllCustomerReducer: GetAllCustomerReducer,
    GetAllEnquiryReducer:GetAllEnquiryReducer,
    GetAllMembersReducer:GetAllMembersReducer,
    GetCustomerUpdateReducer: GetCustomerUpdateReducer,
    GetAddHeadExpReducers: GetAddHeadExpReducers,
    GetAllHeadExpReducer: GetAllHeadExpReducer,
    GetAddExpenseReducer: GetAddExpenseReducer,
    GetAddCollectionReducer: GetAddCollectionReducer,
    GetAllExpenseReducers: GetAllExpenseReducers,
    GetAllCollectionReducers: GetAllCollectionReducers,
    GetLogInReducers: GetLogInReducers,
    GetSearchReducer: GetSearchReducer,
    GetAllOrderReducer:GetAllOrderReducer,
    GetAllTestimonialsReducer: GetAllTestimonialsReducer,
    GetAllOrderByIdReducer:GetAllOrderByIdReducer,
    GetAllPostReducer:GetAllPostReducer,
    GetAllOfferReducer:GetAllOfferReducer,
    GetAllAdvertisementReducer:GetAllAdvertisementReducer,
    GetAllInventryReducers:GetAllInventryReducers,
    GetAllAllotedItemReducers:GetAllAllotedItemReducers,
    GetALLLastServicesReducers:GetALLLastServicesReducers,
    AccountReducers:AccountReducers,
    AvailabilityReducers: AvailabilityReducers,
    GetAllTimeSlotReducer: GetAllTimeSlotReducer,
    AttendanceReducers: AttendanceReducers,
    ServiceProviderAttendanceReducers: ServiceProviderAttendanceReducers,
    AttendanceReportReducers: AttendanceReportReducers,
    SupervisorAvailabilityReducers:SupervisorAvailabilityReducers,
    ServiceProviderAttendanceReportReducers: ServiceProviderAttendanceReportReducers
})



export default rootReducer