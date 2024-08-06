import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const { setState } = useAuthContext();

  //login function
  const login = async (email, password) => {
    setIsLoading(true);
    setError(null);

    const response = await fetch(
      "https://flockrank.onrender.com/api/user/login",
      {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const userJson = await response.json();

    if (!response.ok) {
      setIsLoading(false);
      setError(userJson.error);
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

  return { login, isLoading, error };
};
