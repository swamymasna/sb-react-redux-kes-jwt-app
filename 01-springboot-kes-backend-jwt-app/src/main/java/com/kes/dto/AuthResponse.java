package com.kes.dto;

import lombok.Data;

@Data
public class AuthResponse {

	private String accessToken;
	private String tokenType = "Bearer";
	private String roleName;
}
