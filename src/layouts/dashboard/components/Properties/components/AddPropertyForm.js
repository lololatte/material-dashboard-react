// AddPropertyForm.js

import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import axios from "axios";

const PROPERTY_TYPE_CHOICES = [
  { value: "EFH", label: "Einfamilienhaus" },
  { value: "MFH", label: "Mehrfamilienhaus" },
  { value: "GI", label: "Gewerbeimmobilie" },
];

function AddPropertyForm({ open, onClose, onSubmit }) {
  const [propertyData, setPropertyData] = useState({
    street: "",
    number: "",
    postal_code: "",
    city: "",
    type: "",
    units: "",
    contact: "",
    property_management: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPropertyData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateForm = () => {
    return Object.values(propertyData).every((field) => field !== "");
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      setError("Please fill in all fields.");
      return;
    }

    setError("");

    try {
      const response = await axios.post("http://localhost/api/properties/", propertyData, {
        headers: {
          Authorization: "Token eb1ae3b86de6b734d71901c5eb0f3fb2d1f0a729",
        },
      });
      console.log("Property added successfully:", response.data);
      onSubmit(propertyData); // You can pass the data back to parent or do any further action
      onClose();
      window.location.reload(); // Refreshes the page after the dialog closes
    } catch (error) {
      console.error("Error adding property:", error);
      setError("Failed to add property. Please try again.");
    }
  };

  const fieldStyle = {
    minHeight: "44px",
    "& .MuiInputBase-root": {
      minHeight: "44px",
      alignItems: "center",
    },
    "& .MuiInputLabel-root": {
      transform: "translate(14px, -6px) scale(0.75)", // Ensures label is positioned correctly
      pointerEvents: "none", // Prevents label from overlapping or appearing within the input space
    },
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add New Property</DialogTitle>
      <DialogContent>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <TextField label="Street" name="street" fullWidth onChange={handleChange} margin="dense" />
        <TextField label="Number" name="number" fullWidth onChange={handleChange} margin="dense" />
        <TextField
          label="Postal Code"
          name="postal_code"
          fullWidth
          onChange={handleChange}
          margin="dense"
        />
        <TextField label="City" name="city" fullWidth onChange={handleChange} margin="dense" />
        {/* Property Type Dropdown */}
        <TextField
          select
          label="Type"
          name="type"
          value={propertyData.type}
          onChange={handleChange}
          fullWidth
          margin="dense"
          sx={fieldStyle}
        >
          {PROPERTY_TYPE_CHOICES.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <TextField label="Units" name="units" fullWidth onChange={handleChange} margin="dense" />
        <TextField
          label="Contact"
          name="contact"
          fullWidth
          onChange={handleChange}
          margin="dense"
        />
        <TextField
          label="Property Management"
          name="property_management"
          fullWidth
          onChange={handleChange}
          margin="dense"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} color="primary">
          Add Property
        </Button>
      </DialogActions>
    </Dialog>
  );
}

// Add PropTypes validation
AddPropertyForm.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default AddPropertyForm;
