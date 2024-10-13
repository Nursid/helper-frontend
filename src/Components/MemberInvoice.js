import React from "react";
import moment from 'moment';
import {BiLogoWhatsapp} from "react-icons/bi";
import { FaLocationDot } from "react-icons/fa6";

const MemberInvoice = React.forwardRef((props, ref) => {
    const { data } = props;
    
    return (
        <div className='container mt-5' style={{maxWidth: "210mm", margin: "0 auto"}} ref={ref}>
        
            <div className="container">
                <div className='d-flex flex-col justify-content-start .bg- w-100 mt-2'>
                    <img style={{ height: "70px" }}  src="/main_logo.jpg" alt='logo' />
                    <div className='m-auto'>

                        <h3 className='text-uppercase font-weight-bold .b m-0'>helper service</h3>
                        <figcaption>
                  <cite title="Source Title">
                    <FaLocationDot size={16} /> 2/6, Heeru Villa Rajani Khand, Sharda Nagar, Lucknow - 226012</cite>
                </figcaption>
                <figcaption>
                  <cite title="Source Title">9682077000,
                    <BiLogoWhatsapp color="#25D366" size={20} />
                    7307676622, 05224300589
                  </cite>
                </figcaption>
                    </div>

                </div>

            </div>

            <img src="https://i.pinimg.com/564x/d5/b0/4c/d5b04cc3dcd8c17702549ebc5f1acf1a.jpg" class="img-thumbnail float-end me-4 mb-4" alt="logo" height={200} width={200}></img>
            <div className="p-2">
                <table className="table table-bordered" >
                    <thead className="bg-secondary-subtle">
                        <tr>
                           <th scope="row" className="p-3 fixed-width-name">Valid From</th>
                            <td colSpan={2} className="p-3 fixed-width-data"></td>
                            <th scope="row" className="p-3 fixed-width-name">Valid To</th>
                            <td colSpan={2} className="p-3 fixed-width-data"></td>

                        </tr>
                    </thead>
                    <tbody className="">
                        <tr>
                            <th scope="row" className="p-3 fixed-width-name">Name</th>
                            <td colSpan={2} className="p-3 fixed-width-data">{data?.name ?? ""}</td>
                            <th scope="row" className="p-3 fixed-width-name">Gender</th>
                            <td colSpan={2} className="p-3 fixed-width-data">{data?.gender ?? ""}</td>
                        </tr>
                        <tr>
                            <th scope="row" className="p-3">Age</th>
                            <td colSpan={2} className="p-3">{data?.age ?? ""}</td>
                            <th scope="row" className="p-3">Email</th>
                            <td colSpan={2} className="p-3">{data?.email ?? ""}</td>
                        </tr>
                        <tr>
                            <th scope="row" className="p-3">Mobile No.</th>
                            <td colSpan={2} className="p-3">{data?.mobileno ?? ""}</td>
                            <th scope="row" className="p-3">Non Member Id</th>
                            <td colSpan={2} className="p-3">{data?.member_id ?? ""}</td>
                        </tr>
                        <tr>
                            <th scope="row" className="p-3">Office No.</th>
                            <td colSpan={2} className="p-3">{data?.office_no ?? ""}</td>
                            <th scope="row" className="p-3">Alternate No.</th>
                            <td colSpan={2} className="p-3">{data?.alternate_no ?? ""}</td>
                        </tr>
                        <tr>
                            <th scope="row" className="p-3">Aadhar No.</th>
                            <td colSpan={2} className="p-3">{data?.aadhar_no ?? ""}</td>
                            <th scope="row" className="p-3">Occupation</th>
                            <td colSpan={2} className="p-3">{data?.occupation ?? ""}</td>
                        </tr>
                        <tr>
                            <th scope="row" className="p-3">Designation</th>
                            <td colSpan={2} className="p-3">{data?.designation ?? ""}</td>
                            <th scope="row" className="p-3">Location</th>
                            <td colSpan={2} className="p-3">{data?.location ?? ""}</td>
                        </tr>
                        <tr>
                            <th scope="row" className="p-3">Own House</th>
                            <td colSpan={2} className="p-3">{data?.own_house ?? ""}</td>
                            <th scope="row" className="p-3">Date Of Birth</th>
                            <td colSpan={2} className="p-3">{data?.dob ? moment(data.dob).format("DD-MM-YYYY") : ""}</td>
                        </tr>
                        <tr>
                            <th scope="row" className="p-3">Service Name</th>
                            <td colSpan={2} className="p-3">{data?.service_name ?? ""}</td>
                            <th scope="row" className="p-3">Service details</th>
                            <td colSpan={2} className="p-3">{data?.problem_des ?? ""}</td>
                        </tr>
                        <tr>
                            <th scope="row" className="p-3">Service Provider Name</th>
                            <td colSpan={2} className="p-3">{data?.servicep_id ?? ""}</td>
                            <th scope="row" className="p-3">Supervisor Name</th>
                            <td colSpan={2} className="p-3">{data?.suprvisor_id ?? ""}</td>
                        </tr>
                        <tr>
                            <th scope="row" className="p-3">Payment method</th>
                            <td colSpan={2} className="p-3">{data?.paymethod ?? ""}</td>
                            <th scope="row" className="p-3">Total Amount</th>
                            <td colSpan={2} className="p-3">{data?.netpayamt ?? ""}</td>
                        </tr>
                        <tr>
                            <th scope="row" className="p-3">Paid Amount</th>
                            <td colSpan={2} className="p-3">{data?.piadamt ?? ""}</td>
                            <th scope="row" className="p-3">Balance Amount</th>
                            <td colSpan={2} className="p-3">{data?.totalamt ?? ""}</td>
                        </tr>
                        <tr>
                            <th scope="row" className="p-3">Spouse Name-1</th>
                            <td colSpan={2} className="p-3">{data?.spouse_name1 ?? ""}</td>
                            <th scope="row" className="p-3">Spouse Date Of Birth</th>
                            <td colSpan={2} className="p-3">{data?.spouse_dob1 ? moment(data.spouse_dob1).format("DD-MM-YYYY") : ""}</td>
                        </tr>
                        <tr>
                            <th scope="row" className="p-3">Spouse Name-2</th>
                            <td colSpan={2} className="p-3">{data?.spouse_name2 ?? ""}</td>
                            <th scope="row" className="p-3">Spouse Date Of Birth</th>
                            <td colSpan={2} className="p-3">{data?.spouse_dob2 ? moment(data.spouse_dob2).format("DD-MM-YYYY") : ""}</td>
                        </tr>
                        <tr>
                            <th scope="row" className="p-3">Spouse Name-3</th>
                            <td colSpan={2} className="p-3">{data?.spouse_name3 ?? ""}</td>
                            <th scope="row" className="p-3">Spouse Date Of Birth</th>
                            <td colSpan={2} className="p-3">{data?.spouse_dob3 ? moment(data.spouse_dob3).format("DD-MM-YYYY") : ""}</td>
                        </tr>
                        <tr>
                            <th scope="row" className="p-3">Address</th>
                            <td colSpan={2} className="p-3">{data?.service_address ?? ""}</td>
                            <th scope="row" className="p-3">LandMark</th>
                            <td colSpan={2} className="p-3">{data?.land_mark ?? ""}</td>
                        </tr>
                        <tr>
                            <th scope="row" className="p-3">Free Services-1</th>
                            <td colSpan={2} className="p-3">{data?.service1 ?? ""}</td>
                            <th scope="row" className="p-3">Free-Services-2</th>
                            <td colSpan={2} className="p-3">{data?.service2 ?? ""}</td>
                        </tr>
                        <tr>
                            <th scope="row" className="p-3">Free Services-3</th>
                            <td colSpan={2} className="p-3">{data?.service3 ?? ""}</td>
                            <th scope="row" className="p-3">Free-Services-4</th>
                            <td colSpan={2} className="p-3">{data?.service4 ?? ""}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
   );
});

export default MemberInvoice