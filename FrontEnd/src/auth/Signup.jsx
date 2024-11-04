import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function SignUp() {
  const navigate = useNavigate();
  const [formState, setFormState] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState([]);

  const onChange = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  const getErrors = () => {
    const errors = [];
    if (!formState.username) errors.push("Name required");
    if (!formState.email) {
      errors.push("Email required");
    } else if (!/^\S+@\S+\.\S+$/.test(formState.email)) {
      errors.push("Invalid email");
    }
    if (!formState.password) errors.push("Password required");
    return errors;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = getErrors();
    setErrors(validationErrors);
    if (validationErrors.length) return;

    try {
      const response = await fetch("http://localhost:8080/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formState),
      });
      if (response.status === 200) {
        navigate("/check-your-email");
      } else {
        setErrors(["Something went wrong. Please try again."]);
      }
    } catch (error) {
      setErrors(["Failed to connect to the server."]);
    }
  };

  return (
    <div>
      <h1>Sign up</h1>
      <form onSubmit={onSubmit}>
        <div>
          <label>Name</label>
          <input
            name="username"
            onChange={onChange}
            type="text"
            value={formState.username}
          />
        </div>
        <div>
          <label>Email</label>
          <input
            name="email"
            onChange={onChange}
            type="email"
            value={formState.email}
          />
        </div>
        <div>
          <label>Password</label>
          <input
            name="password"
            onChange={onChange}
            type="password"
            value={formState.password}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
      {errors.length > 0 && (
        <div>
          {errors.map((error, index) => (
            <p key={index} style={{ color: "red" }}>
              {error}
            </p>
          ))}
        </div>
      )}
      <div>
        <Link to="/login">Already have an account? Log in</Link>
      </div>
      <div>
        <Link to="/">Back to home</Link>
      </div>
    </div>
  );
}

export default SignUp;
