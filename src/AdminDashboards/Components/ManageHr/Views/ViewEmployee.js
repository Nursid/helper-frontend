import moment from "moment"
import { IMG_URL } from "../../../../config"
export default function ViewEmployee({data,toggleModal}) {

	return (
		<>
			<div class="container rounded bg-white">
                <div class="row">
    <div class="col-md-12 py-3">
        <div class="info-view">
            <div className="row">
                <div className="col-md-6">
            <h2 class="eventViewhead"><i class="bi bi-circle-fill circleIcon"></i>Details</h2>
            </div>
              <div class="col-md-6 d-flex justify-content-end">
                    <div class="form-group">
                    <img width={150} height={150} className='img-thumbnail' src={IMG_URL+data?.image ?? ''} />
                    </div>
                </div>
                </div>
            <div class="row">
                <div class="col-md-6">
                    <div class="form-group">
                        <label class="form-label">Department Name</label>
                        <p className="form-control">{data?.department?.name ?? '-'}</p>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="form-group">
                        <label class="form-label">Designation Name </label>
                        <p class="form-control">{data?.designation?.name ?? ''}</p>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="form-group">
                        <label class="form-label">Name</label>
                        <p class="form-control">{data?.name ?? ''}</p>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="form-group">
                        <label class="form-label">Mobile</label>
                        <p class="form-control">{data?.mobile_no ?? ''}</p>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="form-group">
                        <label class="form-label">Email</label>
                        <p class="form-control">{data?.email ?? ''}</p>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="form-group">
                        <label class="form-label">Aadhar No.</label>
                        <p class="form-control">{data?.aadhar_no ?? ''}</p>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="form-group">
                        <label class="form-label">PAN No.</label>
                        <p class="form-control">{data?.pan_no ?? ''}</p>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="form-group">
                        <label class="form-label">Join Date</label>
                        <p class="form-control">{moment(data.doj).format("DD-MM-YYYY") ?? ''}</p>
                    </div>
                </div>
                <div class="col-md-12">
                    <div class="form-group">
                        <label class="form-label">Address</label>
                        <p class="form-control">{data?.address ?? ''}</p>
                    </div>
                </div>
                <div class="col-md-12">
                    <div class="form-group">
                        {/* <p class="form-control">{data?.address ?? ''}</p> */}
                        <h6 className='fw-bold fs-5 pb-3'>Services</h6>
                                        <div className="AddServieProvder_services">
                                            <div className="AddServieProvder_services">
                                                {data?.empservices && data?.empservices.length > 0 ? (
                                                    data?.empservices.map((item, index) => (
                                                        <span
                                                            className="py-2 px-3 border rounded-2 cursor-p form-control"
                                                        >
                                                            {item.service_name}
                                                        </span>
                                                    ))
                                                ) : (
                                                    <span>No Services</span>
                                                )}
                                            </div>

                                        </div>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="form-group">
                        <label class="form-label">Salary</label>
                        <p class="form-control">{data?.salary ?? ''}</p>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="form-group">
                        <label class="form-label">Week Off</label>
                        <p class="form-control">{data?.week_off ?? ''}</p>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="form-group">
                        <label class="form-label">Duty Hours</label>
                        <p class="form-control">{data?.duty_hours ?? ''}</p>
                    </div>
                </div>

                <div class="col-md-12">
                    <div class="form-group">
                        <label class="form-label">About</label>
                        <p class="form-control">{data?.about ?? ''}</p>
                    </div>
                </div>
            
            </div>
        </div>
    </div>
</div>

			</div>
		</>
	)
}
