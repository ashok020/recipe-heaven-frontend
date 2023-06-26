import "./RecipeCard.css";
import UserIcon from "./UserIcon";
import {
  AiFillLike,
  AiOutlineLike,
  AiOutlineMessage,
  AiFillEdit,
  AiFillDelete,
} from "react-icons/ai";
import { PiDotsThreeCircleVertical } from "react-icons/pi";

import { useState, useContext } from "react";
import API from "../utils/api";
import { useNavigate } from "react-router-dom";
import Dropdown from "./Dropdown";
import { AppContext } from "../AppContext";
import { ImagePreview } from "./ImagePreview";
import { PopMessage } from "./PopMessage";

function RecipeCard({ recipe }) {
  const { user, isAuthenticated } = useContext(AppContext);
  const navigate = useNavigate();
  const [isLiked, setIsLiked] = useState(recipe.isLiked);
  const [likesCount, setLikesCount] = useState(recipe.likesCount);
  const [commentsCount, setCommentsCount] = useState(recipe.commentsCount);
  const [update, setUpdate] = useState(false);
  const [showPopMessage, setShowPopMessage] = useState(false);
  const popMessageTime = 1.5;
  const {
    recipeId: id,
    title,
    description,
    image,
    createdBy: { username, gender, name },
  } = recipe;

  function updatePage() {
    setUpdate(!update);
  }

  function handleLike() {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    setIsLiked(!isLiked);
    if (isLiked) {
      setLikesCount(likesCount - 1);
      API.delete(`/recipes/${id}/like`);
    } else {
      setLikesCount(likesCount + 1);
      API.post(`/recipes/${id}/like`);
    }
  }
  function handleComments() {
    navigate(`recipes/${id}#comments`);
  }

  async function handleDelete() {
    try {
      const res = await API.delete("/recipes/" + id);
      setShowPopMessage(!showPopMessage);
      setTimeout(() => {
        setShowPopMessage(!showPopMessage);
        navigate("/");
        window.location.reload();
      }, popMessageTime * 1000);
    } catch (err) {
      console.error(err);
    }
  }

  function handleEdit() {
    navigate("recipes/edit/" + id);
  }

  return (
    <div className="recipe-card" id={id}>
      {showPopMessage && (
        <PopMessage
          message="Recipe deleted successfully!"
          type="success"
          time={popMessageTime}
        />
      )}
      <div className="recipe-author">
        <div className="item-center">
          <UserIcon gender={gender} name={name} isSmall={true} />@{username}
        </div>
        {isAuthenticated && user && user.username == username && (
          <Dropdown
            dropDownItems={[
              { label: "Edit", icon: AiFillEdit, onClick: handleEdit },
              {
                label: "Delete",
                icon: AiFillDelete,
                onClick: handleDelete,
              },
            ]}
            header={<PiDotsThreeCircleVertical className="icon" />}
            showIcon={false}
          />
        )}
      </div>
      <div
        className="recipe-card-content"
        onClick={() => navigate(`recipes/${id}`)}
      >
        <h2 className="recipe-title">{title}</h2>
        <ImagePreview src={image} alt="recipe image" />
        <p className="recipe-description">{description.split(".")[0]}</p>
      </div>
      <div className="recipe-meta">
        <div
          className={`likes-wrap ${isLiked ? "liked" : ""}`}
          onClick={handleLike}
        >
          {isLiked ? (
            <AiFillLike className="icon" />
          ) : (
            <AiOutlineLike className="icon" />
          )}
          <p>{likesCount}</p>
        </div>
        <div className="comments-wrap" onClick={handleComments}>
          <AiOutlineMessage className="icon" />
          <p>{commentsCount}</p>
        </div>
      </div>
    </div>
  );
}

export default RecipeCard;
