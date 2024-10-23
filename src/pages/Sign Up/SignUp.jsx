import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const handleSignUp = (e) => {
    e.preventDefault();
    navigate("/snapArt/"); // Trigger fetch on form submit
  };

  useEffect(() => {
    document.title = "SnapArt | Signup";
  }, []);

  return (
    <div className="min-vh-100 main flex-c">
      <h2>
        Snap<span className="designed">Art</span>
      </h2>
      <p>Please Sign Up</p>

      <form onSubmit={handleSignUp} className="w-25">
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            name="name"
            placeholder="Enter Your name"
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            className="form-control"
            required
          />
        </div>
        <div className="form-group">
          <label>Confirm Password</label>
          <input
            type="password"
            name="cpassword"
            placeholder="Enter your password"
            className="form-control"
            required
          />
        </div>

        <div className="form-group">
          <small>
            By Signing up, You agree to <span className="designed">T&Cs</span>{" "}
          </small>
        </div>
        <button type="submit" className="btn w-100 view-btn">
          Sign Up
        </button>
        <p className="my-3 text-center">
          <small>
            Have account? <Link to="/snapArt/">Login</Link>
          </small>
        </p>
      </form>
    </div>
  );
};

export default Login;
