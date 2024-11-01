import { useState } from "react";
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DataTable from "examples/Tables/DataTable";
import data from "layouts/dashboard/components/Properties/data";
import AddPropertyForm from "./components/AddPropertyForm";

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
      <MenuItem onClick={openAddForm}>Add Property</MenuItem>
      <MenuItem onClick={closeMenu}>Delete Property</MenuItem>
    </Menu>
  );

  return (
    <Card>
      <MDBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
        <MDBox>
          <MDTypography variant="h6" gutterBottom>
            Properties
          </MDTypography>
        </MDBox>
        <MDBox color="text" px={2}>
          <Icon sx={{ cursor: "pointer", fontWeight: "bold" }} fontSize="small" onClick={openMenu}>
            more_vert
          </Icon>
        </MDBox>
        {renderMenu}
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
      <AddPropertyForm open={isAddFormOpen} onClose={closeAddForm} onSubmit={handleAddProperty} />
    </Card>
  );
}

export default Properties;
