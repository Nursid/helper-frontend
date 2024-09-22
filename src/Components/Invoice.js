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
  <div className='d-flex flex-col justify-content-start w-100 mt-4'>
    <img style={{height: "70px"}}  src="/main_logo.jpg" alt='logo' />
    <div className='m-auto text-center'>
      <h3 className='text-uppercase font-weight-bold m-0'>Helper Service</h3>
      <figcaption>
                  <cite title="Source Title"><FaLocationDot size={16} /> 2/6, Heeru Villa Rajani Khand, Sharda Nagar, Lucknow - 226012</cite>
                </figcaption>
                <figcaption>
                  <cite title="Source Title">9682077000,
                    <BiLogoWhatsapp color="#25D366" size={20} />
                    7307676622, 05224300589
                  </cite>
                </figcaption>
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
      <div className='col-9 border border-1 p-3'>{data?.service_address}</div>
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

    <div className="row">
    <div className="col-6 p-0">
    <div className="row">
      <div className="col-6 border p-3">ServiceProvider Name</div>
      <div className="col-6 border p-3 justify-content-center">{data?.servicep_id}</div>
    </div>
    <div className="row">
      <div className="col-6 border p-3">Mobile No.</div>
      <div className="col-6 border p-3"></div>
    </div>
  </div>
      
      <div className="col-6 row-span-2 border border-1 p-3 d-flex align-items-center justify-content-center">
        <img 
          src="https://i.pinimg.com/564x/d5/b0/4c/d5b04cc3dcd8c17702549ebc5f1acf1a.jpg" 
          className="img-thumbnail" 
          alt="Profile" 
          height={80} 
          width={80}
        />
      </div>
    </div>


    <div className="row">
    <div className="col-6 p-0">
    <div className="row">
      <div className="col-6 border p-3">Supervisor Name</div>
      <div className="col-6 border p-3 justify-content-center">{data?.suprvisor_id}</div>
    </div>
    <div className="row">
      <div className="col-6 border p-3">Mobile No.</div>
      <div className="col-6 border p-3"></div>
    </div>
  </div>
      
      <div className="col-6 row-span-2 border border-1 p-3 d-flex align-items-center justify-content-center">
        <img 
          src="https://i.pinimg.com/564x/d5/b0/4c/d5b04cc3dcd8c17702549ebc5f1acf1a.jpg" 
          className="img-thumbnail" 
          alt="Profile" 
          height={80} 
          width={80}
        />
      </div>
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
      <div className='col-6 border border-1 p-3'>For Customer:</div>
    </div>
    <div className="row">
      <div className='col-3 border border-1 p-3'>Signature</div>
      <div className='col-3 border border-1 p-3'></div>
      <div className='col-3 border border-1 p-3'>Signature</div>
      <div className='col-3 border border-1 p-3'></div>
    </div>
  </div>
  
  <p className='text-center mt-3'>Log on to our website 
    <a href='https://www.ssquickhelpers.com' className="ml-3">www.ssquickhelpers.com</a>
  </p>
</div>



      </>
     );
    });
    export default Invoice;