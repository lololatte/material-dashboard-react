// src/layouts/dashboard/components/Bookings/data.js

import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import MDTypography from "components/MDTypography";

// Check type choices
const CHECK_TYPE_CHOICES = [
  { value: "IN", label: "Check-in" },
  { value: "OUT", label: "Check-out" },
];

// Helper function to get full name from check type abbreviation
const getCheckTypeLabel = (abbreviation) => {
  const choice = CHECK_TYPE_CHOICES.find((item) => item.value === abbreviation);
  return choice ? choice.label : abbreviation;
};

// CheckType component with PropTypes validation
const CheckType = ({ type }) => (
  <MDTypography variant="button" fontWeight="medium" lineHeight={1.5}>
    {getCheckTypeLabel(type)}
  </MDTypography>
);

CheckType.propTypes = {
  type: PropTypes.oneOf(CHECK_TYPE_CHOICES.map((choice) => choice.value)).isRequired,
};

// Data component for bookings
export default function Bookings() {
  const [tableRows, setTableRows] = useState([]);

  useEffect(() => {
    // Fetch data from the API
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost/api/bookings/", {
          headers: {
            Authorization: "Token eb1ae3b86de6b734d71901c5eb0f3fb2d1f0a729",
          },
        });
        const fetchedData = response.data;

        // Format data into rows for the table
        const formattedRows = fetchedData.map((item) => ({
          job: (
            <MDTypography variant="button" fontWeight="medium">
              {item.job_description} {/* Adjust to display job info appropriately */}
            </MDTypography>
          ),
          timestamp: (
            <MDTypography variant="caption" color="text" fontWeight="medium">
              {item.timestamp}
            </MDTypography>
          ),
          ts: (
            <MDTypography variant="caption" color="text" fontWeight="medium">
              {item.ts || "N/A"}
            </MDTypography>
          ),
          imei: (
            <MDTypography variant="caption" color="text" fontWeight="medium">
              {item.imei}
            </MDTypography>
          ),
          battery_percent: (
            <MDTypography variant="caption" color="text" fontWeight="medium">
              {item.battery_percent ? `${item.battery_percent}%` : "N/A"}
            </MDTypography>
          ),
          check_type: <CheckType type={item.check_type} />,
        }));

        setTableRows(formattedRows);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };

    fetchData();
  }, []);

  const columns = [
    { Header: "Job", accessor: "job", align: "left" },
    { Header: "Timestamp", accessor: "timestamp", align: "center" },
    { Header: "TS", accessor: "ts", align: "center" },
    { Header: "IMEI", accessor: "imei", align: "center" },
    { Header: "Battery %", accessor: "battery_percent", align: "center" },
    { Header: "Check Type", accessor: "check_type", align: "center" },
  ];

  return {
    columns,
    rows: tableRows,
  };
}
