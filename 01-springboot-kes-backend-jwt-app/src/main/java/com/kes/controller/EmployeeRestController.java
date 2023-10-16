package com.kes.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.kes.dto.EmployeeRequest;
import com.kes.dto.EmployeeResponse;
import com.kes.dto.LocationDto;
import com.kes.service.EmployeeService;

import lombok.AllArgsConstructor;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/employees")
@AllArgsConstructor
public class EmployeeRestController {

	private EmployeeService employeeService;

	@PreAuthorize(value = "hasRole('ADMIN')")
	@PostMapping
	public ResponseEntity<EmployeeResponse> saveEmployee(@RequestBody EmployeeRequest employeeRequest) {
		return new ResponseEntity<>(employeeService.saveEmployee(employeeRequest), HttpStatus.CREATED);
	}

	@PreAuthorize(value = "hasAnyRole('ADMIN','USER')")
	@GetMapping
	public ResponseEntity<List<EmployeeResponse>> getAllEmployees() {
		return new ResponseEntity<>(employeeService.getAllEmployees(), HttpStatus.OK);
	}

	@PreAuthorize(value = "hasAnyRole('ADMIN','USER')")
	@GetMapping("/locations")
	public ResponseEntity<List<LocationDto>> getAllLocations() {
		return new ResponseEntity<>(employeeService.getLocations(), HttpStatus.OK);
	}

	@PreAuthorize(value = "hasRole('ADMIN')")
	@DeleteMapping("/{id}")
	public ResponseEntity<String> deleteEmployee(@PathVariable("id") Integer employeeId) {
		return new ResponseEntity<>(employeeService.deleteEmployee(employeeId), HttpStatus.OK);
	}

	@PreAuthorize(value = "hasAnyRole('ADMIN','USER')")
	@GetMapping("/{id}")
	public ResponseEntity<EmployeeResponse> getEmployeeById(@PathVariable("id") Integer employeeId) {
		return new ResponseEntity<>(employeeService.getEmployeeById(employeeId), HttpStatus.OK);
	}

	@PreAuthorize(value = "hasRole('ADMIN')")
	@PutMapping("/{id}")
	public ResponseEntity<EmployeeResponse> updateEmployee(@PathVariable("id") Integer employeeId,
			@RequestBody EmployeeRequest employeeRequest) {
		return new ResponseEntity<>(employeeService.updateEmployee(employeeId, employeeRequest), HttpStatus.OK);
	}

}
