import React from "react";
import moment from 'moment'
const MemberInvoice = React.forwardRef((props, ref) => {
    const { data } = props;
    
    return (
        <div className='container' style={{maxWidth: "210mm", margin: "0 auto"}} ref={ref}>
        
            <div className="container">
                <div className='d-flex flex-col justify-content-start .bg- w-100 mt-2'>
                    <img style={{ height: "70px" }} src='https://mytotalhelper.com/webcss/images/logo.jpg' alt='logo' />
                    <div className='m-auto'>

                        <h3 className='text-uppercase font-weight-bold .b m-0'>helper service</h3>
                        <p className='m-0'>A-1417,Sec-I,Ashiyana,Lucknow</p>
                        <p className='m-0'>Help Line No. : 0522-4300589,9682077000,9682066000</p>
                        <p className=''>Medical Help Line: 9839730378</p>
                    </div>

                </div>

            </div>

            <img src="https://i.pinimg.com/564x/d5/b0/4c/d5b04cc3dcd8c17702549ebc5f1acf1a.jpg" class="img-thumbnail float-end me-4 mb-4" alt="logo" height={200} width={200}></img>
            <div className="p-4">
                <table className="table table-bordered" >
                    <thead className="bg-secondary-subtle">
                        <tr>
                            <th className=" bg-secondary-subtle border boder-1 border-secondary" scope="col">Valid From</th>
                            <th className=" bg-secondary-subtle border boder-1 border-secondary" scope="col">N/A</th>

                            <th  className=" bg-secondary-subtle border border-1 border-secondary"scope="col">Valid To</th>

                            <th  className=" bg-secondary-subtle border border-1 border-secondary"scope="col">N/A</th>

                            <th className="bg-secondary-subtle border border-1 border-secondary" scope="col">Member Id</th>
                            <th className="bg-secondary-subtle border border-1 border-secondary" scope="col">{data?.member_id}</th>

                        </tr>
                    </thead>
                    <tbody className="">
                        <tr>
                            <th scope="row" className="p-3">Name</th>
                            <td colSpan={2} className="p-3">{data?.name ?? "N/A"}</td>
                            <th scope="row" className="p-3">Gender</th>
                            <td colSpan={2} className="p-3">{data?.gender ?? "N/A"}</td>
                        </tr>
                        <tr>
                            <th scope="row" className="p-3">Age</th>
                            <td colSpan={2} className="p-3">{data?.age ?? "N/A"}</td>
                            <th scope="row" className="p-3">Email</th>
                            <td colSpan={2} className="p-3">{data?.email ?? "N/A"}</td>
                        </tr>
                        <tr>
                            <th scope="row" className="p-3">Mobile No.</th>
                            <td colSpan={2} className="p-3">{data?.mobileno ?? "N/A"}</td>
                            <th scope="row" className="p-3">Tel No.</th>
                            <td colSpan={2} className="p-3">{data?.tel_no ?? "N/A"}</td>
                        </tr>
                        <tr>
                            <th scope="row" className="p-3">Office No.</th>
                            <td colSpan={2} className="p-3">{data?.office_no ?? "N/A"}</td>
                            <th scope="row" className="p-3">Alternate No.</th>
                            <td colSpan={2} className="p-3">{data?.alternate_no ?? "N/A"}</td>
                        </tr>
                        <tr>
                            <th scope="row" className="p-3">Aadhar No.</th>
                            <td colSpan={2} className="p-3">{data?.aadhar_no ?? "N/A"}</td>
                            <th scope="row" className="p-3">Occupation</th>
                            <td colSpan={2} className="p-3">{data?.occupation ?? "N/A"}</td>
                        </tr>
                        <tr>
                            <th scope="row" className="p-3">Designation</th>
                            <td colSpan={2} className="p-3">{data?.designation ?? "N/A"}</td>
                            <th scope="row" className="p-3">Location</th>
                            <td colSpan={2} className="p-3">{data?.location ?? "N/A"}</td>
                        </tr>
                        <tr>
                            <th scope="row" className="p-3">Own House</th>
                            <td colSpan={2} className="p-3">{data?.own_house ?? "N/A"}</td>
                            <th scope="row" className="p-3">Date Of Birth</th>
                            <td colSpan={2} className="p-3">{data?.dob ? moment(data.dob).format("DD-MM-YYYY") : "N/A"}</td>
                        </tr>
                        <tr>
                            <th scope="row" className="p-3">Service Name</th>
                            <td colSpan={2} className="p-3">{data?.service_name ?? "N/A"}</td>
                            <th scope="row" className="p-3">Service details</th>
                            <td colSpan={2} className="p-3">{data?.problem_des ?? "N/A"}</td>
                        </tr>
                        <tr>
                            <th scope="row" className="p-3">Payment method</th>
                            <td colSpan={2} className="p-3">{data?.paymethod ?? "N/A"}</td>
                            <th scope="row" className="p-3">Total Amount</th>
                            <td colSpan={2} className="p-3">{data?.netpayamt ?? "N/A"}</td>
                        </tr>
                        <tr>
                            <th scope="row" className="p-3">Paid Amount</th>
                            <td colSpan={2} className="p-3">{data?.piadamt ?? "N/A"}</td>
                            <th scope="row" className="p-3">Balance Amount</th>
                            <td colSpan={2} className="p-3">{data?.totalamt ?? "N/A"}</td>
                        </tr>
                        <tr>
                            <th scope="row" className="p-3">Spouse Name-1</th>
                            <td colSpan={2} className="p-3">{data?.spouse_name1 ?? "N/A"}</td>
                            <th scope="row" className="p-3">Spouse Date Of Birth</th>
                            <td colSpan={2} className="p-3">{data?.spouse_dob1 ? moment(data.spouse_dob1).format("DD-MM-YYYY") : "N/A"}</td>
                        </tr>
                        <tr>
                            <th scope="row" className="p-3">Spouse Name-2</th>
                            <td colSpan={2} className="p-3">{data?.spouse_name2 ?? "N/A"}</td>
                            <th scope="row" className="p-3">Spouse Date Of Birth</th>
                            <td colSpan={2} className="p-3">{data?.spouse_dob2 ? moment(data.spouse_dob2).format("DD-MM-YYYY") : "N/A"}</td>
                        </tr>
                        <tr>
                            <th scope="row" className="p-3">Spouse Name-3</th>
                            <td colSpan={2} className="p-3">{data?.spouse_name3 ?? "N/A"}</td>
                            <th scope="row" className="p-3">Spouse Date Of Birth</th>
                            <td colSpan={2} className="p-3">{data?.spouse_dob3 ? moment(data.spouse_dob3).format("DD-MM-YYYY") : "N/A"}</td>
                        </tr>
                        <tr>
                            <th scope="row" className="p-3">Address</th>
                            <td colSpan={2} className="p-3">{data?.address ?? "N/A"}</td>
                            <th scope="row" className="p-3">LandMark</th>
                            <td colSpan={2} className="p-3">{data?.land_mark ?? "N/A"}</td>
                        </tr>
                        <tr>
                            <th scope="row" className="p-3">Free Services-1</th>
                            <td colSpan={2} className="p-3">{data?.service1 ?? "N/A"}</td>
                            <th scope="row" className="p-3">Free-Services-2</th>
                            <td colSpan={2} className="p-3">{data?.service2 ?? "N/A"}</td>
                        </tr>
                        <tr>
                            <th scope="row" className="p-3">Free Services-3</th>
                            <td colSpan={2} className="p-3">{data?.service3 ?? "N/A"}</td>
                            <th scope="row" className="p-3">Free-Services-4</th>
                            <td colSpan={2} className="p-3">{data?.service4 ?? "N/A"}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
   );
});

export default MemberInvoice