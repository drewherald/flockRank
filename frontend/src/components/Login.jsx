import { Box, Typography } from "@mui/material";
import React, { useState } from "react";
import { useLogin } from "../hooks/useLogin";
import { TextInput, Button } from "react95";
import ForgotPassword from "./ForgotPassword";

export default function Login({onClose}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pVisible, setpVisible] = useState(false);
  const [forgotPassword, setForgotPassword] = useState(false)

  const { login, isLoading, error } = useLogin();

  //login handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    if(!forgotPassword){
      await login(email, password);

      }
   
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
      className="login"
      onSubmit={handleSubmit}
      sx={{ display: "flex", flexDirection: "column", width: "40dvw" }}
    >
{forgotPassword ?
<ForgotPassword onClose={onClose} />


: 



<React.Fragment>
      <Typography
        sx={{ fontSize: "24px", textAlign: "center", paddingBottom: "20px" }}
      >
        Log In
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
        disabled={isLoading}
        onClick={() => setForgotPassword(true)}
        type='button'
        style={{ margin: "10px 0 10px 0", backgroundColor: "#c6c6c6" }}
      >
        Forgot Password?
      </Button>
      <Button
        className="formButton"
        type="submit"
        disabled={isLoading}
        style={{ margin: "10px 0 10px 0", backgroundColor: "#c6c6c6" }}
      >
        Log In
      </Button>
    
      <button
        className="closeButton"
        type="submit"
        onClick={onClose}
        style={{ margin: "10px 0 10px 0", backgroundColor: "#c6c6c6" }}
      >
        X
      </button>
      {error && <Typography sx={{ color: "#EE4B2B" }}>{error}</Typography>}</React.Fragment>
}
    </Box>
  );
}
