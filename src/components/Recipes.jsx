import RecipeCard from "./RecipeCard";
import { HiArrowCircleLeft, HiArrowCircleRight } from "react-icons/hi";

import "./Recipes.css";

function Recipes({ recipes, currentPage, totalPages, handlePageChange }) {
  if (currentPage > totalPages) currentPage = totalPages;
  return (
    <div className="recipes-container">
      <div className="recipe-list" key="recipe-list">
        {recipes.length === 0 ? (
          <h2>No Recipes ...</h2>
        ) : (
          recipes.map((recipe) => (
            <RecipeCard recipe={recipe} key={recipe.recipeId} />
          ))
        )}
      </div>
      <div className="pagination">
        {totalPages > 0 && (
          <div
            className={`pagination-button btn ${
              currentPage > 1 ? "active" : "disabled"
            }`}
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage <= 1}
          >
            <HiArrowCircleLeft className="icon" />
          </div>
        )}
        {currentPage} / {totalPages}
        {totalPages > 0 && (
          <div
            className={`pagination-button btn ${
              currentPage < totalPages ? "active" : "disabled"
            }`}
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage >= totalPages}
          >
            <HiArrowCircleRight className="icon" />
          </div>
        )}
      </div>
    </div>
  );
}

export default Recipes;
