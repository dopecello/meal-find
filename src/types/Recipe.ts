interface Recipe {
  aggregateLikes?: number;
  cheap?: boolean;
  cuisines?: string[];
  dairyFree?: boolean;
  diets?: string[];
  dishTypes?: string[];
  glutenFree?: boolean;
  id: number;
  image?: string;
  lowFodmap?: boolean;
  readyInMinutes?: number;
  servings?: number;
  sourceUrl: string;
  summary: string;
  title: string;
  vegan?: boolean;
  vegetarian?: boolean;
  veryHealthy?: boolean;
}

interface ComplexSearch {
  results: Recipe[];
  totalResults: number;
}
