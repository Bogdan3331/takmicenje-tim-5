import React, { useState } from "react";
import "./SignIn.css";
import ApiService from "../../Shared/api";

const SignInPage: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await ApiService.signIn(email, password);

      if (response.error) {
        setError(response.error);
      } else {
        localStorage.setItem("auth_token", response.data.token);

        window.location.href = "/";
      }
    } catch (error: any) {
      setError(error.message);
    }
  };

  return (
    <div className="sign-in-page">
      <h1>Sign In</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input type="text" value={email} onChange={handleUsernameChange} />
        </label>
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </label>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button type="submit">Sign In</button>

        <p style={{ marginTop: "15px" }}>
          Don't have an account? &nbsp;
          <a href="/register" style={{ color: "blue" }}>
            Register here
          </a>
        </p>
      </form>
    </div>
  );
};

export default SignInPage;
