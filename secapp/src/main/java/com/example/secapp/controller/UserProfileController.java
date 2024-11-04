package com.example.secapp.controller;

import com.example.secapp.dto.UserProfileDto;
import com.example.secapp.mapper.UserMapper;
import com.example.secapp.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
public class UserProfileController {

    private final UserService userService;
    private final UserMapper userMapper;

    @GetMapping("/me")
    public ResponseEntity<UserProfileDto> getUserProfile(final Authentication authentication) {
        final var user = userService.getUserByUsername(authentication.getName());

        return ResponseEntity.ok(userMapper.toUserProfileDto(user));
    }
}