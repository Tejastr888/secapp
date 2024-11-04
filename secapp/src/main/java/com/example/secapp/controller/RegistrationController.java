package com.example.secapp.controller;

import com.example.secapp.dto.RegistrationRequestDto;
import com.example.secapp.dto.RegistrationResponseDto;
import com.example.secapp.mapper.UserRegistrationMapper;
import com.example.secapp.service.EmailVerificationService;
import com.example.secapp.service.UserRegistrationService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class RegistrationController {

    @Value("${email-verification.required}")
    private  boolean emailVerificationRequired;

    private final UserRegistrationService userRegistrationService;

    private final EmailVerificationService emailVerificationService;

    private final UserRegistrationMapper userRegistrationMapper;

    @PostMapping("/register")
    public ResponseEntity<RegistrationResponseDto> registerUser(@Valid @RequestBody final RegistrationRequestDto registrationDTO) {
        final var registeredUser = userRegistrationService.registerUser(userRegistrationMapper.toEntity(registrationDTO));

        if (emailVerificationRequired) {
            emailVerificationService.sendVerificationToken(registeredUser.getId(), registeredUser.getEmail());
        }
        return ResponseEntity.ok(userRegistrationMapper.toRegistrationResponseDto(registeredUser, emailVerificationRequired));
    }

}