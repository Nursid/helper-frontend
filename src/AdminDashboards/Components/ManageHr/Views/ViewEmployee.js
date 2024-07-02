
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
                    width={100}
                    height={100}
                    className="img-thumbnail"
                    src={IMG_URL + data?.image ?? ""}
                    alt="Employee"
                  />
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-6">
                <ul className="list-group">
                  <li className="list-group-item">
                    <span className="fw-bold">Department Name:</span> {data?.department?.name ?? "-"}
                  </li>
                  <li className="list-group-item">
                    <span className="fw-bold">Designation Name:</span> {data?.designation?.name ?? ""}
                  </li>
                  <li className="list-group-item">
                    <span className="fw-bold">Name:</span> {data?.name ?? ""}
                  </li>
                  <li className="list-group-item">
                    <span className="fw-bold">Mobile:</span> {data?.mobile_no ?? ""}
                  </li>
                  <li className="list-group-item">
                    <span className="fw-bold">Email:</span> {data?.email ?? ""}
                  </li>
                  <li className="list-group-item">
                    <span className="fw-bold">Aadhar No.:</span> {data?.aadhar_no ?? ""}
                  </li>
                  <li className="list-group-item">
                    <span className="fw-bold">PAN No.:</span> {data?.pan_no ?? ""}
                  </li>
                  <li className="list-group-item">
                    <span className="fw-bold">Join Date:</span> {moment(data.doj).format("DD-MM-YYYY") ?? ""}
                  </li>
                  <li className="list-group-item">
                    <span className="fw-bold">Address:</span> {data?.address ?? ""}
                  </li>
                </ul>
              </div>
              <div className="col-md-6">
                <ul className="list-group">
                  {/* <li className="list-group-item">
                    <span className="fw-bold">Join Date:</span> {moment(data.doj).format("DD-MM-YYYY") ?? ""}
                  </li>
                  <li className="list-group-item">
                    <span className="fw-bold">Address:</span> {data?.address ?? ""}
                  </li> */}
                  <li className="list-group-item">
                    <span className="fw-bold">Services:</span>
                    <div className="d-flex flex-wrap">
                      {data?.empservices && data?.empservices.length > 0 ? (
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
                    </div>
                  </li>
                  <li className="list-group-item">
                    <span className="fw-bold">Salary:</span> {data?.salary ?? ""}
                  </li>
                  <li className="list-group-item">
                    <span className="fw-bold">Week Off:</span> {data?.week_off ?? ""}
                  </li>
                  <li className="list-group-item">
                    <span className="fw-bold">Duty Hours:</span> {data?.duty_hours ?? ""}
                  </li>
                  <li className="list-group-item">
                    <span className="fw-bold">About:</span> {data?.about ?? ""}
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
