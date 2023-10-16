import React from "react";
import { Link } from "react-router-dom";
import Footer from "./Footer";
import { AuthService } from "../../modules/users/services/AuthService";
import { NavLink, useNavigate } from "react-router-dom";
import { ToastUtil } from "../../utils/ToastUtil";

const NavBar: React.FC = () => {
  const isAuth = AuthService.isLoggedInUser();
  const navigate = useNavigate();

  const logoutUser = () => {
    AuthService.logoutUser();
    navigate("/login");
    ToastUtil.displaySuccessToast('Logged-Out Successfully');
  };

  return (
    <>
      <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
        <div className="container">
          <Link to={"/"} className="navbar-brand">
            KES Application
          </Link>

          <div className="navbar-collapse">
            <ul className="navbar-nav">
              {isAuth && (
                <li className="nav-item">
                  <Link to={"/register-employee"} className="nav-link">
                    Register-Employee
                  </Link>
                </li>
              )}

              {isAuth && (
                <li className="nav-item">
                  <Link to={"/employees"} className="nav-link">
                    View-Employees
                  </Link>
                </li>
              )}
            </ul>
          </div>
          <ul className="navbar-nav">
            {!isAuth && (
              <li className="nav-item">
                <Link to={"/register"} className="nav-link">
                  Register
                </Link>
              </li>
            )}

            {!isAuth && (
              <li className="nav-item">
                <Link to={"/login"} className="nav-link">
                  Login
                </Link>
              </li>
            )}

            {isAuth && (
              <li className="nav-item">
                <NavLink
                  to={"/login"}
                  className="nav-link"
                  onClick={logoutUser}
                >
                  Logout
                </NavLink>
              </li>
            )}
          </ul>
        </div>
      </nav>
      <Footer />
    </>
  );
};

export default NavBar;
