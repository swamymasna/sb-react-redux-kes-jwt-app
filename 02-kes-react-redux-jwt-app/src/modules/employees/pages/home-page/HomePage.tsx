import React from "react";
import kesImg from "../../../../assets/img/KES.jpg";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <>
      <div className="container mt-1">
        <div className="row">
          <div className="col">
            <div className="card shadow-lg">
              <div className="card-body">
                <div className="text-center">
                  <div className="text-center col-md-1 m-auto">
                    <Link
                      to={"/login"}
                      className="btn btn-warning form-control"
                    >
                      Login
                    </Link>
                  </div>
                  <img src={kesImg} alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
