import { useState } from "react";
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DataTable from "examples/Tables/DataTable";
import data from "./data";

function Properties() {
  const { columns, rows } = data();
  const [menu, setMenu] = useState(null);
  const [isAddFormOpen, setIsAddFormOpen] = useState(false);

  const openMenu = ({ currentTarget }) => setMenu(currentTarget);
  const closeMenu = () => setMenu(null);

  const openAddForm = () => {
    setIsAddFormOpen(true);
    closeMenu();
  };

  const closeAddForm = () => {
    setIsAddFormOpen(false);
  };

  const handleAddProperty = (newProperty) => {
    // Process the new property data (add it to the table)
    // This could involve updating local state, making an API call, etc.
    console.log("New Property:", newProperty);
  };

  const renderMenu = (
    <Menu
      id="simple-menu"
      anchorEl={menu}
      anchorOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={Boolean(menu)}
      onClose={closeMenu}
    >
      <MenuItem onClick={openAddForm}>Add Job</MenuItem>
      <MenuItem onClick={closeMenu}>Delete Job</MenuItem>
    </Menu>
  );

  return (
    <Card>
      <MDBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
        <MDBox>
          <MDTypography variant="h6" gutterBottom>
            Bookings
          </MDTypography>
        </MDBox>
      </MDBox>
      <MDBox>
        <DataTable
          table={{ columns, rows }}
          showTotalEntries={false}
          isSorted={false}
          noEndBorder
          entriesPerPage={false}
        />
      </MDBox>
    </Card>
  );
}

export default Properties;
