package com.example.health.repository;

import com.example.health.entity.ProviderAvailability;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

public interface ProviderAvailabilityRepository extends JpaRepository<ProviderAvailability, UUID> {
    List<ProviderAvailability> findByProviderId(UUID providerId);
    List<ProviderAvailability> findByProviderIdAndDateBetween(UUID providerId, LocalDate startDate, LocalDate endDate);
} 