import { createAsyncThunk } from "@reduxjs/toolkit";
import { IEmployee } from "../../modules/employees/models/IEmployee";
import { EmployeeService } from "../../modules/employees/services/EmployeeService";
import { ILocation } from "../../modules/employees/models/ILocation";

/**
 * getAllEmployees
 */
export const getAllEmployeesAction: any = createAsyncThunk(
  "employees/getAllEmployeesAction",
  async (payload: {}, { rejectWithValue }): Promise<IEmployee[] | any> => {
    try {
      let response = await EmployeeService.getAllEmployees();
      return response.data;
    } catch (error: any) {
      console.log(error.response.data);
      if (!error) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

/**
 * deleteEmployee
 */
export const deleteEmployeeAction: any = createAsyncThunk(
  "employees/deleteEmployeeAction",
  async (payload: { id: any }, { rejectWithValue, dispatch }): Promise<any> => {
    try {
      let { id } = payload;
      let response = await EmployeeService.deleteEmployee(id);
      if (response && response.data) {
        dispatch(getAllEmployeesAction());
      }
      return response.data;
    } catch (error: any) {
      console.log(error.response.data);
      if (!error) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

/**
 * viewEmployee
 */
export const viewEmployeeAction: any = createAsyncThunk(
  "employees/viewEmployeeAction",
  async (payload: { id: any }, { rejectWithValue }): Promise<any> => {
    try {
      let { id } = payload;
      let response = await EmployeeService.getEmployee(id);
      return response.data;
    } catch (error: any) {
      console.log(error.response.data);
      if (!error) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

/**
 * registerEmployee
 */
export const registerEmployeeAction: any = createAsyncThunk(
  "employees/registerEmployeeAction",
  async (
    payload: { employee: IEmployee },
    { rejectWithValue, dispatch }
  ): Promise<IEmployee | any> => {
    try {
      let { employee } = payload;
      let response = await EmployeeService.saveEmployee(employee);

      return response;
    } catch (error: any) {
      console.log(error.response.data);
      if (!error) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

/**
 * getAllLocations
 */
export const getAllLocationsAction: any = createAsyncThunk(
  "employees/getAllLocationsAction",
  async (payload: {}, { rejectWithValue }): Promise<ILocation[] | any> => {
    try {
      let response = await EmployeeService.getLocations();
      return response.data;
    } catch (error: any) {
      console.log(error.response.data);
      if (!error) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

/**
 * updateEmployee
 */
export const updateEmployeeAction: any = createAsyncThunk(
  "employees/updateEmployeeAction",
  async (
    payload: { id: any; employee: IEmployee },
    { rejectWithValue, dispatch }
  ): Promise<IEmployee | any> => {
    try {
      let { id, employee } = payload;
      let response = await EmployeeService.updateEmployee(id, employee);
      return response;
    } catch (error: any) {
      console.log(error.response.data);
      if (!error) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);
