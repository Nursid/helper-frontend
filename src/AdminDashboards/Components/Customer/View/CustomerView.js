import moment from "moment";
import { IMG_URL } from "../../../../config";

export default function CustomerView({ data, toggleModal }) {
  console.log(data);
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
                    width={140}
                    height={120}
                    className="img-thumbnail"
                    src={IMG_URL + data?.image ?? ""}
                    alt="Customer"
                  />
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-6">
                <ul className="list-group">
                  <li className="list-group-item">
                    <span className="fw-bold">Name:</span>{" "}
                    {data?.NewCustomer?.name ?? ""}
                  </li>
                  <li className="list-group-item">
                    <span className="fw-bold">Age:</span> {data?.age ?? ""}
                  </li>
                  <li className="list-group-item">
                    <span className="fw-bold">Address:</span>{" "}
                    {data?.location ?? ""}
                  </li>
                  <li className="list-group-item">
                    <span className="fw-bold">Email:</span>{" "}
                    {data?.NewCustomer?.email ?? ""}
                  </li>
                  <li className="list-group-item">
                    <span className="fw-bold">Mobile:</span>{" "}
                    {data?.mobile ?? ""}
                  </li>
                  <li className="list-group-item">
                    <span className="fw-bold">Office No:</span>{" "}
                    {data?.office_no ?? ""}
                  </li>
                  <li className="list-group-item">
                    <span className="fw-bold">Aadhar No.:</span>{" "}
                    {data?.aadhar_no ?? ""}
                  </li>
                  <li className="list-group-item">
                    <span className="fw-bold">designation:</span>{" "}
                    {data?.designation ?? ""}
                  </li>
                  <li className="list-group-item">
                    <span className="fw-bold">dob:</span> {data?.dob ?? ""}
                  </li>
                  <li className="list-group-item">
                    <span className="fw-bold">ref_name:</span>{" "}
                    {data?.ref_name ?? ""}
                  </li>

                  <li className="list-group-item">
                    <span className="fw-bold">Payment:</span>{" "}
                    {data?.payment ?? ""}
                  </li>
                  <li className="list-group-item">
                    <span className="fw-bold">Recieved Amount:</span>{" "}
                    {data?.recieved_amount ?? "-"}
                  </li>

                  <li className="list-group-item">
                    <span className="fw-bold">Payment Method.:</span>{" "}
                    {data?.payment_method ?? ""}
                  </li>
                </ul>
              </div>
              <div className="col-md-6">
                <ul className="list-group">
                  <li className="list-group-item">
                    <span className="fw-bold">Membership:</span>{" "}
                    {data?.membership ?? "-"}
                  </li>

                  <li className="list-group-item">
                    <span className="fw-bold">Gender:</span>{" "}
                    {data?.gender ?? "-"}
                  </li>
                  <li className="list-group-item">
                    <span className="fw-bold"> Member Id:</span>{" "}
                    {data?.member_id ?? ""}
                  </li>
                  <li className="list-group-item">
                    <span className="fw-bold">Alternate No:</span>{" "}
                    {data?.alternate_no ?? "-"}
                  </li>
                  <li className="list-group-item">
                    <span className="fw-bold">Landmark:</span>{" "}
                    {data?.land_mark ?? "-"}
                  </li>
                  <li className="list-group-item">
                    <span className="fw-bold">Occupation:</span>{" "}
                    {data?.occupation ?? ""}
                  </li>
                  <li className="list-group-item">
                    <span className="fw-bold"> Own House:</span>{" "}
                    {data?.own_house ?? ""}
                  </li>
                  <li className="list-group-item">
                    <span className="fw-bold">DOA:</span> {data?.doa ?? ""}
                  </li>

                  <li className="list-group-item">
                    <span className="fw-bold">Membership:</span>{" "}
                    {data?.updatedAt ?? ""}
                  </li>
                  <li className="list-group-item">
                    <span className="fw-bold">Family Member:</span>{" "}
                    {data?.familyMember ?? ""}
                  </li>
                  {/* <li className="list-group-item">
                    <span className="fw-bold">Family Member:</span>{" "}
                    {data?.discount_amount ?? ""}
                  </li> */}
                  <li className="list-group-item">
                    <span className="fw-bold">Balance Amount:</span>{" "}
                    {data?.balance_amount ?? ""}
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
