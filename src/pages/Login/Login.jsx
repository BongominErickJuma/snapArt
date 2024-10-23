import React, { useContext, useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const handleSignIn = (e) => {
    e.preventDefault();
    navigate("/dashboard"); // Trigger fetch on form submit
  };

  useEffect(() => {
    document.title = "SnapArt | Login";
  }, []);

  return (
    <div className="min-vh-100 main flex-c">
      <h2>
        Snap<span className="designed">Art</span>
      </h2>
      <p>Please Login</p>

      <form onSubmit={handleSignIn} className="w-25">
        <div className="form-group">
          <label>Username</label>
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
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              name="remember"
              id="org_rememberMe"
            />
            <label className="form-check-label w-100" htmlFor="rememberMe">
              <div className="flex-r">
                <small>Remember Me</small>
                <small>Forgot password</small>
              </div>
            </label>
          </div>
        </div>

        <button type="submit" className="btn w-100 view-btn">
          Login
        </button>

        <p className="my-3 text-center">
          <small>
            Don't have account? <Link to="/signup">Sign Up</Link>
          </small>
        </p>
      </form>
    </div>
  );
};

export default Login;
