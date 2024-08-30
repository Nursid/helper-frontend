import logo1 from "./Helper Logo 01.png";
import logo2 from "./Helper Logo.png";

const PrintCustomer = () => {
  return (
    <div className="p-6 max-w-4xl mx-auto border border-black">
      {/* Header Section */}
      <header className="text-center mb-8 flex items-center justify-center space-x-4">
        <img src={logo1} alt="Logo 1" className="w-12 h-12" />
        <h1 className="text-6xl font-black mb-2"> {/* Increased font size and weight */}
          Helper
        </h1>
        <img src={logo2} alt="Logo 2" className="w-12 h-12" />
      </header>

      {/* Subheading Section */}
      <div className="text-center mb-8">
        <p className="text-lg font-bold mb-1">For Your Services</p>
        <p className="text-sm font-bold text-gray-600">Address: ABC...</p>
        <hr className="border-t border-black mt-2" /> 
      </div>

      {/* Personal Information Section */}
      <div className="flex justify-between mb-8">
        {/* Left Column */}
        <div className="w-full md:w-2/3">
          <div className="grid grid-cols-2 gap-4 mb-4">
            {/* Date and Name */}
            <div>
              <p className="font-bold">Date:</p>
              <p className="font-bold">Name:</p>
            </div>

            {/* Mobile and Alternate Mobile */}
            <div>
              <p className="font-bold">Mobile:</p>
              <p className="font-bold">Alternate Number:</p>
            </div>

            {/* Email and Gender */}
            <div>
              <p className="font-bold">Email Address:</p>
              <p className="font-bold">Gender:</p>
            </div>

            {/* DOB and Occupation */}
            <div>
              <p className="font-bold">DOB:</p>
              <p className="font-bold">Occupation:</p>
            </div>

            {/* Aadhar Number */}
            <div>
              <p className="font-bold">Aadhar Number:</p>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="w-full md:w-1/3 flex justify-center items-center mb-4 md:mb-0">
          <div className="w-32 h-32 bg-gray-300 border border-black">
            {/* Profile Photo Placeholder */}
            <p className="text-center pt-12">Profile Photo</p>
          </div>
        </div>
      </div>

      {/* Address Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div>
          <h4 className="font-bold mb-2">Permanent Address:</h4>
          <h4 className="font-bold mb-2">Temporary Address:</h4>
        </div>
      </div>

      {/* Location and Referral Section */}
      <div className=" p-2">
        <div className="flex ">
        <h4 className="font-bold mb-4">Location</h4>
         <hr className="border-t border-black mt-2" />
        </div>
        
        <div className="flex items-center mb-4 ml-44">
          <p className="font-bold">Referred By:</p>
          <div className="flex space-x-4 ml-4">
            <div className="flex items-center space-x-2">
             
              <p>Advertisement</p>
              <div className="w-12 h-6 border border-black bg-white"></div>
            </div>
            <div className="flex items-center space-x-2">
              
              <p>Office Enquiry</p>
              <div className="w-12 h-6 border border-black bg-white"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Free Services Section */}
      <div className=" p-2">
        <h4  className="font-bold mb-4 ml-44">Any Specific name </h4>
        <div className=" flex ">
        <h4 className="font-bold  ml-44">Free Services</h4>
        <ul className="list-disc list-inside mb-4 ml-44">
          <li>Service Data Line 1</li>
          <li>Service Data Line 2</li>
          <li>Service Data Line 3</li>
          <li>Service Data Line 4</li>
        </ul>
        </div>
        
        <div className="flex justify-between">
          <div className="text-center">
            <p className="font-bold">Supervisor Signature</p>
          </div>
          <div className="text-center">
            <p className="font-bold">Member Signature</p>
          </div>
        </div>
      </div>

      {/* For Office Use Section */}
      <div className="border border-black p-4 mb-8">
        <h4 className="font-bold mb-4">For Office Use</h4>
        <div className="flex justify-between mb-4">
          <div>
            <p className="font-bold">Validity:</p>
          </div>
          <div>
            <p className="font-bold mr-44">Membership No:</p>
          </div>
        </div>
        <div className="flex justify-between mb-4">
          <div>
            <p className="font-bold">Paid Amount:</p>
          </div>
          <div>
            <p className="font-bold mr-44">Balance:</p>
          </div>
        </div>
        <div className="mb-4">
          <p className="font-bold">Payment Method:</p>
          <div className="flex space-x-4">
            <div className="flex items-center space-x-2">
              
              <p>Cash</p>
              <div className="w-12 h-6 border border-black bg-white"></div>
            </div>
            <div className="flex items-center space-x-2">
             
              <p>Check</p>
              <div className="w-12 h-6 border border-black bg-white"></div>
            </div>
            <div className="flex items-center space-x-2">
            
              <p>Online Transfer</p>
              <div className="w-12 h-6 border border-black bg-white"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrintCustomer;