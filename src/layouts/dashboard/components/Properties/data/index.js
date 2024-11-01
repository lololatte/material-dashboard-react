import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

const PROPERTY_TYPE_CHOICES = [
  { value: "EFH", label: "Einfamilienhaus" },
  { value: "MFH", label: "Mehrfamilienhaus" },
  { value: "GI", label: "Gewerbeimmobilie" },
];

const Address = ({ street, nr, postcode, city }) => (
  <MDBox display="flex" lineHeight={1} flexDirection="column">
    <MDTypography variant="button" fontWeight="medium" lineHeight={1.5}>
      {street} {nr}
    </MDTypography>
    <MDTypography variant="button" fontWeight="medium" lineHeight={1.5}>
      {postcode} {city}
    </MDTypography>
  </MDBox>
);

// Helper function to get full name from abbreviation
const getPropertyTypeLabel = (abbreviation) => {
  const choice = PROPERTY_TYPE_CHOICES.find((item) => item.value === abbreviation);
  return choice ? choice.label : abbreviation; // Returns label or the abbreviation if not found
};

Address.propTypes = {
  street: PropTypes.string.isRequired,
  nr: PropTypes.string.isRequired,
  postcode: PropTypes.string.isRequired,
  city: PropTypes.string.isRequired,
};

const Type = ({ type, units }) => (
  <MDBox display="flex" alignItems="center" lineHeight={1}>
    <MDTypography variant="button" fontWeight="medium" lineHeight={1.5}>
      {getPropertyTypeLabel(type)} / {units} Einheiten
    </MDTypography>
  </MDBox>
);

Type.propTypes = {
  type: PropTypes.string.isRequired,
  units: PropTypes.number.isRequired,
};

export default function Data() {
  const [tableRows, setTableRows] = useState([]);

  useEffect(() => {
    // Fetch data from the API
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost/api/properties/", {
          headers: {
            Authorization: "Token eb1ae3b86de6b734d71901c5eb0f3fb2d1f0a729",
          },
        });
        const fetchedData = response.data;

        const formattedRows = fetchedData.map((item) => ({
          address: (
            <Address
              street={item.street}
              nr={item.number}
              postcode={item.postal_code}
              city={item.city}
            />
          ),
          type: <Type type={item.type} units={item.units} />,
          owner: (
            <MDTypography variant="caption" color="text" fontWeight="medium">
              {item.owner}
            </MDTypography>
          ),
          managment: (
            <MDTypography variant="caption" color="text" fontWeight="medium">
              {item.property_management}
            </MDTypography>
          ),
        }));

        setTableRows(formattedRows);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return {
    columns: [
      { Header: "address", accessor: "address", width: "30%", align: "left" },
      { Header: "type / units", accessor: "type", width: "20%", align: "left" },
      { Header: "owner", accessor: "owner", align: "center" },
      { Header: "property management", accessor: "managment", align: "center" },
    ],
    rows: tableRows,
  };
}
