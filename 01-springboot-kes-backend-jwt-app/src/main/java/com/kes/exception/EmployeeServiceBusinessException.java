package com.kes.exception;

public class EmployeeServiceBusinessException extends RuntimeException {

	private static final long serialVersionUID = 1L;

	public EmployeeServiceBusinessException(String message) {
		super(message);
	}
}
