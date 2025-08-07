package com.example.health.entity;

import javax.persistence.*;
import javax.validation.constraints.*;
import java.math.BigDecimal;
import java.time.Instant;
import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "provider_availability")
public class ProviderAvailability {
    @Id
    @GeneratedValue
    private UUID id;

    @NotNull
    @Column(name = "provider_id")
    private UUID providerId;

    @NotNull
    @Column(name = "availability_date")
    private LocalDate date;

    @NotBlank
    @Column(name = "start_time")
    private String startTime; // HH:mm

    @NotBlank
    @Column(name = "end_time")
    private String endTime; // HH:mm

    @NotBlank
    @Column(name = "timezone")
    private String timezone;

    @NotNull
    @Column(name = "is_recurring")
    private Boolean isRecurring = false;

    @Enumerated(EnumType.STRING)
    @Column(name = "recurrence_pattern")
    private RecurrencePattern recurrencePattern;

    @Column(name = "recurrence_end_date")
    private LocalDate recurrenceEndDate;

    @NotNull
    @Column(name = "slot_duration")
    private Integer slotDuration = 30;

    @NotNull
    @Column(name = "break_duration")
    private Integer breakDuration = 0;

    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    private Status status = Status.AVAILABLE;

    @NotNull
    @Column(name = "max_appointments_per_slot")
    private Integer maxAppointmentsPerSlot = 1;

    @NotNull
    @Column(name = "current_appointments")
    private Integer currentAppointments = 0;

    @Enumerated(EnumType.STRING)
    @Column(name = "appointment_type")
    private AppointmentType appointmentType = AppointmentType.CONSULTATION;

    @Embedded
    private Location location;

    @Embedded
    private Pricing pricing;

    @Size(max = 500)
    private String notes;

    @ElementCollection
    @CollectionTable(
        name = "provider_availability_special_requirements",
        joinColumns = @JoinColumn(name = "provider_availability_id", referencedColumnName = "id")
    )
    @Column(name = "special_requirement")
    private List<String> specialRequirements;

    @NotNull
    @Column(name = "created_at")
    private Instant createdAt = Instant.now();

    @NotNull
    @Column(name = "updated_at")
    private Instant updatedAt = Instant.now();

    public enum RecurrencePattern {
        DAILY, WEEKLY, MONTHLY
    }

    public enum Status {
        AVAILABLE, BOOKED, CANCELLED, BLOCKED, MAINTENANCE
    }

    public enum AppointmentType {
        CONSULTATION, FOLLOW_UP, EMERGENCY, TELEMEDICINE
    }

    @Embeddable
    public static class Location {
        @Enumerated(EnumType.STRING)
        private LocationType type;
        private String address;
        private String roomNumber;
        public enum LocationType {
            CLINIC, HOSPITAL, TELEMEDICINE, HOME_VISIT
        }
        // Getters and setters omitted for brevity
    }

    @Embeddable
    public static class Pricing {
        private BigDecimal baseFee;
        private Boolean insuranceAccepted;
        private String currency = "USD";
        // Getters and setters omitted for brevity
    }
    // Getters and setters omitted for brevity
} 