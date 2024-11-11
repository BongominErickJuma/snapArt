import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const handleSignUp = (e) => {
    e.preventDefault();
    navigate("/snapArt/"); // Trigger fetch on form submit
  };

  useEffect(() => {
    document.title = "sNapEarn | Signup";
  }, []);

  return (
    <div className="min-vh-100 main flex-c">
      <h2>
        sNap<span className="designed">Earn</span>
      </h2>
      <p>Please Sign Up</p>

      <form onSubmit={handleSignUp} className="w-25">
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email address"
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
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              name="remember"
              id="org_rememberMe"
            />
            <label className="form-check-label w-100" htmlFor="rememberMe">
              <small>
                By Signing up, You agree to{" "}
                <span className="designed">T&Cs</span>{" "}
              </small>
            </label>
          </div>
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
