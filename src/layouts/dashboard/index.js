/* eslint-disable no-unused-vars */
/**
=========================================================
* Argon Dashboard 2 MUI - v3.0.1
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-material-ui
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components
import Grid from "@mui/material/Grid";
import Icon from "@mui/material/Icon";
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import GroupsIcon from '@mui/icons-material/Groups';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

// Argon Dashboard 2 MUI components
import ArgonBox from "components/ArgonBox";
import ArgonTypography from "components/ArgonTypography";

// Argon Dashboard 2 MUI example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DetailedStatisticsCard from "examples/Cards/StatisticsCards/DetailedStatisticsCard";
import SalesTable from "examples/Tables/SalesTable";
import CategoriesList from "examples/Lists/CategoriesList";
// import GradientLineChart from "examples/Charts/LineCharts/GradientLineChart";
import GradientLineChart from "examples/LandingPage";

// Argon Dashboard 2 MUI base styles
import typography from "assets/theme/base/typography";

// Dashboard layout components
import Slider from "layouts/dashboard/components/Slider";

// Data
import gradientLineChartData from "layouts/dashboard/data/gradientLineChartData";
import salesTableData from "layouts/dashboard/data/salesTableData";
import categoriesListData from "layouts/dashboard/data/categoriesListData";
import { useEffect, useState } from "react";
import axios from "axios";

function Default() {
  const { size } = typography;
  const[data, setData] = useState({data:{}, isFetching:false});

  const fetchStats = async () => {
    try {
        setData((data) => ({data: data.data, isFetching: true}));
        const response = await axios.get(process.env.REACT_APP_ENDPOINT_STATS);
        setData({data: response.data, isFetching: false});
    } catch (e) {
        console.log(e);
        setData((data) => ({data: data.data, isFetching: false }));
    } 
  };

  useEffect(() => {
    setTimeout(fetchStats, 0);
  }, []);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <ArgonBox py={2}>
        <Grid container spacing={3} mb={3}>
          <Grid item xs={12} md={6} lg={3}>
            <DetailedStatisticsCard
              title="Number of Loads"
              count={data.data.loads}
              // icon={{ color: "info", component: <i className="ni ni-money-coins" /> }}
              icon={{ color: "info", component: <Inventory2Icon/> }}
              percentage={{ color: "success", count: `+${data.data.load_added_today}`, text: "today" }}
            />
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <DetailedStatisticsCard
              title="Number of Trucks"
              count={data.data.trucks}
              icon={{ color: "info", component: <LocalShippingIcon/> }}
              percentage={{ color: "success", count: `+${data.data.trucks_added_today}`, text: "today" }}
            />
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <DetailedStatisticsCard
              title="Participants"
              count={data.data.participants}
              icon={{ color: "info", component: <GroupsIcon/> }} 
              percentage={{ color: "success", count: `+${data.data.participants_today}`, text: "today" }}
            />
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <DetailedStatisticsCard
              title="Completed Orders"
              count="430"
              icon={{ color: "info", component: <CheckCircleIcon/> }}  
              percentage={{ color: "success", count: "+5", text: "today" }}
            />
          </Grid>
        </Grid>
        <Grid container spacing={3} mb={3}>
          <Grid item xs={12} lg={8}>         
            <GradientLineChart
              title="Sales Overview"
              description={
                <ArgonBox display="flex" alignItems="center">
                  <ArgonBox fontSize={size.lg} color="success" mb={0.3} mr={0.5} lineHeight={0}>
                    <Icon sx={{ fontWeight: "bold" }}>arrow_upward</Icon>
                  </ArgonBox>
                  <ArgonTypography variant="button" color="text" fontWeight="medium">
                    4% more{" "}
                    <ArgonTypography variant="button" color="text" fontWeight="regular">
                      in 2022
                    </ArgonTypography>
                  </ArgonTypography>
                </ArgonBox>
              }
              chart={gradientLineChartData}
            />

          </Grid>
          <Grid item xs={12} lg={4}>
            <Slider />
          </Grid>
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <SalesTable title="Sales by Country" rows={salesTableData} />
          </Grid>
          <Grid item xs={12} md={4}>
            <CategoriesList title="categories" categories={categoriesListData} />
          </Grid>
        </Grid>
      </ArgonBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Default;
