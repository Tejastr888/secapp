import React, { useState, useEffect } from "react";
import { Link, useNavigate, Routes, Route } from "react-router-dom";
import VerifyEmail from "./auth/VerifyEmail"; // Import VerifyEmail component
import "./App.css";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/user/me", {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) throw new Error("Failed to fetch user");

        const result = await response.json();
        if (result.data) {
          setUser(result.data);
        } else {
          navigate("/signup");
        }
      } catch (err) {
        console.error(err);
        setError("Could not fetch user data.");
        navigate("/signup");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [navigate]);

  const logout = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/auth/logout", {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) throw new Error("Failed to logout");

      const result = await response.json();
      if (result.data) {
        setUser(null);
        navigate("/signup");
      }
    } catch (err) {
      console.error(err);
      alert("Failed to logout.");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="App">
      <Routes>
        {/* Define VerifyEmail route */}
        <Route path="/verify-email" element={<VerifyEmail />} />

        {/* Define main application routes */}
        <Route
          path="/"
          element={
            !user ? (
              <div>
                <div>
                  <Link to="/login">Log in</Link>
                </div>
                <div>
                  <Link to="/signup">Sign up</Link>
                </div>
                <p>You are not logged in.</p>
              </div>
            ) : (
              <div>
                <p>Welcome, {user}!</p>
                <button onClick={logout}>Log out</button>
              </div>
            )
          }
        />
      </Routes>
    </div>
  );
}

export default App;
