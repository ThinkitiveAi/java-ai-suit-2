import React, { useState } from "react";
import {
  Box,
  Typography,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Switch,
  FormControlLabel,
  Card,
  CardContent,
  Divider,
  Alert,
  Button,
  TextField,
} from "@mui/material";
import {
  Settings,
  Notifications,
  Security,
  Schedule,
} from "@mui/icons-material";

const timeZones = [
  { value: "UTC", label: "UTC" },
  { value: "America/New_York", label: "Eastern Time (ET)" },
  { value: "America/Chicago", label: "Central Time (CT)" },
  { value: "America/Denver", label: "Mountain Time (MT)" },
  { value: "America/Los_Angeles", label: "Pacific Time (PT)" },
  { value: "Europe/London", label: "London (GMT)" },
  { value: "Europe/Paris", label: "Paris (CET)" },
  { value: "Asia/Tokyo", label: "Tokyo (JST)" },
  { value: "Asia/Shanghai", label: "Shanghai (CST)" },
  { value: "Australia/Sydney", label: "Sydney (AEDT)" },
];

const AvailabilitySettings = ({ selectedTimeZone, setSelectedTimeZone }) => {
  const [settings, setSettings] = useState({
    autoConfirmAppointments: true,
    requirePatientConfirmation: false,
    sendReminderNotifications: true,
    allowOverbooking: false,
    maxAdvanceBookingDays: 30,
    minAdvanceBookingHours: 24,
    defaultSlotDuration: 30,
    defaultBreakDuration: 15,
    workingHours: {
      start: "09:00",
      end: "17:00",
    },
    workingDays: {
      monday: true,
      tuesday: true,
      wednesday: true,
      thursday: true,
      friday: true,
      saturday: false,
      sunday: false,
    },
  });

  const handleSettingChange = (field, value) => {
    if (field.includes(".")) {
      const [parent, child] = field.split(".");
      setSettings((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value,
        },
      }));
    } else {
      setSettings((prev) => ({
        ...prev,
        [field]: value,
      }));
    }
  };

  const handleSaveSettings = () => {
    // Here you would typically save to backend
    console.log("Saving settings:", settings);
  };

  return (
    <Box>
      <Typography
        variant="h6"
        gutterBottom
        sx={{ display: "flex", alignItems: "center", gap: 1 }}
      >
        <Settings />
        Availability Settings
      </Typography>

      <Grid container spacing={3}>
        {/* Time Zone Settings */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography
                variant="h6"
                sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}
              >
                <Schedule />
                Time Zone & Scheduling
              </Typography>

              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth>
                    <InputLabel>Default Time Zone</InputLabel>
                    <Select
                      value={selectedTimeZone}
                      onChange={(e) => setSelectedTimeZone(e.target.value)}
                      label="Default Time Zone"
                    >
                      {timeZones.map((tz) => (
                        <MenuItem key={tz.value} value={tz.value}>
                          {tz.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Max Advance Booking (days)"
                    type="number"
                    value={settings.maxAdvanceBookingDays}
                    onChange={(e) =>
                      handleSettingChange(
                        "maxAdvanceBookingDays",
                        parseInt(e.target.value)
                      )
                    }
                    inputProps={{ min: 1, max: 365 }}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Min Advance Booking (hours)"
                    type="number"
                    value={settings.minAdvanceBookingHours}
                    onChange={(e) =>
                      handleSettingChange(
                        "minAdvanceBookingHours",
                        parseInt(e.target.value)
                      )
                    }
                    inputProps={{ min: 0, max: 168 }}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Default Slot Duration (minutes)"
                    type="number"
                    value={settings.defaultSlotDuration}
                    onChange={(e) =>
                      handleSettingChange(
                        "defaultSlotDuration",
                        parseInt(e.target.value)
                      )
                    }
                    inputProps={{ min: 15, max: 120 }}
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Working Hours */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography
                variant="h6"
                sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}
              >
                <Schedule />
                Working Hours
              </Typography>

              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Start Time"
                    type="time"
                    value={settings.workingHours.start}
                    onChange={(e) =>
                      handleSettingChange("workingHours.start", e.target.value)
                    }
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="End Time"
                    type="time"
                    value={settings.workingHours.end}
                    onChange={(e) =>
                      handleSettingChange("workingHours.end", e.target.value)
                    }
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
              </Grid>

              <Divider sx={{ my: 2 }} />

              <Typography variant="subtitle1" gutterBottom>
                Working Days
              </Typography>

              <Grid container spacing={2}>
                {Object.entries(settings.workingDays).map(([day, enabled]) => (
                  <Grid item xs={6} md={3} key={day}>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={enabled}
                          onChange={(e) =>
                            handleSettingChange(
                              `workingDays.${day}`,
                              e.target.checked
                            )
                          }
                        />
                      }
                      label={day.charAt(0).toUpperCase() + day.slice(1)}
                    />
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Appointment Settings */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography
                variant="h6"
                sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}
              >
                <Schedule />
                Appointment Settings
              </Typography>

              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={settings.autoConfirmAppointments}
                        onChange={(e) =>
                          handleSettingChange(
                            "autoConfirmAppointments",
                            e.target.checked
                          )
                        }
                      />
                    }
                    label="Auto-confirm appointments"
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={settings.requirePatientConfirmation}
                        onChange={(e) =>
                          handleSettingChange(
                            "requirePatientConfirmation",
                            e.target.checked
                          )
                        }
                      />
                    }
                    label="Require patient confirmation"
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={settings.allowOverbooking}
                        onChange={(e) =>
                          handleSettingChange(
                            "allowOverbooking",
                            e.target.checked
                          )
                        }
                      />
                    }
                    label="Allow overbooking"
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={settings.sendReminderNotifications}
                        onChange={(e) =>
                          handleSettingChange(
                            "sendReminderNotifications",
                            e.target.checked
                          )
                        }
                      />
                    }
                    label="Send reminder notifications"
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Notifications */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography
                variant="h6"
                sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}
              >
                <Notifications />
                Notification Preferences
              </Typography>

              <Alert severity="info" sx={{ mb: 2 }}>
                Configure how and when you receive notifications about
                appointments and availability changes.
              </Alert>

              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <FormControlLabel
                    control={<Switch defaultChecked />}
                    label="Email notifications"
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <FormControlLabel
                    control={<Switch defaultChecked />}
                    label="SMS notifications"
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <FormControlLabel
                    control={<Switch />}
                    label="Push notifications"
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <FormControlLabel
                    control={<Switch defaultChecked />}
                    label="Calendar sync"
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Security */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography
                variant="h6"
                sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}
              >
                <Security />
                Security & Privacy
              </Typography>

              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <FormControlLabel
                    control={<Switch defaultChecked />}
                    label="Require authentication for changes"
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <FormControlLabel
                    control={<Switch defaultChecked />}
                    label="Log all availability changes"
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <FormControlLabel
                    control={<Switch />}
                    label="Two-factor authentication"
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <FormControlLabel
                    control={<Switch defaultChecked />}
                    label="Session timeout (30 minutes)"
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Box sx={{ mt: 3, display: "flex", justifyContent: "flex-end", gap: 2 }}>
        <Button variant="outlined">Reset to Defaults</Button>
        <Button variant="contained" onClick={handleSaveSettings}>
          Save Settings
        </Button>
      </Box>
    </Box>
  );
};

export default AvailabilitySettings;
