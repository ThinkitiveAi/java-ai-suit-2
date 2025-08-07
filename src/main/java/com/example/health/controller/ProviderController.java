package com.example.health.controller;

import com.example.health.dto.ProviderRegistrationRequest;
import com.example.health.entity.Provider;
import com.example.health.service.ProviderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/provider")
@Validated
public class ProviderController {
    @Autowired
    private ProviderService providerService;

    @PostMapping("/register")
    public ResponseEntity<?> registerProvider(@Valid @RequestBody ProviderRegistrationRequest request) {
        // Implementation will call providerService.registerProvider and return response
        return ResponseEntity.ok().build();
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginProvider(@RequestBody Map<String, String> loginRequest) {
        // Implementation will call providerService.authenticateProvider and return JWT if successful
        return ResponseEntity.ok().build();
    }
} 