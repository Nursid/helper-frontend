export const columns = [
    { field: "id", headerName: "ID", flex: 1, minWidth: 100, editable: true },
    { field: "registrarId", headerName: "Customer ID", minWidth: 120, editable: true },
    { field: "orderNumber", headerName: "Order Number", minWidth: 120, editable: true },
    { field: "type", headerName: "Type", minWidth: 80, editable: true },
    { field: "servicetype", headerName: "Service Type", minWidth: 120, editable: true },
    { field: "bookingtime", headerName: "Booking Time", minWidth: 120, editable: true },
    { field: "bookingdate", headerName: "Booking Date", minWidth: 120, editable: true },
    {
        field: "name",
        headerName: "Customer Name",
        flex: 1,
        cellClassName: "name-column--cell",
        minWidth: 150,
        editable: true,
    },
    { field: "service", headerName: "Service Name", minWidth: 120, editable: true },
    { field: "servicedetails", headerName: "Service Details", minWidth: 150, editable: true },
    { field: "supervisor", headerName: "Supervisor", minWidth: 120, editable: true },
    { field: "serviceprovider", headerName: "Service Provider", minWidth: 150, editable: true },
    { field: "vehicleused", headerName: "Vehicle Used", minWidth: 120, editable: true },
    { field: "billingamount", headerName: "Billing Amount", minWidth: 150, editable: true },
    { field: "paidamount", headerName: "Paid Amount", minWidth: 150, editable: true },
    { field: "balanceamount", headerName: "Balance Amount", minWidth: 150, editable: true },
    { field: "paymentmethod", headerName: "Payment Method", minWidth: 150, editable: true },
    {
        field: "backofficeremark",
        headerName: "Back Office Remark",
        minWidth: 180,
        editable: true,
    },
    { field: "adminremark", headerName: "Admin Remark", minWidth: 150, editable: true },
    { field: "providerratings", headerName: "Provider Ratings", minWidth: 150, editable: true },
    {
        field: "superadminremark",
        headerName: "Super Admin Remark",
        minWidth: 180,
        editable: true,
    },
    {
        field: "serviceproviderremark",
        headerName: "Service Provider Remark",
        minWidth: 180,
        editable: true,
    },
    { field: "orderstatus", headerName: "Order Status", minWidth: 150, editable: true },
    { field: "canclereason", headerName: "Cancel Reason", minWidth: 150, editable: true },
    {
        field: "age",
        headerName: "Age",
        type: "number",
        headerAlign: "left",
        align: "left",
        minWidth: 80,
        editable: true,
    },
    { field: "phone", headerName: "Phone Number", flex: 1, minWidth: 150, editable: true },
    { field: "email", headerName: "Email", flex: 1, minWidth: 150, editable: true },
    { field: "address", headerName: "Address", flex: 1, minWidth: 150, editable: true },
    { field: "city", headerName: "City", flex: 1, minWidth: 150, editable: true },
    { field: "zipCode", headerName: "Zip Code", flex: 1, minWidth: 150, editable: true },
    {
        field: "action",
        headerName: "Action",
        renderCell: (params) => (
            <select
                className="p-2 border-0"
                style={{ borderRadius: "5px", outline: "none", cursor: "pointer" }}
            >
                <option value="Cancel">Cancel</option>
                <option value="Transfer">Transfer</option>
                <option value="Hold">Hold</option>
                <option value="Complete">Complete</option>
                <option value="Edit">Edit</option>
                <option value="Delete">Delete</option>
            </select>
        ),
        minWidth: 150,
        editable: true,
    },
    {
        field: "status",
        headerName: "Status",
        className: "centerTheElement",
        renderCell: (params) => (
            <p
                className="text-danger p-2 bg-light"
                style={{
                    borderRadius: "5px",
                    cursor: "pointer",
                    transform: "translate(25%,25%)",
                }}
            >
                Check In
            </p>
        ),
        minWidth: 150,
        editable: true,
    },
];
