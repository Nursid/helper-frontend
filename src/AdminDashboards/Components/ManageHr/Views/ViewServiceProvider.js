// import moment from "moment"
// import { IMG_URL } from "../../../../config"
// export default function ViewServiceProvider({data,toggleModal}) {

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
//                     <img width={150} className='img-thumbnail' src={IMG_URL+data?.image ?? ''} />
//                     </div>
//                 </div>
//                 </div>
//             <div class="row">
//                 <div class="col-md-6">
//                     <div class="form-group">
//                         <label class="form-label">Username</label>
//                         <p className="form-control">{data?.username ?? '-'}</p>
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
//                         <p class="form-control">{data?.location ?? ''}</p>
//                     </div>
//                 </div>

//                 <div class="col-md-12">
//                     <div class="form-group">
//                         <h6 className='fw-bold fs-5 pb-3'>Services</h6>
//                                         <div className="AddServieProvder_services">
//                                             <div className="AddServieProvder_services">
//                                                 {data?.sp_services && data?.sp_services.length > 0 ? (
//                                                     data?.sp_services.map((item, index) => (
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

export default function ViewServiceProvider({ data, toggleModal }) {
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
                    width={100}
                    height={100}
                    className="img-thumbnail"
                    src={IMG_URL + data?.image?? ""}
                    alt="Service Provider"
                  />
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-6">
                <ul className="list-group">
                  <li className="list-group-item">
                    <span className="fw-bold">Username:</span> {data?.username?? "-"}
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
                </ul>
              </div>
              <div className="col-md-6">
                <ul className="list-group">
                  <li className="list-group-item">
                    <span className="fw-bold">Address:</span> {data?.location?? ""}
                  </li>
                  <li className="list-group-item">
                    <span className="fw-bold">Services:</span>
                    <div className="d-flex flex-wrap">
                      {data?.sp_services && data?.sp_services.length > 0? (
                        data?.sp_services.map((item, index) => (
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
                    </div>
                  </li>
                  <li className="list-group-item">
                    <span className="fw-bold">About:</span> {data?.about?? ""}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
