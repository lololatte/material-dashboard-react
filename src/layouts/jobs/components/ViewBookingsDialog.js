// ViewBookingsDialog.js

import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { styled } from "@mui/system";
import axios from "axios";
import { differenceInMinutes, parseISO } from "date-fns";

// Styled component for header cells and custom table head
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  backgroundColor: theme.palette.grey[200],
  fontWeight: "bold",
  textAlign: "center",
  color: theme.palette.text.primary,
  width: "33.33%",
}));

const CustomTableHead = styled(TableHead)({
  display: "table-header-group",
});

function ViewBookingsDialog({ open, onClose, jobId }) {
  const [allBookings, setAllBookings] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [totalBookedHours, setTotalBookedHours] = useState({ hours: 0, minutes: 0 });

  useEffect(() => {
    const fetchAllBookings = async () => {
      try {
        const response = await axios.get("http://localhost/api/bookings/", {
          headers: {
            Authorization: "Token eb1ae3b86de6b734d71901c5eb0f3fb2d1f0a729",
          },
        });
        setAllBookings(response.data);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };

    if (open && allBookings.length === 0) {
      fetchAllBookings();
    }
  }, [open, allBookings.length]);

  useEffect(() => {
    if (jobId && allBookings.length > 0) {
      const filteredBookings = allBookings.filter((booking) => booking.job_id === jobId);
      setBookings(filteredBookings);
      calculateTotalBookedHours(filteredBookings);
    }
  }, [jobId, allBookings]);

  // Function to calculate the total booked hours and minutes
  const calculateTotalBookedHours = (filteredBookings) => {
    let totalMinutes = 0;

    // Sort bookings by timestamp to ensure correct pairing
    const sortedBookings = filteredBookings.sort(
      (a, b) => new Date(a.timestamp) - new Date(b.timestamp)
    );
    let checkInTime = null;

    sortedBookings.forEach((booking) => {
      if (booking.check_type === "IN") {
        // Set check-in time
        checkInTime = parseISO(booking.timestamp);
      } else if (booking.check_type === "OUT" && checkInTime) {
        // Calculate duration from check-in to check-out
        const checkOutTime = parseISO(booking.timestamp);
        const minutes = differenceInMinutes(checkOutTime, checkInTime);
        totalMinutes += minutes;

        // Reset check-in time for the next pair
        checkInTime = null;
      }
    });

    // Convert total minutes to hours and minutes
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    setTotalBookedHours({ hours, minutes });
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>
        Bookings for Job {jobId} - Total Booked Hours: {totalBookedHours.hours}h{"."}
        {totalBookedHours.minutes}m
      </DialogTitle>
      <DialogContent>
        <TableContainer>
          <Table>
            <CustomTableHead>
              <TableRow>
                <StyledTableCell>Timestamp</StyledTableCell>
                <StyledTableCell>Battery %</StyledTableCell>
                <StyledTableCell>Check Type</StyledTableCell>
              </TableRow>
            </CustomTableHead>
            <TableBody>
              {bookings.length > 0 ? (
                bookings.map((booking) => (
                  <TableRow key={booking.id}>
                    <TableCell align="center">{booking.timestamp}</TableCell>
                    <TableCell align="center">
                      {booking.battery_percent ? `${booking.battery_percent}%` : "N/A"}
                    </TableCell>
                    <TableCell align="center">
                      {booking.check_type === "IN" ? "Check-in" : "Check-out"}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={3} align="center">
                    <Typography variant="body2" color="textSecondary">
                      No bookings found for this job.
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}

ViewBookingsDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  jobId: PropTypes.number,
};

export default ViewBookingsDialog;
