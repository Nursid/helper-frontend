import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button, Col, FormGroup, Input, Label, Row } from 'reactstrap';
import axios from 'axios';
import Swal from 'sweetalert2';
import moment from 'moment';
import SelectBox from '../../Elements/SelectBox';
import { API_URL } from '../../../config';
import { GetAllTimeSlot } from '../../../Store/Actions/Dashboard/Orders/OrderAction';
import { useSelector } from 'react-redux';
import Select from 'react-select';

const UpdateOrderForm = ({ orderData, prop, GetAllOrders, role, currentUser }) => {

  const dispatch = useDispatch();
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false)
  const [getAlltimeSlot, setGetAlltimeSlot] = useState([])
  const [timeslot, setTimeslot] = useState(orderData?.allot_time_range || '')
  
  // New states for additional amount
  const [showAdditionalAmount, setShowAdditionalAmount] = useState(false);
  const [additionalAmount, setAdditionalAmount] = useState('');
  const [totalAdditionalAmount, setTotalAdditionalAmount] = useState(0); // Track total additional amount added
  const [currentSessionAdditionalAmount, setCurrentSessionAdditionalAmount] = useState(0); // Track additional amount for this session only
  
  const [formData, setFormData] = useState({
    user_type: orderData?.user_type || '',
    name: orderData?.NewCustomer?.name || '',
    email: orderData?.NewCustomer?.email || '',
    age: orderData?.age || '',
    service_name: orderData?.service_name || '',
    mobile: orderData?.NewCustomer?.mobileno || '',
    service_des: orderData?.service_des || '',
    suprvisor_id: orderData?.suprvisor_id || '',
    service_address: orderData?.service_address || '',
    city: orderData?.customer?.location || '',
    pincode: orderData?.pincode || '',
    status: orderData?.pending || 'Pending',
    booktime: orderData?.booktime || '',
    bookdate: moment(orderData?.bookdate, 'DD-MM-YYYY').format('YYYY-MM-DD') || '',   
    servicep_id: orderData?.servicep_id || '',
    problem_des: orderData?.problem_des || '',
    paymethod: orderData?.paymethod || '',
    netpayamt: orderData?.netpayamt || '',
    piadamt: orderData?.piadamt || '',
    totalamt: orderData?.totalamt || '',
    allot_time_range: orderData?.allot_time_range || '',
    sueadmin_remark: orderData?.sueadmin_remark || '',
    cust_remark: orderData?.cust_remark || '',
    servp_remark: orderData?.servp_remark || '',
    suerv_remark: orderData?.suerv_remark || '',
    admin_remark: orderData?.admin_remark || '',
    bakof_remark: orderData?.bakof_remark || '',
    approx_duration: orderData?.approx_duration || '',
  });

  const [allServices, setAllServices] = useState([]);
  const [allSupervisors, setAllSupervisors] = useState([]);
  const [allServiceProviders, setAllServiceProviders] = useState([]);

  const [serviceProvider, setServiceProvider] = useState(() => {
    // Check if orderData and orderserviceprovider exist and are not empty
    if (orderData?.orderserviceprovider?.length > 0) {
      return orderData.orderserviceprovider
        .filter(provider => provider?.service_provider) // Ensure service_provider exists
        .map((provider) => ({
          label: provider.service_provider?.name || 'Unknown', // Default label if service_provider is missing
          value: provider.service_provider_id,
        }));
    }
    return []; // Return an empty array if the condition is not met
  });
  

  const userTypeOptions = [
    { label: 'Regular', value: 'Regular' },
    { label: 'Booking', value: 'Booking' },
    { label: 'Paid Service', value: 'Paid Service' },
    { label: 'Urgent', value: 'Urgent' },
  ];

  const payMethodOptions = [
    { label: 'Cash', value: 'Cash' },
    { label: 'Online', value: 'Online' },
  ];

  const handleInputChange = (e, maxLength) => {
    const { name, value } = e.target;
    if (value.length <= maxLength) {
      setFormData((prev) => ({ ...prev, [name]: value }));
      }
    if (name === 'netpayamt' || name === 'piadamt') {
      const bill = name === 'netpayamt' ? parseFloat(value) : parseFloat(formData.netpayamt);
      const paid = name === 'piadamt' ? parseFloat(value) : parseFloat(formData.piadamt);
      setFormData((prev) => ({ ...prev, totalamt: bill - paid }));
    }
  };

  const { data, isLoading: isLoadingTime } = useSelector(state => state.GetAllTimeSlotReducer);

	const DataWithID = (data) => {
		const transformedData = data?.map(item => ({label: item.time_range, value: item.time_range}));
		setGetAlltimeSlot(transformedData);
	}

	useEffect(() => {
		dispatch(GetAllTimeSlot())
	}, []);

	useEffect(() => {
		if(!isLoading && data?.data){
			DataWithID(data?.data);
		}
	}, [isLoading, data?.data]);

  useEffect(() => {
    const fetchData = async () => {
      const [servicesRes] = await Promise.all([
        axios.get(`${API_URL}/service/getall`),
      ]);
      if (servicesRes.status === 200) {
        setAllServices(servicesRes.data.data.map((item) => ({ 
          label: item.serviceName, 
          value: item.serviceName 
        })));
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
      e.preventDefault();
      
      // Prevent double submission
      if (isLoading) {
        return;
      }
      
      setIsLoading(true);
      
      try {
        let errors = {};

        if (!formData?.name) {
          errors.name = "Name is required";
        }
        if (!formData?.mobile) {
          errors.mobile = "Mobile No. is required";
        }
        if (!formData?.service_name) {
          errors.service_name = "Service type is required";
        }
        // if (formData.paymethod) {
        //   if (!formData.netpayamt || formData.netpayamt <= 0) {
        //     errors.netpayamt = "Total Amount is required ";
        //   }
        //   if (!formData.piadamt || formData.piadamt <= 0) {
        //     errors.piadamt = "Paid Amount is required ";
        //   }
        //   if (!formData.paymethod) {
        //     errors.paymethod = "Payment method is required";
        //   }	
        // }

        if (Object.keys(errors).length > 0) {
          // Form is invalid, display validation errors
          console.log("Validation Errors:", errors);
          setErrors(errors);
          setIsLoading(false);
          return;
        }

        // Form is valid, clear any existing errors
        setErrors({});
        console.log("Form submitted successfully!");

        const data ={
          ...formData,
          service_name: formData.service_name.value,
          user_type: formData.user_type.value,
          paymethod: formData.paymethod.value,
          servicep_providers: Array.isArray(serviceProvider) && serviceProvider !== null && serviceProvider.every(sp => sp.value !== undefined) 
          ? serviceProvider.map(option => option.value) 
          : null,
          suprvisor_id: formData.suprvisor_id.value,
          allot_time_range: timeslot.value
        }

        // Determine which amount to send to add-balance API
        const isEmptyTotalAmount = (orderData?.piadamt === "" || orderData?.piadamt === null || orderData?.piadamt === undefined);
        const amountToSend = isEmptyTotalAmount ? formData.piadamt : currentSessionAdditionalAmount;

        const AddAccountAmount = {
          payment_mode: formData?.paymethod?.value,
          amount: amountToSend, // Send original amount if totalamt is empty, otherwise send additional amount
          order_no: orderData.order_no,
          person_name: orderData?.NewCustomer?.name,
          about_payment: formData?.service_name?.value,
          balance: formData?.totalamt,
          type_payment: 0
        }	

        try {
          // Update order
          const response = await axios.patch(`${API_URL}/order/update/${orderData.order_no}`, data);
          
          // Check if the response is successful
          if (response.status === 200) {
            // Only send to add-balance based on multiple conditions
            const shouldCallAddBalance = (isEmptyTotalAmount ||
                 (!isEmptyTotalAmount && currentSessionAdditionalAmount > 0)
            );

            console.log("shouldCallAddBalance", shouldCallAddBalance);

            if (shouldCallAddBalance) {
              // Add the appropriate amount to balance
              await axios.post(`${API_URL}/api/add-balance`, AddAccountAmount);
            }
            
            // Reset current session additional amount after successful submission
            setCurrentSessionAdditionalAmount(0);
            
            // Call the provided function prop
            prop();
            // Show success message
            Swal.fire('Updated!', 'Your Order has been Updated.', 'success');
            
            // Determine status based on user role
            const status = (role === 'service' || role === 'supervisor') ? undefined : '';
            
            // Dispatch action to get all orders
            dispatch(GetAllOrders(status, currentUser, role));
          } else {
            // Handle unsuccessful update
            Swal.fire(response.data.message, '', 'error');
          }
        } catch (error) {
          // Log error and show an actual error message
          console.error('Error:', error);
          Swal.fire('An error occurred', error.response?.data?.message || 'Please try again later.', 'error');
        } finally {
          setIsLoading(false);
        }
      } catch (validationError) {
        console.error('Validation error:', validationError);
        setIsLoading(false);
      }
        
  };

  const handleChangeservices = (selectedOptions) => {
    setServiceProvider(selectedOptions);
  };


  const getAllServicesProvider = async (filterData) => {
    try {
      // Convert filterData to query string format
      const queryParams = new URLSearchParams(filterData).toString();
      // Perform the GET request
      const response = await axios.get(`${API_URL}/service-provider/getall?${queryParams}`);
      
      // Check if response status is OK (200)
      if (response.status === 200) {
        // Transform response data into label-value pairs
        const transformedData = response.data.data.map(item => ({ label: item.name, value: item.id }));
        // Set the transformed data in the state
        setAllServiceProviders(transformedData);
      }
    } catch (error) {
      console.error("Error fetching service providers:", error);
      // Optional: set an error state or fallback
    }
  };

  // Add this new function to fetch supervisors with filters
  const getAllSupervisors = async (filterData) => {
    try {
      const queryParams = new URLSearchParams(filterData).toString();
      const response = await axios.get(`${API_URL}/employee/getall/supervisor?${queryParams}`);
      
      if (response.status === 200) {
        const transformedData = response.data.data.map(item => ({ 
          label: item.name, 
          value: item.name 
        }));
        setAllSupervisors(transformedData);
      }
    } catch (error) {
      console.error("Error fetching supervisors:", error);
    }
  };

  // Add a function to handle date changes
  const handleDateChange = (e) => {
    handleInputChange(e, 50);
    fetchProvidersAndSupervisors(e.target.value, timeslot?.value);
  };

  // Add a function to handle time slot changes
  const handleTimeSlotChange = (selectedSlot) => {
    setTimeslot(selectedSlot);
    fetchProvidersAndSupervisors(formData.bookdate, selectedSlot.value);
  };

  // Add a common function to fetch both providers and supervisors
  const fetchProvidersAndSupervisors = (date, timeRange) => {
    if (!date || !timeRange) {
      console.log("Date or time range is missing");
      return;
    }
    
    const filterData = {
      date: date,
      time_range: timeRange,
    };

    getAllServicesProvider(filterData);
    getAllSupervisors(filterData);
  };

  // Add initial fetch on component mount if both values exist
  useEffect(() => {
    if (formData.bookdate && timeslot?.value) {
      fetchProvidersAndSupervisors(formData.bookdate, timeslot.value);
    }
  }, []);

  // Function to handle plus button click
  const handlePlusButtonClick = () => {
    setShowAdditionalAmount(true);
  };

  // Function to handle additional amount input change
  const handleAdditionalAmountChange = (e) => {
    const value = e.target.value;
    if (value === '' || (Number(value) >= 0 && value.length <= 10)) {
      setAdditionalAmount(value);
    }
  };

  // Function to add additional amount to paid amount
  const addAdditionalAmount = () => {
    if (additionalAmount && parseFloat(additionalAmount) > 0) {
      const currentPaidAmount = parseFloat(formData.piadamt) || 0;
      const newPaidAmount = currentPaidAmount + parseFloat(additionalAmount);
      const addedAmount = parseFloat(additionalAmount);
      
      setFormData((prev) => ({ 
        ...prev, 
        piadamt: newPaidAmount.toString(),
        totalamt: (parseFloat(prev.netpayamt) || 0) - newPaidAmount
      }));
      
      // Update total additional amount for display
      setTotalAdditionalAmount(prev => prev + addedAmount);
      
      // Update current session additional amount for API
      setCurrentSessionAdditionalAmount(prev => prev + addedAmount);
      
      // Reset additional amount states
      setAdditionalAmount('');
      setShowAdditionalAmount(false);
      
      Swal.fire({
        title: 'Amount Added!',
        text: `₹${addedAmount} has been added to paid amount. New total: ₹${newPaidAmount}`,
        icon: 'success',
        timer: 3000,
        showConfirmButton: false
      });
    } else {
      Swal.fire({
        title: 'Invalid Amount',
        text: 'Please enter a valid amount greater than 0',
        icon: 'error'
      });
    }
  };

  // Function to cancel additional amount input
  const cancelAdditionalAmount = () => {
    setAdditionalAmount('');
    setShowAdditionalAmount(false);
  };

  return (
    <Fragment>
      <Row>
        <Col md={6}>
          <FormGroup>
            <Label>Mobile No <span style={{color: "red"}}>*</span></Label>
            <Input name="mobile" onChange={(e) => handleInputChange(e, 10)} value={formData.mobile} readOnly />
            {errors?.mobile && (
							<span className='validationError'>
								{errors?.mobile}
							</span>
						)}
          </FormGroup>
        </Col>
        <Col md={6}>
          <FormGroup>
            <Label>User Type</Label>
            <SelectBox options={userTypeOptions} setSelcted={(value) => setFormData((prev) => ({ ...prev, user_type: value }))} initialValue={formData.user_type} />
          </FormGroup>
        </Col>
        <Col md={6}>
          <FormGroup>
            <Label>Customer Name <span style={{color: "red"}}>*</span></Label>
            <Input name="name" onChange={(e) => handleInputChange(e, 50)} value={formData.name} placeholder="Enter Your Name" readOnly/>
            {errors?.name && (
							<span className='validationError'>
								{errors?.name}
							</span>
						)}
          </FormGroup>
        </Col>
        <Col md={6}>
          <FormGroup>
            <Label>Email</Label>
            <Input name="email" type="email" onChange={(e) => handleInputChange(e, 50)} value={formData.email} placeholder="Enter Your Email" readOnly />
          </FormGroup>
        </Col>
        {orderData.pending !== 'Running' && (
            <>
              <Col md={6}>
                <FormGroup>
                  <Label>Time</Label>
                  <Input 
                    name="booktime" 
                    type="time" 
                    onChange={(e) => handleInputChange(e, 50)} 
                    value={formData.booktime} 
                  />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label>Date</Label>
                  <Input 
                  name="bookdate" 
                  type="date" 
                  onChange={handleDateChange}
                  value={formData.bookdate} 
                  // min={new Date().toISOString().split('T')[0]} 
                />

                </FormGroup>
              </Col>
            </>
          )}
        <Col md={6}>
          <FormGroup>
            <Label>Service Type <span style={{color: "red"}}>*</span></Label>
            <SelectBox options={allServices} setSelcted={(value) => setFormData((prev) => ({ ...prev, service_name: value }))} initialValue={formData.service_name} />
            {errors?.service_name && (
							<span className='validationError'>
								{errors?.service_name}
							</span>
						)}
          </FormGroup>
        </Col>
        <Col md={6}>
          <FormGroup>
            <Label>Problem Description</Label>
            <Input name="problem_des" onChange={(e) => handleInputChange(e, 100)} value={formData.problem_des} placeholder="Problem Description" />
          </FormGroup>
        </Col>
        {orderData.pending !== 'Running' && (
            <>
        <Col md={6}>
          <FormGroup>
            <Label>Supervisor Name</Label>
            <SelectBox options={allSupervisors} setSelcted={(value) => setFormData((prev) => ({ ...prev, suprvisor_id: value }))} initialValue={formData.suprvisor_id} />
          </FormGroup>
        </Col>
        <Col md={6}>
					<FormGroup>
						<Label>Time Slot</Label>
						<SelectBox 
							setSelcted={handleTimeSlotChange}
							initialValue={timeslot}
							options={getAlltimeSlot}
							/>
					</FormGroup>
				</Col>

<Col md={6}>
          <FormGroup>
            <Label>Approx Duration <span style={{color: "red"}}>*</span> </Label>
              <SelectBox
               setSelcted={(selectedOption) =>
                handleInputChange({ target: { name: 'approx_duration', value: selectedOption.value } }, 10)
                }
              initialValue={formData?.approx_duration}
              options={[
                { value: '0.5', label: '30 min' },
                { value: '1', label: '1 hour' },
                { value: '1.5', label: '1.5 hours' },
                { value: '2', label: '2 hours' },
                { value: '2.5', label: '2.5 hours' },
                { value: '3', label: '3 hours' },
                { value: '3.5', label: '3.5 hours' },
                { value: '4', label: '4 hours' },
                { value: '4.5', label: '4.5 hours' },
                { value: '5', label: '5 hours' },
                { value: '5.5', label: '5.5 hours' },
                { value: '6', label: '6 hours' },
                { value: '6.5', label: '6.5 hours' },
                { value: '7', label: '7 hours' },
                { value: '7.5', label: '7.5 hours' },
                { value: '8', label: '8 hours' },
              ]}
              />
              {errors?.approx_duration && (
              <span className='validationError'>
                {errors?.approx_duration}
              </span>
            )}
          </FormGroup>
        </Col>

        <Col md={6}>
          <FormGroup>
            <Label>Service Provider</Label>
            {/* <SelectBox options={allServiceProviders} setSelcted={(value) => setFormData((prev) => ({ ...prev, servicep_id: value }))} initialValue={formData.servicep_id} /> */}

            <Select
						isMulti
						value={serviceProvider}
						onChange={handleChangeservices}
						options={allServiceProviders}
						className="basic-multi-select"
						classNamePrefix="select"
						/>
          </FormGroup>
        </Col>
        </>
        )}
        <Col md={6}>
          <FormGroup>
            <Label>Address</Label>
            <Input name="service_address" onChange={(e) => handleInputChange(e, 200)} value={formData.service_address} placeholder="Enter Your Address"  />
          </FormGroup>
        </Col>
        <Col md={6}>
          <FormGroup>
            <Label>City</Label>
            <Input name="city" type="text" onChange={(e) => handleInputChange(e, 50)} value={formData.city} placeholder="Enter Your City"  />
          </FormGroup>
        </Col>
        <Col md={6}>
          <FormGroup>
            <Label>ZipCode</Label>
            <Input name="pincode" type="text" onChange={(e) => handleInputChange(e, 6)} value={formData.pincode} placeholder="Enter Your ZipCode" />
          </FormGroup>
        </Col>
            <Col md={6}>
              <FormGroup>
                <Label>Super Admin Remark </Label>
                <Input
                  name="sueadmin_remark"
                  onChange={(e) => handleInputChange(e, 200)}
                  value={formData.sueadmin_remark}
                  placeholder="Super admin remark "
                />
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label> Admin Remark </Label>
                <Input
                  name="admin_remark"
                  onChange={(e) => handleInputChange(e, 200)}
                  value={formData.admin_remark}
                  placeholder="admin remark "
                />
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label>Back Office Remark</Label>
                <Input
                  name="bakof_remark"
                  onChange={(e) => handleInputChange(e, 200)}
                  value={formData.bakof_remark}
                  placeholder="BackOffice remark "
                />
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label>Supervisor Remark </Label>
                <Input
                  name="suerv_remark"
                  onChange={(e) => handleInputChange(e, 200)}
                  value={formData.suerv_remark}
                  placeholder="Supervisor remark"
                />
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label>Customer Remark </Label>
                <Input
                  name="cust_remark"
                  onChange={(e) => handleInputChange(e, 200)}
                  value={formData.cust_remark}
                  placeholder="Customer remark"
                />
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label>Service Provider Remark</Label>
                <Input
                  name="servp_remark"
                  onChange={(e) => handleInputChange(e, 200)}
                  value={formData.servp_remark}
                  placeholder="Service Provider remark"
                />
              </FormGroup>
            </Col>
        <h2>Billing Details</h2>
        <Col md={6}>
          <FormGroup>
            <Label>Payment Method</Label>
            <SelectBox options={payMethodOptions} setSelcted={(value) => setFormData((prev) => ({ ...prev, paymethod: value }))} initialValue={formData.paymethod} />
            {errors?.paymethod && (
							<span className='validationError'>
								{errors?.paymethod}
							</span>
						)}
          </FormGroup>
        </Col>
        <Col md={6}>
          <FormGroup>
            <Label>Bill Amount</Label>
            <Input name="netpayamt" type="number" onChange={(e) => handleInputChange(e, 7)} value={formData.netpayamt} placeholder="Bill Amount" />
            {errors?.netpayamt && (
							<span className='validationError'>
								{errors?.netpayamt}
							</span>
						)}
          </FormGroup>
        </Col>
        <Col md={6}>
          <FormGroup>
            <Label>Paid Amount</Label>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Input 
                name="piadamt" 
                type="number" 
                onChange={(e) => handleInputChange(e, 7)} 
                value={formData.piadamt} 
                placeholder="Paid Amount" 
                style={{ flex: 1 }}
              />
              <Button 
                color="success" 
                size="sm" 
                onClick={handlePlusButtonClick}
                disabled={showAdditionalAmount}
                style={{ 
                  width: '40px', 
                  height: '40px', 
                  borderRadius: '50%', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  fontSize: '18px',
                  fontWeight: 'bold'
                }}
              >
                +
              </Button>
            </div>
            
            {/* Additional Amount Input */}
            {showAdditionalAmount && (
              <div style={{ marginTop: '10px', padding: '10px', border: '1px solid #ddd', borderRadius: '5px', backgroundColor: '#f9f9f9' }}>
                <Label style={{ fontSize: '12px', marginBottom: '5px', display: 'block' }}>Add Additional Amount</Label>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Input
                    type="number"
                    placeholder="Enter additional amount"
                    value={additionalAmount}
                    onChange={handleAdditionalAmountChange}
                    style={{ flex: 1 }}
                    autoFocus
                  />
                  <Button 
                    color="primary" 
                    size="sm" 
                    onClick={addAdditionalAmount}
                    disabled={!additionalAmount || parseFloat(additionalAmount) <= 0}
                  >
                    Add
                  </Button>
                  <Button 
                    color="secondary" 
                    size="sm" 
                    onClick={cancelAdditionalAmount}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            )}
            
            {errors?.piadamt && (
              <span className='validationError'>
                {errors?.piadamt}
              </span>
            )}
            
            {/* Show total additional amount added in this session */}
            {totalAdditionalAmount > 0 && (
              <div style={{ 
                marginTop: '5px', 
                fontSize: '12px', 
                color: '#28a745', 
                fontWeight: 'bold' 
              }}>
                ✓ New additional amount to be added: ₹{currentSessionAdditionalAmount}
              </div>
            )}
          </FormGroup>
        </Col>
        <Col md={6}>
          <FormGroup>
            <Label>Balance Amount</Label>
            <Input name="totalamt" type="number" value={formData.totalamt} placeholder="Balance Amount" readOnly />
          </FormGroup>
        </Col>
        <Button className="bg-primary text-white" disabled={isLoading} onClick={handleSubmit}>Update</Button>
      </Row>
    </Fragment>
  );
};

export default UpdateOrderForm;
