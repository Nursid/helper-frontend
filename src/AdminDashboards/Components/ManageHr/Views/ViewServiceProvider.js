import moment from "moment";
import { IMG_URL } from "../../../../config";
import { BiLogoWhatsapp } from "react-icons/bi";
import { Button } from "reactstrap";
import { useReactToPrint } from 'react-to-print';
import React, { useRef } from "react";
import InfoComponent from "../../../Elements/InfoComponent";


export default function ViewServiceProvider({ data2, toggleModal }) {

  const  customerRef = useRef()
  const handlePrint = useReactToPrint({
    content: () => customerRef.current,
  });

  const items1 = [
    { label: 'Name', value: data2?.name || "" },
    { label: 'Mobile', value: data2?.mobile_no || "" },
  ];
  const items2 = [
    { label: 'Email', value: data2.email || "", },
    { label: 'Aadhar', value: data2.aadhar_no || "", },
  ];
  const items3 = [
    { label: 'PAN No.', value: data2.pan_no || "" },
    { label: 'Date of Join', value: data2.doj || "" },
  ];
  const items4 = [
    { label: 'Address', value: data2.permanent_address || "", }
  ];
  const items5 = [
    { label: 'Ref Name', value: data2.ref_name || "",},
    { label: 'Ref Address ', value: data2.ref_address || "", },
  ];
  const items6 = [
    { label: 'Ref Mobile', value:  data2.ref_mobile_no || ""},
    { label: 'Ref Aadhar', value: data2.ref_aadhar_no || "" },
  ];
  const items7 = [
    { label: 'Ref City', value: data2.ref_city || "" },
    { label: 'Ref Area', value:  data2.ref_area || "",},
  ];
  const items8 = [
    { label: 'Type Of Provider', value: data2.provider_type || ""},
    { label: 'Location ', value: data2.location || "", },
  ];
  const items9 = [
    { label: 'Service Provider Type', value: data2.supervisor_type || "", },
    { label: 'About', value: data2.about || "", },
  ];

  const dynamicItems = data2?.sp_services?.map((item, index) => ({
    label: `Service ${index + 1}`,
    value: item.service_name, // Assuming each item has a 'service' property
  })) || [];



  return (
    <div className="p-2 mx-auto" ref={customerRef}>
		
    <div className="text-center mb-4 d-flex justify-content-between gap-2 p-4">
      <img src='/Helper.png'
        alt="Logo 1"
        className="img-fluid "
        width={100}
        height={80}/>
      <div className="d-flex flex-column">
        <div className="display-3 fw-bold mb-2"
          style={
            {fontSize: '10rem'}
        }>Helper</div>
        <div className="text-center mb-4">
          <p className="fw-bold mb-1 fs-1">For Your Services</p>
          <p className="fw-normal fs-3">Address: 2/6, Heeru Villa Rajani Khand, Sharda Nagar, Lucknow - 226012</p>
          <p className="fw-normal fs-3">9682077000,
            <BiLogoWhatsapp color="#25D366"
              size={32}/>
            7307676622,05224300589</p>
        </div>
      </div>
      
    </div>

    <h3 className="text-center justify-content-center"> Service Provider Registration</h3>
    <hr className="border border-dark mt-2"/> 

    {/* Personal Information Section */}
    <div className="d-flex justify-content-between">
      {/* Left Column */}
      <div className="w-100 ">
        <div className="row mb-3">
          {/* Date and Name */}

          <InfoComponent items={items1} />
          <InfoComponent items={items2} />
          <InfoComponent items={items3} />

        </div>
      </div>

      {/* Right Column */}
    <div className="col-3 d-flex justify-content-center align-items-center mb-md-0">
          <div className="w-75 h-75 border border-dark d-flex justify-content-center align-items-center position-relative">
    <div
    className="position-relative text-center"
    style={{
      width: '100%', // Adjust width to fit your needs
      height: '100%', // Adjust height to fit your needs
    }}
    >
    { data2?.image && <img
      className="img-thumbnail w-100 h-100" // Set to full width and height
      src={IMG_URL + data2?.image ?? ""}
      alt="Customer"
      style={{
      objectFit: 'cover', // Ensures the image covers the area without distortion
      }}
    />
    }
    </div>
       </div>
      </div>
    </div>

    <InfoComponent items={items4} />
    <InfoComponent items={items5} />
    <InfoComponent items={items6} />
    <InfoComponent items={items7} />
    <InfoComponent items={items8} />
    <InfoComponent items={dynamicItems} />
    <InfoComponent items={items9} />
  <div className="d-flex justify-content-center">
    <Button color="primary" onClick={handlePrint}>Print</Button>
  </div>

  </div>

  );
}
