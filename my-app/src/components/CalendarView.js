import React, { useState, useMemo } from "react";
import {
  Box,
  Typography,
  Button,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Card,
  CardContent,
} from "@mui/material";
import {
  Add,
  Edit,
  Delete,
  AccessTime,
  LocationOn,
  AttachMoney,
} from "@mui/icons-material";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import { format, parse, startOfWeek, getDay } from "date-fns";
import "react-big-calendar/lib/css/react-big-calendar.css";

const locales = {
  "en-US": require("date-fns/locale/en-US"),
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const CalendarView = ({
  selectedDate,
  setSelectedDate,
  availability,
  blockedDays,
  onAddSlot,
  onEditSlot,
  onDeleteSlot,
  onEditBlock,
  onDeleteBlock,
}) => {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [eventDialogOpen, setEventDialogOpen] = useState(false);

  // Convert availability slots to calendar events
  const availabilityEvents = useMemo(() => {
    return availability.map((slot) => ({
      id: slot.id,
      title: `${slot.appointmentType} (${slot.startTime}-${slot.endTime})`,
      start: new Date(`${format(slot.date, "yyyy-MM-dd")}T${slot.startTime}`),
      end: new Date(`${format(slot.date, "yyyy-MM-dd")}T${slot.endTime}`),
      resource: slot,
      type: "availability",
      color: "#1976d2",
    }));
  }, [availability]);

  // Convert blocked days to calendar events
  const blockedEvents = useMemo(() => {
    return blockedDays.map((block) => ({
      id: block.id,
      title: `Blocked: ${block.reason || "Unavailable"}`,
      start: new Date(`${format(block.date, "yyyy-MM-dd")}T${block.startTime}`),
      end: new Date(`${format(block.date, "yyyy-MM-dd")}T${block.endTime}`),
      resource: block,
      type: "blocked",
      color: "#f44336",
    }));
  }, [blockedDays]);

  // Combine all events
  const events = [...availabilityEvents, ...blockedEvents];

  const handleSelectEvent = (event) => {
    setSelectedEvent(event);
    setEventDialogOpen(true);
  };

  const handleSelectSlot = ({ start, end }) => {
    // Convert the selected time to the slot form format
    const selectedDate = new Date(start);
    const startTime = format(start, "HH:mm");
    const endTime = format(end, "HH:mm");

    // Trigger the add slot function with the selected date/time
    onAddSlot(selectedDate, startTime, endTime);
  };

  const handleCloseEventDialog = () => {
    setEventDialogOpen(false);
    setSelectedEvent(null);
  };

  const handleEditEvent = () => {
    if (selectedEvent) {
      if (selectedEvent.type === "availability") {
        onEditSlot(selectedEvent.resource);
      } else {
        onEditBlock(selectedEvent.resource);
      }
    }
    handleCloseEventDialog();
  };

  const handleDeleteEvent = () => {
    if (selectedEvent) {
      if (selectedEvent.type === "availability") {
        onDeleteSlot(selectedEvent.resource.id);
      } else {
        onDeleteBlock(selectedEvent.resource.id);
      }
    }
    handleCloseEventDialog();
  };

  const eventStyleGetter = (event) => {
    let style = {
      backgroundColor: event.color,
      borderRadius: "4px",
      opacity: 0.8,
      color: "white",
      border: "0px",
      display: "block",
      padding: "2px 5px",
    };

    if (event.type === "blocked") {
      style.backgroundColor = "#f44336";
      style.borderLeft = "4px solid #d32f2f";
    } else {
      style.backgroundColor = "#1976d2";
      style.borderLeft = "4px solid #1565c0";
    }

    return {
      style,
    };
  };

  const CustomToolbar = (toolbar) => {
    const goToToday = () => {
      toolbar.onNavigate("TODAY");
    };

    const goToPrev = () => {
      toolbar.onNavigate("PREV");
    };

    const goToNext = () => {
      toolbar.onNavigate("NEXT");
    };

    const viewNames = {
      month: "Month",
      week: "Week",
      day: "Day",
      // agenda: "Agenda",
    };

    return (
      <Box
        sx={{
          p: 2,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Button variant="outlined" size="small" onClick={goToToday}>
            Today
          </Button>
          <IconButton onClick={goToPrev} size="small">
            <span>‹</span>
          </IconButton>
          <IconButton onClick={goToNext} size="small">
            <span>›</span>
          </IconButton>
          <Typography variant="h6" sx={{ ml: 2 }}>
            {toolbar.label}
          </Typography>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          {Object.keys(viewNames).map((view) => (
            <Button
              key={view}
              variant={toolbar.view === view ? "contained" : "outlined"}
              size="small"
              onClick={() => toolbar.onView(view)}
            >
              {viewNames[view]}
            </Button>
          ))}
          {/* <Button
            variant="contained"
            startIcon={<Add />}
            onClick={() => onAddSlot()}
            sx={{ ml: 2 }}
          >
            Add Slot
          </Button> */}
        </Box>
      </Box>
    );
  };

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography variant="h6">Calendar View</Typography>
        <Box sx={{ display: "flex", gap: 1 }}>
          <Chip label="Available Slots" color="primary" size="small" />
          <Chip label="Blocked Time" color="error" size="small" />
        </Box>
      </Box>

      <Card sx={{ mb: 3 }}>
        <CardContent sx={{ p: 0 }}>
          <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 600 }}
            onSelectEvent={handleSelectEvent}
            onSelectSlot={handleSelectSlot}
            selectable
            eventPropGetter={eventStyleGetter}
            components={{
              toolbar: CustomToolbar,
            }}
            views={["month", "week", "day"]}
            defaultView="month"
            step={30}
            timeslots={2}
            min={new Date(0, 0, 0, 8, 0, 0)} // 8 AM
            max={new Date(0, 0, 0, 20, 0, 0)} // 8 PM
            slotPropGetter={(date) => {
              const hour = date.getHours();
              if (hour < 8 || hour >= 20) {
                return { style: { backgroundColor: "#f5f5f5" } };
              }
              return {};
            }}
          />
        </CardContent>
      </Card>

      {/* Event Details Dialog */}
      <Dialog
        open={eventDialogOpen}
        onClose={handleCloseEventDialog}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          {selectedEvent?.type === "availability"
            ? "Availability Slot Details"
            : "Blocked Time Details"}
        </DialogTitle>
        <DialogContent>
          {selectedEvent && (
            <Box sx={{ mt: 2 }}>
              <Typography variant="h6" gutterBottom>
                {selectedEvent.title}
              </Typography>

              <Grid container spacing={2} sx={{ mt: 1 }}>
                <Grid item xs={12}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      mb: 1,
                    }}
                  >
                    <AccessTime fontSize="small" />
                    <Typography variant="body2">
                      {format(selectedEvent.start, "MMM dd, yyyy")} •{" "}
                      {format(selectedEvent.start, "HH:mm")} -{" "}
                      {format(selectedEvent.end, "HH:mm")}
                    </Typography>
                  </Box>
                </Grid>

                {selectedEvent.type === "availability" &&
                  selectedEvent.resource && (
                    <>
                      <Grid item xs={12}>
                        <Typography variant="body2" color="text.secondary">
                          <strong>Appointment Type:</strong>{" "}
                          {selectedEvent.resource.appointmentType}
                        </Typography>
                      </Grid>

                      {selectedEvent.resource.location?.type && (
                        <Grid item xs={12}>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 1,
                            }}
                          >
                            <LocationOn fontSize="small" />
                            <Typography variant="body2" color="text.secondary">
                              {selectedEvent.resource.location.type}
                            </Typography>
                          </Box>
                        </Grid>
                      )}

                      {selectedEvent.resource.pricing?.fee && (
                        <Grid item xs={12}>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 1,
                            }}
                          >
                            <AttachMoney fontSize="small" />
                            <Typography variant="body2" color="text.secondary">
                              {selectedEvent.resource.pricing.fee}{" "}
                              {selectedEvent.resource.pricing.currency}
                            </Typography>
                          </Box>
                        </Grid>
                      )}

                      <Grid item xs={12}>
                        <Typography variant="body2" color="text.secondary">
                          <strong>Slot Duration:</strong>{" "}
                          {selectedEvent.resource.slotDuration} minutes
                        </Typography>
                      </Grid>

                      <Grid item xs={12}>
                        <Typography variant="body2" color="text.secondary">
                          <strong>Max Appointments:</strong>{" "}
                          {selectedEvent.resource.maxAppointments}
                        </Typography>
                      </Grid>
                    </>
                  )}

                {selectedEvent.type === "blocked" &&
                  selectedEvent.resource?.reason && (
                    <Grid item xs={12}>
                      <Typography variant="body2" color="text.secondary">
                        <strong>Reason:</strong> {selectedEvent.resource.reason}
                      </Typography>
                    </Grid>
                  )}
              </Grid>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEventDialog}>Close</Button>
          <Button onClick={handleEditEvent} variant="outlined" color="primary">
            Edit
          </Button>
          <Button onClick={handleDeleteEvent} variant="outlined" color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CalendarView;
