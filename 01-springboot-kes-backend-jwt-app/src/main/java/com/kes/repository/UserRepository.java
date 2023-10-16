package com.kes.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.kes.entity.User;

public interface UserRepository extends JpaRepository<User, Integer> {

	Optional<User> findByUsername(String username);

	Optional<User> findByUsernameOrEmail(String username, String email);

	boolean existsByUsername(String username);

	boolean existsByEmail(String email);
}
