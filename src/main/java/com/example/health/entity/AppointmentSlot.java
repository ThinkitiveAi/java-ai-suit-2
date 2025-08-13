package com.example.health.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.*;
import java.time.Instant;
import java.time.ZonedDateTime;
import java.util.UUID;

@Entity
@Table(name = "appointment_slot")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class AppointmentSlot {
    @Id
    @GeneratedValue
    private UUID id;

    @NotNull
    @Column(name = "availability_id")
    private UUID availabilityId;

    @NotNull
    @Column(name = "provider_id")
    private UUID providerId;

    @NotNull
    @Column(name = "slot_start_time")
    private ZonedDateTime slotStartTime;

    @NotNull
    @Column(name = "slot_end_time")
    private ZonedDateTime slotEndTime;

    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    private Status status = Status.AVAILABLE;

    @Column(name = "patient_id")
    private UUID patientId;

    @Column(name = "appointment_type")
    private String appointmentType;

    @Column(name = "booking_reference", unique = true)
    private String bookingReference;

    @NotNull
    @Column(name = "created_at")
    private Instant createdAt = Instant.now();

    @NotNull
    @Column(name = "updated_at")
    private Instant updatedAt = Instant.now();

    public enum Status {
        AVAILABLE, BOOKED, CANCELLED, BLOCKED
    }
    // Getters and setters omitted for brevity
} 