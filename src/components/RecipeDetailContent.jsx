import { CiTimer } from "react-icons/ci";
import { ImagePreview } from "./ImagePreview";
import { PiCookingPot } from "react-icons/pi";
function RecipeDetailContent({ recipe }) {
  return (
    <div className="recipe-detail">
      <div className="recipe-block recipe-title-header">
        <h2 className="recipe-title">{recipe.title}</h2>
        {recipe.time && recipe.time != "" && (
          <div className="item-center-gap">
            <CiTimer className="icon" />
            {recipe.time}
          </div>
        )}
        {recipe.serves && recipe.serves != "" && (
          <div className="item-center-gap">
            <PiCookingPot className="icon" />
            {recipe.serves} serves
          </div>
        )}
      </div>
      <div className="recipe-block">
        <ImagePreview src={recipe.image} alt="recipe image" />
      </div>
      {recipe.description && recipe.description != "" && (
        <div className="recipe-block">
          <p className="recipe-description">{recipe.description}</p>
        </div>
      )}
      <div className="recipe-block">
        <h3>Ingredients</h3>
        <ul className="recipe-ing recipe-ing-ul">
          {recipe.ingredients.map((ingredient, i) => (
            <li key={i}>{ingredient}</li>
          ))}
        </ul>
      </div>
      <div className="recipe-block">
        <h3>Steps</h3>
        <ul className="recipe-ing">
          {recipe.steps.map((step, i) => (
            <li key={i}>{step}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default RecipeDetailContent;
