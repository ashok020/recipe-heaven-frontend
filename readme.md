# Recipe Heaven Webapp Frontend

This is the frontend implementation of the Recipe Heaven web application. It provides web interface fot user authentication, user registration, fetching recipe data,editing and saving user-created recipes, and generating recipes using Chat GPT.

Created for Ecowiser FSD Task.

### [Live Deployed Link](https://rainbow-brigadeiros-7f3100.netlify.app/)

### [Backend Repo Link](https://github.com/ashok020/recipe-heaven-backend)

### [Backend Deployed Link](https://breakable-plum-dalmatian.cyclic.app)

## My Process

- Designed the basic plan of how my folder structure will look and what necessary files should be in React.

Defined Folder Structure:

- `components/`: Reusable componets like : NavBar, DropDown, Comment Section,Search Field,UserIcon etc
- `pages/`: Store all website pages for react router like : Login,Register,EditRecipePage,RecipeDetails,Home,MyRecipes,GenerateRecipes,Profile,LikedRecipes,
- `utils/`: Some utilty js files like API (Axios instance with header with bearear token set), ImageToBase64, etc

## Features

- User SignUp / SingIn
- save user using `JWT tokens` and `localStarage`
- Create New Recipe
- Generate recipe with ingredients or recipe title Using `Chat GPT`
- Edit, Delete Recipes
- Search Recipes
- Like and comments on a recipes
- Post Recipes as Publicly or Privately
- User Info Updatation

## Tech Stack

- JavaScript
- React JS
- React Router
- Context API and hooks
- Vite
- Axios

## Screenshots

- Home Page

- ![Screenshot](https://github.com/ashok020/recipe-heaven-frontend/blob/main/screenshots/home%20page.png?raw=true)

- Recipe Generate using Chat GPT

- ![Screenshot](https://github.com/ashok020/recipe-heaven-frontend/blob/main/screenshots/generate.png?raw=true)

- Recipe Search

- ![Screenshot](https://github.com/ashok020/recipe-heaven-frontend/blob/main/screenshots/search.png)

- Recipe Edit

- ![Screenshot](https://github.com/ashok020/recipe-heaven-frontend/blob/main/screenshots/edit2.png?raw=true)

- Recipe View

- ![Screenshot](https://github.com/ashok020/recipe-heaven-frontend/blob/main/screenshots/view.png?raw=true)

-Profile Page

- ![Screenshot](https://github.com/ashok020/recipe-heaven-frontend/blob/main/screenshots/profile.png)
