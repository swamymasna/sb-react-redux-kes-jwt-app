import { combineReducers } from "@reduxjs/toolkit";
import * as employeeReducer from "../redux/employees/employees.slice";

const rootReducer = combineReducers({
  [employeeReducer.employeeFeatureKey]: employeeReducer.employeeSlice.reducer,
});
export default rootReducer;
