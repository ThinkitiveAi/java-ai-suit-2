package com.example.health.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.*;
import java.time.Instant;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "providers", uniqueConstraints = {
    @UniqueConstraint(columnNames = {"email"}),
    @UniqueConstraint(columnNames = {"phone_number"}),
    @UniqueConstraint(columnNames = {"license_number"})
})
public class Provider {
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

    @NotBlank
    @Size(min = 3, max = 100)
    @Column(name = "specialization")
    private String specialization;

    @NotBlank
    @Pattern(regexp = "^[a-zA-Z0-9]+$")
    @Column(name = "license_number")
    private String licenseNumber;

    @Min(0)
    @Max(50)
    @Column(name = "years_of_experience")
    private Integer yearsOfExperience;

    @Embedded
    private ClinicAddress clinicAddress;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "verification_status")
    private VerificationStatus verificationStatus = VerificationStatus.PENDING;

    @NotNull
    @Column(name = "is_active")
    private Boolean isActive = true;

    @NotNull
    @Column(name = "created_at")
    private Instant createdAt = Instant.now();

    @NotNull
    @Column(name = "updated_at")
    private Instant updatedAt = Instant.now();

    // Getters and setters omitted for brevity

    public enum VerificationStatus {
        PENDING, VERIFIED, REJECTED
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    @Embeddable
    public static class ClinicAddress {
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
} 