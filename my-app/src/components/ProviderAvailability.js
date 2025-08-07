import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  IconButton,
  Alert,
  Divider,
  Tabs,
  Tab,
  Switch,
  FormControlLabel,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
} from "@mui/material";
import {
  CalendarToday,
  AccessTime,
  LocationOn,
  AttachMoney,
  Add,
  Delete,
  Edit,
  ExpandMore,
  Schedule,
  Block,
  CheckCircle,
  Warning,
  Info,
  ArrowBack,
} from "@mui/icons-material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import {
  format,
  addDays,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  isSameDay,
} from "date-fns";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import "./ProviderAvailability.css";

// Import sub-components
import CalendarView from "./CalendarView";
import DayWiseAvailability from "./DayWiseAvailability";
import BlockDays from "./BlockDays";
import AvailabilitySettings from "./AvailabilitySettings";
import SlotDialog from "./SlotDialog";
import BlockDialog from "./BlockDialog";

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

const appointmentTypes = [
  "Consultation",
  "Follow-up",
  "Emergency",
  "Routine Check-up",
  "Specialist Consultation",
  "Telemedicine",
];

const ProviderAvailability = () => {
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState(0);
  const [availability, setAvailability] = useState([]);
  const [blockedDays, setBlockedDays] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTimeZone, setSelectedTimeZone] = useState("America/New_York");
  const [openSlotDialog, setOpenSlotDialog] = useState(false);
  const [openBlockDialog, setOpenBlockDialog] = useState(false);
  const [editingSlot, setEditingSlot] = useState(null);
  const [editingBlock, setEditingBlock] = useState(null);

  // Slot form state
  const [slotForm, setSlotForm] = useState({
    date: new Date(),
    startTime: "09:00",
    endTime: "17:00",
    appointmentType: "Consultation",
    slotDuration: 30,
    breakDuration: 15,
    maxAppointments: 1,
    location: {
      type: "In-person",
      address: "",
      room: "",
    },
    pricing: {
      fee: "",
      currency: "USD",
      insuranceAccepted: false,
    },
    notes: "",
    tags: [],
    isRecurring: false,
    recurrenceType: "weekly",
    endDate: null,
  });

  // Block form state
  const [blockForm, setBlockForm] = useState({
    date: new Date(),
    startTime: "00:00",
    endTime: "23:59",
    reason: "",
  });

  const handleBackToDashboard = () => {
    navigate("/provider/dashboard");
  };

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const handleAddSlot = (
    selectedDate = null,
    startTime = null,
    endTime = null
  ) => {
    if (selectedDate) {
      setSlotForm((prev) => ({
        ...prev,
        date: selectedDate,
        startTime: startTime || prev.startTime,
        endTime: endTime || prev.endTime,
      }));
    }
    setOpenSlotDialog(true);
  };

  const handleSlotSubmit = () => {
    if (slotForm.startTime >= slotForm.endTime) {
      toast.error("Start time must be before end time");
      return;
    }

    const newSlot = {
      id: editingSlot ? editingSlot.id : Date.now(),
      ...slotForm,
      date: new Date(slotForm.date),
      endDate: slotForm.endDate ? new Date(slotForm.endDate) : null,
    };

    if (editingSlot) {
      setAvailability((prev) =>
        prev.map((slot) => (slot.id === editingSlot.id ? newSlot : slot))
      );
      toast.success("Slot updated successfully");
    } else {
      setAvailability((prev) => [...prev, newSlot]);
      toast.success("Slot created successfully");
    }

    setOpenSlotDialog(false);
    setEditingSlot(null);
    resetSlotForm();
  };

  const handleBlockSubmit = () => {
    const newBlock = {
      id: editingBlock ? editingBlock.id : Date.now(),
      ...blockForm,
      date: new Date(blockForm.date),
    };

    if (editingBlock) {
      setBlockedDays((prev) =>
        prev.map((block) => (block.id === editingBlock.id ? newBlock : block))
      );
      toast.success("Block updated successfully");
    } else {
      setBlockedDays((prev) => [...prev, newBlock]);
      toast.success("Block created successfully");
    }

    setOpenBlockDialog(false);
    setEditingBlock(null);
    resetBlockForm();
  };

  const handleDeleteSlot = (slotId) => {
    const slot = availability.find((s) => s.id === slotId);
    if (slot && slot.bookedAppointments && slot.bookedAppointments.length > 0) {
      toast.error("Cannot delete slot with booked appointments");
      return;
    }

    setAvailability((prev) => prev.filter((slot) => slot.id !== slotId));
    toast.success("Slot deleted successfully");
  };

  const handleDeleteBlock = (blockId) => {
    setBlockedDays((prev) => prev.filter((block) => block.id !== blockId));
    toast.success("Block deleted successfully");
  };

  const handleEditSlot = (slot) => {
    setEditingSlot(slot);
    setSlotForm({
      date: slot.date,
      startTime: slot.startTime,
      endTime: slot.endTime,
      appointmentType: slot.appointmentType,
      slotDuration: slot.slotDuration,
      breakDuration: slot.breakDuration,
      maxAppointments: slot.maxAppointments,
      location: slot.location,
      pricing: slot.pricing,
      notes: slot.notes,
      tags: slot.tags,
      isRecurring: slot.isRecurring,
      recurrenceType: slot.recurrenceType,
      endDate: slot.endDate,
    });
    setOpenSlotDialog(true);
  };

  const handleEditBlock = (block) => {
    setEditingBlock(block);
    setBlockForm({
      date: block.date,
      startTime: block.startTime,
      endTime: block.endTime,
      reason: block.reason,
    });
    setOpenBlockDialog(true);
  };

  const resetSlotForm = () => {
    setSlotForm({
      date: new Date(),
      startTime: "09:00",
      endTime: "17:00",
      appointmentType: "Consultation",
      slotDuration: 30,
      breakDuration: 15,
      maxAppointments: 1,
      location: {
        type: "In-person",
        address: "",
        room: "",
      },
      pricing: {
        fee: "",
        currency: "USD",
        insuranceAccepted: false,
      },
      notes: "",
      tags: [],
      isRecurring: false,
      recurrenceType: "weekly",
      endDate: null,
    });
  };

  const resetBlockForm = () => {
    setBlockForm({
      date: new Date(),
      startTime: "00:00",
      endTime: "23:59",
      reason: "",
    });
  };

  const getSlotsForDate = (date) => {
    return availability.filter((slot) => isSameDay(slot.date, date));
  };

  const getBlocksForDate = (date) => {
    return blockedDays.filter((block) => isSameDay(block.date, date));
  };

  const isDateBlocked = (date) => {
    return blockedDays.some((block) => isSameDay(block.date, date));
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Container maxWidth="xl" sx={{ py: 4 }}>
        {/* Header with back button */}
        <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
          <Button
            startIcon={<ArrowBack />}
            onClick={handleBackToDashboard}
            sx={{ mr: 2 }}
            variant="outlined"
          >
            Back to Dashboard
          </Button>
          <Typography variant="h4" component="h1" sx={{ flexGrow: 1 }}>
            Provider Availability Management
          </Typography>
        </Box>

        <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom>
                Provider: Dr. John Doe
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Manage your availability and appointment slots
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel>Time Zone</InputLabel>
                <Select
                  value={selectedTimeZone}
                  onChange={(e) => setSelectedTimeZone(e.target.value)}
                  label="Time Zone"
                >
                  {timeZones.map((tz) => (
                    <MenuItem key={tz.value} value={tz.value}>
                      {tz.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Paper>

        <Paper elevation={2} sx={{ mb: 3 }}>
          <Tabs
            value={selectedTab}
            onChange={handleTabChange}
            sx={{ borderBottom: 1, borderColor: "divider" }}
          >
            <Tab label="Calendar View" icon={<CalendarToday />} />
            <Tab label="Day Wise Availability" icon={<Schedule />} />
            <Tab label="Block Days" icon={<Block />} />
            <Tab label="Settings" icon={<Info />} />
          </Tabs>

          <Box sx={{ p: 3 }}>
            {selectedTab === 0 && (
              <CalendarView
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
                availability={availability}
                blockedDays={blockedDays}
                onAddSlot={handleAddSlot}
                onEditSlot={handleEditSlot}
                onDeleteSlot={handleDeleteSlot}
                onEditBlock={handleEditBlock}
                onDeleteBlock={handleDeleteBlock}
              />
            )}

            {selectedTab === 1 && (
              <DayWiseAvailability
                availability={availability}
                onAddSlot={() => handleAddSlot()}
                onEditSlot={handleEditSlot}
                onDeleteSlot={handleDeleteSlot}
              />
            )}

            {selectedTab === 2 && (
              <BlockDays
                blockedDays={blockedDays}
                onAddBlock={() => setOpenBlockDialog(true)}
                onEditBlock={handleEditBlock}
                onDeleteBlock={handleDeleteBlock}
              />
            )}

            {selectedTab === 3 && (
              <AvailabilitySettings
                selectedTimeZone={selectedTimeZone}
                setSelectedTimeZone={setSelectedTimeZone}
              />
            )}
          </Box>
        </Paper>

        {/* Slot Creation/Edit Dialog */}
        <SlotDialog
          open={openSlotDialog}
          onClose={() => {
            setOpenSlotDialog(false);
            setEditingSlot(null);
            resetSlotForm();
          }}
          slotForm={slotForm}
          setSlotForm={setSlotForm}
          onSubmit={handleSlotSubmit}
          editingSlot={editingSlot}
          appointmentTypes={appointmentTypes}
        />

        {/* Block Days Dialog */}
        <BlockDialog
          open={openBlockDialog}
          onClose={() => {
            setOpenBlockDialog(false);
            setEditingBlock(null);
            resetBlockForm();
          }}
          blockForm={blockForm}
          setBlockForm={setBlockForm}
          onSubmit={handleBlockSubmit}
          editingBlock={editingBlock}
        />
      </Container>
    </LocalizationProvider>
  );
};

export default ProviderAvailability;
