import { useState } from "react";
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DataTable from "examples/Tables/DataTable";
import data from "./data";
import AddJobForm from "./AddJobForm";
import ViewBookingsDialog from "./ViewBookingsDialog";

function Jobs() {
  const { columns, rows } = data();
  const [menu, setMenu] = useState(null);
  const [isAddFormOpen, setIsAddFormOpen] = useState(false);
  const [selectedJobId, setSelectedJobId] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const openMenu = ({ currentTarget }) => setMenu(currentTarget);
  const closeMenu = () => setMenu(null);

  const openAddForm = () => {
    setIsAddFormOpen(true);
    closeMenu();
  };

  const closeAddForm = () => {
    setIsAddFormOpen(false);
  };

  const handleAddJob = (newJob) => {
    console.log("New Job:", newJob);
    // Optionally, add newJob to local rows state if necessary
  };

  const handleRowClick = (jobId) => {
    setSelectedJobId(jobId);
    setIsDialogOpen(true);
    console.log("Job ID set for dialog:", jobId); // Debugging log
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    setSelectedJobId(null);
  };

  // Add click handlers to each row
  const rowsWithClickHandler = rows.map((row) => ({
    ...row,
    action: (
      <MDTypography
        variant="caption"
        color="primary"
        sx={{ cursor: "pointer" }}
        onClick={() => handleRowClick(row.job_id)}
      >
        View Bookings
      </MDTypography>
    ),
  }));

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
            Jobs
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
          table={{
            columns: [...columns, { Header: "Actions", accessor: "action", align: "center" }],
            rows: rowsWithClickHandler,
          }}
          showTotalEntries={false}
          isSorted={false}
          noEndBorder
          entriesPerPage={false}
        />
      </MDBox>
      <AddJobForm open={isAddFormOpen} onClose={closeAddForm} onSubmit={handleAddJob} />
      <ViewBookingsDialog open={isDialogOpen} onClose={closeDialog} jobId={selectedJobId} />
    </Card>
  );
}

export default Jobs;
