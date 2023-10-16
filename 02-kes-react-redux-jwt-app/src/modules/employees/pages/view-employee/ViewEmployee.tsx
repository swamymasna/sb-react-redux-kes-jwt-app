import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import SpinnerUI from "../../components/spinner-ui/SpinnerUI";
import ErrorMessage from "../../components/error-message/ErrorMessage";
import NoRecordFound from "../../components/no-record-found/NoRecordFound";

import * as employeesAction from "../../../../redux/employees/employees.actions";
import * as employeeReducer from "../../../../redux/employees/employees.slice";
import {
  RootState,
  AppDispatch,
  useAppDispatch,
} from "../../../../redux/store";
import { useSelector } from "react-redux";

const ViewEmployee: React.FC = () => {
  let { id } = useParams();

  const dispatch: AppDispatch = useAppDispatch();

  const employeesState: employeeReducer.InitialState = useSelector(
    (store: RootState) => {
      return store[employeeReducer.employeeFeatureKey];
    }
  );

  const fetchEmployee = () => {
    dispatch(employeesAction.viewEmployeeAction({ id: id }));
  };

  useEffect(() => {
    fetchEmployee();
  }, [id]);

  let { employee, errorMessage, loading } = employeesState;

  return (
    <>
      {loading && <SpinnerUI />}
      {Object.keys(errorMessage).length > 0 && (
        <ErrorMessage message={errorMessage} />
      )}
      <div className="container mt-1 viewData">
        {Object.keys(employee).length > 0 ? (
          <div className="row">
            <div className="col-md-5 m-auto">
              <div className="card shadow-lg">
                <div className="card-header bg-danger text-center text-white">
                  <h2>Employee Details</h2>
                </div>
                <div className="card-body bg-light">
                  <ul className="list-group ulData">
                    <li className="list-group-item">
                      Employee Id : <b>{employee.employeeId}</b>
                    </li>
                    <li className="list-group-item">
                      Employee First Name : <b>{employee.firstName}</b>
                    </li>
                    <li className="list-group-item">
                      Employee Last Name : <b>{employee.lastName}</b>
                    </li>
                    <li className="list-group-item">
                      Employee Salary : <b>{employee.salary}</b>
                    </li>
                    <li className="list-group-item">
                      Employee EmailId : <b>{employee.email}</b>
                    </li>
                    <li className="list-group-item">
                      Employee Gender : <b>{employee.gender}</b>
                    </li>
                    <li className="list-group-item">
                      Tech Stack :{" "}
                      <b>{employee.languages && "" + employee.languages}</b>
                    </li>
                    <li className="list-group-item">
                      Preferred Location : <b>{employee.prefLocation}</b>
                    </li>
                    <li className="list-group-item">
                      Employee Profile : <b>{employee.profile}</b>
                    </li>
                    <li className="list-group-item">
                      Is Accepted Terms : <b>{employee.terms ? "Yes" : "No"}</b>
                    </li>
                  </ul>
                  <div className="mt-2 ">
                    <Link to={"/employees"} className="btn btn-primary">
                      <i className="bi bi-arrow-left-circle "></i>
                      <span className="ms-1">Go Back</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <NoRecordFound />
        )}
      </div>
    </>
  );
};

export default ViewEmployee;
