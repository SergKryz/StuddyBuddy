import React from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { useNavigate } from "react-router-dom";
import { ReactComponent as Google } from "./Assests/Svg/google.svg";
const GoogleAuth = () => {
  const navigate = useNavigate();
  const handleSignIn = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    provider.setCustomParameters({
      prompt: "select_account",
    });

    firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        // Handle successful sign-in
        // You can access the user information from the result object
        const { user } = result;

        navigate("/dashboard");
      })
      .catch((error) => {
        // Handle sign-in error
        console.error("Error signing in:", error);
      });
  };

  return (
    <img
      src="./google.png"
      alt=""
      width={"40px"}
      height={"40px"}
      onClick={handleSignIn}
      style={{ cursor: "pointer" }}
    />
  );
};

export default GoogleAuth;
