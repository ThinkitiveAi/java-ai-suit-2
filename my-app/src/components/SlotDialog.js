import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Switch,
  FormControlLabel,
  Divider,
  Typography,
  Box,
  Chip,
  Alert,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import {
  AccessTime,
  LocationOn,
  AttachMoney,
  Schedule,
} from "@mui/icons-material";

const SlotDialog = ({
  open,
  onClose,
  slotForm,
  setSlotForm,
  onSubmit,
  editingSlot,
  appointmentTypes,
}) => {
  const handleFormChange = (field, value) => {
    if (field.includes(".")) {
      const [parent, child] = field.split(".");
      setSlotForm((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value,
        },
      }));
    } else {
      setSlotForm((prev) => ({
        ...prev,
        [field]: value,
      }));
    }
  };

  const validateForm = () => {
    if (slotForm.startTime >= slotForm.endTime) {
      return "Start time must be before end time";
    }
    if (slotForm.slotDuration < 15 || slotForm.slotDuration > 120) {
      return "Slot duration must be between 15 and 120 minutes";
    }
    if (slotForm.breakDuration < 0 || slotForm.breakDuration > 60) {
      return "Break duration must be between 0 and 60 minutes";
    }
    if (slotForm.maxAppointments < 1 || slotForm.maxAppointments > 10) {
      return "Max appointments must be between 1 and 10";
    }
    return null;
  };

  const validationError = validateForm();

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Schedule />
          {editingSlot
            ? "Edit Availability Slot"
            : "Create New Availability Slot"}
        </Box>
      </DialogTitle>
      <DialogContent>
        {validationError && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {validationError}
          </Alert>
        )}

        <Grid container spacing={3} sx={{ mt: 1 }}>
          {/* Basic Information */}
          <Grid item xs={12}>
            <Typography
              variant="h6"
              sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}
            >
              <AccessTime />
              Basic Information
            </Typography>
          </Grid>

          <Grid item xs={12} md={6}>
            <DatePicker
              label="Date"
              value={slotForm.date}
              onChange={(newValue) => handleFormChange("date", newValue)}
              renderInput={(params) => <TextField {...params} fullWidth />}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel>Appointment Type</InputLabel>
              <Select
                value={slotForm.appointmentType}
                onChange={(e) =>
                  handleFormChange("appointmentType", e.target.value)
                }
                label="Appointment Type"
              >
                {appointmentTypes.map((type) => (
                  <MenuItem key={type} value={type}>
                    {type}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Start Time"
              type="time"
              value={slotForm.startTime}
              onChange={(e) => handleFormChange("startTime", e.target.value)}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="End Time"
              type="time"
              value={slotForm.endTime}
              onChange={(e) => handleFormChange("endTime", e.target.value)}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="Slot Duration (minutes)"
              type="number"
              value={slotForm.slotDuration}
              onChange={(e) =>
                handleFormChange("slotDuration", parseInt(e.target.value))
              }
              inputProps={{ min: 15, max: 120 }}
              helperText="15-120 minutes"
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="Break Duration (minutes)"
              type="number"
              value={slotForm.breakDuration}
              onChange={(e) =>
                handleFormChange("breakDuration", parseInt(e.target.value))
              }
              inputProps={{ min: 0, max: 60 }}
              helperText="0-60 minutes"
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <TextField
              fullWidth
              label="Max Appointments"
              type="number"
              value={slotForm.maxAppointments}
              onChange={(e) =>
                handleFormChange("maxAppointments", parseInt(e.target.value))
              }
              inputProps={{ min: 1, max: 10 }}
              helperText="1-10 appointments"
            />
          </Grid>

          {/* Location & Pricing */}
          <Grid item xs={12}>
            <Divider sx={{ my: 2 }} />
            <Typography
              variant="h6"
              sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}
            >
              <LocationOn />
              Location & Pricing
            </Typography>
          </Grid>

          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel>Location Type</InputLabel>
              <Select
                value={slotForm.location.type}
                onChange={(e) =>
                  handleFormChange("location.type", e.target.value)
                }
                label="Location Type"
              >
                <MenuItem value="In-person">In-person</MenuItem>
                <MenuItem value="Telemedicine">Telemedicine</MenuItem>
                <MenuItem value="Home Visit">Home Visit</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Room/Address"
              value={slotForm.location.room}
              onChange={(e) =>
                handleFormChange("location.room", e.target.value)
              }
              placeholder={
                slotForm.location.type === "Telemedicine"
                  ? "Video call link"
                  : "Room number or address"
              }
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Fee"
              type="number"
              value={slotForm.pricing.fee}
              onChange={(e) => handleFormChange("pricing.fee", e.target.value)}
              InputProps={{
                startAdornment: <AttachMoney />,
              }}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel>Currency</InputLabel>
              <Select
                value={slotForm.pricing.currency}
                onChange={(e) =>
                  handleFormChange("pricing.currency", e.target.value)
                }
                label="Currency"
              >
                <MenuItem value="USD">USD ($)</MenuItem>
                <MenuItem value="EUR">EUR (€)</MenuItem>
                <MenuItem value="GBP">GBP (£)</MenuItem>
                <MenuItem value="CAD">CAD (C$)</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Switch
                  checked={slotForm.pricing.insuranceAccepted}
                  onChange={(e) =>
                    handleFormChange(
                      "pricing.insuranceAccepted",
                      e.target.checked
                    )
                  }
                />
              }
              label="Insurance Accepted"
            />
          </Grid>

          {/* Additional Information */}
          <Grid item xs={12}>
            <Divider sx={{ my: 2 }} />
            <Typography variant="h6" sx={{ mb: 2 }}>
              Additional Information
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Notes"
              multiline
              rows={3}
              value={slotForm.notes}
              onChange={(e) => handleFormChange("notes", e.target.value)}
              placeholder="Any special instructions or requirements..."
            />
          </Grid>

          {/* Recurring Options */}
          <Grid item xs={12}>
            <Divider sx={{ my: 2 }} />
            <Typography variant="h6" sx={{ mb: 2 }}>
              Recurring Options
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Switch
                  checked={slotForm.isRecurring}
                  onChange={(e) =>
                    handleFormChange("isRecurring", e.target.checked)
                  }
                />
              }
              label="Make this a recurring slot"
            />
          </Grid>

          {slotForm.isRecurring && (
            <>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel>Recurrence Type</InputLabel>
                  <Select
                    value={slotForm.recurrenceType}
                    onChange={(e) =>
                      handleFormChange("recurrenceType", e.target.value)
                    }
                    label="Recurrence Type"
                  >
                    <MenuItem value="daily">Daily</MenuItem>
                    <MenuItem value="weekly">Weekly</MenuItem>
                    <MenuItem value="monthly">Monthly</MenuItem>
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} md={6}>
                <DatePicker
                  label="End Date"
                  value={slotForm.endDate}
                  onChange={(newValue) => handleFormChange("endDate", newValue)}
                  renderInput={(params) => <TextField {...params} fullWidth />}
                />
              </Grid>
            </>
          )}
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          onClick={onSubmit}
          variant="contained"
          disabled={!!validationError}
        >
          {editingSlot ? "Update" : "Create"} Slot
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SlotDialog;
