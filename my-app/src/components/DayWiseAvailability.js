import React from "react";
import {
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Button,
  Chip,
} from "@mui/material";
import {
  Add,
  Edit,
  Delete,
  ExpandMore,
  AccessTime,
  LocationOn,
} from "@mui/icons-material";

const DayWiseAvailability = ({
  availability,
  onAddSlot,
  onEditSlot,
  onDeleteSlot,
}) => {
  const daysOfWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const getSlotsForDay = (day) => {
    return availability.filter((slot) => {
      const slotDate = new Date(slot.date);
      const dayName = slotDate.toLocaleDateString("en-US", { weekday: "long" });
      return dayName === day;
    });
  };

  const getDayStatus = (day) => {
    const slots = getSlotsForDay(day);
    if (slots.length === 0) {
      return { status: "No slots", color: "default" };
    }

    const totalSlots = slots.reduce(
      (total, slot) => total + (slot.maxAppointments || 1),
      0
    );
    const bookedSlots = slots.reduce(
      (total, slot) => total + (slot.bookedAppointments?.length || 0),
      0
    );

    if (bookedSlots === 0) {
      return { status: "Available", color: "success" };
    } else if (bookedSlots < totalSlots) {
      return { status: "Partially Booked", color: "warning" };
    } else {
      return { status: "Fully Booked", color: "error" };
    }
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Day Wise Availability
      </Typography>

      {daysOfWeek.map((day) => {
        const slots = getSlotsForDay(day);
        const dayStatus = getDayStatus(day);

        return (
          <Accordion
            key={day}
            sx={{ mb: 2, border: "1px solid #e0e0e0", borderRadius: "8px" }}
          >
            <AccordionSummary
              expandIcon={<ExpandMore />}
              sx={{
                backgroundColor: "#f8f9fa",
                borderRadius: "8px 8px 0 0",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  width: "100%",
                }}
              >
                <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                  {day}
                </Typography>
                <Chip
                  label={dayStatus.status}
                  color={dayStatus.color}
                  size="small"
                />
              </Box>
            </AccordionSummary>
            <AccordionDetails>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 2,
                }}
              >
                <Typography variant="body2" color="text.secondary">
                  {slots.length} slot{slots.length !== 1 ? "s" : ""} configured
                </Typography>
                <Button
                  size="small"
                  startIcon={<Add />}
                  onClick={() => onAddSlot()}
                  variant="outlined"
                >
                  Add Slot
                </Button>
              </Box>

              <List dense>
                {slots.length === 0 ? (
                  <ListItem
                    sx={{ textAlign: "center", color: "text.secondary" }}
                  >
                    <ListItemText
                      primary="No availability slots configured for this day"
                      secondary="Click 'Add Slot' to create availability"
                    />
                  </ListItem>
                ) : (
                  slots.map((slot) => (
                    <ListItem
                      key={slot.id}
                      sx={{
                        border: "1px solid #e0e0e0",
                        borderRadius: "8px",
                        mb: 1,
                        transition: "all 0.2s ease",
                        "&:hover": {
                          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                          transform: "translateX(4px)",
                        },
                      }}
                    >
                      <ListItemText
                        primary={
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 1,
                            }}
                          >
                            <AccessTime fontSize="small" />
                            <Typography
                              variant="body1"
                              sx={{ fontWeight: "medium" }}
                            >
                              {slot.startTime} - {slot.endTime}
                            </Typography>
                          </Box>
                        }
                        secondary={
                          <Box sx={{ mt: 1 }}>
                            <Typography variant="body2" color="text.secondary">
                              {slot.appointmentType} • {slot.slotDuration}min
                              slots
                            </Typography>
                            {slot.location?.type && (
                              <Box
                                sx={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: 0.5,
                                  mt: 0.5,
                                }}
                              >
                                <LocationOn fontSize="small" />
                                <Typography
                                  variant="body2"
                                  color="text.secondary"
                                >
                                  {slot.location.type}
                                </Typography>
                              </Box>
                            )}
                            {slot.pricing?.fee && (
                              <Typography
                                variant="body2"
                                color="text.secondary"
                              >
                                ${slot.pricing.fee} {slot.pricing.currency}
                              </Typography>
                            )}
                            {slot.bookedAppointments &&
                              slot.bookedAppointments.length > 0 && (
                                <Chip
                                  label={`${slot.bookedAppointments.length} booked`}
                                  size="small"
                                  color="primary"
                                  sx={{ mt: 0.5 }}
                                />
                              )}
                          </Box>
                        }
                      />
                      <ListItemSecondaryAction>
                        <IconButton
                          size="small"
                          onClick={() => onEditSlot(slot)}
                          sx={{ mr: 1 }}
                          color="primary"
                        >
                          <Edit />
                        </IconButton>
                        <IconButton
                          size="small"
                          color="error"
                          onClick={() => onDeleteSlot(slot.id)}
                          disabled={
                            slot.bookedAppointments &&
                            slot.bookedAppointments.length > 0
                          }
                        >
                          <Delete />
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                  ))
                )}
              </List>
            </AccordionDetails>
          </Accordion>
        );
      })}
    </Box>
  );
};

export default DayWiseAvailability;
