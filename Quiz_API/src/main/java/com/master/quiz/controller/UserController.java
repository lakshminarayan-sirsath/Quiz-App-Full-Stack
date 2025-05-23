package com.master.quiz.controller;

import com.master.quiz.entity.User;
import com.master.quiz.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/user")
public class UserController {
    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@RequestBody User user) {
        userService.registerUser(user.getFirstname(), user.getLastname(), user.getEmail(), user.getPassword());
        return ResponseEntity.ok("User registered successfully!");
    }

    @PostMapping("/login")
    public ResponseEntity<User> loginUser(@RequestBody Map<String, String> credentials) {
        User user = userService.authenticateUser(credentials.get("email"), credentials.get("password"));
        return ResponseEntity.ok(user);
    }

    @PostMapping("/logout")
    public ResponseEntity<String> logoutUser() {
        // Since this is a stateless implementation, logout does not require server-side actions
        return ResponseEntity.ok("Logout successful!");
    }

}
