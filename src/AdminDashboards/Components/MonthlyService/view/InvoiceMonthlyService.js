import React from 'react';
import {BiLogoWhatsapp} from "react-icons/bi";
import { FaLocationDot } from "react-icons/fa6";
import moment from 'moment';

const InvoiceMonthlyService = React.forwardRef((props, ref) => {
  const { data } = props;
  const currentDate = new Date().toLocaleString('en-US', {
    timeZone: 'Asia/Kolkata', // Specify the desired time zone
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: true, // Display time in 12-hour format
  });

    return (
      <>
       
<div className='container d-flex flex-column justify-content-between' style={{ maxWidth: "210mm", margin: "0 auto", height: "100vh" }} ref={ref}>
  {/* Main Content */}
  <div>
    <div className="row">
      <div className="receipt-main col-xs-10 col-sm-10 col-md-6 col-xs-offset-1 col-sm-offset-1 col-md-offset-3 w-100">
        <div className="row">
          <div className="receipt-header d-flex">
            <div className="col-md-8">
              <div className="receipt-left">
                <div className=''>
                  <img
                    className="img-responsive mr-4"
                    alt="iamgurdeeposahan"
                    src="/main_logo.jpg"
                    width={300}
                  />
                </div>
               
                <figcaption>
                  <cite title="Source Title"><FaLocationDot size={16} /> 2/6, Heeru Villa Rajani Khand, Sharda Nagar, Lucknow - 226012</cite>
                </figcaption>
                <figcaption>
                  <cite title="Source Title">9682077000,
                    <BiLogoWhatsapp color="#25D366" size={20} />
                    7307676622, 05224300589
                  </cite>
                </figcaption>
                <p style={{ color: 'blue' }}>www.ssquickhelper.com</p>
              </div>
            </div>
            <div className="col-md-6 text-right">
              <div className="receipt-right">
                <h2>Monthly Service INVOICE</h2>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="receipt-header receipt-header-mid d-flex">
            <div className="col-xs-6 col-sm-6 col-md-6 text-left">
              <div className="">
                <h4>{data?.cust_name ? data.cust_name.charAt(0).toUpperCase() + data.cust_name.slice(1).toLowerCase() : ''}</h4>
                <p>
                  <b>Mobile :</b> {data?.mobile_no}
                </p>
                <p>
                  <b>Address :</b> {data.location}, {data.land_mark}, {data.near_by}
                </p>
                <p>
                  <b>Mohalla :</b> {data.mohalla}
                </p>
                <p>
                  <b>Booking Date :</b> {moment(data.feesPaidDateTime).format('DD-MM-YYYY')}
                </p>
              </div>
            </div>
            <div className="col-xs-6 col-sm-6 col-md-6">
              <div className="receipt-left">
                <p><b>Date :</b> {currentDate}</p>
                <p><b>Service Type :</b> {data?.serviceServeType}</p>
                <p><b>Valid From :</b> {moment(data.feesPaidDateTime).format('DD-MM-YYYY')}</p>
                <p><b>Valid To :</b> {moment (new Date(new Date(data.feesPaidDateTime).getTime() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString()).format('DD-MM-YYYY')}</p>
              </div>
            </div>
          </div>
        </div>

        <div>
          <table className="table table-bordered">
            <thead>
              <tr>
                {/* <th scope='col'>Order No.</th> */}
                <th scope='col'>Service Name</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                {/* <td>{data?.order_no}</td> */}
                <td>{data?.serviceType}</td>
              </tr>
              <tr>
                <td className="text-right">
                  <p><strong>Payment Method:</strong></p>
                  <p><strong>Billing Amount:</strong></p>
                  <p><strong>Paid Amount:</strong></p>
                  <p><strong>Balance Amount:</strong></p>
                </td>
                <td>
                  <p><strong>{data?.paymethod}</strong></p>
                 <p><strong>{data?.netpayamt}</strong></p>
                  <p><strong>{data?.piadamt}</strong></p>
                 
                        <p><strong>{data?.totalamt}</strong></p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>

  {/* Footer */}
  <div className="row mt-auto mb-4">
    <div className="col-xs-8 col-sm-8 col-md-8 text-left">
      <div>
        <h5 style={{ color: 'rgb(140, 140, 140)' }}>Thank you for choosing Helper!</h5>
      </div>
    </div>
  </div>
</div>

      </>
     );
    });
export default InvoiceMonthlyService;
