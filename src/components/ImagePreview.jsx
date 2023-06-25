import "./ImagePreview.css";
import recipeImage from "../assets/recipe-book.png";
export function ImagePreview({ src, alt }) {
  if (!src || src == "") src = recipeImage;
  return (
    <div className="image-preview">
      <img className="image" src={src} alt={alt} />
    </div>
  );
}
