import React from 'react';
import {BiLogoWhatsapp} from "react-icons/bi";
import { FaLocationDot } from "react-icons/fa6";
const Invoice = React.forwardRef((props, ref) => {
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
       <div className='container' style={{maxWidth: "210mm", margin: "0 auto"}} ref={ref}>
  {/* <div className='d-flex flex-col justify-content-start w-100 mt-2'>
    <img style={{height: "70px"}} src='https://mytotalhelper.com/webcss/images/logo.jpg' alt='logo' />
    <div className='m-auto text-center'>
      <h3 className='text-uppercase font-weight-bold m-0'>Helper Service</h3>
      <p className='m-0'>A-1417, Sec-I, Ashiyana, Lucknow</p>
      <p className='m-0'>Help Line No.: 0522-4300589, 9682077000, 9682066000</p>
      <p className='m-0'>Medical Help Line: 9839730378</p>
    </div>
  </div>
  <div className='container border border-1 mt-3'>
    <div className='row'>
      <div className='col-3 border border-1 p-3'>Customer Name</div>
      <div className='col-3 border border-1 p-3'>{data?.name}</div>
      <div className='col-3 border border-1 p-3 text-end'>Membership No.</div>
      <div className='col-3 border border-1 p-3'>{data?.member_id}</div>
    </div>
    <div className="row">
      <div className='col-3 border border-1 p-3'>Customer Phone</div>
      <div className='col-3 border border-1 p-3'>{data?.mobileno}</div>
      <div className='col-3 border border-1 p-3 text-end'>Email</div>
      <div className='col-3 border border-1 p-3'>{data?.email}</div>
    </div>
    <div className="row">
      <div className='col-3 border border-1 p-3'>Address</div>
      <div className='col-9 border border-1 p-3'>{data?.address}</div>
    </div>
    <div className="row">
      <div className='col-3 border border-1 p-3'>Customer Type</div>
      <div className='col-9 border border-1 p-3'>{data?.user_type}</div>
    </div>
    <div className='row'>
      <div className='col-3 border border-1 p-3'>Payment Method</div>
      <div className='col-3 border border-1 p-3'>{data?.paymethod}</div>
      <div className='col-3 border border-1 p-3 text-end'>Total Amount</div>
      <div className='col-3 border border-1 p-3'>{data?.netpayamt}</div>
    </div>
    <div className='row'>
      <div className='col-3 border border-1 p-3'>Paid Amount</div>
      <div className='col-3 border border-1 p-3'>{data?.piadamt}</div>
      <div className='col-3 border border-1 p-3 text-end'>Balance Amount</div>
      <div className='col-3 border border-1 p-3'>{data?.totalamt}</div>
    </div>
    <div className='row'>
      <div className='col-3 border border-1 p-3'>Service Provider Name</div>
      <div className='col-3 border border-1 p-3'>{data?.servicep_id}</div>
      <div className='col-3 border border-1 p-3 text-end'>Mobile No.</div>
      <div className='col-3 border border-1 p-3'></div>
    </div>
    <div className='row'>
      <div className='col-3 border border-1 p-3'>Aadhaar No.</div>
      <div className='col-9 border border-1 p-3'></div>
    </div>
    <div className='row'>
      <div className='col-3 border border-1 p-3'>Supervisor Name</div>
      <div className='col-3 border border-1 p-3'>{data?.suprvisor_id}</div>
      <div className='col-3 border border-1 p-3 text-end'>Mobile No.</div>
      <div className='col-3 border border-1 p-3'></div>
    </div>
    <div className='row'>
      <div className='col-3 border border-1 p-3'>Aadhaar No.</div>
      <div className='col-9 border border-1 p-3'></div>
    </div>
    <div className="row">
      <div className='col-3 border border-1 p-3'>Service Name</div>
      <div className='col-9 border border-1 p-3'>{data?.service_name}</div>
    </div>
    <div className="row">
      <div className='col-3 border border-1 p-3'>Service Details</div>
      <div className='col-9 border border-1 p-3'>{data?.problem_des}</div>
    </div>
    <div className="row">
      <div className='col-3 border border-1 p-3'>Booking Date</div>
      <div className='col-3 border border-1 p-3'>{data?.bookdate}</div>
      <div className='col-3 border border-1 p-3'>Booking Time</div>
      <div className='col-3 border border-1 p-3'>{data?.booktime}</div>
    </div>
    <div className="row">
      <div className='col-3 border border-1 p-3'>Customer Remark</div>
      <div className='col-9 border border-1 p-3'>{data?.cust_remark}</div>
    </div>
    <div className="row">
      <div className='col-6 border border-1 p-3'>For Service Provider:</div>
      <div className='col-6 border border-1 p-3'>For Customer Provider:</div>
    </div>
    <div className="row">
      <div className='col-3 border border-1 p-3'>Signature</div>
      <div className='col-3 border border-1 p-3'></div>
      <div className='col-3 border border-1 p-3'>Signature</div>
      <div className='col-3 border border-1 p-3'></div>
    </div>
  </div>
  
  <p className='text-center mt-3'>Log on to our website 
    <a href='https://www.ssquickhelpers.com' className="ml-2">www.ssquickhelpers.com</a>
  </p> */}

      <div className="row">
        <div className="receipt-main col-xs-10 col-sm-10 col-md-6 col-xs-offset-1 col-sm-offset-1 col-md-offset-3 w-100">
          <div className="row">
            <div className="receipt-header d-flex">
              <div className="col-md-8">
                <div className="receipt-left">
                  <div className='d-flex gap-4'> 
                  <img
                    className="img-responsive"
                    alt="iamgurdeeposahan"
                    src="https://mytotalhelper.com/webcss/images/we_logo.png"
                    width={120}
                  />

               <h1>Helper</h1>
               </div>

          
                  <figcaption>
     <cite title="Source Title">  9682077000, 
							<BiLogoWhatsapp color="#25D366"
								size={20}/>
							7307676622, 05224300589 
              </cite>
  </figcaption>
                 
                  <p>
                  <figcaption>
     <cite title="Source Title"> <FaLocationDot size={16}/> 2/6, Heeru Villa Rajani Khand, Sharda Nagar, Lucknow - 226012 </cite>
  </figcaption>
                  </p>
                </div>


              </div>
              <div className="col-md-4 text-right">
               <div className="receipt-right">
                  <h4>INVOICE</h4>
                 
                </div> 
              </div>
            </div>
          </div>

          <div className="row">
            <div className="receipt-header receipt-header-mid d-flex">
              <div className="col-xs-6 col-sm-6 col-md-6 text-left">
                <div className="">
                <h2>
    {data?.name ? data.name.charAt(0).toUpperCase() + data.name.slice(1).toLowerCase() : ''}
  </h2>
                  <p >
                    <b>Mobile :</b> {data?.mobileno}
                  </p>
                  <p >
                    <b>Email :</b> {data?.email}
                  </p>
                  <p>
                    <b>Address :</b> {data?.address}
                  </p>
                </div>
              </div>
              <div className="col-xs-6 col-sm-6 col-md-6">
                <div className="receipt-left">
                  <p><b>Date :</b> {currentDate}</p>
                  <p> <b>Invoice No : </b> {data?.order_no}</p>
                </div>
              </div>
            </div>
          </div>

          <div>
          <table className="table table-bordered">
            <thead>
              <tr >
                <th scope='col'>Order No.</th>
                <th scope='col'>Service Name</th>
              </tr>
            </thead>
            <tbody>
              <tr >
                <td >{data?.order_no}</td>
                <td >
                  <i className="fa fa-inr"></i> {data?.service_name}
                </td>
              </tr>

              <tr>
                <td className="text-right">
                  <p>
                    <strong>Payment Method: </strong>
                  </p>
                  <p>
                    <strong>Billing Amount: </strong>
                  </p>
                  <p>
                    <strong>Paid Amount: </strong>
                  </p>
                  <p>
                    <strong>Balance Amount: </strong>
                  </p>
                </td>
                <td>
                  <p>
                    <strong>
                      <i className="fa fa-inr"></i> {data?.paymethod}
                    </strong>
                  </p>
                  <p>
                    <strong>
                      <i className="fa fa-inr"></i> {data?.netpayamt}
                    </strong>
                  </p>
                  <p>
                    <strong>
                      <i className="fa fa-inr"></i> {data?.piadamt}
                    </strong>
                  </p>
                  <p>
                    <strong>
                      <i className="fa fa-inr"></i> {data?.totalamt}
                    </strong>
                  </p>
                </td>
              </tr>
            </tbody>
          </table>

          </div>

          <div className="row">
            <div className="receipt-header receipt-header-mid receipt-footer ">
              <div className="col-xs-8 col-sm-8 col-md-8 text-left">
                <div className="receipt-right">
                  <h5 style={{ color: 'rgb(140, 140, 140)' }}>Thank you for choosing Helper.!</h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

</div>
      </>
     );
    });
    export default Invoice;