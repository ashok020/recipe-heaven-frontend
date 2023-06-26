import { useEffect, useState } from "react";
import { CiTimer } from "react-icons/ci";
import { FaXmark, FaPlus } from "react-icons/fa6";
import { PiCookingPot } from "react-icons/pi";
import "./EditRecipe.css";
import { convertToBase64 } from "../utils/img";
import { ImagePreview } from "./ImagePreview";

function EditRecipe({ recipe, save, setSave, handleSave, setMessage }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [steps, setSteps] = useState([]);
  const [image, setImage] = useState("");
  const [time, setTime] = useState("");
  const [serves, setServes] = useState(1);
  const [isPublic, setIsPublic] = useState(true);

  const [newStep, setNewStep] = useState("");
  const [newIngredient, setNewIngredient] = useState("");

  useEffect(() => {
    if (!recipe) return;
    setTitle(recipe.title);
    setDescription(recipe.description);
    setIngredients(recipe.ingredients);
    setSteps(recipe.steps);
    setImage(recipe.image);
    setTime(recipe.time);
    setServes(recipe.serves);
    setIsPublic(recipe.isPublic);
  }, [recipe]);
  useEffect(() => {
    if (!save) return;
    setSave(false); // reset save
    const filteredIngredients = ingredients.filter((i) => i.trim() !== "");
    const filteredSteps = steps.filter((s) => s.trim() !== "");
    setIngredients(filteredIngredients);
    setSteps(filteredSteps);

    if (title.length > 30) {
      setMessage({ error: "Title should be shorter!" });
      return;
    } else if (title.length < 3) {
      setMessage({ error: "Title should be a little longer!" });
      return;
    }
    if (steps.length < 1) {
      setMessage({ error: "Add at least one step!" });
      return;
    }
    if (ingredients.length < 1) {
      setMessage({ error: "Add at least one ingredient!" });
      return;
    }
    const updatedRecipe = {
      title,
      description,
      ingredients: filteredIngredients,
      steps: filteredSteps,
      image,
      time,
      serves,
      isPublic,
    };

    handleSave(updatedRecipe);
  }, [save]);

  function handleIsPublicChange(e) {
    setIsPublic(e.target.value == "public");
  }

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleTimeChange = (e) => {
    setTime(e.target.value);
  };

  const handleServesChange = (e) => {
    if (e.target.value === "") {
      setServes(e.target.value);
      return;
    }
    var newValue = parseInt(e.target.value);
    newValue = Math.min(newValue, 10);
    newValue = Math.max(newValue, 1);
    setServes(newValue);
  };

  const handleAddStep = () => {
    if (newStep.trim() !== "") {
      setSteps([...steps, newStep]);
      setNewStep("");
    }
  };

  const handleAddIngredient = () => {
    if (newIngredient.trim() !== "") {
      setIngredients([...ingredients, newIngredient]);
      setNewIngredient("");
    }
  };

  const handleDeleteIngredient = (index) => {
    const updatedIngredients = [...ingredients];
    updatedIngredients.splice(index, 1);
    setIngredients(updatedIngredients);
  };

  const handleDeleteStep = (index) => {
    const updatedSteps = [...steps];
    updatedSteps.splice(index, 1);
    setSteps(updatedSteps);
  };

  const handleDeleteImage = () => {
    setImage("");
  };

  async function handleImageUpload(e) {
    const file = e.target.files[0];

    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/gif",
      "image/jpg",
      "image/webp",
    ];
    if (!allowedTypes.includes(file.type)) {
      setMessage({ error: "Invalid file type. Please upload an image." });
      return;
    }

    try {
      const base64 = await convertToBase64(file);
      setImage(base64);
      setMessage("Image upload success!");
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="recipe-detail recipe-edit">
      <div className="recipe-block recipe-title-header">
        <input
          type="text"
          className="recipe-title-edit recipe-title"
          value={title}
          onChange={handleTitleChange}
          placeholder="Enter recipe title"
        />
        <div className="item-center item-center-gap">
          <CiTimer className="icon" />
          Time:
          <input
            type="text"
            className="recipe-time"
            value={time}
            onChange={handleTimeChange}
          />
        </div>
        <div className="item-center item-center-gap">
          <PiCookingPot className="icon" />
          Serves:
          <input
            type="number"
            className="recipe-serves"
            value={serves}
            min="1"
            max="10"
            onChange={handleServesChange}
          />
        </div>
      </div>

      <div className="recipe-block">
        <ImagePreview src={image} alt="recipe image" />
        <div className="image-upload-group">
          <label className="file-label">
            <input
              className="file-input"
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
            />
          </label>
          <div className="btn delete-btn" onClick={() => handleDeleteImage()}>
            <FaXmark className="icon" />
          </div>
        </div>
      </div>

      <div className="recipe-block">
        <textarea
          className="recipe-description"
          value={description}
          onChange={handleDescriptionChange}
          placeholder="Enter recipe description"
        />
      </div>

      <div className="recipe-block">
        <h3>Ingredients</h3>
        <ul className="recipe-ing-edit recipe-ing-ul">
          {ingredients.map((ingredient, index) => (
            <li key={index}>
              <input
                type="text"
                value={ingredient}
                onChange={(e) => {
                  const updatedIngredients = [...ingredients];
                  updatedIngredients[index] = e.target.value;
                  setIngredients(updatedIngredients);
                }}
                placeholder="Add Ingredient"
              />
              <div
                className="btn delete-btn"
                onClick={() => handleDeleteIngredient(index)}
              >
                <FaXmark className="icon" />
              </div>
            </li>
          ))}
          <li>
            <div className="add-item-form">
              <input
                type="text"
                placeholder="Add Ingredient"
                value={newIngredient}
                onChange={(e) => setNewIngredient(e.target.value)}
              />
            </div>
            <div className="btn add-btn" onClick={handleAddIngredient}>
              <FaPlus className="icon" />
            </div>
          </li>
        </ul>
      </div>

      <div className="recipe-block">
        <h3>Steps</h3>
        <ul className="recipe-ing-edit">
          {steps.map((step, index) => (
            <li key={index}>
              <textarea
                type="text"
                value={step}
                onChange={(e) => {
                  const updatedSteps = [...steps];
                  updatedSteps[index] = e.target.value;
                  setSteps(updatedSteps);
                }}
                placeholder="Add Step"
              />
              <div
                className="btn delete-btn"
                onClick={() => handleDeleteStep(index)}
              >
                <FaXmark className="icon" />
              </div>
            </li>
          ))}
          <li>
            <div className="add-item-form">
              <textarea
                type="text"
                placeholder="Add Step"
                value={newStep}
                onChange={(e) => setNewStep(e.target.value)}
              />
            </div>
            <div className="btn add-btn" onClick={handleAddStep}>
              <FaPlus className="icon" />
            </div>
          </li>
        </ul>
      </div>
      <div className="recipe-block">
        <div className="form-group gender-radio-group">
          <label>Post as : </label>
          <div className="gender-radio-group">
            <label htmlFor="male">
              <input
                type="radio"
                id="public"
                name="isPublic"
                value="public"
                checked={isPublic}
                onChange={handleIsPublicChange}
              />
              Public
            </label>
            <label htmlFor="female">
              <input
                type="radio"
                id="female"
                name="gender"
                value="female"
                checked={!isPublic}
                onChange={handleIsPublicChange}
                required
              />
              Private
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditRecipe;
