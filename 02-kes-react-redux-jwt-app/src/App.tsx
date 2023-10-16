import React from "react";
import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import ToastifyContainerUI from "./modules/employees/components/toastify-ui/ToastifyContainerUI";
import NavBar from "./layout/pages/NavBar";
import RegisterUser from "./modules/employees/pages/register-employee/RegisterEmployee";
import ViewEmployee from "./modules/employees/pages/view-employee/ViewEmployee";
import UpdateEmployee from "./modules/employees/pages/update-employee/UpdateEmployee";
import ListEmployees from "./modules/employees/pages/list-employees/ListEmployees";
import NotFound404 from "./modules/employees/components/not-found/NotFound404";
import LoginUser from "./modules/users/pages/login-user/LoginUser";
import CreateUser from "./modules/users/pages/register-user/CreateUser";
import { AuthService } from "./modules/users/services/AuthService";
import HomePage from "./modules/employees/pages/home-page/HomePage";

const App = () => {
  const AuthenticatedRoute: React.FC<{ children: any }> = ({ children }) => {
    const isAuth = AuthService.isLoggedInUser();
    if (isAuth) {
      return children;
    }
    return <Navigate to={"/login"} />;
  };

  return (
    <div className="">
      <ToastifyContainerUI />
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/employees"
          element={
            <AuthenticatedRoute>
              <ListEmployees />
            </AuthenticatedRoute>
          }
        />
        <Route
          path="/register-employee"
          element={
            <AuthenticatedRoute>
              <RegisterUser />
            </AuthenticatedRoute>
          }
        />
        <Route
          path="/view-employee/:id"
          element={
            <AuthenticatedRoute>
              <ViewEmployee />
            </AuthenticatedRoute>
          }
        />
        <Route
          path="/update-employee/:id"
          element={
            <AuthenticatedRoute>
              <UpdateEmployee />
            </AuthenticatedRoute>
          }
        />
        <Route path="/*" element={<NotFound404 />} />

        <Route path="/login" element={<LoginUser />} />
        <Route path="/register" element={<CreateUser />} />
      </Routes>
    </div>
  );
};

export default App;
