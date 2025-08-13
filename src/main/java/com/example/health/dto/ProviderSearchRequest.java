package com.example.health.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProviderSearchRequest {
    private String specialization;
    private String location;
    private String date;
    private String appointmentType;
    private Boolean insuranceAccepted;
    private Double maxPrice;
    private String timezone;
    private Boolean availableOnly = true;
    // Getters and setters omitted for brevity
} 