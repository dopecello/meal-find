import React, { useState } from 'react';

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

    const handleCuisines = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedCuisines((prevSelectedCuisines) => {
            const newSelectedCuisines = {
                ...prevSelectedCuisines,
                [event.target.value]: event.target.checked
            };
            return newSelectedCuisines;
        })
        reportSelectedValues();
    };


    const handleDiets = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedDiets((prevSelectedDiets) => {
            const newSelectedDiets = {
                ...prevSelectedDiets,
                [event.target.value]: event.target.checked
            }
            return newSelectedDiets;
        });
        reportSelectedValues();
    };

    const handleIntolerances = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedIntolerances((prevSelectedIntolerances) => {
            const newSelectedIntolerances = {
                ...prevSelectedIntolerances,
                [event.target.value]: event.target.checked
            }
            return newSelectedIntolerances;
        });
        reportSelectedValues();
    };

    const handleMealTypes = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedMealTypes((prevSelectedMealTypes) => {
            const newSelectedMealTypes = {
                ...prevSelectedMealTypes,
                [event.target.value]: event.target.checked
            }
            return newSelectedMealTypes;
        });
        reportSelectedValues();
    };

    const handleMaxReady = (event: React.ChangeEvent<HTMLInputElement>) => {
        setMaxReadyTime(event.target.valueAsNumber);
        setTimeout(() => {  // This is a hack to make sure the state is updated before the reportSelectedValues is called
            reportSelectedValues();
        }, 0);
    }

    const handleMaxReadyEnabler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIsMaxReadyEnabled(event.target.checked);
        setTimeout(() => {
            reportSelectedValues();
        }, 0);
    };

    const handleMaxCalories = (event: React.ChangeEvent<HTMLInputElement>) => {
        setmaxCalories(event.target.valueAsNumber);
        setTimeout(() => {
            reportSelectedValues();
        }, 0);
    }

    const handleMaxCaloriesEnabler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIsMaxCaloriesEnabled(event.target.checked);
        setTimeout(() => {
            reportSelectedValues();
        }, 0);
    };

    const cuisineOptions: { id: number, value: string, title: string }[] =
        [
            { id: 1, value: "african", title: "African" }, { id: 2, value: "american", title: "American" }, { id: 3, value: "british", title: "British" },
            { id: 4, value: "cajun", title: "Cajun" }, { id: 5, value: "caribbean", title: "Caribbean" }, { id: 6, value: "chinese", title: "Chinese" },
            { id: 7, value: "eastern european", title: "Eastern European" }, { id: 8, value: "european", title: "European" }, { id: 9, value: "french", title: "French" },
            { id: 10, value: "german", title: "German" }, { id: 11, value: "greek", title: "Greek" }, { id: 12, value: "indian", title: "Indian" },
            { id: 13, value: "irish", title: "Irish" }, { id: 14, value: "italian", title: "Italian" }, { id: 15, value: "japanese", title: "Japanese" },
            { id: 16, value: "jewish", title: "Jewish" }, { id: 17, value: "korean", title: "Korean" }, { id: 18, value: "latin american", title: "Latin American" },
            { id: 19, value: "mediterranean", title: "Mediterranean" }, { id: 20, value: "mexican", title: "Mexican" }, { id: 21, value: "middle eastern", title: "Middle Eastern" },
            { id: 22, value: "nordic", title: "Nordic" }, { id: 23, value: "southern", title: "Southern" }, { id: 24, value: "spanish", title: "Spanish" },
            { id: 25, value: "thai", title: "Thai" }, { id: 26, value: "vietnamese", title: "Vietnamese" },
        ]

    const dietOptions: { id: number, value: string, title: string }[] = [
        { id: 1, value: "gluten free", title: "Gluten-Free" }, { id: 2, value: "ketogenic", title: "Ketogenic" }, { id: 3, value: "vegetarian", title: "Vegetarian" },
        { id: 4, value: "lacto-vegetarian", title: "Lacto-Vegetarian" }, { id: 5, value: "ovo-vegetarian", title: "Ovo-Vegetarian" }, { id: 6, value: "vegan", title: "Vegan" },
        { id: 7, value: "pescatarian", title: "Pescetarian" }, { id: 8, value: "paleo", title: "Paleo" }, { id: 9, value: "primal", title: "Primal" },
        { id: 10, value: "low FODMAP", title: "Low FODMAP" }, { id: 11, value: "whole30", title: "Whole30" }
    ]

    const intoleranceOptions: { id: number, value: string, title: string }[] = [
        { id: 1, value: "dairy", title: "Dairy" }, { id: 2, value: "egg", title: "Egg" }, { id: 3, value: "gluten", title: "Gluten" },
        { id: 4, value: "grain", title: "Grain" }, { id: 5, value: "peanut", title: "Peanut" }, { id: 6, value: "seafood", title: "Seafood" },
        { id: 7, value: "sesame", title: "Sesame" }, { id: 8, value: "shellfish", title: "Shellfish" }, { id: 9, value: "soy", title: "Soy" },
        { id: 10, value: "sulfite", title: "Sulfite" }, { id: 11, value: "tree nut", title: "Tree Nut" }, { id: 12, value: "wheat", title: "Wheat" }
    ]

    const mealTypeOptions: { id: number, value: string, title: string }[] = [
        { id: 1, value: "main course", title: "Main Course" }, { id: 2, value: "side dish", title: "Side Dish" }, { id: 3, value: "dessert", title: "Dessert" },
        { id: 4, value: "appetizer", title: "Appetizer" }, { id: 5, value: "breakfast", title: "Breakfast" }, { id: 6, value: "fingerfood", title: "Fingerfood" },
        { id: 7, value: "snack", title: "Snack" },
    ]


    // need to check value inputs because I'm not sure about underscores, hyphens, or just whitespaces. Check before testing.
    return (
        <div>
            <h3>Check the checkbox to activate different parameters on your search result!</h3>
            <div>
                <h3>Cuisine:</h3>
                {cuisineOptions.map((i) => (
                    <span key={i.id}>
                        <input
                            type="checkbox"
                            id={`cuisine-${i.value}`}
                            name="cuisines"
                            value={i.value}
                            checked={selectedCuisines[i.value] || false}
                            onChange={handleCuisines}
                        />
                        <label htmlFor={`cuisine-${i.value}`}>{i.title}</label>
                    </span>
                ))}
            </div>
            <div>
                <h3>Diet:</h3>
                {dietOptions.map((i) => (
                    <span key={i.id}>
                        <input
                            type="checkbox"
                            id={`diet-${i.value}`}
                            name="diets"
                            value={i.value}
                            checked={selectedDiets[i.value] || false}
                            onChange={handleDiets}
                        />
                        <label htmlFor={`diet-${i.value}`}>{i.title}</label>
                    </span>
                ))}
            </div>
            <div>
                <h3>Intolerances:</h3>
                {intoleranceOptions.map((i) => (
                    <span key={i.id}>
                        <input
                            type="checkbox"
                            id={`intolerance-${i.value}`}
                            name="intolerances"
                            value={i.value}
                            checked={selectedIntolerances[i.value] || false}
                            onChange={handleIntolerances}
                        />
                        <label htmlFor={`intolerance-${i.value}`}>{i.title}</label>
                    </span>
                ))}
            </div>
            <div>
                <h3>Meal Types:</h3>
                {mealTypeOptions.map((i) => (
                    <span key={i.id}>
                        <input
                            type="checkbox"
                            id={`mealType-${i.value}`}
                            name="mealTypes"
                            value={i.value}
                            checked={selectedMealTypes[i.value] || false}
                            onChange={handleMealTypes}
                        />
                        <label htmlFor={`mealType-${i.value}`}>{i.title}</label>
                    </span>
                ))}
            </div>
            <div>
                <h3>Maximum Preparation Time &#40;mins&#41;:</h3>
                <input type="number" onChange={handleMaxReady} disabled={!isMaxReadyEnabled} />
                <input
                    type="checkbox"
                    id="enable_select"
                    name="toggle_select"
                    onChange={handleMaxReadyEnabler}
                />
            </div>
            <div>
                <h3>Maximum Calories &#40;cals&#41;:</h3>
                <input type="number" onChange={handleMaxCalories} disabled={!isMaxCaloriesEnabled} />
                <input
                    type="checkbox"
                    id="enable_select"
                    name="toggle_select"
                    onChange={handleMaxCaloriesEnabler}
                />
            </div>
        </div >
    );
};

export default CheckedSelect;