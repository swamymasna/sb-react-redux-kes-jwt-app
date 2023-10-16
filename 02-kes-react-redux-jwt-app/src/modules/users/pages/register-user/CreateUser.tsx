import React, { ChangeEvent, FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IRegisterUser } from "../../models/IRegisterUser";
import { AuthService } from "../../services/AuthService";
import { ToastUtil } from "../../../../utils/ToastUtil";

const CreateUser: React.FC = () => {
  const navigate = useNavigate();

  const [regUser, setRegUser] = useState<IRegisterUser>({
    name: "",
    email: "",
    username: "",
    password: "",
  });

  const handleOnChange = (event: ChangeEvent<HTMLInputElement | any>) => {
    setRegUser({
      ...regUser,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event: FormEvent<HTMLInputElement | any>) => {
    event.preventDefault();
    AuthService.registerUser(regUser)
      .then((response: any) => {
        if (response && response.data) {
          navigate("/login");
          ToastUtil.displaySuccessToast("User is Registered");
        }
      })
      .catch((error: any) => {
        console.error(error);
        ToastUtil.displayErrorToast("Registration Failed");
      });
  };

  let { name, email, username, password } = regUser;
  return (
    <>
      <div className="container mt-3">
        <div className="row">
          <div className="col col-md-5 m-auto">
            <div className="card shadow-lg">
              <div className="card-header bg-success text-white text-center">
                <h2>Register Here</h2>
              </div>
              <div className="card-body bg-light">
                <form onSubmit={handleSubmit}>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="name"
                      value={name}
                      onChange={handleOnChange}
                      placeholder="Enter Name"
                      className="form-control"
                      required
                    />
                  </div>
                  <div className="mt-2">
                    <input
                      type="email"
                      name="email"
                      value={email}
                      onChange={handleOnChange}
                      placeholder="Enter Email-Id"
                      className="form-control"
                      required
                    />
                  </div>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="username"
                      value={username}
                      onChange={handleOnChange}
                      placeholder="Enter Username"
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
                      value={"Register"}
                      className="btn btn-success"
                    />
                    <span className="ms-1">Already have an account? </span>
                    <Link to={"/login"} className="ms-1">
                      Sign In
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

export default CreateUser;
