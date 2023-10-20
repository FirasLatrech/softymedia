import React, { useState, useEffect } from "react";
import ForgetPassIcon from "./loock.svg";
import "./_ForgetPassword.scss";
import { NavLink } from "react-router-dom";

export default function ForgetPassword() {
  const [email, setEmail] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState(null);

  const sendResetEmail = async () => {
    setIsSending(true);
    setError(null);
    try {
      if (!email) {
        throw new Error("Email is required");
      }

      const response = await fetch(
        `${import.meta.env.REACT_BACKEND_APP}api/auth/reset-password`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            data: {
              email: email,
            },
          }),
        }
      );
      if (response.ok) {
        console.log("Password reset email sent successfully");
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }
    } catch (error) {
      setError(error.message);
      console.error("Error sending password reset email:", error);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="ForgetIcon">
      <img src={ForgetPassIcon} alt="" width={110} />
      <h5>Forgot your password?</h5>

      <p>
        Please enter the email address associated with your account, and we will
        email you a link to reset your password.
      </p>
      <input
        type="text"
        placeholder="Email Address"
        className="EmailAdress"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      {error && <p style={{ color: "red" }}>{error}</p>}
      <div className="SendRequest" onClick={sendResetEmail}>
        {isSending ? "Sending..." : "Send Request"}
      </div>
      <NavLink to={"/login"}>Return to sign in</NavLink>
    </div>
  );
}
