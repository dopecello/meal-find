import { NextApiRequest, NextApiResponse } from 'next';
import axios, { AxiosResponse } from 'axios';


const recipeResponseHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    query,
    maxReadyTime,
    maxCalories,
    cuisines,
    diets,
    intolerances,
    mealTypes,
  } = req.query;

  let apiEndpoint = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.API_KEY}&instructionsRequired=true&addRecipeInformation=true&number=6`;

  apiEndpoint += `&query=${query || ''}`;
  if (maxReadyTime) apiEndpoint += `&maxReadyTime=${maxReadyTime}`;
  if (maxCalories) apiEndpoint += `&maxCalories=${maxCalories}`;
  if (cuisines) apiEndpoint += `&cuisine=${cuisines}`;
  if (diets) apiEndpoint += `&diet=${diets}`;
  if (intolerances) apiEndpoint += `&intolerances=${intolerances}`;
  if (mealTypes) apiEndpoint += `&type=${mealTypes}`;

  try {
    const response: AxiosResponse<ComplexSearch> = await axios.get(apiEndpoint);
    console.log(apiEndpoint)
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch recipes' });
  }
};

export default recipeResponseHandler;