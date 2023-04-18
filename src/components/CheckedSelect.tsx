import React, { useState, useEffect } from 'react';

interface CheckedSelectProps {
    onSelectedValuesChanged: (values: {
        cuisines: string[];
        diets: string[];
        intolerances: string[];
        mealTypes: string[];
        maxReadyTime?: number;
        maxCalories?: number;
    }) => void;
}

const CheckedSelect: React.FC<CheckedSelectProps> = ({ onSelectedValuesChanged }) => {

    const [selectedCuisines, setSelectedCuisines] = useState<Record<string, boolean>>({});
    const [selectedDiets, setSelectedDiets] = useState<Record<string, boolean>>({});
    const [selectedIntolerances, setSelectedIntolerances] = useState<Record<string, boolean>>({});
    const [selectedMealTypes, setSelectedMealTypes] = useState<Record<string, boolean>>({});
    const [maxReadyTime, setMaxReadyTime] = useState<number>()
    const [isMaxReadyEnabled, setIsMaxReadyEnabled] = useState<boolean>(false);
    const [maxCalories, setmaxCalories] = useState<number>()
    const [isMaxCaloriesEnabled, setIsMaxCaloriesEnabled] = useState<boolean>(false);


    useEffect(() => {
        const reportSelectedValues = () => {
            onSelectedValuesChanged({
                cuisines: Object.keys(selectedCuisines).filter((key) => selectedCuisines[key]),
                diets: Object.keys(selectedDiets).filter((key) => selectedDiets[key]),
                intolerances: Object.keys(selectedIntolerances).filter((key) => selectedIntolerances[key]),
                mealTypes: Object.keys(selectedMealTypes).filter((key) => selectedMealTypes[key]),
                maxReadyTime: isMaxReadyEnabled ? maxReadyTime : undefined,
                maxCalories: isMaxCaloriesEnabled ? maxCalories : undefined,
            });
        };
        reportSelectedValues();
    }, [selectedCuisines, selectedDiets, selectedIntolerances, selectedMealTypes, isMaxReadyEnabled, maxReadyTime, isMaxCaloriesEnabled, maxCalories, onSelectedValuesChanged]);
    // For now, this works, but while dealing with this I saw a use case for useCallBack. I will have to look into that.


    const handleCuisines = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedCuisines((prevSelectedCuisines) => {
            const newSelectedCuisines = {
                ...prevSelectedCuisines,
                [event.target.value]: event.target.checked
            };
            return newSelectedCuisines;
        })

    };

    const handleDiets = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedDiets((prevSelectedDiets) => {
            const newSelectedDiets = {
                ...prevSelectedDiets,
                [event.target.value]: event.target.checked
            }
            return newSelectedDiets;
        });

    };

    const handleIntolerances = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedIntolerances((prevSelectedIntolerances) => {
            const newSelectedIntolerances = {
                ...prevSelectedIntolerances,
                [event.target.value]: event.target.checked
            }
            return newSelectedIntolerances;
        });

    };

    const handleMealTypes = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedMealTypes((prevSelectedMealTypes) => {
            const newSelectedMealTypes = {
                ...prevSelectedMealTypes,
                [event.target.value]: event.target.checked
            }
            return newSelectedMealTypes;
        });

    };

    const handleMaxReady = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.valueAsNumber;
        if(isNaN(value)) {
            setMaxReadyTime(undefined)
        }
        setMaxReadyTime(value);
    }

    const handleMaxReadyEnabler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIsMaxReadyEnabled(event.target.checked);
    };

    const handleMaxCalories = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.valueAsNumber;
        if(isNaN(value)) {
            setmaxCalories(undefined)
        }
        setmaxCalories(value);
    }

    const handleMaxCaloriesEnabler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIsMaxCaloriesEnabled(event.target.checked);
    };

    const cuisineOptions: { id: number, value: string, title: string }[] =
        [
            { id: 1, value: "african", title: "African" }, { id: 2, value: "american", title: "American" }, { id: 3, value: "british", title: "British" },
            { id: 4, value: "cajun", title: "Cajun" }, { id: 5, value: "caribbean", title: "Caribbean" }, { id: 6, value: "chinese", title: "Chinese" },
            { id: 7, value: "eastern%20european", title: "Eastern European" }, { id: 8, value: "european", title: "European" }, { id: 9, value: "french", title: "French" },
            { id: 10, value: "german", title: "German" }, { id: 11, value: "greek", title: "Greek" }, { id: 12, value: "indian", title: "Indian" },
            { id: 13, value: "irish", title: "Irish" }, { id: 14, value: "italian", title: "Italian" }, { id: 15, value: "japanese", title: "Japanese" },
            { id: 16, value: "jewish", title: "Jewish" }, { id: 17, value: "korean", title: "Korean" }, { id: 18, value: "latin%20american", title: "Latin American" },
            { id: 19, value: "mediterranean", title: "Mediterranean" }, { id: 20, value: "mexican", title: "Mexican" }, { id: 21, value: "middle%20eastern", title: "Middle Eastern" },
            { id: 22, value: "nordic", title: "Nordic" }, { id: 23, value: "southern", title: "Southern" }, { id: 24, value: "spanish", title: "Spanish" },
            { id: 25, value: "thai", title: "Thai" }, { id: 26, value: "vietnamese", title: "Vietnamese" },
        ]

    const dietOptions: { id: number, value: string, title: string }[] = [
        { id: 1, value: "gluten%20free", title: "Gluten-Free" }, { id: 2, value: "ketogenic", title: "Ketogenic" }, { id: 3, value: "vegetarian", title: "Vegetarian" },
        { id: 4, value: "lacto-vegetarian", title: "Lacto-Vegetarian" }, { id: 5, value: "ovo-vegetarian", title: "Ovo-Vegetarian" }, { id: 6, value: "vegan", title: "Vegan" },
        { id: 7, value: "pescatarian", title: "Pescetarian" }, { id: 8, value: "paleo", title: "Paleo" }, { id: 9, value: "primal", title: "Primal" },
        { id: 10, value: "low%20FODMAP", title: "Low FODMAP" }, { id: 11, value: "whole30", title: "Whole30" }
    ]

    const intoleranceOptions: { id: number, value: string, title: string }[] = [
        { id: 1, value: "dairy", title: "Dairy" }, { id: 2, value: "egg", title: "Egg" }, { id: 3, value: "gluten", title: "Gluten" },
        { id: 4, value: "grain", title: "Grain" }, { id: 5, value: "peanut", title: "Peanut" }, { id: 6, value: "seafood", title: "Seafood" },
        { id: 7, value: "sesame", title: "Sesame" }, { id: 8, value: "shellfish", title: "Shellfish" }, { id: 9, value: "soy", title: "Soy" },
        { id: 10, value: "sulfite", title: "Sulfite" }, { id: 11, value: "tree%20nut", title: "Tree Nut" }, { id: 12, value: "wheat", title: "Wheat" }
    ]

    const mealTypeOptions: { id: number, value: string, title: string }[] = [
        { id: 1, value: "main%20course", title: "Main Course" }, { id: 2, value: "side%20dish", title: "Side Dish" }, { id: 3, value: "dessert", title: "Dessert" },
        { id: 4, value: "appetizer", title: "Appetizer" }, { id: 5, value: "breakfast", title: "Breakfast" }, { id: 6, value: "fingerfood", title: "Fingerfood" },
        { id: 7, value: "snack", title: "Snack" },
    ]


    // need to check value inputs because I'm not sure about underscores, hyphens, or just whitespaces. Check before testing.
    return (
        <div className='bg-white px-8 py-6 rounded-lg shadow-md mx-4'>
            <div className='grid grid-cols-1 gap-2'>
                <h3 className='font-semibold text-lg'>Cuisines:</h3>
                <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4'>
                    {cuisineOptions.map((i) => (
                        <div key={i.id} className='flex items-center mb-2'>
                            <input
                                type="checkbox"
                                id={`cuisine-${i.value}`}
                                name="cuisines"
                                value={i.value}
                                checked={selectedCuisines[i.value] || false}
                                onChange={handleCuisines}
                                className='rounded'
                            />
                            <label htmlFor={`cuisine-${i.value}`} className='ml-2'>
                                {i.title}
                            </label>
                        </div>
                    ))}
                </div>

                <h3 className='font-semibold pt-4 text-lg'>Diet:</h3>
                <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4'>
                    {dietOptions.map((i) => (
                        <div key={i.id} className='flex items-center mb-2'>
                            <input
                                type="checkbox"
                                id={`diet-${i.value}`}
                                name="diets"
                                value={i.value}
                                checked={selectedDiets[i.value] || false}
                                onChange={handleDiets}
                                className='rounded'
                            />
                            <label htmlFor={`diet-${i.value}`} className='ml-2'>
                                {i.title}
                            </label>
                        </div>
                    ))}
                </div>

                <h3 className='font-semibold pt-4 text-lg'>Intolerances:</h3>
                <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4'>
                    {intoleranceOptions.map((i) => (
                        <div key={i.id} className='flex items-center mb-2'>
                            <input
                                type="checkbox"
                                id={`intolerance-${i.value}`}
                                name="intolerances"
                                value={i.value}
                                checked={selectedIntolerances[i.value] || false}
                                onChange={handleIntolerances}
                                className='rounded'
                            />
                            <label htmlFor={`intolerance-${i.value}`} className='ml-2'>{i.title}</label>
                        </div>
                    ))}
                </div>

                <h3 className='font-semibold pt-4 text-lg'>Meal Types:</h3>
                <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4'>
                    {mealTypeOptions.map((i) => (
                        <div key={i.id} className='flex items-center mb-2'>
                            <input
                                type="checkbox"
                                id={`mealType-${i.value}`}
                                name="mealTypes"
                                value={i.value}
                                checked={selectedMealTypes[i.value] || false}
                                onChange={handleMealTypes}
                                className='rounded'
                            />
                            <label htmlFor={`mealType-${i.value}`} className='ml-2'>
                                {i.title}
                            </label>
                        </div>
                    ))}
                </div>

                <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 pt-4'>
                    <div>
                        {/* spacer div */}
                    </div>
                    <div className='xl:col-start-2'>
                        <h3 className='font-semibold mb-2'>Maximum Preparation Time &#40;mins&#41;:</h3>
                        <input
                            type="checkbox"
                            id="enable_select"
                            name="toggle_select"
                            onChange={handleMaxReadyEnabler}
                        />
                        <input type="number" onChange={handleMaxReady} disabled={!isMaxReadyEnabled} className='ml-2 border-black border' />
                    </div>

                    <div className='xl:col-start-3'>
                        <h3 className='font-semibold mb-2'>Maximum Calories &#40;cals&#41;:</h3>
                        <input
                            type="checkbox"
                            id="enable_select"
                            name="toggle_select"
                            onChange={handleMaxCaloriesEnabler}
                        />
                        <input type="number" onChange={handleMaxCalories} disabled={!isMaxCaloriesEnabled} className='ml-2 border-black border' />
                    </div>
                </div>
                <div>
                    {/* spacer div */}
                </div>
            </div>
        </div >
    );
};

export default CheckedSelect;