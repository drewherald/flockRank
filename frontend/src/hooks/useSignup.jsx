import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { setState } = useAuthContext();

  //signup function
  const signup = async (email, userName, password) => {
    setIsLoading(true);
    setError(null);

    const response = await fetch(
      "https://flockrank.onrender.com/api/user/signup",
      {
        method: "POST",
        body: JSON.stringify({ email, userName, password }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const userJson = await response.json();

    if (!response.ok) {
      setIsLoading(false);
      setError(userJson.error);
      console.log(response);
    }
    if (response.ok) {
      //save user
      localStorage.setItem("user", JSON.stringify(userJson));

      //update authContext
      setState({ type: "LOGIN", payload: userJson });

      setIsLoading(false);
      console.log("new user added");
    }
  };

  return { signup, isLoading, error };
};
