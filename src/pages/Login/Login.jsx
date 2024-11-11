import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContex";

const Login = () => {
  const { setToken, token } = useAuth();
  const navigate = useNavigate();
  const [login, setLogin] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSignIn = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(import.meta.env.VITE_LOGIN, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: login.email,
          password: login.password,
        }),
      });

      let data;
      if (response.headers.get("content-type")?.includes("application/json")) {
        data = await response.json();
      } else {
        data = await response.text();
      }

      if (!response.ok) {
        console.error("Login error:", data);
        throw new Error(
          data.message || "A server error occurred. Please try again later."
        );
      }

      // Assuming data is JSON if it is successful and contains the token
      setToken(data);
      navigate("/snapArt/dashboard", { replace: true });
    } catch (err) {
      console.error("Full error details:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setLogin({
      ...login,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    document.title = "sNapEarn | Login";
  }, []);

  return (
    <div className="min-vh-100 main flex-c">
      <h2>
        sNap<span className="designed">Earn</span>
      </h2>
      <p>Please Login</p>

      <form onSubmit={handleSignIn} className="w-25">
        <div className="form-group">
          <label>Username</label>
          <input
            type="email"
            name="email"
            value={login.email}
            onChange={handleInputChange}
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
            value={login.password}
            onChange={handleInputChange}
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

        {error && <p className="text-danger">{error}</p>}

        <button type="submit" className="btn w-100 view-btn">
          {loading ? "Loading..." : "Login"}
        </button>

        <p className="my-3 text-center">
          <small>
            Don't have an account? <Link to="/snapArt/signup">Sign Up</Link>
          </small>
        </p>
      </form>
    </div>
  );
};

export default Login;
