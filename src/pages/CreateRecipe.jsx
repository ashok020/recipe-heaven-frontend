import { useContext, useState } from "react";
import Navbar from "../components/Navbar";
import "./CreateRecipe.css";
import { AppContext } from "../AppContext";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import EditRecipe from "../components/EditRecipe";
import API from "../utils/api";

function CreateRecipe() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, user } = useContext(AppContext);
  const [recipe, setRecipe] = useState(location.state || null);
  const [save, setSave] = useState(false);

  const [message, setMessage] = useState(
    location.state
      ? "Imported AI generated recipe edit according to your needs"
      : ""
  );

  function handleDiscard() {
    navigate(-1);
  }
  async function handleSave(recipe) {
    try {
      const res = await API.post("/recipes", recipe);
      setMessage("Saved successfully");

      setTimeout(() => {
        navigate("/recipes/" + res.id);
      }, 2000);
    } catch (err) {
      console.log(err);
      setMessage({ error: "Error saving recipe" });
    }
  }
  console.log(save);

  function saveRecipe() {
    setSave(true);
  }

  return (
    <>
      <Navbar active={"create-recipe"} />
      <div className="recipe-edit-container">
        <h3>Create a Awosome Recipe</h3>
        <div className="edit-save-btn-div ">
          <button onClick={handleDiscard}>Discard</button>
          <button onClick={saveRecipe}>Save</button>
        </div>
        {message && (message.error || message != "") && (
          <div className={`message ${message.error ? "error" : ""}`}>
            {message.error ? message.error : message}
          </div>
        )}
        <EditRecipe
          recipe={recipe}
          save={save}
          handleSave={handleSave}
          setMessage={setMessage}
          setSave={setSave}
        />
      </div>
    </>
  );
}

export default CreateRecipe;
