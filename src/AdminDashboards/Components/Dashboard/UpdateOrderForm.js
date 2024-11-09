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
const UpdateOrderForm = ({ orderData, prop, GetAllOrders, role, currentUser }) => {

  const dispatch = useDispatch();
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false)
  const [getAlltimeSlot, setGetAlltimeSlot] = useState([])
  const [timeslot, setTimeslot] = useState(orderData?.allot_time_range || '')
  const [formData, setFormData] = useState({
    user_type: orderData?.user_type || '',
    name: orderData?.NewCustomer?.name || '',
    email: orderData?.NewCustomer?.email || '',
    age: orderData?.age || '',
    service_name: orderData?.service_name || '',
    mobile: orderData?.NewCustomer?.mobileno || '',
    service_des: orderData?.service_des || '',
    suprvisor_id: orderData?.suprvisor_id || '',
    serviceDateTime: moment(orderData.serviceDateTime).format('YYYY-MM-DDTHH:mm') || '',
    service_address: orderData?.service_address || '',
    city: orderData?.customer?.location || '',
    pincode: orderData?.pincode || '',
    status: orderData?.pending || 'Pending',
    booktime: orderData?.booktime || '',
    bookdate: moment(orderData?.bookdate, 'DD-MM-YY').format('YYYY-MM-DD') || '',   
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
    bakof_remark: orderData?.bakof_remark || ''
  });

  const [allServices, setAllServices] = useState([]);
  const [allSupervisors, setAllSupervisors] = useState([]);
  const [allServiceProviders, setAllServiceProviders] = useState([]);

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
      const [servicesRes, supervisorsRes, serviceProvidersRes] = await Promise.all([
        axios.get(`${API_URL}/service/getall`),
        axios.get(`${API_URL}/employee/getall/supervisor`),
        axios.get(`${API_URL}/service-provider/getall`),
      ]);
      if (servicesRes.status === 200) {
        setAllServices(servicesRes.data.data.map((item) => ({ label: item.serviceName, value: item.serviceName })));
      }
      if (supervisorsRes.status === 200) {
        setAllSupervisors(supervisorsRes.data.data.map((item) => ({ label: item.name, value: item.name })));
      }
      if (serviceProvidersRes.status === 200) {
        setAllServiceProviders(serviceProvidersRes.data.data.map((item) => ({ label: item.name, value: item.name })));
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
   
      e.preventDefault();
      setIsLoading(true)
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
      if (formData.paymethod) {
          if (!formData.netpayamt || formData.netpayamt <= 0) {
            errors.netpayamt = "Total Amount is required ";
          }
          if (!formData.piadamt || formData.piadamt <= 0) {
            errors.piadamt = "Paid Amount is required ";
          }
          if (!formData.paymethod) {
            errors.paymethod = "Payment method is required";
          }	
      }

      if (errors && Object.keys(errors).length === 0) {
        // Form is valid, handle form submission here
        console.log("Form submitted successfully!");
        setIsLoading(false)
        } else {
        // Form is invalid, display validation errors
        console.log("Validation Errors:", errors);
        setErrors(errors);
        setIsLoading(false)
        return false;
        }

        const data ={
          ...formData,
          service_name: formData.service_name.value,
          user_type: formData.user_type.value,
          paymethod: formData.paymethod.value,
          servicep_id: formData.servicep_id.value,
          suprvisor_id: formData.suprvisor_id.value,
          allot_time_range: timeslot.value
        }

        const AddAccountAmount = {
          payment_mode: formData?.paymethod?.value,
          amount: formData?.piadamt,
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
            setIsLoading(false)

            if(formData.paymethod){
                // Add balance
                await axios.post(`${API_URL}/api/add-balance`, AddAccountAmount);
            }
            
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
            Swal.fire('Failed to update, try again', '', 'error');
          }
        } catch (error) {
          // Log error and show an error message
          console.error('Error:', error);
          Swal.fire('An error occurred', 'Please try again later.', 'error');
          setIsLoading(false)
        }
        setIsLoading(false)
        
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
        <Col md={6}>
          <FormGroup>
            <Label>Time</Label>
            <Input name="booktime" type="time" onChange={(e) => handleInputChange(e, 50)} value={formData.booktime} />
          </FormGroup>
        </Col>
        <Col md={6}>
          <FormGroup>
            <Label>Date</Label>
            <Input name="bookdate" type="date" onChange={(e) => handleInputChange(e, 50)} value={formData.bookdate} />
          </FormGroup>
        </Col>
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
							setSelcted={setTimeslot}
							initialValue={timeslot}
							options={getAlltimeSlot}
							/>
					</FormGroup>
				</Col>
        <Col md={6}>
          <FormGroup>
            <Label>Service Provider</Label>
            <SelectBox options={allServiceProviders} setSelcted={(value) => setFormData((prev) => ({ ...prev, servicep_id: value }))} initialValue={formData.servicep_id} />
          </FormGroup>
        </Col>
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
            <Input name="piadamt" type="number" onChange={(e) => handleInputChange(e, 7)} value={formData.piadamt} placeholder="Paid Amount" />
            {errors?.piadamt && (
							<span className='validationError'>
								{errors?.piadamt}
							</span>
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
