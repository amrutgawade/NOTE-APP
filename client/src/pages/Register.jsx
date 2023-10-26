import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

function Register() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const registerUser = async (e) => {
    e.preventDefault();
    const { name, email, password } = data;
    try {
      const { data } = await axios.post("/register", {
        name,
        email,
        password,
      });
      if (data.error) {
        toast.error(data.error);
      } else {
        // setData({});
        toast.success("Register Successful..! Welcome");
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container">
      <div className="row mt-4">
        <div className="col-4 offset-4 card p-4">
          <h3 className="text-center mb-4">Register</h3>
          <form onSubmit={registerUser}>
            <label htmlFor="name">Name</label>
            <input
              className="form-control mb-3"
              type="text"
              placeholder="Enter Name"
              value={data.name}
              onChange={(e) => setData({ ...data, name: e.target.value })}
            />
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
              <button className="btn btn-primary" type="submit">
                Register
              </button>
              <p className="mt-3">
                Already Have an Account?
                <Link className="nav-link d-inline-block p-0 ms-1" to="/">
                  Login Here
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
