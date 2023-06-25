import { useState, useEffect, useContext } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Home from "./pages/Home";
import LikedRecipes from "./pages/LikedRecipes";
import MyRecipes from "./pages/MyRecipes";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import { AppContext } from "./AppContext";
import RecipeDetail from "./pages/RecipeDetail";
import "./App.css";
import GenerateRecipe from "./pages/GenerateRecipe";
import CreateRecipe from "./pages/CreateRecipe";
import EditRecipePage from "./pages/EditRecipePage";

function App() {
  const { isAuthenticated, isLoading, setIsLoading, user } =
    useContext(AppContext);

  const [isAppLoading, setIsAppLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsAppLoading(isLoading);
    }, 1000);
    return () => clearTimeout(timeout);
  }, [isLoading]);

  return (
    <div className="App">
      {isAppLoading && (
        <div className="loading-screen">
          <div className="spinner" />
        </div>
      )}
      <Router>
        <Routes>
          <Route
            path="/login"
            element={isAuthenticated ? <Navigate to="/" /> : <Login />}
          />
          <Route
            path="/register"
            element={isAuthenticated ? <Navigate to="/" /> : <Register />}
          />
          {isAuthenticated && user && (
            <>
              <Route path="/profile" element={<Profile />} />
              <Route path="/recipes/my" element={<MyRecipes />} />
              <Route path="/recipes/liked" element={<LikedRecipes />} />
              <Route path="/recipes/generate" element={<GenerateRecipe />} />
              <Route path="/recipes/create" element={<CreateRecipe />} />
              <Route path="/recipes/edit/:id" element={<EditRecipePage />} />
            </>
          )}
          <Route path="/recipes/:id" element={<RecipeDetail />} />
          <Route path="/" element={<Home />} />
          {/* default route if nothing m {(isAuthenticated) => (atches */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

/*
v6 proteccted route -> 

 <Route element={<ProtectedRoute/>}>
          <Route path='/home' element={<Home/>}/>
  </Route>
*/
