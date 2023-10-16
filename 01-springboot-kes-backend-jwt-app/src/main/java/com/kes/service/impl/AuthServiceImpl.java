package com.kes.service.impl;

import java.util.Optional;
import java.util.Set;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.kes.dto.AuthResponse;
import com.kes.dto.LoginDto;
import com.kes.dto.RegisterDto;
import com.kes.entity.Role;
import com.kes.entity.User;
import com.kes.exception.ApiException;
import com.kes.exception.ResourceNotFoundException;
import com.kes.repository.RoleRepository;
import com.kes.repository.UserRepository;
import com.kes.security.JwtTokenProvider;
import com.kes.service.AuthService;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class AuthServiceImpl implements AuthService {

	private UserRepository userRepository;

	private RoleRepository roleRepository;

	private PasswordEncoder passwordEncoder;

	private AuthenticationManager authenticationManager;

	private JwtTokenProvider jwtTokenProvider;

	@Override
	public String registerUser(RegisterDto registerDto) {

		if (userRepository.existsByUsername(registerDto.getUsername())) {
			throw new ApiException("Username already exists..??");
		}
		if (userRepository.existsByEmail(registerDto.getEmail())) {
			throw new ApiException("Email already exists..??");
		}

		User user = new User();
		user.setName(registerDto.getName());
		user.setUsername(registerDto.getUsername());
		user.setPassword(passwordEncoder.encode(registerDto.getPassword()));
		user.setEmail(registerDto.getEmail());

		Role role = roleRepository.findByName("ROLE_USER")
				.orElseThrow(() -> new ResourceNotFoundException("Role Not Found..??"));
		user.setRoles(Set.of(role));

		userRepository.save(user);

		return "User Registered Successfully";
	}

	@Override
	public AuthResponse loginUser(LoginDto loginDto) {

		Authentication authentication = authenticationManager.authenticate(
				new UsernamePasswordAuthenticationToken(loginDto.getUsernameOrEmail(), loginDto.getPassword()));

		SecurityContextHolder.getContext().setAuthentication(authentication);

		String token = jwtTokenProvider.generateToken(authentication);

		Optional<User> optUser = userRepository.findByUsernameOrEmail(loginDto.getUsernameOrEmail(),
				loginDto.getUsernameOrEmail());

		String roleName = null;

		if (optUser.isPresent()) {
			User loggedInUser = optUser.get();
			Optional<Role> optRole = loggedInUser.getRoles().stream().findFirst();
			if (optRole.isPresent()) {
				roleName = optRole.get().getName();
			}
		}

		AuthResponse authResponse = new AuthResponse();
		authResponse.setAccessToken(token);
		authResponse.setRoleName(roleName);

		return authResponse;
	}

}
