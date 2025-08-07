import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grid,
  TextField,
  Typography,
  Box,
  Alert,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Block, AccessTime, Event } from "@mui/icons-material";

const BlockDialog = ({
  open,
  onClose,
  blockForm,
  setBlockForm,
  onSubmit,
  editingBlock,
}) => {
  const handleFormChange = (field, value) => {
    setBlockForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const validateForm = () => {
    if (blockForm.startTime >= blockForm.endTime) {
      return "Start time must be before end time";
    }
    return null;
  };

  const validationError = validateForm();

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Block />
          {editingBlock ? "Edit Block Day" : "Add Block Day"}
        </Box>
      </DialogTitle>
      <DialogContent>
        {validationError && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {validationError}
          </Alert>
        )}

        <Grid container spacing={3} sx={{ mt: 1 }}>
          <Grid item xs={12}>
            <Typography
              variant="h6"
              sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}
            >
              <Event />
              Block Information
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <DatePicker
              label="Date"
              value={blockForm.date}
              onChange={(newValue) => handleFormChange("date", newValue)}
              renderInput={(params) => <TextField {...params} fullWidth />}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Start Time"
              type="time"
              value={blockForm.startTime}
              onChange={(e) => handleFormChange("startTime", e.target.value)}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="End Time"
              type="time"
              value={blockForm.endTime}
              onChange={(e) => handleFormChange("endTime", e.target.value)}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>

          <Grid item xs={12}>
            <Typography
              variant="h6"
              sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}
            >
              <AccessTime />
              Block Details
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Reason (Optional)"
              multiline
              rows={3}
              value={blockForm.reason}
              onChange={(e) => handleFormChange("reason", e.target.value)}
              placeholder="Why is this time blocked? (e.g., vacation, conference, personal time)"
            />
          </Grid>

          <Grid item xs={12}>
            <Alert severity="info" sx={{ mt: 2 }}>
              <Typography variant="body2">
                <strong>Note:</strong> Blocked days prevent any appointments
                from being scheduled during the specified time period. This is
                useful for vacations, conferences, or other times when you're
                unavailable.
              </Typography>
            </Alert>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          onClick={onSubmit}
          variant="contained"
          disabled={!!validationError}
        >
          {editingBlock ? "Update" : "Add"} Block
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default BlockDialog;
