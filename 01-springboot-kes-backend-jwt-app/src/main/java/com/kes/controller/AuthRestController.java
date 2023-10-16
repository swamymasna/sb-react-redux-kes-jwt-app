package com.kes.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.kes.dto.AuthResponse;
import com.kes.dto.LoginDto;
import com.kes.dto.RegisterDto;
import com.kes.service.AuthService;

import lombok.AllArgsConstructor;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/auth")
@AllArgsConstructor
public class AuthRestController {

	private AuthService authService;

	@PostMapping("/register")
	public ResponseEntity<String> registerUser(@RequestBody RegisterDto registerDto) {
		return new ResponseEntity<>(authService.registerUser(registerDto), HttpStatus.CREATED);
	}

	@PostMapping("/login")
	public ResponseEntity<AuthResponse> loginUser(@RequestBody LoginDto loginDto) {
		return new ResponseEntity<>(authService.loginUser(loginDto), HttpStatus.OK);
	}
}
