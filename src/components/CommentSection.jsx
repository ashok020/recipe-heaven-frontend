import "./CommentSection.css";
import UserIcon from "./UserIcon";
import { AiOutlineSend, AiOutlineDelete } from "react-icons/ai";
import { HiArrowCircleLeft, HiArrowCircleRight } from "react-icons/hi";
import { useEffect, useContext, useState } from "react";
import API from "../utils/api";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../AppContext";
import { SearchField } from "./SearchField";

export default function CommentSection({ id, updateCommentsCount }) {
  const { user, isAuthenticated } = useContext(AppContext);
  const navigate = useNavigate();
  const [comments, setComments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [commentText, setCommentText] = useState("");
  const limit = 10;

  async function getComments() {
    const fetchedComments = await API.get(
      `/recipes/${id}/comments/?page=${currentPage}&limit=${limit}`
    );
    setComments(fetchedComments.list);
    setCurrentPage(parseInt(fetchedComments.currentPage));
    setTotalPages(parseInt(fetchedComments.totalPages));
    updateCommentsCount(fetchedComments.totalComments);
  }

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
    if (currentPage < 1 && totalPages > 0) {
      setCurrentPage(1);
    }
  });

  useEffect(() => {
    getComments();
  }, [currentPage]);

  async function handlePageChange(page) {
    setCurrentPage(parseInt(page));
  }
  function handleDelete(recipeId, id) {
    API.delete(`/recipes/${recipeId}/comment/${id}`);
    getComments();
  }

  function handleComment(comment) {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
    API.post(`/recipes/${id}/comment`, { text: comment });
    getComments();
  }
  function Comment({ recipeId, commentId: id, text, user: commentUser }) {
    return (
      <div
        className={`comment ${
          user && commentUser.username == user.username
            ? "user-comment"
            : "other-comment"
        }`}
      >
        <div className="comment-user">
          <UserIcon
            name={commentUser.name}
            gender={commentUser.gender}
            isSmall={false}
          />
          <p>{commentUser.username}</p>
        </div>
        <div className="comment-text">
          <p>{text}</p>
        </div>
        {user && commentUser.username == user.username && (
          <div
            className="comment-delete"
            onClick={() => handleDelete(recipeId, id)}
          >
            <AiOutlineDelete className="icon" />
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="comment-section" id="comments">
      <div className="comment-section-header">
        <h2>Comments</h2>
      </div>
      <div className="comment-section-content">
        <SearchField
          Icon={AiOutlineSend}
          searchValue={commentText}
          handleSearch={handleComment}
          placeholder={"Write your thoughts"}
        />
        {comments.map((comment) => (
          <Comment key={comment.commentId} recipeId={id} {...comment} />
        ))}
      </div>
      {comments.length > 0 && (
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
      )}
      {comments.length <= 0 && (
        <div className="pagination">
          <div className="pagination-button btn disabled no-comment">
            Be first to comment on this recipe!
          </div>
        </div>
      )}
    </div>
  );
}
