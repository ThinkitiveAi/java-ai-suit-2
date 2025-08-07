package com.example.health.controller;

import com.example.health.dto.PatientRegistrationRequest;
import com.example.health.entity.Patient;
import com.example.health.service.PatientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/patient")
@Validated
public class PatientController {
    @Autowired
    private PatientService patientService;

    @PostMapping("/register")
    public ResponseEntity<?> registerPatient(@Valid @RequestBody PatientRegistrationRequest request) {
        // Implementation will call patientService.registerPatient and return response
        return ResponseEntity.ok().build();
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginPatient(@RequestBody Map<String, String> loginRequest) {
        // Implementation will call patientService.authenticatePatient and return JWT if successful
        return ResponseEntity.ok().build();
    }
} 