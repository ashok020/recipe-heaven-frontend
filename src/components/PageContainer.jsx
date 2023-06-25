import { useEffect, useState, useContext } from "react";
import API from "../utils/api";
import Recipes from "./Recipes";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";
import "./PageContainer.css";
import { AppContext } from "../AppContext";

function PageContainer({ active }) {
  const { user, isAuthenticated, setIsLoading, isLoading } =
    useContext(AppContext);
  const [recipes, setRecipes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const [update, setUpdate] = useState(false);
  const limit = 10;

  useEffect(() => {
    async function getRecipes() {
      const query = `?${active === "my-recipes" ? "&my=true" : ""}${
        active === "liked-recipes" ? "&liked=true" : ""
      }&search=${search}&page=${currentPage}&limit=${limit}`;

      try {
        setIsLoading(true);
        const fetchedRecipes = await API.get("/recipes" + query);
        setIsLoading(false);
        setRecipes(fetchedRecipes.list);
        setCurrentPage(parseInt(fetchedRecipes.currentPage));
        setTotalPages(parseInt(fetchedRecipes.totalPages));
      } catch (err) {
        setIsLoading(false);
        console.log(err);
      }
    }
    getRecipes();
  }, [search, currentPage, update]);

  async function handleSearch(text) {
    setSearch(text);
  }
  async function handlePageChange(page) {
    setCurrentPage(parseInt(page));
  }

  function updatePage() {
    setUpdate(!update);
  }

  return (
    <>
      <Navbar
        active={active}
        search={search}
        handleSearch={handleSearch}
        updatePage={updatePage}
      />
      <div className="page">
        <Recipes
          recipes={recipes}
          currentPage={currentPage}
          totalPages={totalPages}
          handlePageChange={handlePageChange}
        />
      </div>
    </>
  );
}
export default PageContainer;
