package com.example.secapp.mapper;

import com.example.secapp.dto.UserProfileDto;
import com.example.secapp.entity.User;
import org.springframework.stereotype.Component;

@Component
public class UserMapper {

    public UserProfileDto toUserProfileDto(final User user) {
        return new UserProfileDto(user.getEmail(), user.getUsername(), user.isEmailVerified());
    }

}