import { Box, IconButton } from "@mui/material";
// import { mockTransactions } from "./data/mockData";
// import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import "../../DashBoard.css";
// import EmailIcon from "@mui/icons-material/Email";
// import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
// import PersonAddIcon from "@mui/icons-material/PersonAdd";
// import TrafficIcon from "@mui/icons-material/Traffic";
// import Header from "../../components/Header";
// import LineChart from "../../components/LineChart";
// import GeographyChart from "../../components/GeographyChart";
// import BarChart from "../../components/BarChart";
// import StatBox from "../../components/StatBox";
// import ProgressCircle from "../../components/ProgressCircle";
import {
  DataGrid,
  GridToolbar,
  GridToolbarDensitySelector,
  GridToolbarExportContainer,
  GridToolbarFilterButton,
  GridToolbarQuickFilter,
} from "@mui/x-data-grid";
// import { mockDataContacts } from "../../data/mockData";
import ColoredBtn from "../../DashboardComponents/ColoredBtn";
import { Fragment, useState } from "react";
// import DashHeader from "./DashboardComponents/Global/DashHeader";
import { columns } from "../../GridTableCredentials/Colums";

import moment from "moment";
import { Button } from "reactstrap";
import { GridToolbarContainer } from "@mui/x-data-grid";
import { GridToolbarColumnsButton } from "@mui/x-data-grid";
import { GridToolbarExport } from "@mui/x-data-grid";
import { FiPlusSquare } from "react-icons/fi";
import ModalComponent from "../../DashboardComponents/ModalComponent";
import AddOrderForm from "./AddOrderForm";
// import { UseStateManager } from "../../../Context/StateManageContext";
import { useDispatch, useSelector } from "react-redux";
import GetAllOrders from "../../../Store/Actions/Dashboard/Orders/OrderAction";

const Dashboard = () => {
  // const { rows, setRows, Show, setShow } = UseStateManager()

  const [Show, setShow] = useState(false);

  const dispatch = useDispatch();
  const { data, isLoading } = useSelector((state) => state.GetAllOrderReducer);

  const DataWithID = (data) => {
    const NewData = [];
    if (data !== undefined) {
      for (let item of data) {
        NewData.push({
          ...item,
          id: data.indexOf(item),
          date: moment(item.createdAt).format("D / M / Y"),
        });
      }
    } else {
      NewData.push({ id: 0 });
    }
    return NewData;
  };

  // modal controller
  const toggleAddOrders = () => setShow(!Show);

  const CustomToolbar = () => {
    return (
      <GridToolbarContainer>
        <GridToolbarQuickFilter />
        <GridToolbarColumnsButton />
        <GridToolbarFilterButton />
        <GridToolbarExport />
        <GridToolbarDensitySelector />
        <div
          onClick={toggleAddOrders}
          style={{ color: "#4d4d4d" }}
          className="cursor-p "
        >
          <FiPlusSquare /> Add Order
        </div>
      </GridToolbarContainer>
    );
  };
  return (
    <Fragment>
      {/* Add Order Modal  */}
      <ModalComponent
        modalTitle={"Add Order"}
        modal={Show}
        toggle={toggleAddOrders}
        data={<AddOrderForm />}
      />
      {/* <DashHeader /> */}
      <Box m="20px">
        {/* HEADER */}
        <Box
          display="flex"
          justifyContent="space-around"
          alignItems="center"
          flexWrap={"wrap"}
        >
          {/* <Header title="DASHBOARD" subtitle="Welcome to your dashboard" /> */}
          <ColoredBtn
            btnName={"All Orders"}
            bg={"cornflowerblue"}
            color={"black"}
          />
          <ColoredBtn btnName={"Complete Order"} bg={"green"} color={"black"} />
          <ColoredBtn btnName={"Running Order"} bg={"yellow"} color={"black"} />
          <ColoredBtn btnName={"Cancel Order"} bg={"gray"} color={"black"} />
          <ColoredBtn btnName={"Hold Order"} bg={"#f08080"} color={"black"} />
          <ColoredBtn btnName={"Due Order"} bg={"#adadec"} color={"black"} />
          <ColoredBtn
            btnName={"Pending Order"}
            bg={"#ffa500"}
            color={"black"}
          />
        </Box>

        {/* GRID & CHARTS */}
        <Box
          display="grid"
          gridTemplateColumns="repeat(12, 1fr)"
          gridAutoRows="140px"
          gap="20px"
        ></Box>

        
        {/* Data Table  */}

        <Box>
          <Box
            m="0px 0 0 0"
            height="75vh"
            sx={{
              "& .MuiDataGrid-root": {
                border: "none",
              },
              "& .MuiDataGrid-cell": {
                borderBottom: "none",
              },
              "& .name-column--cell": {
                // color: colors.greenAccent[300],
                color: "#e52c2a",
              },
              "& .MuiDataGrid-columnHeaders": {
                // backgroundColor: colors.blueAccent[700],
                backgroundColor: "#112c85",
                borderBottom: "none",
                color: "#ffffff",
              },
              "& .MuiDataGrid-virtualScroller": {
                backgroundColor: "#f2f0f0",
              },
              "& .MuiDataGrid-footerContainer": {
                borderTop: "none",
                // backgroundColor: colors.blueAccent[700],
                backgroundColor: "#112c85",
                color: "#ffffff",
              },
              "& .MuiCheckbox-root": {
                color: `#1e5245 !important`,
              },
              "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                color: `#4d4d4d !important`,
              },
              "& .MuiSvgIcon-root": {
                fill: "#8c8c8c",
              },
              "& .MuiTablePagination-root": {
                color: "#ffffff",
              },
            }}
          >
            {/* <DataGrid
              rows={DataWithID(data.data)}
              columns={columns}
              components={{ Toolbar: CustomToolbar }}
            /> */}
          </Box>
        </Box>
      </Box>
    </Fragment>
  );
};

export default Dashboard;
