package com.kes.service;

import com.kes.dto.AuthResponse;
import com.kes.dto.LoginDto;
import com.kes.dto.RegisterDto;

public interface AuthService {

	String registerUser(RegisterDto registerDto);

	AuthResponse loginUser(LoginDto loginDto);
}
