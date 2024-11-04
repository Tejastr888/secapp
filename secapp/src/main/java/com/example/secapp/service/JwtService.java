package com.example.secapp.service;

import java.time.Duration;
import java.time.Instant;
import lombok.RequiredArgsConstructor;
import org.springframework.security.oauth2.jwt.JwtClaimsSet;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.JwtEncoderParameters;

@RequiredArgsConstructor
public class JwtService {

    private final String issuer;

    private final Duration ttl;

    private final JwtEncoder jwtEncoder;

    public String generateToken(final String username) {
        final var issuedAt = Instant.now();

        final var claimsSet = JwtClaimsSet.builder()
                .subject(username)
                .issuer(issuer)
                .issuedAt(issuedAt)
                .expiresAt(issuedAt.plus(ttl))
                .build();

        return jwtEncoder.encode(JwtEncoderParameters.from(claimsSet)).getTokenValue();
    }

}