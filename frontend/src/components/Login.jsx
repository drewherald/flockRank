import { Box, Typography } from "@mui/material";
import React, { useState } from "react";
import { useLogin } from "../hooks/useLogin";
import { TextInput, Button } from "react95";

export default function Login({onClose}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pVisible, setpVisible] = useState(false);
  const [forgotPassword, setForgotPassword] = useState(false)
  const [otpCode, setOTPCode] = useState(false)
  const [OTPData, setOTPData] = useState(0)
  const [OTPCheck, setOTPCheck] = useState(1234)
  const [forgotEmail, setForgotEmail] = useState("");
  const [verified, setVerified] = useState(false)
  const [newPassword, setNewPassword] = useState("")
  const { login, isLoading, error } = useLogin();

  //login handler
  const handleSubmit = async (e) => {

    if(forgotPassword){
      if(otpCode){
        e.preventDefault();
      }else{
        e.preventDefault();
      }
    }else{
      e.preventDefault();
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

  const navigateToOtp = async() => {
    if (forgotEmail) {
      const OTP = Math.floor(Math.random() * 9000 + 1000);
      setOTPCheck(OTP);
      setOTPCode(true)

      const response = await fetch(
        `https://flockrank.onrender.com/api/user/forgotpassword`,
        {
          method: "POST",
          mode: 'no-cors',
          body: {recipient_email: forgotEmail, OTPData},
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
        .then(() => setOTPCode(true))
        .then(() => console.log(response))
        .catch(console.log);
      return; 
    } 
    return alert("Please enter your email");
  }

  const verifyOTP = () => {
    if(OTPCheck === OTPData){
      alert('your password has been reset!')
      setVerified(false)
      setOTPCheck(false)
      setForgotPassword(false)
    }
  }

  return (

    <Box
      component="form"
      className="login"
      onSubmit={handleSubmit}
      sx={{ display: "flex", flexDirection: "column", width: "40dvw" }}
    >

{forgotPassword ? 


<React.Fragment>

  <Typography
        sx={{ fontSize: "24px", textAlign: "center", paddingBottom: "20px" }}
      >
        Forgot Password
      </Typography>



      {otpCode ? 

      
      <React.Fragment>

        {verified ? 
        
        <React.Fragment>
      <TextInput
        label="NewPass"
        type="text"
        variant="flat"
        placeholder="New Password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        style={{ margin: "5px 0" }}
      />
           <Button
        className="formButton"
        type="submit"
        disabled={isLoading}
        style={{ margin: "10px 0 10px 0", backgroundColor: "#c6c6c6" }}
      >
        Submit
      </Button>
      <button
        className="closeButton"
        type="submit"
        onClick={onClose}
        style={{ margin: "10px 0 10px 0", backgroundColor: "#c6c6c6" }}
      >
        X
      </button>

        </React.Fragment> 
        
        : 


        <React.Fragment>
        <TextInput
        label="E-OTP"
        type="text"
        variant="flat"
        placeholder="4 Digit Code"
        value={OTPData}
        onChange={(e) => setOTPData(e.target.value)}
        style={{ margin: "5px 0" }}
      />
           <Button
        className="formButton"
        type="submit"
        disabled={isLoading}
        style={{ margin: "10px 0 10px 0", backgroundColor: "#c6c6c6" }}
      >
        Verify Data
      </Button>
      <button
        className="closeButton"
        type="submit"
        onClick={onClose}
        style={{ margin: "10px 0 10px 0", backgroundColor: "#c6c6c6" }}
      >
        X
      </button>
          </React.Fragment>
        }
      </React.Fragment>
      
      
      : 
      
      
      <React.Fragment>
      <Typography
        sx={{ fontSize: "18px", textAlign: "center", paddingBottom: "20px" }}
      >
        Please enter your email and we will send a 4-digit code that will be used to reset your password.
      </Typography>
      <TextInput
        label="ForgotE-Mail"
        type="email"
        variant="flat"
        placeholder="E-Mail"
        value={forgotEmail}
        onChange={(e) => setForgotEmail(e.target.value)}
        style={{ margin: "5px 0" }}
      />
        <Button
        className="formButton"
        type="button"
        disabled={isLoading}
        onClick={() => navigateToOtp()}
        style={{ margin: "10px 0 10px 0", backgroundColor: "#c6c6c6" }}
      >
        Send Code via Email
      </Button>
      <button
        className="closeButton"
        type="submit"
        onClick={onClose}
        style={{ margin: "10px 0 10px 0", backgroundColor: "#c6c6c6" }}
      >
        X
      </button>
        </React.Fragment>
      }


  
</React.Fragment> 


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
      {error && <Typography sx={{ color: "#EE4B2B" }}>{error}</Typography>}</React.Fragment>}
    </Box>
  );
}
