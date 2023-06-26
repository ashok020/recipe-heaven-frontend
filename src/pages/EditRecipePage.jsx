import { useContext, useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import "./EditRecipePage.css";
import { AppContext } from "../AppContext";
import { useNavigate, useParams } from "react-router-dom";
import EditRecipe from "../components/EditRecipe";
import API from "../utils/api";

function EditRecipePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useContext(AppContext);
  const [recipe, setRecipe] = useState(null);
  const [save, setSave] = useState(false);

  const [message, setMessage] = useState("");
  const [msg, setMsg] = useState("Fetching Recipe details...");

  useEffect(() => {
    if (!id) return;
    async function getRecipe() {
      try {
        const fetchedRecipe = await API.get("/recipes/" + id);
        setRecipe(fetchedRecipe.recipe);
      } catch (err) {
        setMessage({ error: "Error fetching recipe" });
        setMsg("Recipe not found");
      }
    }
    getRecipe();
  }, []);

  function handleDiscard() {
    navigate(-1);
  }
  async function handleSave(recipe) {
    try {
      const res = await API.put("/recipes/" + id, recipe);
      setMessage("Saved successfully");
      setTimeout(() => {
        navigate("/recipes/" + id);
      }, 2000);
    } catch (err) {
      setMessage({ error: "Error saving recipe" });
    }
  }

  function saveRecipe() {
    setSave(true);
  }

  return (
    <>
      <Navbar active={"edit-recipe"} />
      <div className="recipe-edit-container">
        <div className="edit-save-btn-div ">
          <button onClick={handleDiscard}>Discard</button>
          <button onClick={saveRecipe}>Save</button>
        </div>

        {message && (message.error || message != "") && (
          <div className={`message ${message.error ? "error" : ""}`}>
            {message.error ? message.error : message}
          </div>
        )}

        {recipe && Object.keys(recipe).length && (
          <EditRecipe
            recipe={recipe}
            save={save}
            handleSave={handleSave}
            setMessage={setMessage}
            setSave={setSave}
          />
        )}
        {!recipe && <h2>{msg}</h2>}
      </div>
    </>
  );
}

export default EditRecipePage;
