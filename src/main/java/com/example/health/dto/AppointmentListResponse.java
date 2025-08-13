package com.example.health.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AppointmentListResponse {
    private String appointmentId;
    private String providerId;
    private String patientId;
    private String slotId;
    private String date;
    private String startTime;
    private String endTime;
    private String status;
    private String appointmentType;
    private String location;
    private String notes;
    private String bookingReference;
    // Getters and setters omitted for brevity
} 