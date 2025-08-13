package com.example.health.controller;

import com.example.health.service.ProviderAvailabilityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/api/v1")
public class ProviderAvailabilityController {

    @Autowired
    private ProviderAvailabilityService providerAvailabilityService;

    // Select Provider: List/search providers with available slots
    @GetMapping("/availability/providers")
    public ResponseEntity<?> selectProvider(@RequestParam Map<String, String> params) {
        return ResponseEntity.ok(providerAvailabilityService.selectProvider(params));
    }

    // Set Availability: Provider sets/updates their available slots
    @PostMapping("/provider/availability")
    public ResponseEntity<?> setAvailability(@RequestBody Map<String, Object> availabilityRequest) {
        return ResponseEntity.ok(providerAvailabilityService.setAvailability(availabilityRequest));
    }

    // Book Appointment: Patient books an available slot
    @PostMapping("/appointment/book")
    public ResponseEntity<?> bookAppointment(@RequestBody Map<String, Object> bookingRequest) {
        return ResponseEntity.ok(providerAvailabilityService.bookAppointment(bookingRequest));
    }

    // View Appointment List: Provider or patient views their appointments
    @GetMapping("/appointments")
    public ResponseEntity<?> viewAppointments(@RequestParam Map<String, String> params) {
        return ResponseEntity.ok(providerAvailabilityService.viewAppointments(params));
    }
} 