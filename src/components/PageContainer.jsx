import { useEffect, useState } from "react";
import API from "../utils/api";
import Recipes from "./Recipes";
import Navbar from "./Navbar";
import "./PageContainer.css";

function PageContainer({ active }) {
  const [recipes, setRecipes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const [update, setUpdate] = useState(false);
  const limit = 10;

  const [msg, setMsg] = useState("Fetching Recipes ...");

  useEffect(() => {
    async function getRecipes() {
      const query = `?${active === "my-recipes" ? "&my=true" : ""}${
        active === "liked-recipes" ? "&liked=true" : ""
      }&search=${search}&page=${currentPage}&limit=${limit}`;

      try {
        const fetchedRecipes = await API.get("/recipes" + query);
        if (fetchedRecipes.list.length === 0) {
          setMsg("No recipes found");
        }
        setRecipes(fetchedRecipes.list);
        setCurrentPage(parseInt(fetchedRecipes.currentPage));
        setTotalPages(parseInt(fetchedRecipes.totalPages));
      } catch (err) {
        setMsg("Error fetching recipes");
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
          msg={msg}
          currentPage={currentPage}
          totalPages={totalPages}
          handlePageChange={handlePageChange}
        />
      </div>
    </>
  );
}
export default PageContainer;
