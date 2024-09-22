
import moment from "moment";
import { IMG_URL } from "../../../../config";
import {BiLogoWhatsapp} from "react-icons/bi";
import { Button } from "reactstrap";
import { useReactToPrint } from 'react-to-print';
import React, { useRef } from "react";


export default function ViewEmployee({ data, toggleModal }) {

  const  customerRef = useRef()
  const handlePrint = useReactToPrint({
    content: () => customerRef.current,
  });

  
  return (
    // <div className="container rounded bg-white">
    //   <div className="row">
    //     <div className="col-md-12 py-3">
    //       <div className="info-view">
    //         <div className="row">
    //           <div className="col-md-6">
    //             <h2 className="eventViewhead">
    //               <i className="bi bi-circle-fill circleIcon"></i> Details
    //             </h2>
    //           </div>
    //           <div className="col-md-6 d-flex justify-content-end">
    //             <div className="form-group">
    //               <img
    //                 width={100}
    //                 height={100}
    //                 className="img-thumbnail"
    //                 src={IMG_URL + data?.image ?? ""}
    //                 alt="Employee"
    //               />
    //             </div>
    //           </div>
    //         </div>

    //         <div className="row">
    //           <div className="col-md-6">
    //             <ul className="list-group">
    //               <li className="list-group-item">
    //                 <span className="fw-bold">Department Name:</span> {data?.department?.name ?? "-"}
    //               </li>
    //               <li className="list-group-item">
    //                 <span className="fw-bold">Designation Name:</span> {data?.designation?.name ?? ""}
    //               </li>
    //               <li className="list-group-item">
    //                 <span className="fw-bold">Name:</span> {data?.name ?? ""}
    //               </li>
    //               <li className="list-group-item">
    //                 <span className="fw-bold">Mobile:</span> {data?.mobile_no ?? ""}
    //               </li>
    //               <li className="list-group-item">
    //                 <span className="fw-bold">Email:</span> {data?.email ?? ""}
    //               </li>
    //               <li className="list-group-item">
    //                 <span className="fw-bold">Aadhar No.:</span> {data?.aadhar_no ?? ""}
    //               </li>
    //               <li className="list-group-item">
    //                 <span className="fw-bold">PAN No.:</span> {data?.pan_no ?? ""}
    //               </li>
    //               <li className="list-group-item">
    //                 <span className="fw-bold">Join Date:</span> {moment(data.doj).format("DD-MM-YYYY") ?? ""}
    //               </li>
    //               <li className="list-group-item">
    //                 <span className="fw-bold">Address:</span> {data?.address ?? ""}
    //               </li>
    //             </ul>
    //           </div>
    //           <div className="col-md-6">
    //             <ul className="list-group">
    //               {/* <li className="list-group-item">
    //                 <span className="fw-bold">Join Date:</span> {moment(data.doj).format("DD-MM-YYYY") ?? ""}
    //               </li>
    //               <li className="list-group-item">
    //                 <span className="fw-bold">Address:</span> {data?.address ?? ""}
    //               </li> */}
    //               <li className="list-group-item">
    //                 <span className="fw-bold">Services:</span>
    //                 <div className="d-flex flex-wrap">
    //                   {data?.empservices && data?.empservices.length > 0 ? (
    //                     data?.empservices.map((item, index) => (
    //                       <span
    //                         key={index}
    //                         className="m-2 py-2 px-3 border rounded-2 cursor-p form-control"
    //                       >
    //                         {item.service_name}
    //                       </span>
    //                     ))
    //                   ) : (
    //                     <span>No Services</span>
    //                   )}
    //                 </div>
    //               </li>
    //               <li className="list-group-item">
    //                 <span className="fw-bold">Salary:</span> {data?.salary ?? ""}
    //               </li>
    //               <li className="list-group-item">
    //                 <span className="fw-bold">Week Off:</span> {data?.week_off ?? ""}
    //               </li>
    //               <li className="list-group-item">
    //                 <span className="fw-bold">Duty Hours:</span> {data?.duty_hours ?? ""}
    //               </li>
    //               <li className="list-group-item">
    //                 <span className="fw-bold">About:</span> {data?.about ?? ""}
    //               </li>
    //               <li className="list-group-item">
    //                 <span className="fw-bold">Verified By:</span> {data?.v_name ?? ""}
    //               </li>
    //               <li className="list-group-item">
    //                 <span className="fw-bold">Verified Date:</span> {data?.v_date ?? ""}
    //               </li>
    //             </ul>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>
    <>
    <div className="p-2 mx-auto" ref={customerRef}>
		
    <div className="text-center mb-4 d-flex justify-content-between gap-2 p-4">
      <img src='/Helper.png'
        alt="Logo 1"
        className="img-fluid "
        width={100}
        height={80}/>
      <div className="d-flex flex-column">
        <div className="display-3 fw-bold mb-2"
          style={
            {fontSize: '10rem'}
        }>Helper</div>
        <div className="text-center mb-4">
          <p className="fw-bold mb-1 fs-1">For Your Services</p>
          <p className="fw-normal fs-3">Address: 2/6, Heeru Villa Rajani Khand, Sharda Nagar, Lucknow - 226012</p>
          <p className="fw-normal fs-3">9682077000,
            <BiLogoWhatsapp color="#25D366"
              size={32}/>
            7307676622,05224300589</p>
        </div>
      </div>
      
    </div>

    <h3 className="text-center justify-content-center"> Employee Registration</h3>
    <hr className="border border-dark mt-2"/> 


    {/* Personal Information Section */}
    <div className="d-flex justify-content-between">
      {/* Left Column */}
      <div className="w-100 ">
        <div className="row mb-3">
          {/* Date and Name */}

          <div className="col-6">

          <div className="d-flex flex-row align-items-center position-relative">
            <p className="fw-bold mb-0 me-2">Department:</p>
            <hr className="border border-dark mt-4 flex-grow-1" />
            <span className="position-absolute start-50 translate-middle bg-white text-dark px-2">{data?.dept_name ?? ""}</span>
            </div>
     
          <div className="d-flex flex-row align-items-center position-relative">
          <p className="fw-bold mb-0 me-2">Join Date:</p>
          <hr className="border border-dark mt-4 flex-grow-1" />
          <span className="position-absolute start-50 translate-middle bg-white text-dark px-2">
          { moment(data?.createdAt).format("DD-MM-YYYY") ?? ""}
          </span>
          </div>
           
          </div>


          <div className="col-6">
       
            <div className="d-flex flex-row align-items-center position-relative">
          <p className="fw-bold mb-0 me-2">Designation:</p>
          <hr className="border border-dark mt-4 flex-grow-1" />
          <span className="position-absolute start-50 translate-middle bg-white text-dark px-2">
          { data?.design_name ?? ""}
          </span>
          </div>

            <div className="d-flex flex-row align-items-center position-relative">
            <p className="fw-bold mb-0 me-2">Name:</p>
            <hr className="border border-dark mt-4 flex-grow-1" />
            <span className="position-absolute start-50 translate-middle bg-white text-dark px-2">{data?.name ?? ""}</span>
            </div>
          </div>

          {/* Mobile and Alternate Mobile */}
          <div className="col-6">

            <div className="d-flex flex-row align-items-center position-relative">
            <p className="fw-bold mb-0 me-2">Mobile:</p>
            <hr className="border border-dark mt-4 flex-grow-1" />
            <span className="position-absolute start-50 translate-middle bg-white text-dark px-2"> {data?.mobile_no ?? ""}</span>
            </div>

            <div className="d-flex flex-row align-items-center position-relative">
            <p className="fw-bold mb-0 me-2">Alternate No:</p>
            <hr className="border border-dark mt-4 flex-grow-1" />
            <span className="position-absolute start-50 translate-middle bg-white text-dark px-2"> {data?.alterno ?? ""}</span>
            </div>

          </div>

          <div className="col-6">
          <div className="d-flex flex-row align-items-center position-relative">
            <p className="fw-bold mb-0 me-2">Pan No:</p>
            <hr className="border border-dark mt-4 flex-grow-1" />
            <span className="position-absolute start-50 translate-middle bg-white text-dark px-2"> {data?.pan_no ?? ""}</span>
            </div>

            <div className="d-flex flex-row align-items-center position-relative">
            <p className="fw-bold mb-0 me-2">Email:</p>
            <hr className="border border-dark mt-4 flex-grow-1" />
            <span className="position-absolute start-50 translate-middle bg-white text-dark px-2">{data?.email ?? ""}</span>
            </div>

          </div>

          <div className="col-6">
          <div className="d-flex flex-row align-items-center position-relative">
            <p className="fw-bold mb-0 me-2">Gender:</p>
            <hr className="border border-dark mt-4 flex-grow-1" />
            <span className="position-absolute start-50 translate-middle bg-white text-dark px-2"> {data?.gender ?? ""}</span>
            </div>  

            <div className="d-flex flex-row align-items-center position-relative">
            <p className="fw-bold mb-0 me-2"> Salary:</p>
            <hr className="border border-dark mt-4 flex-grow-1" />
            <span className="position-absolute start-50 translate-middle bg-white text-dark px-2">{data?.salary ?? ""}</span>
            </div>

          </div>
                      

          <div className="col-6">

          <div className="d-flex flex-row align-items-center position-relative">
            <p className="fw-bold mb-0 me-2">Aadhaar:</p>
            <hr className="border border-dark mt-4 flex-grow-1" />
            <span className="position-absolute start-50 translate-middle bg-white text-dark px-2">  {data?.aadhar_no ?? ""}</span>
            </div>


            <div className="d-flex flex-row align-items-center position-relative">
            <p className="fw-bold mb-0 me-2">Duty Hours:</p>
            <hr className="border border-dark mt-4 flex-grow-1" />
            <span className="position-absolute start-50 translate-middle bg-white text-dark px-2">{data?.duty_hours ?? ""}</span>
            </div>
            
          </div>

        

          {/* Aadhar Number */}
          <div className="col-12">
          <div className="d-flex flex-row align-items-center position-relative">
            <p className="fw-bold mb-0 me-2">Week off:</p>
            <hr className="border border-dark mt-4 flex-grow-1" />
            <span className="position-absolute start-50 translate-middle bg-white text-dark px-2">{data?.week_off ?? ""}</span>
            </div>

          </div>

        </div>
      </div>

      {/* Right Column */}
              <div className="col-3 d-flex justify-content-center align-items-center mb-md-0">
          <div className="w-75 h-75 border border-dark d-flex justify-content-center align-items-center position-relative">
    <div
    className="position-relative text-center"
    style={{
      width: '100%', // Adjust width to fit your needs
      height: '100%', // Adjust height to fit your needs
    }}
    >
    { data?.image && <img
      className="img-thumbnail w-100 h-100" // Set to full width and height
      src={IMG_URL + data?.image ?? ""}
      alt="Customer"
      style={{
      objectFit: 'cover', // Ensures the image covers the area without distortion
      }}
    />
    }
    </div>
          </div>
      </div>
    </div>

<div className="col-12 d-flex flex-row justify-content-between ">


  <div className="d-flex flex-row align-items-center position-relative">
    <p className="fw-bold mb-0 me-2">Father Name:</p>
    <span className=" bg-white text-dark px-2 border-bottom border-dark">  {data?.f_name ?? ""}</span>
    </div>


  <div className="d-flex flex-row align-items-center">
    <p className="fw-bold mb-0 me-2">Father Mobile:</p>
    <span className="bg-white text-dark px-2 border-bottom border-dark">  {data?.f_mobile ?? ""}</span>

    </div>


      <div className="d-flex flex-row align-items-center">
      <p className="fw-bold mb-0 me-2">Mother Name:</p>
     
      <span className="bg-white text-dark px-2 border-bottom border-dark">{data?.m_name ?? ""}</span>
      </div>

      <div className="d-flex flex-row align-items-center position-relative">
      <p className="fw-bold mb-0 me-2">Mother Name:</p>
      <span className=" bg-white text-dark px-2 border-bottom border-dark">{data?.m_name ?? ""}</span>
      </div>
  
</div>

    {/* Address Section */}
    <div className="row g-3 mb-4">
      {/* <div className="col"> */}

              <div className="col-12 mt-0 ml-2">
      <div className="d-flex flex-row align-items-center position-relative">
            <p className="fw-bold mb-0 me-2">Address:</p>
            <hr className="border border-dark mt-4 flex-grow-1" />
            <span className="position-absolute start-50 translate-middle bg-white text-dark px-2">{data?.address ?? ""}</span>
            </div>
          </div>
      </div>
    <div className="p-2">

    <div className="d-flex flex-row align-items-center position-relative">
            <p className="fw-bold mb-0 me-2">About:</p>
            <hr className="border border-dark mt-4 flex-grow-1" />
            <span className="position-absolute start-50 translate-middle bg-white text-dark px-2">{data?.about ?? ""}</span>
            </div>

                          <div className="d-flex justify-content-between gap-5 align-items-center mx-auto" style={{ width: 'fit-content' }}>
                             
                              <div className="d-flex align-items-center gap-3">
                              <p className="fw-bold me-3 fs-4">Verified By:-</p>
                                  <p className="fs-5 fw-bold">Name</p>
                                  <div className=" bg-white"> {data?.v_name ?? ""} </div>
                              </div>
                              <div className="d-flex align-items-center gap-3">
                                  <p className="fs-5 fw-bold">Date</p>
                                  <div className="bg-white"> {data?.v_date ?? ""} </div>
                              </div>
                              </div>

                    </div>
                    <div className="d-flex justify-content-center">
                      <Button color="primary" onClick={handlePrint}>Print</Button>
                    </div>

  </div>
    </>
  );
}
