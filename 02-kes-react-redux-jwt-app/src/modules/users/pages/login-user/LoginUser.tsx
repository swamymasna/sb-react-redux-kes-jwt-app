import React, { ChangeEvent, FormEvent, useState } from "react";
import { ILoginUser } from "../../models/ILoginUser";
import { AuthService } from "../../services/AuthService";
import { Link, useNavigate } from "react-router-dom";
import { ToastUtil } from "../../../../utils/ToastUtil";

const LoginUser = () => {
  let navigate = useNavigate();

  const [user, setUser] = useState<ILoginUser>({
    usernameOrEmail: "",
    password: "",
  });

  const handleOnChange = (event: ChangeEvent<HTMLInputElement | any>) => {
    setUser({
      ...user,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement | any>) => {
    event.preventDefault();
    console.log(user);

    await AuthService.loginUser(user)
      .then((response: any) => {
        console.log(response.data);
        let token = "Bearer " + response.data.accessToken;
        AuthService.setToken(token);
        if (response && response.data) {
          AuthService.saveLoggedInUser(usernameOrEmail);
          navigate("/employees");
          ToastUtil.displaySuccessToast("Logged-In Success");
        }
        window.location.reload();
      })
      .catch((error) => {
        console.error(error);
        ToastUtil.displayErrorToast("Failed To Login");
      });
  };

  let { usernameOrEmail, password } = user;

  return (
    <>
      <div className="container mt-3">
        <div className="row">
          <div className="col-md-5 m-auto">
            <div className="card shadow-lg">
              <div className="card-header bg-warning text-center">
                <h2>Login Here</h2>
              </div>
              <div className="card-body bg-light">
                <form onSubmit={handleSubmit}>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="usernameOrEmail"
                      value={usernameOrEmail}
                      onChange={handleOnChange}
                      placeholder="Enter Username or Email-Id"
                      className="form-control"
                      required
                    />
                  </div>
                  <div className="mt-2">
                    <input
                      type="password"
                      name="password"
                      value={password}
                      onChange={handleOnChange}
                      placeholder="Enter Password"
                      className="form-control"
                      required
                    />
                  </div>
                  <div className="mt-2">
                    <input
                      type="submit"
                      value={"Login"}
                      className="btn btn-warning"
                    />
                    <span className="ms-2">If You are a new User?</span>
                    <Link to={"/register"} className="ms-2">
                      Register
                    </Link>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginUser;
