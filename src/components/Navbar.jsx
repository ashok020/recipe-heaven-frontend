import { useState, useContext, useEffect } from "react";
import { HiSearch, HiUserCircle } from "react-icons/hi";
import "./Navbar.css";
import { useNavigate } from "react-router-dom";
import UserIcon from "./UserIcon";
import Dropdown from "./Dropdown";
import { AppContext } from "../AppContext";
import { FaUser } from "react-icons/fa";
import { AiFillBook, AiFillFileAdd, AiFillLike } from "react-icons/ai";
import { IoLogOut } from "react-icons/io5";
import { RiAiGenerate } from "react-icons/ri";

import { SearchField } from "./SearchField";

const Navbar = ({ active, search: searchValue, handleSearch, updatePage }) => {
  const navigate = useNavigate();
  const { isAuthenticated, user, handleLogout } = useContext(AppContext);

  function handleProfile() {
    navigate("/profile");
  }
  function handleHome() {
    if (active == "home") updatePage();
    navigate("/home");
  }
  function handleMyRecipes() {
    navigate("/recipes/my");
  }
  function handleLikedRecipes() {
    navigate("/recipes/liked");
  }
  function handleGenerateRecipe() {
    navigate("/recipes/generate");
  }
  function handleCreateNewRecipe() {
    navigate("/recipes/create");
  }

  function handleLogoutNavbar() {
    handleLogout();
    navigate("/");
  }

  return (
    <nav className="navbar">
      <div className="logo" onClick={handleHome}>
        Recipe<span>Heaven</span>
      </div>
      {(active == "home" ||
        active == "my-recipes" ||
        active == "liked-recipes") && (
        <SearchField
          Icon={HiSearch}
          searchValue={searchValue}
          handleSearch={handleSearch}
          placeholder={"Search recipes..."}
        />
      )}
      <div className="nav-buttons item-center">
        <div
          className={`${active == "home" ? "btn-active" : "btn"}`}
          onClick={handleHome}
        >
          Home
        </div>

        {!isAuthenticated && (
          <div
            className={`${active == "login" ? "btn-active" : "btn"}`}
            onClick={() => navigate("/login")}
          >
            Login
          </div>
        )}
        {!isAuthenticated && (
          <div
            className={`${active == "register" ? "btn-active" : "btn"}`}
            onClick={() => navigate("/register")}
          >
            Signup
          </div>
        )}
      </div>
      {isAuthenticated && user && (
        <div className="user-nav">
          <Dropdown
            dropDownItems={[
              {
                label: "Profile",
                onClick: handleProfile,
                icon: FaUser,
                active: active == "profile",
              },
              isAuthenticated &&
                user && {
                  label: "New Recipe",
                  onClick: handleCreateNewRecipe,
                  icon: AiFillFileAdd,
                  active: active == "create-recipe",
                },
              isAuthenticated &&
                user && {
                  label: "My Recipes",
                  onClick: handleMyRecipes,
                  icon: AiFillBook,
                  active: active == "my-recipes",
                },
              isAuthenticated &&
                user && {
                  label: "Liked Recipes",
                  onClick: handleLikedRecipes,
                  icon: AiFillLike,
                  active: active == "liked-recipes",
                },
              isAuthenticated &&
                user && {
                  label: "Generate Recipe (AI)",
                  onClick: handleGenerateRecipe,
                  icon: RiAiGenerate,
                  active: active == "generate-recipe",
                },
              { label: "Logout", onClick: handleLogoutNavbar, icon: IoLogOut },
            ].filter(Boolean)}
            header={<UserIcon gender={user.gender} name={user.name} />}
            showIcon={true}
          />
        </div>
      )}
    </nav>
  );
};

export default Navbar;
