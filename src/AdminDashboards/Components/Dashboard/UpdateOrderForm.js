import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button, Col, FormGroup, Input, Label, Row } from 'reactstrap';
import axios from 'axios';
import Swal from 'sweetalert2';
import moment from 'moment';
import SelectBox from '../../Elements/SelectBox';
import { API_URL } from '../../../config';

const UpdateOrderForm = ({ orderData, prop, GetAllOrders, role, currentUser }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    userType: orderData?.user_type || '',
    name: orderData?.orderProcess?.name || '',
    email: orderData?.orderProcess?.email || '',
    age: orderData?.age || '',
    service: orderData?.service_name || '',
    mobile: orderData?.orderProcess?.mobile || '',
    serviceDescription: orderData?.service_des || '',
    supervisorName: orderData?.suprvisor_id || '',
    serviceDateTime: moment(orderData.serviceDateTime).format('YYYY-MM-DDTHH:mm') || '',
    address: orderData?.address || '',
    city: orderData?.city || '',
    zipCode: orderData?.pincode || '',
    status: orderData?.pending || 'Pending',
    time: orderData?.booktime || '',
    date: moment(orderData?.bookdate).format('YYYY-MM-DD') || '',
    serviceProvider: orderData?.servicep_id || '',
    problemDescription: orderData?.problem_des || '',
    paymethod: orderData?.paymethod || '',
    billAmount: orderData?.netpayamt || '',
    paidAmount: orderData?.piadamt || '',
    balanceAmount: orderData?.totalamt || '',
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
    { label: 'Cash In Hand', value: 'Cash' },
    { label: 'Online', value: 'Online' },
    { label: 'Cheque', value: 'Cheque' },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (name === 'billAmount' || name === 'paidAmount') {
      const bill = name === 'billAmount' ? parseFloat(value) : parseFloat(formData.billAmount);
      const paid = name === 'paidAmount' ? parseFloat(value) : parseFloat(formData.paidAmount);
      setFormData((prev) => ({ ...prev, balanceAmount: bill - paid }));
    }
  };

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

  const handleSubmit = async () => {
    try {
      const response = await axios.patch(`${API_URL}/order/update/${orderData.order_no}`, formData);
      if (response.status === 200) {
        prop();
        Swal.fire('Updated!', 'Your Customer has been Updated.', 'success');
        const status = role === 'service' || role === 'supervisor' ? undefined : '';
        dispatch(GetAllOrders(status, currentUser, role));
      } else {
        Swal.fire('Failed to update, try again', '', 'error');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <Fragment>
      <Row>
        <Col md={6}>
          <FormGroup>
            <Label>Mobile No</Label>
            <Input name="mobile" onChange={handleInputChange} value={formData.mobile} readOnly />
          </FormGroup>
        </Col>
        <Col md={6}>
          <FormGroup>
            <Label>User Type</Label>
            <SelectBox options={userTypeOptions} setSelcted={(value) => setFormData((prev) => ({ ...prev, userType: value }))} initialValue={formData.userType} />
          </FormGroup>
        </Col>
        <Col md={6}>
          <FormGroup>
            <Label>Customer Name</Label>
            <Input name="name" onChange={handleInputChange} value={formData.name} placeholder="Enter Your Name" />
          </FormGroup>
        </Col>
        <Col md={6}>
          <FormGroup>
            <Label>Email</Label>
            <Input name="email" type="email" onChange={handleInputChange} value={formData.email} placeholder="Enter Your Email" />
          </FormGroup>
        </Col>
        <Col md={6}>
          <FormGroup>
            <Label>Time</Label>
            <Input name="time" type="time" onChange={handleInputChange} value={formData.time} />
          </FormGroup>
        </Col>
        <Col md={6}>
          <FormGroup>
            <Label>Date</Label>
            <Input name="date" type="date" onChange={handleInputChange} value={formData.date} />
          </FormGroup>
        </Col>
        <Col md={6}>
          <FormGroup>
            <Label>Service Type</Label>
            <SelectBox options={allServices} setSelcted={(value) => setFormData((prev) => ({ ...prev, service: value }))} initialValue={formData.service} />
          </FormGroup>
        </Col>
        <Col md={6}>
          <FormGroup>
            <Label>Problem Description</Label>
            <Input name="problemDescription" onChange={handleInputChange} value={formData.problemDescription} placeholder="Problem Description" />
          </FormGroup>
        </Col>
        <Col md={6}>
          <FormGroup>
            <Label>Supervisor Name</Label>
            <SelectBox options={allSupervisors} setSelcted={(value) => setFormData((prev) => ({ ...prev, supervisorName: value }))} initialValue={formData.supervisorName} />
          </FormGroup>
        </Col>
        <Col md={6}>
          <FormGroup>
            <Label>Service Provider</Label>
            <SelectBox options={allServiceProviders} setSelcted={(value) => setFormData((prev) => ({ ...prev, serviceProvider: value }))} initialValue={formData.serviceProvider} />
          </FormGroup>
        </Col>
        <Col md={6}>
          <FormGroup>
            <Label>Service Date & Time</Label>
            <Input name="serviceDateTime" type="datetime-local" onChange={handleInputChange} value={formData.serviceDateTime} />
          </FormGroup>
        </Col>
        <Col md={6}>
          <FormGroup>
            <Label>Address</Label>
            <Input name="address" onChange={handleInputChange} value={formData.address} placeholder="Enter Your Address" />
          </FormGroup>
        </Col>
        <Col md={6}>
          <FormGroup>
            <Label>City</Label>
            <Input name="city" type="text" onChange={handleInputChange} value={formData.city} placeholder="Enter Your City" />
          </FormGroup>
        </Col>
        <Col md={6}>
          <FormGroup>
            <Label>ZipCode</Label>
            <Input name="zipCode" type="text" onChange={handleInputChange} value={formData.zipCode} placeholder="Enter Your ZipCode" />
          </FormGroup>
        </Col>
        <h2>Billing Details</h2>
        <Col md={6}>
          <FormGroup>
            <Label>Payment Method</Label>
            <SelectBox options={payMethodOptions} setSelcted={(value) => setFormData((prev) => ({ ...prev, paymethod: value }))} initialValue={formData.paymethod} />
          </FormGroup>
        </Col>
        <Col md={6}>
          <FormGroup>
            <Label>Bill Amount</Label>
            <Input name="billAmount" type="number" onChange={handleInputChange} value={formData.billAmount} placeholder="Bill Amount" />
          </FormGroup>
        </Col>
        <Col md={6}>
          <FormGroup>
            <Label>Paid Amount</Label>
            <Input name="paidAmount" type="number" onChange={handleInputChange} value={formData.paidAmount} placeholder="Paid Amount" />
          </FormGroup>
        </Col>
        <Col md={6}>
          <FormGroup>
            <Label>Balance Amount</Label>
            <Input name="balanceAmount" type="number" value={formData.balanceAmount} placeholder="Balance Amount" readOnly />
          </FormGroup>
        </Col>
        <Button className="bg-primary text-white" onClick={handleSubmit}>Update</Button>
      </Row>
    </Fragment>
  );
};

export default UpdateOrderForm;
