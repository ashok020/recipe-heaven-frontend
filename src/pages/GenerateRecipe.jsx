import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import "./GenerateRecipe.css";
import { AppContext } from "../AppContext";
import API from "../utils/api";
import { SearchField } from "../components/SearchField";
import { RiAiGenerate } from "react-icons/ri";
import RecipeDetailContent from "../components/RecipeDetailContent";

function GenerateRecipe() {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useContext(AppContext);
  const [recipe, setRecipe] = useState(null);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  async function handleGenerate(query) {
    console.log("generating for query: ", query);
    try {
      const encodedQuery = encodeURIComponent(query);
      setIsLoading(true);
      const res = await API.get(`/recipes/generate?keywords=${encodedQuery}`);
      setIsLoading(false);
      if (res.found) {
        setMessage("Recipe Generated Successfully");
        setError("");
        showRecipe(res.content);
      } else {
        setError(res.content);
        setMessage("");
      }
    } catch (err) {
      setIsLoading(false);
      setError(
        "There was some error in generating the recipe, please try again"
      );
      setMessage("");
    } finally {
      setIsLoading(false);
    }
  }

  function showRecipe(recipe) {
    console.log(recipe);
    setRecipe(recipe);
  }

  function saveRecipe() {
    if (!isAuthenticated) {
      setError("Please login to save the recipe");
      return;
    }
    navigate("/recipes/create", { state: recipe });
  }

  return (
    <>
      <Navbar active={"generate-recipe"} />
      <div className="generate-container">
        {isLoading && (
          <div className="loading-screen">
            <div className="spinner" />
          </div>
        )}
        <h1>Generate Recipe using AI</h1>
        <SearchField
          placeholder={"Enter Ingredients or Dish"}
          searchValue={"Methi Paneer"}
          handleSearch={handleGenerate}
          Icon={RiAiGenerate}
        />
        {(message !== "" || error !== "") && (
          <div className={`message ${error ? "error" : ""}`}>
            {error ? error : message}
          </div>
        )}
        {recipe && (
          <>
            <RecipeDetailContent recipe={recipe} />
            <div className="save-btn btn" onClick={saveRecipe}>
              Save
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default GenerateRecipe;
