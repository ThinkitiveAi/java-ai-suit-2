package com.example.health.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SetAvailabilityRequest {
    private String providerId;
    private String date;
    private String startTime;
    private String endTime;
    private String timezone;
    private Integer slotDuration;
    private Integer breakDuration;
    private Boolean isRecurring;
    private String recurrencePattern;
    private String recurrenceEndDate;
    private String appointmentType;
    private Location location;
    private Pricing pricing;
    private List<String> specialRequirements;
    private String notes;
    // Getters and setters omitted for brevity

    public static class Location {
        private String type;
        private String address;
        private String roomNumber;
        // Getters and setters omitted for brevity
    }
    public static class Pricing {
        private Double baseFee;
        private Boolean insuranceAccepted;
        private String currency;
        // Getters and setters omitted for brevity
    }
} 