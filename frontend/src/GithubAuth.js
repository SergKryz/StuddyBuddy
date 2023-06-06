import React from "react";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { useNavigate } from "react-router-dom";
import { ReactComponent as Github } from "./Assests/Svg/github.svg";
const GitHubAuth = () => {
  const navigate = useNavigate();
  const handleSignIn = () => {
    const provider = new firebase.auth.GithubAuthProvider();
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
      onClick={handleSignIn}
      src="./github.png"
      alt=""
      width={"40px"}
      height={"40px"}
      style={{ cursor: "pointer" }}
    />
  );
};

export default GitHubAuth;
