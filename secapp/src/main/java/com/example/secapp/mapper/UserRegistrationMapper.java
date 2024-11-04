package com.example.secapp.mapper;


import com.example.secapp.dto.RegistrationRequestDto;
import com.example.secapp.dto.RegistrationResponseDto;
import com.example.secapp.entity.User;
import org.springframework.stereotype.Component;

@Component
public class UserRegistrationMapper {

    public User toEntity(RegistrationRequestDto registrationRequestDto) {
        final var user = new User();

        user.setEmail(registrationRequestDto.email());
        user.setUsername(registrationRequestDto.username());
        user.setPassword(registrationRequestDto.password());

        return user;
    }

    public RegistrationResponseDto toRegistrationResponseDto(final User user, final boolean emailVerificationRequired) {
        return new RegistrationResponseDto(user.getEmail(), user.getUsername(), emailVerificationRequired);
    }

}