/**
=========================================================
* Virtual Estate - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Niklas Läsche (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

// @mui material components
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";

// Virtual Estate components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Virtual Estate example components
import TimelineItem from "examples/Timeline/TimelineItem";

function EventOverview() {
  return (
    <Card sx={{ height: "100%" }}>
      <MDBox pt={3} px={3}>
        <MDTypography variant="h6" fontWeight="medium">
          Last Booking Events
        </MDTypography>
      </MDBox>
      <MDBox p={2}>
        <TimelineItem
          color="error"
          icon="check_circle_outline"
          title="Property 12 - Job 7 Check OUT"
          dateTime="22 DEC 13:45 PM"
        />
        <TimelineItem
          color="success"
          icon="check_circle"
          title="Property 12 - Job 7 Check IN"
          dateTime="22 DEC 7:20 PM"
        />
        <TimelineItem
          color="error"
          icon="check_circle_outline"
          title="Property 3 - Job 2 Check OUT"
          dateTime="22 DEC 13:45 PM"
        />
        <TimelineItem
          color="error"
          icon="check_circle_outline"
          title="Property 12 - Job 7 Check OUT"
          dateTime="22 DEC 10:30 PM"
        />
        <TimelineItem
          color="success"
          icon="check_circle"
          title="Property  - Job 7 Check IN"
          dateTime="22 DEC 8:45 PM"
        />
        <TimelineItem
          color="success"
          icon="check_circle"
          title="Property 3 - Job 2 Check IN"
          dateTime="22 DEC 7:20 PM"
        />
      </MDBox>
    </Card>
  );
}

export default EventOverview;
