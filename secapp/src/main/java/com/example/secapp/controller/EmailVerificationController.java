package com.example.secapp.controller;

import com.example.secapp.dto.UserProfileDto;
import com.example.secapp.mapper.UserMapper;
import com.example.secapp.service.EmailVerificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth/email")
@RequiredArgsConstructor
public class    EmailVerificationController {

    private final EmailVerificationService emailVerificationService;

    private final UserMapper userMapper;

    @PostMapping("/resend-verification")
    public ResponseEntity<Void> resendVerificationLink(@RequestParam String email) {
        emailVerificationService.resendVerificationToken(email);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/verify")
    public ResponseEntity<UserProfileDto> verifyEmail(@RequestParam("uid") String encryptedUserId, @RequestParam("t") String token) {
        final var verifiedUser = emailVerificationService.verifyEmail(encryptedUserId, token);

        return ResponseEntity.ok(userMapper.toUserProfileDto(verifiedUser));
    }

}