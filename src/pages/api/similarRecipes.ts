import axios, { AxiosResponse } from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';

const searchSimilarHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  const { id } = req.query;
  let apiEndpoint = `https://api.spoonacular.com/recipes/${id}/similar?apiKey=${process.env.API_KEY}&number=100`;
  try {
    const response: AxiosResponse<ComplexSearch> = await axios.get(apiEndpoint);
    res.status(200).json(response.data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch recipes' });
  }
};

export default searchSimilarHandler;