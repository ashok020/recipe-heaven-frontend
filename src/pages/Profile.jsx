import { useContext } from "react";
import Navbar from "../components/Navbar";
import { AppContext } from "../AppContext";
import "./Profile.css";
import React, { useState } from "react";
import {
  AiFillBook,
  AiFillEdit,
  AiFillFileAdd,
  AiFillLike,
  AiTwotoneSave,
} from "react-icons/ai";
import { IoLogOut } from "react-icons/io5";
import { RiAiGenerate } from "react-icons/ri";
import UserIcon from "../components/UserIcon";
import API from "../utils/api";
import { useNavigate } from "react-router-dom";

function Profile() {
  const { isAuthenticated, user, handleUpdateUser, isLoading, setIsLoading } =
    useContext(AppContext);
  const navigate = useNavigate();
  const [isEditMode, setIsEditMode] = useState(false);
  const [name, setName] = useState(user.name);
  const [age, setAge] = useState(user.age || 0);
  const [gender, setGender] = useState(user.gender);
  const [nameError, setNameError] = useState("");

  const handleEditClick = () => {
    if (isEditMode) {
      setName(user.name);
      setAge(user.age);
      setGender(user.gender);
      setNameError("");
    }

    setIsEditMode(!isEditMode);
  };

  const handleSaveClick = async () => {
    if (name == "") {
      return;
    }
    try {
      const res = await API.put("/user", { name, gender, age });
      const userUpdated = user;
      userUpdated.name = name;
      userUpdated.gender = gender;
      userUpdated.age = age;
      handleUpdateUser(userUpdated);
      setIsEditMode(false);
    } catch (err) {
      handleEditClick();
    }
  };

  const handleGenderChange = (e) => {
    setGender(e.target.value);
  };

  const handleInputChange = (e) => {
    const { value } = e.target;
    setName(value);
    if (value == "") setNameError("Name cannot be empty");
    else setNameError("");
  };

  return (
    <div>
      <Navbar active={"profile"} />

      <div className="profile-container">
        <div className="edit-save-btn-div">
          {!isEditMode ? (
            <button className="profile-button" onClick={handleEditClick}>
              <AiFillEdit /> Edit
            </button>
          ) : (
            <>
              <button className="profile-button" onClick={handleEditClick}>
                Cancel
              </button>
              <button className="profile-button" onClick={handleSaveClick}>
                <AiTwotoneSave /> Save
              </button>
            </>
          )}
        </div>
        <div className="profile-info">
          <div className="profile-logo">
            <UserIcon gender={gender} name={name} />
          </div>
          <div className="profile-info-fields">
            <div className="profile-info-row">
              <p className="profile-info-label">Name:</p>
              {isEditMode ? (
                <input
                  type="text"
                  name="name"
                  value={name}
                  onChange={handleInputChange}
                  required
                />
              ) : (
                <p className="info-value">{name}</p>
              )}
            </div>

            <div className="profile-info-row">
              <p className="profile-info-label">Age:</p>
              {isEditMode ? (
                <input
                  type="number"
                  name="age"
                  value={age}
                  min={5}
                  max={120}
                  onChange={handleInputChange}
                />
              ) : (
                <p className="info-value">{age}</p>
              )}
            </div>
            <div className="profile-info-row">
              <p className="profile-info-label">Gender:</p>
              {isEditMode ? (
                <div className="gender-radio-group">
                  <label htmlFor="male">
                    <input
                      type="radio"
                      id="male"
                      name="gender"
                      value="male"
                      checked={gender === "male"}
                      onChange={handleGenderChange}
                    />
                    Male
                  </label>
                  <label htmlFor="female">
                    <input
                      type="radio"
                      id="female"
                      name="gender"
                      value="female"
                      checked={gender === "female"}
                      onChange={handleGenderChange}
                      required
                    />
                    Female
                  </label>
                </div>
              ) : (
                <p className="info-value">{gender}</p>
              )}
            </div>

            {nameError != "" && (
              <div className="profile-info-row error-field">
                <p className="error-message">{nameError}</p>{" "}
              </div>
            )}
          </div>
        </div>
        <div className="profile-buttons">
          <button
            className="profile-button"
            onClick={() => navigate("/recipes/create")}
          >
            <AiFillFileAdd /> <p>Post New Recipe</p>
          </button>
          <button
            className="profile-button"
            onClick={() => navigate("/recipes/generate")}
          >
            <RiAiGenerate /> <p>Generate Recipe (AI)</p>
          </button>
        </div>
        <div className="profile-buttons">
          <button
            className="profile-button"
            onClick={() => navigate("/recipes/liked")}
          >
            <AiFillLike /> <p>Liked Recipes</p>
            <div className="count-icon">{user.likedRecipesCount}</div>
          </button>
          <button
            className="profile-button"
            onClick={() => navigate("/recipes/my")}
          >
            <AiFillBook />
            <p>My Recipes</p>
            <div className="count-icon">{user.myRecipesCount}</div>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Profile;
