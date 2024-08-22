import React from "react";

const MemberInvoice = React.forwardRef((props, ref) => {
    const { data } = props;

    console.log("data---m-", data);
    
    return (
        <>
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

                <table className=" table table-bordered " >
                    <thead className="bg-secondary-subtle">
                        <tr>

                            <th className=" bg-secondary-subtle border boder-1 border-secondary" scope="col">Valid From</th>
                            <th className=" bg-secondary-subtle border boder-1 border-secondary" scope="col">12-08-2024</th>

                            <th  className=" bg-secondary-subtle border border-1 border-secondary"scope="col">Valid To</th>
                            <th  className=" bg-secondary-subtle border border-1 border-secondary"scope="col">12-09-2024</th>
                            <th className="bg-secondary-subtle border border-1 border-secondary" scope="col">Member Id</th>
                            <th className="bg-secondary-subtle border border-1 border-secondary" scope="col">MN1001</th>
                        </tr>
                    </thead>
                    <tbody className="">
                        <tr>
                            <th scope="row">Name</th>
                            <td colSpan={2}>Mark</td>
                            <th scope="row">Gender</th>
                            <td colSpan={2}>male</td>
                        </tr>
                        <tr>
                            <th scope="row">Age</th>
                            <td colSpan={2}>Mark</td>
                            <th scope="row">Email</th>
                            <td colSpan={2}>@mdo</td>
                        </tr>

                        <tr>
                            <th scope="row">Mobile No.</th>
                            <td colSpan={2}>Mark</td>
                            <th scope="row">Tel No.</th>
                            <td colSpan={2}>@mdo</td>
                        </tr>
                        <tr>
                            <th scope="row">Office No.</th>
                            <td colSpan={2}>Mark</td>
                            <th scope="row">Alternate No.</th>
                            <td colSpan={2}>@mdo</td>
                        </tr>

                        <tr>
                            <th scope="row">Aadhar No. </th>
                            <td colSpan={2}>Mark</td>
                            <th scope="row">Occupation</th>
                            <td colSpan={2}>business</td>
                        </tr>
                        <tr>
                            <th scope="row">Designation</th>
                            <td colSpan={2}>Mark</td>
                            <th scope="row">Occupation</th>
                            <td colSpan={2}>business</td>
                        </tr>

                        <tr>
                            <th scope="row">Own House</th>
                            <td colSpan={2}>Mark</td>
                            <th scope="row">Date Of Birth</th>
                            <td colSpan={2}>business</td>
                        </tr>

                        <tr>
                            <th scope="row">Spouse Name-1</th>
                            <td colSpan={2}>Mark</td>
                            <th scope="row"> Spouse Date Of Birth</th>
                            <td colSpan={2}>business</td>
                        </tr>

                        <tr>
                            <th scope="row">Spouse Name-2</th>
                            <td colSpan={2}>Mark</td>
                            <th scope="row"> Spouse Date Of Birth</th>
                            <td colSpan={2}>business</td>
                        </tr>

                        <tr>
                            <th scope="row">Spouse Name-3</th>
                            <td colSpan={2}>Mark</td>
                            <th scope="row"> Spouse Date Of Birth</th>
                            <td colSpan={2}>business</td>
                        </tr>

                        <tr>
                            <th scope="row">Address</th>
                            <td colSpan={2}>Mark</td>
                            <th scope="row">LamdMark</th>
                            <td colSpan={2}>Mark</td>
                        </tr>

                        <tr>
                            <th scope="row">Location</th>
                            <td colSpan={2}>Mark</td>
                            <th scope="row">lko</th>
                            <td colSpan={2}>business</td>
                        </tr>

                        <tr>
                            <th scope="row">Discount Amount</th>
                            <td colSpan={2}>Mark</td>
                            <th scope="row">Received Amount</th>
                            <td colSpan={2}>business</td>
                        </tr>
                        <tr>
                            <th scope="row">Balance Amount</th>
                            <td colSpan={2}>Mark</td>
                            <th scope="row">Payment Amount</th>
                            <td colSpan={2}>business</td>
                        </tr>
                       
                        <tr>
                            <th scope="row">Free Services-1</th>
                            <td colSpan={2}>Mark</td>
                            <th scope="row">Free-Services-2</th>
                            <td colSpan={2}>business</td>
                        </tr>

                        <tr>
                            <th scope="row">Free Services-3</th>
                            <td colSpan={2}>Mark</td>
                            <th scope="row">Free-Services-4</th>
                            <td colSpan={2}>business</td>
                        </tr>

                        <tr>
                            <th scope="row">Extra Services-1</th>
                            <td colSpan={2}>Mark</td>
                            <th scope="row">Extra-Services-2</th>
                            <td colSpan={2}>business</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </>
   );
});

export default MemberInvoice