package com.example.health.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BookAppointmentRequest {
    private String slotId;
    private String patientId;
    private String appointmentType;
    private String bookingReference;
    private String notes;
    // Getters and setters omitted for brevity
} 