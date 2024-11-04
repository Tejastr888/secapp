package com.example.secapp.dto;

import jakarta.validation.constraints.NotBlank;

public record AuthenticationRequestDto(
        @NotBlank(message = "Username is required")
        String username,

        @NotBlank(message = "Password is required")
        String password
) {
}