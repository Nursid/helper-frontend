import React from 'react';
import { BiLogoWhatsapp } from "react-icons/bi";
import { FaLocationDot } from "react-icons/fa6";
import moment from 'moment';

const ViewMonthlyService = React.forwardRef((props, ref) => {
  const { data } = props;
  const currentDate = new Date().toLocaleString('en-US', {
    timeZone: 'Asia/Kolkata',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: true,
  });

  return (
    <div className='container' style={{ maxWidth: "210mm", margin: "0 auto" }} ref={ref}>
      <div className='d-flex flex-col justify-content-start w-100 mt-4'>
        <img style={{ height: "70px" }} src="/main_logo.jpg" alt='logo' />
        <div className='m-auto text-center'>
          <h3 className='text-uppercase font-weight-bold m-0'>Helper Service</h3>
          <figcaption>
            <cite title="Source Title">
              <FaLocationDot size={16} /> 2/6, Heeru Villa Rajani Khand, Sharda Nagar, Lucknow - 226012
            </cite>
          </figcaption>
          <figcaption>
            <cite title="Source Title">9682077000,
              <BiLogoWhatsapp color="#25D366" size={20} />
              7307676622, 05224300589
            </cite>
          </figcaption>
        </div>
      </div>

      <div className='container border border-1 mt-3 p-2'>
        <h1 className='p-3 justify-center'>Monthly Service Report</h1>
        <div className='row'>
          <div className='col-3 border border-1 p-3'>Customer Name</div>
          <div className='col-3 border border-1 p-3'>{data.cust_name}</div>
          <div className='col-3 border border-1 p-3 text-end'>Mobile No.</div>
          <div className='col-3 border border-1 p-3'>{data.mobile_no}</div>
        </div>
        <div className="row">
          <div className='col-3 border border-1 p-3'>Service Type</div>
          <div className='col-3 border border-1 p-3'>{data.serviceType}</div>
          <div className='col-3 border border-1 p-3 text-end'>Monthly Services Type</div>
          <div className='col-3 border border-1 p-3'>{data.serviceServeType}</div>
        </div>
        <div className="row">
          <div className='col-3 border border-1 p-3'>Address</div>
          <div className='col-9 border border-1 p-3'>{data.location}, {data.land_mark}, {data.near_by}</div>
        </div>
        <div className="row">
          <div className='col-3 border border-1 p-3'>Mohalla</div>
          <div className='col-3 border border-1 p-3'>{data.mohalla}</div>
          <div className='col-3 border border-1 p-3'>Area</div>
          <div className='col-3 border border-1 p-3'>{data.area}</div>
        </div>
        <div className="row">
          <div className='col-3 border border-1 p-3'>Booking Date</div>
          <div className='col-3 border border-1 p-3'>{moment(data.feesPaidDateTime).format('DD-MM-YYYY')}</div>
          <div className='col-3 border border-1 p-3'>Selected Time Slot</div>
          <div className='col-3 border border-1 p-3'>{data.selectedTimeSlot}</div>
        </div>
        <div className='row'>
          <div className='col-3 border border-1 p-3'>Payment Method</div>
          <div className='col-3 border border-1 p-3'>{data.paymethod}</div>
          <div className='col-3 border border-1 p-3 text-end'>Total Amount</div>
          <div className='col-3 border border-1 p-3'>{data.totalamt}</div>
        </div>
        <div className='row'>
          <div className='col-3 border border-1 p-3'>Paid Amount</div>
          <div className='col-3 border border-1 p-3'>{data.piadamt}</div>
          <div className='col-3 border border-1 p-3 text-end'>Balance Amount</div>
          <div className='col-3 border border-1 p-3'>{data.netpayamt}</div>
        </div>
        <div className='row'>
          <div className='col-3 border border-1 p-3'>Service Provider</div>
          <div className='col-3 border border-1 p-3'>{data.service_provider}</div>
          <div className='col-3 border border-1 p-3'>Kit No.</div>
          <div className='col-3 border border-1 p-3'>{data.kit_no}</div>
        </div>
        <div className='row'>
          <div className='col-3 border border-1 p-3'>Bike No.</div>
          <div className='col-3 border border-1 p-3'>{data.bike_no}</div>
          <div className='col-3 border border-1 p-3'>Special Interest</div>
          <div className='col-3 border border-1 p-3'>{data.specialInterest}</div>
        </div>


        <div className='row'>
          <div className='col-3 border border-1 p-3'>Referance 1</div>
          <div className='col-3 border border-1 p-3'>{data.referance}</div>
          <div className='col-3 border border-1 p-3'>Referance 1</div>
          <div className='col-3 border border-1 p-3'>{data.referance2}</div>
        </div>



        {(data.before_cleaning || data.after_cleaning) && (
            <div className='row'>
                {data.before_cleaning && data.before_cleaning !== 'null' ? (
                      <>
                          <div className='col-3 border border-1 p-3'>Before Cleaning</div>
                          <div className="col-3 row-span-2 border border-1 p-3 d-flex align-items-center justify-content-center">
                              <img 
                                  src="https://i.pinimg.com/564x/d5/b0/4c/d5b04cc3dcd8c17702549ebc5f1acf1a.jpg" 
                                  className="img-thumbnail" 
                                  alt="Before Cleaning" 
                                  height={80} 
                                  width={80}
                              />
                          </div>
                      </>
                  ) : (
                      <div className='col-3 border border-1 p-3'>No Image Before Cleaning</div>
                  )}
                {data.after_cleaning && data.after_cleaning!=='null' && (
                  <>
                  
                    <div className='col-3 border border-1 p-3'>After Cleaning</div>
                    <div className="col-3 row-span-2 border border-1 p-3 d-flex align-items-center justify-content-center">
                    <img 
                        src="https://i.pinimg.com/564x/d5/b0/4c/d5b04cc3dcd8c17702549ebc5f1acf1a.jpg" 
                        className="img-thumbnail" 
                        alt="Profile" 
                        height={80} 
                        width={80}
                    />
                </div>
                </>
                )}
            </div>
        )}


      <div className="row">
    <div className='col-3 border border-1 p-3'>Valid  From</div>
    <div className='col-3 border border-1 p-3'>{moment(data.feesPaidDateTime).format('DD-MM-YYYY')}</div>
    <div className='col-3 border border-1 p-3'>Valid To</div>
    <div className='col-3 border border-1 p-3'>
        {moment (new Date(new Date(data.feesPaidDateTime).getTime() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString()).format('DD-MM-YYYY')}
    </div>
</div>



      </div>
    </div>
  );
});

export default ViewMonthlyService;
