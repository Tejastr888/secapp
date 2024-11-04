import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

const VerificationState = {
  PENDING: "pending",
  INVALID: "invalid",
  ALREADY_VERIFIED: "already_verified",
  SUCCESS: "success",
};

function VerifyEmail() {
  const [searchParams] = useSearchParams();
  const [verificationState, setVerificationState] = useState(
    VerificationState.PENDING
  );

  const attemptToVerify = async () => {
    // Fetch and log parameters for debugging
    let code = searchParams.get("t");
    let uid = searchParams.get("uid");

    if (!code || !uid) {
      setVerificationState(VerificationState.INVALID);
      return;
    }

    // Trim whitespace and encode the parameters
    code = encodeURIComponent(code.trim());
    uid = encodeURIComponent(uid.trim());

    console.log("Attempting verification with UID:", uid, "and Token:", code);

    try {
      const response = await fetch(
        `http://localhost:8080/api/auth/email/verify?uid=${uid}&t=${code}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        setVerificationState(VerificationState.INVALID);
        return;
      }

      const result = await response.json();

      if (result.data === "already verified") {
        setVerificationState(VerificationState.ALREADY_VERIFIED);
      } else {
        setVerificationState(VerificationState.SUCCESS);
      }
    } catch (error) {
      console.error("Verification failed", error);
      setVerificationState(VerificationState.INVALID);
    }
  };

  useEffect(() => {
    attemptToVerify();
  }, []);

  switch (verificationState) {
    case VerificationState.SUCCESS:
      return (
        <div>
          Email verified. Please <Link to="/login">sign in</Link>.
        </div>
      );
    case VerificationState.ALREADY_VERIFIED:
      return (
        <div>
          This link has expired. Please <Link to="/login">log in</Link>.
        </div>
      );
    case VerificationState.INVALID:
      return <div>This link is invalid.</div>;
    default:
      return <div>Verifying your email, please wait...</div>;
  }
}

export default VerifyEmail;
