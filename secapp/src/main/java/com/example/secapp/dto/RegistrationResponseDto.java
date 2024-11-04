package com.example.secapp.dto;

public record RegistrationResponseDto(String username, String email,boolean emailVerificationRequire) {
}