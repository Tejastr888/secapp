import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [formState, setFormState] = useState({
    username: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const onChange = (e, type) => {
    e.preventDefault();
    setFormState({
      ...formState,
      [type]: e.target.value,
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!formState.username || !formState.password) {
      alert("Please fill in all fields");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: formState.username,
          password: formState.password,
        }),
      });

      setLoading(false);

      if (response.ok) {
        navigate("/");
      } else {
        const errorData = await response.json();
        alert(errorData.message || "Failed to login. Please try again.");
      }
    } catch (error) {
      setLoading(false);
      alert("Network error. Please try again later.");
    }
  };

  return (
    <div>
      <h1>Log in</h1>
      <form onSubmit={onSubmit}>
        <div>
          <label>Username</label>
          <input
            onChange={(e) => onChange(e, "username")}
            type="username"
            value={formState.username}
            required
          />
        </div>
        <div>
          <label>Password</label>
          <input
            onChange={(e) => onChange(e, "password")}
            type="password"
            value={formState.password}
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Log in"}
        </button>
      </form>
      <div>
        <Link to="/signup">Don't have an account? Sign up</Link>
      </div>
      <div>
        <Link to="/">Back to home</Link>
      </div>
    </div>
  );
}

export default Login;
