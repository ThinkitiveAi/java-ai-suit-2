package com.example.health.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProviderSearchResult {
    private ProviderInfo provider;
    private List<SlotInfo> availableSlots;
    // Getters and setters omitted for brevity

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class ProviderInfo {
        private String id;
        private String name;
        private String specialization;
        private Integer yearsOfExperience;
        private Double rating;
        private String clinicAddress;
        // Getters and setters omitted for brevity
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class SlotInfo {
        private String slotId;
        private String date;
        private String startTime;
        private String endTime;
        private String appointmentType;
        private String location;
        private Double baseFee;
        private Boolean insuranceAccepted;
        private String currency;
        private String status;
        // Getters and setters omitted for brevity
    }
} 