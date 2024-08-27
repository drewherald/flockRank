import { Box, Typography } from "@mui/material";
import React, { useState } from "react";
import { useSignup } from "../hooks/useSignup";
import { Button, TextInput } from "react95";
import '../assets/styles/pages/home.css'

export default function Signup({onClose}) {
  const [email, setEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [pVisible, setpVisible] = useState(false);
  const { signup, isLoading, error } = useSignup();

  //signup handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(email, userName, password);
  };

  //show password handler
  const handleClickShowPassword = () => {
    if (pVisible) {
      setpVisible(false);
    } else {
      setpVisible(true);
    }
  };

  return (
    <Box
      component="form"
      className="signup"
      onSubmit={handleSubmit}
      sx={{ display: "flex", flexDirection: "column", width: "40dvw" }}
    >
      <Typography
        sx={{ fontSize: "24px", textAlign: "center", paddingBottom: "20px" }}
      >
        Sign Up for FlockRank!
      </Typography>
      <TextInput
        label="E-Mail"
        type="email"
        variant="flat"
        placeholder="E-Mail"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ margin: "5px 0" }}
      />
      <TextInput
        label="Screen Name"
        variant="flat"
        placeholder="Screen Name"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
        style={{ margin: "5px 0" }}
      />
      <TextInput
        label="Password"
        type={pVisible ? "text" : "password"}
        placeholder="Password"
        variant="flat"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ margin: "5px 0" }}
      />

      <Button
        className="formButton"
        onClick={handleClickShowPassword}
        style={{ margin: "20px 0 0 0", backgroundColor: "#c6c6c6" }}
      >
        {pVisible ? "Hide Password" : "Show Password"}
      </Button>
      <Button
        className="formButton"
        type="submit"
        disabled={isLoading}
        style={{ margin: "10px 0 10px 0", backgroundColor: "#c6c6c6" }}
      >
        Sign Up
      </Button>
      <button
        className="closeButton"
        type="submit"
        onClick={onClose}
        style={{ margin: "10px 0 10px 0", backgroundColor: "#c6c6c6" }}
      >
        X
      </button>
      {error && <Typography sx={{ color: "#EE4B2B" }}>{error}</Typography>}
    </Box>
  );
}
