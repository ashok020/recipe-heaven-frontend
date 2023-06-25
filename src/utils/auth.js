import API from "./api";
import { AppContext } from "../AppContext";
import { useContext } from "react";
async function checkAuthorization() {
  const { isLoading, setIsLoading } = useContext(AppContext);
  try {
    setIsLoading(!isLoading);
    const response = await API.get("/auth-check");
    setIsLoading(!isLoading);
    return response.ok == true;
  } catch (error) {
    console.log("Error occurred during authentication check:", error);
    return false;
  }
}

export default checkAuthorization;
