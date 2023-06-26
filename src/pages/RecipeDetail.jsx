import { useParams, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import API from "../utils/api";
import "./RecipeDetail.css";
import UserIcon from "../components/UserIcon";
import Navbar from "../components/Navbar";
import CommentSection from "../components/CommentSection";
import {
  AiOutlineLike,
  AiFillLike,
  AiOutlineMessage,
  AiFillEdit,
  AiFillDelete,
} from "react-icons/ai";
import { PiDotsThreeCircleVertical } from "react-icons/pi";
import { AppContext } from "../AppContext";
import RecipeDetailContent from "../components/RecipeDetailContent";
import Dropdown from "../components/Dropdown";
import { PopMessage } from "../components/PopMessage";

function RecipeDetail() {
  const { isAuthenticated, user, handleLogout } = useContext(AppContext);

  const { id } = useParams();
  const [recipe, setRecipe] = useState({});
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const [commentsCount, setCommentsCount] = useState(0);
  const [showPopMessage, setShowPopMessage] = useState(false);
  const navigate = useNavigate();
  const popMessageTime = 1.5;
  const [msg, setMsg] = useState("Fetching Recipe...");

  useEffect(() => {
    async function getRecipe() {
      try {
        const fetchedRecipe = await API.get("/recipes/" + id);
        setRecipe(fetchedRecipe);
        setIsLiked(fetchedRecipe.liked);
        setLikesCount(fetchedRecipe.likesCount);
        setCommentsCount(fetchedRecipe.commentsCount);
      } catch (err) {
        setMsg("Recipe not found");
      }
    }
    getRecipe();
  }, []);

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

  function updateCommentsCount(count) {
    setCommentsCount(count);
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
    navigate("/recipes/edit/" + id);
  }

  return (
    <>
      <Navbar active={"recipe"} />
      {!(recipe && Object.keys(recipe).length) && (
        <div className="recipe-detail">
          <div className="recipe-block recipe-title-header">
            <h2 className="recipe-title"> {msg} </h2>
          </div>
        </div>
      )}
      {recipe && Object.keys(recipe).length && (
        <>
          {showPopMessage && (
            <PopMessage
              message="Recipe deleted successfully!"
              type="success"
              time={popMessageTime}
            />
          )}
          <div className="recipe-details-div">
            <div className="recipe-author">
              <div className="item-center">
                <UserIcon
                  gender={recipe.createdBy.gender}
                  name={recipe.createdBy.name}
                />
              </div>{" "}
              @{recipe.createdBy.username}
              {isAuthenticated &&
                user &&
                user.username == recipe.createdBy.username && (
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
            <RecipeDetailContent recipe={recipe.recipe} />

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
              <div className="comments-wrap">
                <AiOutlineMessage className="icon" />
                <p>{commentsCount}</p>
              </div>
            </div>
            <CommentSection id={id} updateCommentsCount={updateCommentsCount} />
          </div>
        </>
      )}
    </>
  );
}

export default RecipeDetail;
