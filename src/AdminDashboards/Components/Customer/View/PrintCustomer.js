import logo1 from "./Helper Logo 01.png";
import logo2 from "./Helper Logo.png";
import {BiLogoWhatsapp} from "react-icons/bi";

const PrintCustomer = () => {
	return (
		<div className="p-2 mx-auto">
			{/* Header Section */}
			<div className="text-center mb-4 d-flex justify-content-between gap-2 p-4">
				<img src={logo2}
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
				<img src={logo2}
					alt="Logo 2"
					className="img-fluid"
					width={100}
					height={80}/>
			</div>
			<hr className="border border-dark mt-2"/> {/* Subheading Section */}


			{/* Personal Information Section */}
			<div className="d-flex justify-content-between">
				{/* Left Column */}
				<div className="w-100 ">
					<div className="row mb-3">
						{/* Date and Name */}
						<div className="col-6">
							<div className="d-flex flex-row align-items-center">
								<p className="fw-bold mb-0 me-2">Date:</p>
								<hr className="border border-dark mt-4 flex-grow-1"/>
							</div>

							<div className="d-flex flex-row align-items-center">
								<p className="fw-bold mb-0 me-2">Name:</p>
								<hr className="border border-dark mt-4 flex-grow-1"/>
							</div>

						</div>

						{/* Mobile and Alternate Mobile */}
						<div className="col-6">
							<div className="d-flex flex-row align-items-center">
								<p className="fw-bold mb-0 me-2">Mobile:</p>
								<hr className="border border-dark mt-4 flex-grow-1"/>
							</div>

							<div className="d-flex flex-row align-items-center">
								<p className="fw-bold mb-0 me-2">Alternate Number:</p>
								<hr className="border border-dark mt-4 flex-grow-1"/>
							</div>

						</div>

						<div className="col-6">
							<div className="d-flex flex-row align-items-center">
								<p className="fw-bold mb-0 me-2">Gender:</p>
								<hr className="border border-dark mt-4 flex-grow-1"/>
							</div>

							<div className="d-flex flex-row align-items-center">
								<p className="fw-bold mb-0 me-2">Email:</p>
								<hr className="border border-dark mt-4 flex-grow-1"/>
							</div>

						</div>
                        

						<div className="col-6">

                        <div className="d-flex flex-row align-items-center">
								<p className="fw-bold mb-0 me-2">DOB:</p>
								<hr className="border border-dark mt-4 flex-grow-1"/>
							</div>

							<div className="d-flex flex-row align-items-center">
								<p className="fw-bold mb-0 me-2">Occupation:</p>
								<hr className="border border-dark mt-4 flex-grow-1"/>
							</div>
						</div>

						{/* Email and Gender */}
		

						{/* DOB and Occupation */}


						{/* Aadhar Number */}
						<div className="col-12">
							<div className="d-flex flex-row align-items-center">
								<p className="fw-bold mb-0 me-2">Aadhar Number:</p>
								<hr className="border border-dark mt-4 flex-grow-1"/>
							</div>

						</div>

						{/* <div className="col-12">
							<div className="d-flex flex-row align-items-center">
								<p className="fw-bold mb-0 me-2">Permanent Address:</p>
								<hr className="border border-dark mt-4 flex-grow-1"/>
								
							</div>
                            <hr className="border border-dark mt-4 flex-grow-1"/>
						</div> */}
					</div>
				</div>

				{/* Right Column */}
                <div className="col-3 d-flex justify-content-center align-items-center mb-md-0">
            <div className="w-75 h-75 border border-dark d-flex justify-content-center align-items-center position-relative">
                <p 
                    className="position-absolute text-center text-muted" 
                    style={{
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%) rotate(300deg)',
                        opacity: 0.5,
                        pointerEvents: 'none',
                        whiteSpace: 'nowrap' // Ensure the text doesn't break into multiple lines
                    }}
                >
                    Profile Photo
                </p>
            </div>
        </div>
			</div>

			{/* Address Section */}
			<div className="row g-3 mb-4">
				{/* <div className="col"> */}

                <div className="col-12 mt-0 ml-2">
							<div className="d-flex flex-row align-items-center">
								<p className="fw-bold mb-0 me-2">Permanent Address:</p>
								<hr className="border border-dark mt-4 flex-grow-1"/>
								
							</div>
                            <hr className="border border-dark mt-4 flex-grow-1"/>
						</div>
                        <div className="col-12 mt-0 ml-2">
							<div className="d-flex flex-row align-items-center">
								<p className="fw-bold mb-0 me-2"> Temporary Address:</p>
								<hr className="border border-dark mt-4 flex-grow-1"/>
								
							</div>
                            <hr className="border border-dark mt-4 flex-grow-1"/>
						</div>

					{/* <h4 className="fw-bold mb-2">Permanent Address:</h4>
					<h4 className="fw-bold mb-2">Temporary Address:</h4> */}
				</div>
			{/* </div> */}

			{/* Location and Referral Section */}
			<div className="p-2">
                            <div className="d-flex flex-row align-items-center">
								<p className="fw-bold mb-0 me-2">Location:</p>
								<hr className="border border-dark mt-4 flex-grow-1"/>
								
							</div>

                            <div className="d-flex justify-content-between gap-5 align-items-center mx-auto" style={{ width: 'fit-content' }}>
                               
                                <div className="d-flex align-items-center gap-3">
                                <p className="fw-bold me-3 fs-4">Referred By:-</p>
                                    <p className="fs-5 fw-bold">Advertisement</p>
                                    <div className="border border-dark border-2  bg-white" style={{ width: '200px', height: '50px' }}></div>
                                </div>
                                <div className="d-flex align-items-center gap-3">
                                    <p className="fs-5 fw-bold">Office Enquiry</p>
                                    <div className="border border-dark border-2 bg-white" style={{ width: '200px', height: '50px' }}></div>
                                </div>
                                </div>

			                </div>

			{/* Free Services Section */}
                        <div className="p-2">
                            <div className="d-flex flex-row align-items-center">
								<p className="fw-bold mb-0 me-2">Any Specific name:</p>
								<hr className="border border-dark flex-grow-1"/>
							</div>
                            
                            <div className="container">
                            <div className="d-flex justify-content-center">
                                <div className="d-flex w-50 max-w-600">
                                <h4 className="fw-bold flex-shrink-0">Free Services</h4>
                                <div className="d-flex flex-column flex-grow-1 mx-3">
                                    <div className="d-flex align-items-center mb-2">
                                    <p className="fw-bold mb-0 me-2">1:</p>
                                    <hr className="border border-dark flex-grow-1 m-0"/>
                                    </div>
                                    <div className="d-flex align-items-center mb-2">
                                    <p className="fw-bold mb-0 me-2">2:</p>
                                    <hr className="border border-dark flex-grow-1 m-0"/>
                                    </div>
                                    <div className="d-flex align-items-center mb-2">
                                    <p className="fw-bold mb-0 me-2">3:</p>
                                    <hr className="border border-dark flex-grow-1 m-0"/>
                                    </div>
                                    <div className="d-flex align-items-center">
                                    <p className="fw-bold mb-0 me-2">4:</p>
                                    <hr className="border border-dark flex-grow-1 m-0"/>
                                    </div>
                                </div>
                                </div>
                            </div>
                            </div>

                           

                        </div>
                        <div className="d-flex justify-content-between align-items-center p-1">
                            <div className="d-flex align-items-center w-50">
                            <p className="fw-bold mb-0">Supervisor Signature:</p>
                            <hr className="border border-dark flex-grow-1 mt-4 ml-2"/>
                            </div>
                            <div className="d-flex align-items-center w-50 ml-4">
                                <p className="fw-bold mb-0">Member Signature:</p>
                                <hr className="border border-dark flex-grow-1 mt-4 ml-2"/>
                            </div>
                        </div>
			{/* For Office Use Section */}
			<div className="border border-dark mb-4 ">
                <div className="d-flex justify-content-center">
				<h4 className="fw-bold mt-2">For Office Use</h4>
                </div>
                <hr className="border border-2 border-dark fw-bold flex-grow-1"/>

                <div className="">
                <div className="row mb-3">
						{/* Date and Name */}
						<div className="col-6">
							<div className="d-flex flex-row align-items-center">
								<p className="fw-bold mb-0 me-2">Validity:</p>
								<hr className="border border-dark mt-4 flex-grow-1"/>
							</div>

							<div className="d-flex flex-row align-items-center">
								<p className="fw-bold mb-0 me-2">Membership No:</p>
								<hr className="border border-dark mt-4 flex-grow-1"/>
							</div>

						</div>

						{/* Mobile and Alternate Mobile */}
						<div className="col-6">
							<div className="d-flex flex-row align-items-center">
								<p className="fw-bold mb-0 me-2">Paid Amount:</p>
								<hr className="border border-dark mt-4 flex-grow-1"/>
							</div>

							<div className="d-flex flex-row align-items-center">
								<p className="fw-bold mb-0 me-2">Balance:</p>
								<hr className="border border-dark mt-4 flex-grow-1"/>
							</div>

						</div>

                    </div>


                    <div className="d-flex justify-content-between gap-5 p-4 align-items-center mx-auto" style={{ width: 'fit-content' }}>
					<p className="fw-bold">Payment Method:</p>
					
						<div className="d-flex align-items-center gap-3">
							<p>Cash</p>
							<div className="border border-dark bg-white"
								style={
									{
										width: "50px",
										height: "25px"
									}
							}></div>
						</div>
						<div className="d-flex align-items-center gap-3">
							<p>Check</p>
							<div className="border border-dark bg-white"
								style={
									{
										width: "50px",
										height: "25px"
									}
							}></div>
						</div>
						<div className="d-flex align-items-center gap-3">
							<p>Online Transfer</p>
							<div className="border border-dark bg-white"
								style={
									{
										width: "50px",
										height: "25px"
									}
							}></div>
						</div>
                        </div>
				</div>
			</div>
		</div>
	);
};

export default PrintCustomer;
