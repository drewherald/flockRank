import { Box, Typography } from "@mui/material";
import React, { useState } from "react";
import { TextInput, Button } from "react95";
import { useLogin } from "../hooks/useLogin";

export default function ForgotPassword({onClose}) {

   
    const [otpCode, setOTPCode] = useState(false)
    const [OTPData, setOTPData] = useState("")
    const [OTPCheck, setOTPCheck] = useState(1234)
    const [forgotEmail, setForgotEmail] = useState("");
    const [verified, setVerified] = useState(false)
    const [newPassword, setNewPassword] = useState("")
    const [noEmail, setNoEmail] = useState("")
    const [hasBeenReset, setHasBeenReset] = useState("")
    const [noOTP, setNoOTP] = useState("")
    const [passError, setPassError] = useState("")
    const { login, isLoading, error } = useLogin();



  //login handler
  const handleSubmit = async (e) => {
    e.preventDefault();
   
  };

    const forgotEmailHandler = (e) => {

        setForgotEmail(e.target.value)
      }
    
      const navigateToOtp = async() => {

        const isValidEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
        

        if (forgotEmail) {

            if(!forgotEmail.match(isValidEmail)){
                setNoEmail('Please enter a valid email');
                return
              }else{


                const OTP = Math.floor(Math.random() * 9000 + 1000);
                setOTPCheck(OTP);
                setOTPCode(true)
                console.log(`sending POST to email server ${forgotEmail}`)
          
                const response = await fetch(
                  `https://flockrank.onrender.com/api/user/forgotpassword`,
                  {
                    method: "POST",
                    body: JSON.stringify({recipient_email: forgotEmail, OTP: OTP }),
                    headers: {
                      "Content-Type": "application/json",
                    }
                  }
                )
                  .then(() => setOTPCode(true))
                  .then(() => console.log(response))
                  .catch(console.log);
                return; 
                
              }

        } 
        setNoEmail('Please enter a valid email')
        return;
      }
    
      const verifyOTP = (e) => {
        e.preventDefault()
        if(OTPCheck === Math.floor(OTPData)){
          setVerified(true)
        }else{
         setNoOTP('One Time Password Incorrect!')
        }
      }
    
      const resetPassword = async(e) => {
        e.preventDefault()
        if(newPassword !== ""){
          const response = await fetch(
            `https://flockrank.onrender.com/api/user/updatepassword`,
            {
              method: "PATCH",
              body: JSON.stringify({email: forgotEmail, password: newPassword }),
              headers: {
                "Content-Type": "application/json",
              }
            }
          ).then((response) => console.log(response.error))
          .then(() => setHasBeenReset("Your Password Has Been Reset!"))


          


          return; 
        }
       
      
      return alert("Something went wrong");
      }

  return (
    
  <Box
      component="form"
      className="login"
      onSubmit={handleSubmit}
      sx={{ display: "flex", flexDirection: "column", width: "40dvw" }}
    >




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
        onClick={resetPassword}
        style={{ margin: "10px 0 10px 0", backgroundColor: "#c6c6c6" }}
      >
        Submit
      </Button>
      {hasBeenReset && <Typography sx={{ color: "#4BB543" }}>{hasBeenReset}</Typography>}
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
        type="button"
        onClick={verifyOTP}
        disabled={isLoading}
        style={{ margin: "10px 0 10px 0", backgroundColor: "#c6c6c6" }}
      >
        Verify Data
      </Button>
      {noOTP && <Typography sx={{ color: "#EE4B2B" }}>{noOTP}</Typography>}
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
        required
        variant="flat"
        placeholder="E-Mail"
        value={forgotEmail}
        onChange={(e) => forgotEmailHandler(e)}
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
      {noEmail && <Typography sx={{ color: "#EE4B2B" }}>{noEmail}</Typography>}
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
    
    </Box>
    
  )
}
