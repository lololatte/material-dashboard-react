// src/layouts/dashboard/components/Jobs/data.js

import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import MDTypography from "components/MDTypography";

// Job type choices
const JOB_TYPE_CHOICES = [
  { value: "EA", label: "Einmalauftrag" },
  { value: "DA", label: "Dauerauftrag" },
];

// Billing period choices
const BILLING_PERIOD_CHOICES = [
  { value: "EZ", label: "Einmalzahlung" },
  { value: "MO", label: "Monatlich" },
  { value: "QU", label: "Quartalsweise" },
  { value: "HY", label: "Halbjährlich" },
  { value: "JA", label: "Jährlich" },
];

// Helper function to get job type full name from abbreviation
const getJobTypeLabel = (abbreviation) => {
  const choice = JOB_TYPE_CHOICES.find((item) => item.value === abbreviation);
  return choice ? choice.label : abbreviation;
};

// Helper function to get billing period full name from abbreviation
const getBillingPeriodLabel = (abbreviation) => {
  const choice = BILLING_PERIOD_CHOICES.find((item) => item.value === abbreviation);
  return choice ? choice.label : abbreviation;
};

// JobType component with PropTypes validation
const JobType = ({ type }) => (
  <MDTypography variant="button" fontWeight="medium" lineHeight={1.5}>
    {getJobTypeLabel(type)}
  </MDTypography>
);

JobType.propTypes = {
  type: PropTypes.oneOf(JOB_TYPE_CHOICES.map((choice) => choice.value)).isRequired,
};

// BillingPeriod component with PropTypes validation
const BillingPeriod = ({ period }) => (
  <MDTypography variant="button" fontWeight="medium" lineHeight={1.5}>
    {getBillingPeriodLabel(period)}
  </MDTypography>
);

BillingPeriod.propTypes = {
  period: PropTypes.oneOf(BILLING_PERIOD_CHOICES.map((choice) => choice.value)).isRequired,
};

// Data component for jobs
export default function data() {
  const [tableRows, setTableRows] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch jobs and properties data
        const [jobsResponse, propertiesResponse] = await Promise.all([
          axios.get("http://localhost/api/jobs/", {
            headers: { Authorization: "Token eb1ae3b86de6b734d71901c5eb0f3fb2d1f0a729" },
          }),
          axios.get("http://localhost/api/properties/", {
            headers: { Authorization: "Token eb1ae3b86de6b734d71901c5eb0f3fb2d1f0a729" },
          }),
        ]);

        const jobsData = jobsResponse.data;
        const propertiesData = propertiesResponse.data;

        // Create a mapping of property IDs to property objects
        const propertyMap = propertiesData.reduce((map, property) => {
          map[property.id] = property;
          return map;
        }, {});

        // Map jobs to include property address details
        const formattedRows = jobsData.map((job) => {
          const property = propertyMap[job.property];
          const propertyAddress = property
            ? `${property.street} ${property.number}, ${property.city}`
            : "Address not available";

          return {
            job_id: job.id, // Hidden field that won’t be displayed in the table
            property: (
              <MDTypography variant="button" fontWeight="medium">
                {propertyAddress}
              </MDTypography>
            ),
            unit: (
              <MDTypography variant="button" fontWeight="medium">
                {job.unit}
              </MDTypography>
            ),
            description: (
              <MDTypography variant="caption" color="text" fontWeight="medium">
                {job.description}
              </MDTypography>
            ),
            contractor: (
              <MDTypography variant="caption" color="text" fontWeight="medium">
                {job.contractor}
              </MDTypography>
            ),
            type: <JobType type={job.type} />,
            start: (
              <MDTypography variant="caption" color="text" fontWeight="medium">
                {job.start}
              </MDTypography>
            ),
            end: (
              <MDTypography variant="caption" color="text" fontWeight="medium">
                {job.end}
              </MDTypography>
            ),
            billing_period: <BillingPeriod period={job.billing_period} />,
            billed_hours: (
              <MDTypography variant="caption" color="text" fontWeight="medium">
                {job.billed_hours}
              </MDTypography>
            ),
          };
        });

        setTableRows(formattedRows);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return {
    columns: [
      { Header: "Property", accessor: "property", width: "20%", align: "left" },
      { Header: "Unit", accessor: "unit", width: "15%", align: "left" },
      { Header: "Description", accessor: "description", width: "30%", align: "left" },
      { Header: "Contractor", accessor: "contractor", align: "left" },
      { Header: "Type", accessor: "type", align: "center" },
      { Header: "Start Date", accessor: "start", align: "center" },
      { Header: "End Date", accessor: "end", align: "center" },
      { Header: "Billing Period", accessor: "billing_period", align: "center" },
      { Header: "Billed Hours", accessor: "billed_hours", align: "center" },
    ],
    rows: tableRows,
  };
}
