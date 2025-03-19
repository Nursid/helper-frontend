import React from 'react';
import CustomDataTable from './CustomDataTable';

const columns = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'name', headerName: 'Name', width: 200 },
    { field: 'department', headerName: 'Department', width: 200 },
    { field: 'position', headerName: 'Position', width: 200 },
    { field: 'email', headerName: 'Email', width: 250 },
    { field: 'phone', headerName: 'Phone', width: 200 },
    { field: 'salary', headerName: 'Salary', width: 150 },
    { field: 'hireDate', headerName: 'Hire Date', width: 200 },
    { field: 'address', headerName: 'Address', width: 250 },
    { field: 'officeNo', headerName: 'Office No.', width: 150 },
    { field: 'officeAddress', headerName: 'Office Address', width: 250 },
];



const rows = [
    { 
        id: 1, name: 'John Doe', department: 'Engineering', position: 'Software Engineer', 
        email: 'john.doe@example.com', phone: '123-456-7890', salary: '$85,000', hireDate: '2020-05-15',
        address: '123 Main St, New York, NY', officeNo: '101', officeAddress: 'Tech Park, New York, NY' 
    },
    { 
        id: 2, name: 'Jane Smith', department: 'Marketing', position: 'Marketing Manager', 
        email: 'jane.smith@example.com', phone: '987-654-3210', salary: '$78,000', hireDate: '2019-08-20',
        address: '456 Elm St, Los Angeles, CA', officeNo: '202', officeAddress: 'Business Hub, Los Angeles, CA' 
    },
    { 
        id: 3, name: 'Alice Johnson', department: 'Human Resources', position: 'HR Coordinator', 
        email: 'alice.johnson@example.com', phone: '456-789-1234', salary: '$65,000', hireDate: '2021-02-10',
        address: '789 Oak St, Chicago, IL', officeNo: '303', officeAddress: 'Corporate Tower, Chicago, IL' 
    },
    { 
        id: 4, name: 'Bob Brown', department: 'Sales', position: 'Sales Executive', 
        email: 'bob.brown@example.com', phone: '321-654-9870', salary: '$72,000', hireDate: '2018-11-05',
        address: '159 Maple St, Houston, TX', officeNo: '404', officeAddress: 'Commerce Plaza, Houston, TX' 
    },
    { 
        id: 5, name: 'Charlie White', department: 'Finance', position: 'Financial Analyst', 
        email: 'charlie.white@example.com', phone: '789-123-4567', salary: '$88,000', hireDate: '2017-06-25',
        address: '753 Birch St, San Francisco, CA', officeNo: '505', officeAddress: 'Finance Tower, San Francisco, CA' 
    },
    { 
        id: 6, name: 'David Lee', department: 'Engineering', position: 'DevOps Engineer', 
        email: 'david.lee@example.com', phone: '555-666-7777', salary: '$95,000', hireDate: '2022-01-15',
        address: '951 Cedar St, Boston, MA', officeNo: '606', officeAddress: 'Innovation Center, Boston, MA' 
    },
    { 
        id: 7, name: 'Emily Davis', department: 'Customer Support', position: 'Support Specialist', 
        email: 'emily.davis@example.com', phone: '888-999-0000', salary: '$55,000', hireDate: '2020-09-30',
        address: '357 Walnut St, Seattle, WA', officeNo: '707', officeAddress: 'Tech Plaza, Seattle, WA' 
    },
    { 
        id: 8, name: 'Franklin Wilson', department: 'Operations', position: 'Operations Manager', 
        email: 'franklin.wilson@example.com', phone: '111-222-3333', salary: '$95,000', hireDate: '2015-04-12',
        address: '852 Spruce St, Miami, FL', officeNo: '808', officeAddress: 'Logistics Park, Miami, FL' 
    },
    { 
        id: 9, name: 'Grace Hall', department: 'Engineering', position: 'Frontend Developer', 
        email: 'grace.hall@example.com', phone: '444-555-6666', salary: '$78,000', hireDate: '2019-07-18',
        address: '369 Pine St, Austin, TX', officeNo: '909', officeAddress: 'Development Hub, Austin, TX' 
    },
    { 
        id: 10, name: 'Henry Clark', department: 'IT', position: 'System Administrator', 
        email: 'henry.clark@example.com', phone: '777-888-9999', salary: '$82,000', hireDate: '2016-12-03',
        address: '741 Redwood St, Denver, CO', officeNo: '1010', officeAddress: 'Cyber Park, Denver, CO' 
    },
    { 
        id: 11, name: 'John Doe', department: 'Engineering', position: 'Software Engineer', 
        email: 'john.doe@example.com', phone: '123-456-7890', salary: '$85,000', hireDate: '2020-05-15',
        address: '123 Main St, New York, NY', officeNo: '101', officeAddress: 'Tech Park, New York, NY' 
    },
    { 
        id: 12, name: 'Jane Smith', department: 'Marketing', position: 'Marketing Manager', 
        email: 'jane.smith@example.com', phone: '987-654-3210', salary: '$78,000', hireDate: '2019-08-20',
        address: '456 Elm St, Los Angeles, CA', officeNo: '202', officeAddress: 'Business Hub, Los Angeles, CA' 
    },
    { 
        id: 13, name: 'Alice Johnson', department: 'Human Resources', position: 'HR Coordinator', 
        email: 'alice.johnson@example.com', phone: '456-789-1234', salary: '$65,000', hireDate: '2021-02-10',
        address: '789 Oak St, Chicago, IL', officeNo: '303', officeAddress: 'Corporate Tower, Chicago, IL' 
    },
    { 
        id: 14, name: 'Bob Brown', department: 'Sales', position: 'Sales Executive', 
        email: 'bob.brown@example.com', phone: '321-654-9870', salary: '$72,000', hireDate: '2018-11-05',
        address: '159 Maple St, Houston, TX', officeNo: '404', officeAddress: 'Commerce Plaza, Houston, TX' 
    },
    { 
        id: 15, name: 'Charlie White', department: 'Finance', position: 'Financial Analyst', 
        email: 'charlie.white@example.com', phone: '789-123-4567', salary: '$88,000', hireDate: '2017-06-25',
        address: '753 Birch St, San Francisco, CA', officeNo: '505', officeAddress: 'Finance Tower, San Francisco, CA' 
    },
    { 
        id: 16, name: 'David Lee', department: 'Engineering', position: 'DevOps Engineer', 
        email: 'david.lee@example.com', phone: '555-666-7777', salary: '$95,000', hireDate: '2022-01-15',
        address: '951 Cedar St, Boston, MA', officeNo: '606', officeAddress: 'Innovation Center, Boston, MA' 
    },
    { 
        id: 17, name: 'Emily Davis', department: 'Customer Support', position: 'Support Specialist', 
        email: 'emily.davis@example.com', phone: '888-999-0000', salary: '$55,000', hireDate: '2020-09-30',
        address: '357 Walnut St, Seattle, WA', officeNo: '707', officeAddress: 'Tech Plaza, Seattle, WA' 
    },
    { 
        id: 18, name: 'Franklin Wilson', department: 'Operations', position: 'Operations Manager', 
        email: 'franklin.wilson@example.com', phone: '111-222-3333', salary: '$95,000', hireDate: '2015-04-12',
        address: '852 Spruce St, Miami, FL', officeNo: '808', officeAddress: 'Logistics Park, Miami, FL' 
    },
    { 
        id: 19, name: 'Grace Hall', department: 'Engineering', position: 'Frontend Developer', 
        email: 'grace.hall@example.com', phone: '444-555-6666', salary: '$78,000', hireDate: '2019-07-18',
        address: '369 Pine St, Austin, TX', officeNo: '909', officeAddress: 'Development Hub, Austin, TX' 
    },
    { 
        id: 10, name: 'Henry Clark', department: 'IT', position: 'System Administrator', 
        email: 'henry.clark@example.com', phone: '777-888-9999', salary: '$82,000', hireDate: '2016-12-03',
        address: '741 Redwood St, Denver, CO', officeNo: '1010', officeAddress: 'Cyber Park, Denver, CO' 
    },
];




const frozenFields = ['id', 'name']; // Fields to freeze

const App = () => {
    return (
        <CustomDataTable
            columns={columns}
            rows={rows}
            frozenFields={frozenFields}
        />
    );
};

export default App;