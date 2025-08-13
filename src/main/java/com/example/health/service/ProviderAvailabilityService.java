package com.example.health.service;

import com.example.health.repository.ProviderAvailabilityRepository;
import com.example.health.repository.AppointmentSlotRepository;
import com.example.health.repository.ProviderRepository;
import com.example.health.repository.PatientRepository;
import com.example.health.dto.*;
import com.example.health.entity.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

@Service
public class ProviderAvailabilityService {
    @Autowired
    private ProviderAvailabilityRepository providerAvailabilityRepository;
    @Autowired
    private AppointmentSlotRepository appointmentSlotRepository;
    @Autowired
    private ProviderRepository providerRepository;
    @Autowired
    private PatientRepository patientRepository;

    public List<ProviderSearchResult> selectProvider(Map<String, String> params) {
        // Example: search by specialization and location
        String specialization = params.get("specialization");
        String location = params.get("location");
        List<Provider> providers = providerRepository.findAll();
        List<ProviderSearchResult> results = new ArrayList<>();
        for (Provider provider : providers) {
            if ((specialization == null || provider.getSpecialization().equalsIgnoreCase(specialization)) &&
                (location == null || (provider.getClinicAddress() != null && provider.getClinicAddress().getCity().equalsIgnoreCase(location)))) {
                ProviderSearchResult.ProviderInfo info = new ProviderSearchResult.ProviderInfo();
                info.setId(provider.getId().toString());
                info.setName(provider.getFirstName() + " " + provider.getLastName());
                info.setSpecialization(provider.getSpecialization());
                info.setYearsOfExperience(provider.getYearsOfExperience());
                info.setClinicAddress(provider.getClinicAddress() != null ? provider.getClinicAddress().getStreet() : "");
                // Dummy rating
                info.setRating(4.5);
                // Find available slots
                List<ProviderAvailability> availabilities = providerAvailabilityRepository.findByProviderId(provider.getId());
                List<ProviderSearchResult.SlotInfo> slots = new ArrayList<>();
                for (ProviderAvailability availability : availabilities) {
                    if (availability.getStatus() == ProviderAvailability.Status.AVAILABLE) {
                        ProviderSearchResult.SlotInfo slot = new ProviderSearchResult.SlotInfo();
                        slot.setSlotId(availability.getId().toString());
                        slot.setDate(availability.getDate().toString());
                        slot.setStartTime(availability.getStartTime());
                        slot.setEndTime(availability.getEndTime());
                        slot.setAppointmentType(availability.getAppointmentType().name());
                        slot.setLocation(availability.getLocation() != null ? availability.getLocation().getAddress() : "");
                        slot.setBaseFee(availability.getPricing() != null && availability.getPricing().getBaseFee() != null ? availability.getPricing().getBaseFee().doubleValue() : null);
                        slot.setInsuranceAccepted(availability.getPricing() != null && availability.getPricing().getInsuranceAccepted() != null ? availability.getPricing().getInsuranceAccepted() : false);
                        slot.setCurrency(availability.getPricing() != null ? availability.getPricing().getCurrency() : "USD");
                        slot.setStatus(availability.getStatus().name());
                        slots.add(slot);
                    }
                }
                ProviderSearchResult result = new ProviderSearchResult();
                result.setProvider(info);
                result.setAvailableSlots(slots);
                results.add(result);
            }
        }
        return results;
    }

    public Object setAvailability(Map<String, Object> availabilityRequest) {
        // For demo: parse fields and create a ProviderAvailability
        try {
            String providerId = (String) availabilityRequest.get("providerId");
            String dateStr = (String) availabilityRequest.get("date");
            String startTime = (String) availabilityRequest.get("startTime");
            String endTime = (String) availabilityRequest.get("endTime");
            String timezone = (String) availabilityRequest.get("timezone");
            Integer slotDuration = (Integer) availabilityRequest.getOrDefault("slotDuration", 30);
            Integer breakDuration = (Integer) availabilityRequest.getOrDefault("breakDuration", 0);
            Boolean isRecurring = (Boolean) availabilityRequest.getOrDefault("isRecurring", false);
            String recurrencePattern = (String) availabilityRequest.get("recurrencePattern");
            String recurrenceEndDate = (String) availabilityRequest.get("recurrenceEndDate");
            String appointmentType = (String) availabilityRequest.getOrDefault("appointmentType", "CONSULTATION");
            ProviderAvailability availability = new ProviderAvailability();
            availability.setProviderId(UUID.fromString(providerId));
            availability.setDate(LocalDate.parse(dateStr, DateTimeFormatter.ISO_DATE));
            availability.setStartTime(startTime);
            availability.setEndTime(endTime);
            availability.setTimezone(timezone);
            availability.setSlotDuration(slotDuration);
            availability.setBreakDuration(breakDuration);
            availability.setIsRecurring(isRecurring);
            if (recurrencePattern != null) availability.setRecurrencePattern(ProviderAvailability.RecurrencePattern.valueOf(recurrencePattern.toUpperCase()));
            if (recurrenceEndDate != null) availability.setRecurrenceEndDate(LocalDate.parse(recurrenceEndDate, DateTimeFormatter.ISO_DATE));
            availability.setAppointmentType(ProviderAvailability.AppointmentType.valueOf(appointmentType.toUpperCase()));
            availability.setStatus(ProviderAvailability.Status.AVAILABLE);
            providerAvailabilityRepository.save(availability);
            return Map.of("success", true, "message", "Availability set successfully", "availabilityId", availability.getId().toString());
        } catch (Exception e) {
            return Map.of("success", false, "message", "Error setting availability: " + e.getMessage());
        }
    }

    public Object bookAppointment(Map<String, Object> bookingRequest) {
        // For demo: find slot, mark as booked, link patient
        try {
            String slotId = (String) bookingRequest.get("slotId");
            String patientId = (String) bookingRequest.get("patientId");
            Optional<AppointmentSlot> slotOpt = appointmentSlotRepository.findById(UUID.fromString(slotId));
            if (slotOpt.isEmpty()) return Map.of("success", false, "message", "Slot not found");
            AppointmentSlot slot = slotOpt.get();
            if (!slot.getStatus().equals(AppointmentSlot.Status.AVAILABLE)) return Map.of("success", false, "message", "Slot not available");
            slot.setStatus(AppointmentSlot.Status.BOOKED);
            slot.setPatientId(UUID.fromString(patientId));
            appointmentSlotRepository.save(slot);
            return Map.of("success", true, "message", "Appointment booked", "appointmentId", slot.getId().toString());
        } catch (Exception e) {
            return Map.of("success", false, "message", "Error booking appointment: " + e.getMessage());
        }
    }

    public List<AppointmentListResponse> viewAppointments(Map<String, String> params) {
        // For demo: list all slots for provider or patient
        List<AppointmentListResponse> result = new ArrayList<>();
        String providerId = params.get("providerId");
        String patientId = params.get("patientId");
        List<AppointmentSlot> slots = new ArrayList<>();
        if (providerId != null) {
            slots.addAll(appointmentSlotRepository.findByProviderId(UUID.fromString(providerId)));
        } else if (patientId != null) {
            // No direct method, so filter all
            for (AppointmentSlot slot : appointmentSlotRepository.findAll()) {
                if (slot.getPatientId() != null && slot.getPatientId().toString().equals(patientId)) {
                    slots.add(slot);
                }
            }
        }
        for (AppointmentSlot slot : slots) {
            AppointmentListResponse resp = new AppointmentListResponse();
            resp.setAppointmentId(slot.getId().toString());
            resp.setProviderId(slot.getProviderId().toString());
            resp.setPatientId(slot.getPatientId() != null ? slot.getPatientId().toString() : null);
            resp.setSlotId(slot.getId().toString());
            resp.setDate(slot.getSlotStartTime().toLocalDate().toString());
            resp.setStartTime(slot.getSlotStartTime().toLocalTime().toString());
            resp.setEndTime(slot.getSlotEndTime().toLocalTime().toString());
            resp.setStatus(slot.getStatus().name());
            resp.setAppointmentType(slot.getAppointmentType());
            resp.setLocation(""); // Could be filled from availability
            resp.setNotes("");
            resp.setBookingReference(slot.getBookingReference());
            result.add(resp);
        }
        return result;
    }
} 