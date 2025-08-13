package com.example.health.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.*;
import java.time.Instant;
import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "patients", uniqueConstraints = {
    @UniqueConstraint(columnNames = {"email"}),
    @UniqueConstraint(columnNames = {"phone_number"})
})
public class Patient {
    @Id
    @GeneratedValue
    private UUID id;

    @NotBlank
    @Size(min = 2, max = 50)
    @Column(name = "first_name")
    private String firstName;

    @NotBlank
    @Size(min = 2, max = 50)
    @Column(name = "last_name")
    private String lastName;

    @NotBlank
    @Email
    @Size(max = 100)
    @Column(name = "email")
    private String email;

    @NotBlank
    @Size(max = 20)
    @Column(name = "phone_number")
    private String phoneNumber;

    @NotBlank
    @Column(name = "password_hash")
    private String passwordHash;

    @NotNull
    @Past
    @Column(name = "date_of_birth")
    private LocalDate dateOfBirth;

    @NotNull
    @Enumerated(EnumType.STRING)
    private Gender gender;

    @Embedded
    private Address address;

    @Embedded
    private EmergencyContact emergencyContact;

    @ElementCollection
    @Column(name = "medical_history")
    private List<String> medicalHistory;

    @Embedded
    private InsuranceInfo insuranceInfo;

    @NotNull
    @Column(name = "email_verified")
    private Boolean emailVerified = false;

    @NotNull
    @Column(name = "phone_verified")
    private Boolean phoneVerified = false;

    @NotNull
    @Column(name = "is_active")
    private Boolean isActive = true;

    @NotNull
    @Column(name = "created_at")
    private Instant createdAt = Instant.now();

    @NotNull
    @Column(name = "updated_at")
    private Instant updatedAt = Instant.now();

    public enum Gender {
        MALE, FEMALE, OTHER, PREFER_NOT_TO_SAY
    }

    @Embeddable
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

    @Embeddable
    public static class EmergencyContact {
        @Size(max = 100)
        private String name;
        @Size(max = 20)
        private String phone;
        @Size(max = 50)
        private String relationship;
        // Getters and setters omitted for brevity
    }

    @Embeddable
    public static class InsuranceInfo {
        private String provider;
        private String policyNumber;
        // Getters and setters omitted for brevity
    }
    // Getters and setters omitted for brevity
} 