// AddJobForm.js

import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
  MenuItem,
} from "@mui/material";
import axios from "axios";

const JOB_TYPE_CHOICES = [
  { value: "EA", label: "Einmalauftrag" },
  { value: "DA", label: "Dauerauftrag" },
];

const BILLING_PERIOD_CHOICES = [
  { value: "EZ", label: "Einmalzahlung" },
  { value: "MO", label: "Monatlich" },
  { value: "QU", label: "Quartalsweise" },
  { value: "HY", label: "Halbjährlich" },
  { value: "JA", label: "Jährlich" },
];

function AddJobForm({ open, onClose, onSubmit }) {
  const [jobData, setJobData] = useState({
    property: "",
    unit: "",
    description: "",
    contractor: "",
    contact: "",
    type: "",
    start: "",
    end: "",
    billing_period: "",
    billed_hours: "",
  });

  const [properties, setProperties] = useState([]);
  const [error, setError] = useState("");

  // Fetch properties when the form opens
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.get("http://localhost/api/properties/", {
          headers: {
            Authorization: "Token eb1ae3b86de6b734d71901c5eb0f3fb2d1f0a729",
          },
        });
        setProperties(response.data);
      } catch (error) {
        console.error("Error fetching properties:", error);
      }
    };

    if (open) fetchProperties();
  }, [open]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setJobData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateForm = () => {
    return Object.values(jobData).every((field) => field !== "");
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      setError("Please fill in all fields.");
      return;
    }

    setError("");

    try {
      const response = await axios.post("http://localhost/api/jobs/", jobData, {
        headers: {
          Authorization: "Token eb1ae3b86de6b734d71901c5eb0f3fb2d1f0a729",
        },
      });
      console.log("Job added successfully:", response.data);
      onSubmit(jobData);
      onClose();
      window.location.reload();
    } catch (error) {
      console.error("Error adding job:", error);
      setError("Failed to add job. Please try again.");
    }
  };

  const fieldStyle = {
    minHeight: "44px",
    "& .MuiInputBase-root": {
      minHeight: "44px",
      alignItems: "center",
    },
    "& .MuiInputLabel-root": {
      transform: "translate(14px, -6px) scale(0.75)",
      pointerEvents: "none",
    },
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add New Job</DialogTitle>
      <DialogContent>
        {error && <p style={{ color: "red" }}>{error}</p>}

        {/* Property Selection Dropdown */}
        <TextField
          select
          label="Property"
          name="property"
          value={jobData.property}
          onChange={handleChange}
          fullWidth
          margin="dense"
          sx={fieldStyle}
        >
          {properties.map((property) => (
            <MenuItem key={property.id} value={property.id}>
              {property.name || `${property.street} ${property.number}, ${property.city}`}
            </MenuItem>
          ))}
        </TextField>

        <TextField label="Unit" name="unit" fullWidth onChange={handleChange} margin="dense" />
        <TextField
          label="Description"
          name="description"
          fullWidth
          onChange={handleChange}
          margin="dense"
        />
        <TextField
          label="Contractor"
          name="contractor"
          fullWidth
          onChange={handleChange}
          margin="dense"
        />
        <TextField
          label="Contact"
          name="contact"
          fullWidth
          onChange={handleChange}
          margin="dense"
        />

        {/* Job Type Dropdown */}
        <TextField
          select
          label="Type"
          name="type"
          value={jobData.type}
          onChange={handleChange}
          fullWidth
          margin="dense"
          sx={fieldStyle}
        >
          {JOB_TYPE_CHOICES.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          label="Start Date"
          name="start"
          type="date"
          fullWidth
          onChange={handleChange}
          margin="dense"
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          label="End Date"
          name="end"
          type="date"
          fullWidth
          onChange={handleChange}
          margin="dense"
          InputLabelProps={{ shrink: true }}
        />

        {/* Billing Period Dropdown */}
        <TextField
          select
          label="Billing Period"
          name="billing_period"
          value={jobData.billing_period}
          onChange={handleChange}
          fullWidth
          margin="dense"
          sx={fieldStyle}
        >
          {BILLING_PERIOD_CHOICES.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          label="Billed Hours"
          name="billed_hours"
          type="number"
          fullWidth
          onChange={handleChange}
          margin="dense"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} color="primary">
          Add Job
        </Button>
      </DialogActions>
    </Dialog>
  );
}

AddJobForm.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default AddJobForm;
