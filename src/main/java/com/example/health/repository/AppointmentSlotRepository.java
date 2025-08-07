package com.example.health.repository;

import com.example.health.entity.AppointmentSlot;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface AppointmentSlotRepository extends JpaRepository<AppointmentSlot, UUID> {
    List<AppointmentSlot> findByProviderId(UUID providerId);
    List<AppointmentSlot> findByAvailabilityId(UUID availabilityId);
    List<AppointmentSlot> findByStatus(AppointmentSlot.Status status);
} 