// @mui material components
import Grid from "@mui/material/Grid";

// Virtual Estate components
import MDBox from "components/MDBox";

// Virtual Estate example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import Footer from "examples/Footer";

// Dashboard components
import Properties from "./components";

function Jobs() {
  return (
    <DashboardLayout>
      <MDBox py={3}>
        <MDBox>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={12}>
              <Properties />
            </Grid>
          </Grid>
        </MDBox>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Jobs;
