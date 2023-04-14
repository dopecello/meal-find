import React, { useState } from 'react';

const CheckedSelect: React.FC = () => {
    const [isCuisineEnabled, setisCuisineEnabled] = useState<boolean>(false);
    const [isDietEnabled, setisDietEnabled] = useState<boolean>(false);
    const [selectedIntolerances, setSelectedIntolerances] = useState<Record<string, boolean>>({});


    const handleCuisine = (event: React.ChangeEvent<HTMLInputElement>) => {
        setisCuisineEnabled(event.target.checked);
    };
    const handleDiet = (event: React.ChangeEvent<HTMLInputElement>) => {
        setisDietEnabled(event.target.checked);
    };
    const handleIntolerances = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedIntolerances((prevSelectedIntolerances) => ({
            ...prevSelectedIntolerances,
            [event.target.value]: event.target.checked,
        }));
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
        { id: 4, value: "lacto-vegetarian", title: "Lacto-Vegetarian" }, { id: 5, value: "ovo-vegetarian", title: "Ovo-Vegetarian" }, { id: 6, value: "vegan", title: "vegan" },
        { id: 7, value: "pescatarian", title: "Pescetarian" }, { id: 8, value: "paleo", title: "Paleo" }, { id: 9, value: "primal", title: "Primal" },
        { id: 10, value: "low FODMAP", title: "Low FODMAP" }, { id: 11, value: "whole30", title: "Whole30" }
    ]

    const intoleranceOptions: { id: number, value: string, title: string }[] = [
        { id: 1, value: "dairy", title: "Dairy" }, { id: 2, value: "egg", title: "Egg" }, { id: 3, value: "gluten", title: "Gluten" },
        { id: 4, value: "grain", title: "Grain" }, { id: 5, value: "peanut", title: "Peanut" }, { id: 6, value: "seafood", title: "Seafood" },
        { id: 7, value: "sesame", title: "Sesame" }, { id: 8, value: "shellfish", title: "Shellfish" }, { id: 9, value: "soy", title: "Soy" },
        { id: 10, value: "sulfite", title: "Sulfite" }, { id: 11, value: "tree nut", title: "Tree Nut" }, { id: 12, value: "wheat", title: "Wheat" }
    ]
    // need to check value inputs because I'm not sure about underscores, hyphens, or just whitespaces. Check before testing.
    return (
        <div>
            <h3>Check the checkbox to activate different parameters on your search result!</h3>
            <div>
                <input
                    type="checkbox"
                    id="cuisine"
                    name="cuisine-options"
                    onChange={handleCuisine}
                />
                <h3>Cuisine:</h3>
                <select disabled={!isCuisineEnabled}>
                    {cuisineOptions.map(i => {
                        return (
                            <option value={i.value} key={i.id}>{i.title}</option>
                        )
                    })}
                </select>
            </div>
            <div>
                <input
                    type="checkbox"
                    id="enable_select"
                    name="toggle_select"
                    onChange={handleDiet}
                />
                <h3>Diet:</h3>
                <select disabled={!isDietEnabled}>
                    {dietOptions.map(i => {
                        return (
                            <option value={i.value} key={i.id}>{i.title}</option>
                        )
                    })}
                </select>
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
        </div >
    );
};

export default CheckedSelect;