import axios from "axios";
import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

function Login() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const loginUser = async (e) => {
    e.preventDefault();
    const { email, password } = data;
    try {
      await axios
        .post("/", {
          email,
          password,
        })
        .then((res) => {
          if(res.data.error){
            toast.error(res.data.error);
          }else{
            localStorage.setItem("name", res.data.user.name);
            toast.success("Login Successful..! Welcome");
            navigate("/home", { state: res.data.user });
          }
        });
        
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="container">
      <div className="row mt-4">
        <div className="col-4 offset-4 card p-4">
          <h3 className="text-center mb-4">Login</h3>
          <form onSubmit={loginUser}>
            <label htmlFor="name">Email</label>
            <input
              className="form-control mb-3"
              type="email"
              placeholder="Enter Email"
              value={data.email}
              onChange={(e) => setData({ ...data, email: e.target.value })}
            />
            <label htmlFor="name">Password</label>
            <input
              className="form-control mb-3"
              type="password"
              placeholder="Enter Password"
              value={data.password}
              onChange={(e) => setData({ ...data, password: e.target.value })}
            />
            <div className="text-center d-grid">
              <button className="btn btn-primary block" type="submit">
                Login
              </button>
              <p className="mt-3">
                Don't Have an Account?
                <Link
                  className="nav-link d-inline-block p-0 ms-1"
                  to="/register"
                >
                  Create Here
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
