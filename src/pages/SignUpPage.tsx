import React, { useState } from "react";
import { Image, Input, Button } from "@world-vision/wv360-core-library";
import { useNavigate } from "react-router-dom";
import "./SignUpPage.scss";

const SignUpPage: React.FC = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/signup`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: formData.username,
            email: formData.email,
            password: formData.password,
          }),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        setError(result.message || "Signup failed.");
        return;
      }

      setSuccess("Account created successfully!");
      // Clear form
      setFormData({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
    } catch (err) {
      console.error("Signup error:", err);
      setError("Server error. Please try again.");
    }
  };

  return (
    <div className="background">
      <div className="right-container">
        <div className="logo">
          <Image
            src="/Logo.svg"
            alt="Logo"
            fallbackSrc="/Mark.svg"
            width="12vw"
            height="12vh"
          />
        </div>

        <div className="title">
          <h1 className="sign-up-title">Sign Up</h1>
          <p>Welcome to Tabs for Good! Let's create an account.</p>
        </div>

        <form className="form-container" onSubmit={handleSubmit}>
          {error && <p className="form-error">{error}</p>}
          <Input
            label="Username"
            name="username"
            type="text"
            placeholder="Enter your username"
            minLength={3}
            rules={{
              required: "Username is required",
              minLength: {
                value: 3,
                message: "Username must be at least 3 characters",
              },
              maxLength: {
                value: 20,
                message: "Username must be at most 20 characters",
              },
              pattern: {
                value: /^[a-zA-Z0-9_]+$/,
                message: "Only letters, numbers, and underscores are allowed",
              },
            }}
            onChange={handleChange}
            value={formData.username}
          />

          <Input
            label="Email"
            name="email"
            type="email"
            placeholder="Enter email address"
            onChange={handleChange}
            value={formData.email}
          />

          <Input
            label="Password"
            name="password"
            type="password"
            placeholder="Enter password"
            onChange={handleChange}
            value={formData.password}
            minLength={3}
          />

          <Input
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            placeholder="Confirm password"
            onChange={handleChange}
            minLength={3}
          />

          <div className="privacy">
            We'll never share your details. <br />
            See our <strong>Privacy Policy</strong>
          </div>

          <Button
            mode="primary"
            size="xl"
            text="Create Account"
            type="submit"
          />

          <div className="login-redirect">
            Already have an account? <u onClick={() => navigate("/")}>Log in</u>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUpPage;
