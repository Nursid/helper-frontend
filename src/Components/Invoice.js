import React from 'react';
const Invoice = React.forwardRef((props, ref) => {
  const { data } = props;


    return (
      <>
       <div className='container' style={{maxWidth: "210mm", margin: "0 auto"}} ref={ref}>
  <div className='d-flex flex-col justify-content-start w-100 mt-2'>
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
  </p>
</div>
      </>
     );
    });
    export default Invoice;