package com.blog.backend.controller;

import com.blog.backend.dto.LoginRequest;
import com.blog.backend.entity.User;
import com.blog.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        // 1. N9elbo 3la user b username
        Optional<User> userOptional = userRepository.findByUsername(loginRequest.getUsername());

        // 2. Ila lqinah, n-vérifiw l password (Plain text simple l daba)
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            if (user.getPassword().equals(loginRequest.getPassword())) {

                user.setPassword(null);
                return ResponseEntity.ok(user);
            }
        }

        // 3. Ila ghalat
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
    }
}