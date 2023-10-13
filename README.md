# Find a Meal
Welcome to my meal-finding app. The purpose of this app is to provide a user some inspiration for what food they want to eat based on a number of different parameters.

## Local Setup
First, clone the repository into a directory of your choice using `git clone`.
- Then, install dependencies using `npm install` in the root directory.
- Create an API Key, then create a `.env` fil in the root directory as so:
```
API_KEY=<your_api_key_combo>
```
- Test the connection to the API by running the development server using `npm run dev`. Click "Search Recipes" and query the word "Pizza" with no selections. 
- A successful connection is established if you get a result back with an array of cards on a carousel, followed by an image of the recipe, a description, and a link the the recipe itself.

## How to find a meal using the app

#### Using a general query
You are able to search recipes without any further filtering. All you have to do is go the the search bar where it says "Type in a food...", type in a type of food (ie: pasta), and hit "Done" at the bottom.

#### Using a filtered query
You can choose to enter in a type of food, or just search for recipes by simply checking off different parameters given to you in the menu. The API will select a number of foods based on the amount of filters you put on it. Careful to not make your search ultra-specific, or else an error message will show, encrouraging you to broaden your search.

## Welcome contributions and features

- **Search by ingredients**: there is an endpoint for this on the [Spoonacular documentation for searching by ingredients](https://spoonacular.com/food-api/docs#Search-Recipes-by-Ingredients) that somebody has suggested to me personally. I do not think it would be too hard to integrate.
- **Making grocery lists based off of recipes**: each recipe can theoretically be re-fed back into the API and a rough grocery list can be attained through this search. After a user is done selecting one or more recipes, it is possible to leverage the [OpenAI API](https://openai.com/blog/openai-api) to contruct a prompt that creates a composite grocery list that combines the ingredients of one through all of the recipes. can be exported as a .csv or .txt file.
- **Using a database to store favorite recipes and grocery lists**: So far, I have integrated [Prisma](https://www.prisma.io/) into the project to act as a connection to a PostgreSQL server. The end goal is to have user be able to save favorite recipes, grocery lists, and search history.