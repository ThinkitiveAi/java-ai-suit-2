package com.example.health.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.validation.constraints.*;
import java.time.LocalDate;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PatientRegistrationRequest {
    @NotBlank
    @Size(min = 2, max = 50)
    private String firstName;

    @NotBlank
    @Size(min = 2, max = 50)
    private String lastName;

    @NotBlank
    @Email
    @Size(max = 100)
    private String email;

    @NotBlank
    @Size(max = 20)
    private String phoneNumber;

    @NotBlank
    @Size(min = 8, max = 100)
    private String password;

    @NotBlank
    @Size(min = 8, max = 100)
    private String confirmPassword;

    @NotNull
    @Past
    private LocalDate dateOfBirth;

    @NotNull
    private String gender;

    @NotNull
    private Address address;

    private EmergencyContact emergencyContact;

    private List<String> medicalHistory;

    private InsuranceInfo insuranceInfo;

    // Getters and setters omitted for brevity

    public static class Address {
        @NotBlank
        @Size(max = 200)
        private String street;
        @NotBlank
        @Size(max = 100)
        private String city;
        @NotBlank
        @Size(max = 50)
        private String state;
        @NotBlank
        @Size(max = 20)
        private String zip;
        // Getters and setters omitted for brevity
    }

    public static class EmergencyContact {
        @Size(max = 100)
        private String name;
        @Size(max = 20)
        private String phone;
        @Size(max = 50)
        private String relationship;
        // Getters and setters omitted for brevity
    }

    public static class InsuranceInfo {
        private String provider;
        private String policyNumber;
        // Getters and setters omitted for brevity
    }
} 