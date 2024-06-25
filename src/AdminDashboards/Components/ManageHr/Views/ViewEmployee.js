// import moment from "moment"
// import { IMG_URL } from "../../../../config"
// export default function ViewEmployee({data,toggleModal}) {

// 	return (
// 		<>
// 			<div class="container rounded bg-white">
//                 <div class="row">
//     <div class="col-md-12 py-3">
//         <div class="info-view">
//             <div className="row">
//                 <div className="col-md-6">
//             <h2 class="eventViewhead"><i class="bi bi-circle-fill circleIcon"></i>Details</h2>
//             </div>
//               <div class="col-md-6 d-flex justify-content-end">
//                     <div class="form-group">
//                     <img width={150} height={150} className='img-thumbnail' src={IMG_URL+data?.image ?? ''} />
//                     </div>
//                 </div>
//                 </div>
//             <div class="row">
//                 <div class="col-md-6">
//                     <div class="form-group">
//                         <label class="form-label">Department Name</label>
//                         <p className="form-control">{data?.department?.name ?? '-'}</p>
//                     </div>
//                 </div>
//                 <div class="col-md-6">
//                     <div class="form-group">
//                         <label class="form-label">Designation Name </label>
//                         <p class="form-control">{data?.designation?.name ?? ''}</p>
//                     </div>
//                 </div>
//                 <div class="col-md-6">
//                     <div class="form-group">
//                         <label class="form-label">Name</label>
//                         <p class="form-control">{data?.name ?? ''}</p>
//                     </div>
//                 </div>
//                 <div class="col-md-6">
//                     <div class="form-group">
//                         <label class="form-label">Mobile</label>
//                         <p class="form-control">{data?.mobile_no ?? ''}</p>
//                     </div>
//                 </div>
//                 <div class="col-md-6">
//                     <div class="form-group">
//                         <label class="form-label">Email</label>
//                         <p class="form-control">{data?.email ?? ''}</p>
//                     </div>
//                 </div>
//                 <div class="col-md-6">
//                     <div class="form-group">
//                         <label class="form-label">Aadhar No.</label>
//                         <p class="form-control">{data?.aadhar_no ?? ''}</p>
//                     </div>
//                 </div>
//                 <div class="col-md-6">
//                     <div class="form-group">
//                         <label class="form-label">PAN No.</label>
//                         <p class="form-control">{data?.pan_no ?? ''}</p>
//                     </div>
//                 </div>
//                 <div class="col-md-6">
//                     <div class="form-group">
//                         <label class="form-label">Join Date</label>
//                         <p class="form-control">{moment(data.doj).format("DD-MM-YYYY") ?? ''}</p>
//                     </div>
//                 </div>
//                 <div class="col-md-12">
//                     <div class="form-group">
//                         <label class="form-label">Address</label>
//                         <p class="form-control">{data?.address ?? ''}</p>
//                     </div>
//                 </div>
//                 <div class="col-md-12">
//                     <div class="form-group">
//                         {/* <p class="form-control">{data?.address ?? ''}</p> */}
//                         <h6 className='fw-bold fs-5 pb-3'>Services</h6>
//                                         <div className="AddServieProvder_services">
//                                             <div className="AddServieProvder_services">
//                                                 {data?.empservices && data?.empservices.length > 0 ? (
//                                                     data?.empservices.map((item, index) => (
//                                                         <span
//                                                             className="py-2 px-3 border rounded-2 cursor-p form-control"
//                                                         >
//                                                             {item.service_name}
//                                                         </span>
//                                                     ))
//                                                 ) : (
//                                                     <span>No Services</span>
//                                                 )}
//                                             </div>

//                                         </div>
//                     </div>
//                 </div>
//                 <div class="col-md-6">
//                     <div class="form-group">
//                         <label class="form-label">Salary</label>
//                         <p class="form-control">{data?.salary ?? ''}</p>
//                     </div>
//                 </div>
//                 <div class="col-md-6">
//                     <div class="form-group">
//                         <label class="form-label">Week Off</label>
//                         <p class="form-control">{data?.week_off ?? ''}</p>
//                     </div>
//                 </div>
//                 <div class="col-md-6">
//                     <div class="form-group">
//                         <label class="form-label">Duty Hours</label>
//                         <p class="form-control">{data?.duty_hours ?? ''}</p>
//                     </div>
//                 </div>

//                 <div class="col-md-12">
//                     <div class="form-group">
//                         <label class="form-label">About</label>
//                         <p class="form-control">{data?.about ?? ''}</p>
//                     </div>
//                 </div>
            
//             </div>
//         </div>
//     </div>
// </div>

// 			</div>
// 		</>
// 	)
// }


import moment from "moment";
import { IMG_URL } from "../../../../config";

export default function ViewEmployee({ data, toggleModal }) {
  return (
    <div className="container rounded bg-white">
      <div className="row">
        <div className="col-md-12 py-3">
          <div className="info-view">
            <div className="row">
              <div className="col-md-6">
                <h2 className="eventViewhead">
                  <i className="bi bi-circle-fill circleIcon"></i> Details
                </h2>
              </div>
              <div className="col-md-6 d-flex justify-content-end">
                <div className="form-group">
                  <img
                    width={150}
                    height={150}
                    className="img-thumbnail"
                    src={IMG_URL + data?.image ?? ""}
                    alt="Employee Image"
                  />
                </div>
              </div>
            </div>

            <ul className="list-group">
              <li className="list-group-item">
                <span className="fw-bold">Department Name:</span> {data?.department?.name ?? "-"}
              </li>
              <li className="list-group-item">
                <span className="fw-bold">Designation Name:</span> {data?.designation?.name ??""}
              </li>
              <li className="list-group-item">
                <span className="fw-bold">Name:</span> {data?.name?? ""}
              </li>
              <li className="list-group-item">
                <span className="fw-bold">Mobile:</span> {data?.mobile_no?? ""}
              </li>
              <li className="list-group-item">
                <span className="fw-bold">Email:</span> {data?.email?? ""}
              </li>
              <li className="list-group-item">
                <span className="fw-bold">Aadhar No.:</span> {data?.aadhar_no?? ""}
              </li>
              <li className="list-group-item">
                <span className="fw-bold">PAN No.:</span> {data?.pan_no?? ""}
              </li>
              <li className="list-group-item">
                <span className="fw-bold">Join Date:</span> {moment(data.doj).format("DD-MM-YYYY")?? ""}
              </li>
              <li className="list-group-item">
                <span className="fw-bold">Address:</span> {data?.address?? ""}
              </li>
              <li className="list-group-item">
                <span className="fw-bold">Services:</span>
                {data?.empservices && data?.empservices.length > 0? (
                  data?.empservices.map((item, index) => (
                    <span
                      key={index}
                      className="m-2 py-2 px-3 border rounded-2 cursor-p form-control"
                    >
                      {item.service_name}
                    </span>
                  ))
                ) : (
                  <span>No Services</span>
                )}
              </li>
              <li className="list-group-item">
                <span className="fw-bold">Salary:</span> {data?.salary?? ""}
              </li>
              <li className="list-group-item">
                <span className="fw-bold">Week Off:</span> {data?.week_off?? ""}
              </li>
              <li className="list-group-item">
                <span className="fw-bold">Duty Hours:</span> {data?.duty_hours?? ""}
              </li>
              <li className="list-group-item">
                <span className="fw-bold">About:</span> {data?.about?? ""}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}