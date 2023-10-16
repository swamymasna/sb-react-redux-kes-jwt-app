import { SerializedError, createSlice } from "@reduxjs/toolkit";
import { IEmployee } from "../../modules/employees/models/IEmployee";
import * as employeesAction from "../employees/employees.actions";
import { ToastUtil } from "../../utils/ToastUtil";
import { ILocation } from "../../modules/employees/models/ILocation";

export const employeeFeatureKey = "employeeFeature";

export interface InitialState {
  loading: boolean;
  errorMessage: SerializedError;
  employees: IEmployee[];
  employee: IEmployee;
  locations: ILocation[];
}

const initialState: InitialState = {
  loading: false,
  errorMessage: {} as SerializedError,
  employees: [] as IEmployee[],
  employee: {} as IEmployee,
  locations: [] as ILocation[],
};

export const employeeSlice = createSlice({
  name: "employeeSlice",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    /**
     * getAllEmployees
     */
    builder
      .addCase(
        employeesAction.getAllEmployeesAction.pending,
        (state, action) => {
          state.loading = true;
        }
      )
      .addCase(
        employeesAction.getAllEmployeesAction.fulfilled,
        (state, action) => {
          state.loading = false;
          state.employees = action.payload;
        }
      )
      .addCase(
        employeesAction.getAllEmployeesAction.rejected,
        (state, action) => {
          state.loading = false;
          state.errorMessage = action.error;
          ToastUtil.displayErrorToast(
            "Unable to Fetch Employees From the Server"
          );
        }
      );

    /**
     * deleteEmployee
     */
    builder
      .addCase(
        employeesAction.deleteEmployeeAction.pending,
        (state, action) => {
          state.loading = true;
        }
      )
      .addCase(
        employeesAction.deleteEmployeeAction.fulfilled,
        (state, action) => {
          state.loading = false;
          ToastUtil.displayInfoToast("Employee is Deleted");
        }
      )
      .addCase(
        employeesAction.deleteEmployeeAction.rejected,
        (state, action) => {
          state.loading = false;
          state.errorMessage = action.error;
          ToastUtil.displayErrorToast(
            "Unable to Delete Employee From the Server"
          );
        }
      );

    /**
     * viewEmployee
     */
    builder
      .addCase(employeesAction.viewEmployeeAction.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(
        employeesAction.viewEmployeeAction.fulfilled,
        (state, action) => {
          state.loading = false;
          state.employee = action.payload;
        }
      )
      .addCase(employeesAction.viewEmployeeAction.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage = action.error;
        ToastUtil.displayErrorToast("Unable to Fetch Employee From the Server");
      });

    /**
     * registerEmployee
     */
    builder
      .addCase(
        employeesAction.registerEmployeeAction.pending,
        (state, action) => {
          state.loading = true;
        }
      )
      .addCase(
        employeesAction.registerEmployeeAction.fulfilled,
        (state, action) => {
          state.loading = false;
          ToastUtil.displaySuccessToast("Employee is Registered");
        }
      )
      .addCase(
        employeesAction.registerEmployeeAction.rejected,
        (state, action) => {
          state.loading = false;
          state.errorMessage = action.error;
          ToastUtil.displayErrorToast(
            "Unable to Save Employee into the Server"
          );
        }
      );

    /**
     * getAllLocations
     */
    builder
      .addCase(
        employeesAction.getAllLocationsAction.pending,
        (state, action) => {
          state.loading = true;
        }
      )
      .addCase(
        employeesAction.getAllLocationsAction.fulfilled,
        (state, action) => {
          state.loading = false;
          state.locations = action.payload;
        }
      )
      .addCase(
        employeesAction.getAllLocationsAction.rejected,
        (state, action) => {
          state.loading = false;
          state.errorMessage = action.error;
          ToastUtil.displayErrorToast(
            "Unable to Fetch Locations From the Server"
          );
        }
      );

    /**
     * updateEmployee
     */
    builder
      .addCase(
        employeesAction.updateEmployeeAction.pending,
        (state, action) => {
          state.loading = true;
        }
      )
      .addCase(
        employeesAction.updateEmployeeAction.fulfilled,
        (state, action) => {
          state.loading = false;
          ToastUtil.displaySuccessToast("Employee is Updated");
        }
      )
      .addCase(
        employeesAction.updateEmployeeAction.rejected,
        (state, action) => {
          state.loading = false;
          state.errorMessage = action.error;
          ToastUtil.displayErrorToast(
            "Unable to Update Employee From the Server"
          );
        }
      );
  },
});
