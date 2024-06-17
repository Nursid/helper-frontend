import moment from "moment"
import { IMG_URL } from "../../../../config"
export default function CustomerView({data,toggleModal}) {

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
                    <img width={150} className='img-thumbnail' src={IMG_URL+data?.image ?? ''} />
                    </div>
                </div>
                </div>
            <div class="row">
                <div class="col-md-6">
                    <div class="form-group">
                        <label class="form-label">Membership</label>
                        <p className="form-control">{data?.membership ?? '-'}</p>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="form-group">
                        <label class="form-label">Name</label>
                        <p class="form-control">{data?.NewCustomer?.name ?? ''}</p>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="form-group">
                        <label class="form-label">Mobile</label>
                        <p class="form-control">{data?.mobile ?? ''}</p>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="form-group">
                        <label class="form-label">Email</label>
                        <p class="form-control">{data?.NewCustomer?.email ?? ''}</p>
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
                        <label class="form-label">Age</label>
                        <p class="form-control">{data?.age ?? ''}</p>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="form-group">
                        <label class="form-label">Join Date</label>
                        <p class="form-control">{moment(data?.NewCustomer?.create_date).format("DD-MM-YYYY") ?? ''}</p>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="form-group">
                        <label class="form-label">Address</label>
                        <p class="form-control">{data?.location ?? ''}</p>
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
