package com.kes.security;

import java.security.Key;
import java.util.Date;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;

@Component
public class JwtTokenProvider {

	@Value("${jwt-app.secret-key}")
	private String secretKey;

	@Value("${jwt-app.expirationDate}")
	private Long expirationDate;

	public String generateToken(Authentication authentication) {

		String username = authentication.getName();

		Date currentDate = new Date();

		Date expireDate = new Date(currentDate.getTime() + expirationDate);

		String token = Jwts.builder()
				.setSubject(username)
				.setIssuedAt(new Date())
				.setExpiration(expireDate)
				.signWith(key())
				.compact();

		return token;
	}

	private Key key() {
		return Keys.hmacShaKeyFor(Decoders.BASE64.decode(secretKey));
	}

	public String getUsername(String token) {

		Claims claims = Jwts.parserBuilder().setSigningKey(key()).build().parseClaimsJws(token).getBody();

		String username = claims.getSubject();

		return username;
	}

	public boolean validateToken(String token) {

		Jwts.parserBuilder().setSigningKey(key()).build().parse(token);

		return true;
	}
}
