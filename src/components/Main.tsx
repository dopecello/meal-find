import React, { useCallback, useEffect, useState } from 'react'
import Image from 'next/image'
import foodPadding from '../../public/images/cutout-food-padding.png'
import foodMobile from '../../public/images/cutout-food.png'
import Logo from './Logo'
import axios from 'axios'
import CheckedSelect from './CheckedSelect'
import useBodyClass from '@/hooks/useBodyClass'


const Main = () => {

    // Here we will handle the state of the API request. First make a modal where you can select and deselect the amount of queries you can perform. (FoodSelection.tsx)
    // Save the state using a save button to lock in the API request.
    // Once the request is made, three cards can be made.(FoodCard.tsx) If the user would like to try a different set, they can press the button and it will retrigger the request.
    const [modal, setModal] = useState(false)
    const [bodyNoScroll, setBodyNoScroll] = useState(false)
    const [selectedValues, setSelectedValues] = useState<SelectedVals>({
        cuisines: [],
        diets: [],
        intolerances: [],
        mealTypes: [],
        maxReadyTime: undefined,
        maxCalories: undefined,
    })


    const handleFoodSearch = () => {
        setModal(!modal)
    }

    useEffect(() => {
        setBodyNoScroll(modal)
    }, [modal])

    useBodyClass('overflow-hidden', bodyNoScroll);
    useBodyClass('h-full', bodyNoScroll); //custom hook to add class to body

    const onSelectedValuesChanged = useCallback((values: SelectedVals) => {
        setSelectedValues(values);
      }, []);

    //TEST API CALL
    const getSomething = async () => {

        let apiEndpoint = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.NEXT_PUBLIC_API_KEY}&instructionsRequired=true&addRecipeInformation=true&number=3`

        if (selectedValues.cuisines.length > 0) {
            apiEndpoint += `&cuisine=${selectedValues.cuisines.join(',')}`
        }
        if (selectedValues.diets.length > 0) {
            apiEndpoint += `&diet=${selectedValues.diets.join(',')}`
        }
        if (selectedValues.intolerances.length > 0) {
            apiEndpoint += `&intolerances=${selectedValues.intolerances.join(',')}`
        }
        if (selectedValues.mealTypes.length > 0) {
            apiEndpoint += `&type=${selectedValues.mealTypes.join(',')}`
        }
        if (selectedValues.maxReadyTime) {
            apiEndpoint += `&maxReadyTime=${selectedValues.maxReadyTime}`
        }
        if (selectedValues.maxCalories) {
            apiEndpoint += `&maxCalories=${selectedValues.maxCalories}`
        }
        console.log(apiEndpoint)

        try {
            const response = await axios.get(apiEndpoint);
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    }
    //

    return (
        <div>
            <div>
                <div className='py-6 px-8 flex flex-col md:flex-row justify-around items-center text-center md:text-left'>
                    <div>
                        <h1 className='text-dark-green text-7xl font-bold lg:max-w-[500px] w-full'>
                            Find your next meal.
                        </h1>
                    </div>
                    <Logo />
                </div>
                <div className='flex justify-center items-center rounded-lg p-2 border-4 border-black max-w-[200px] mx-auto cursor-pointer bg-dark-green'>
                    <p onClick={handleFoodSearch} className='font-semibold text-white'>Search Recipes</p>
                </div>
            </div>
            <div>
                <Image
                    src={foodPadding}
                    alt='A roasted chicken dish mixed with tomatoes, limes, and parsley in a recyclable bowl'
                    className='-z-10 hidden md:block bg-lite-green'
                />
                <Image
                    src={foodMobile}
                    alt='A roasted chicken dish mixed with tomatoes, limes, and parsley in a recyclable bowl'
                    className='-z-10 md:hidden bg-lite-green'
                />
            </div>

            {/* modal */}
            <div className={modal ? 'fixed left-0 top-0 w-full h-screen bg-black/70 z-20' : 'hidden'}>
                <div className='bg-lime-200/80 w-full h-screen overflow-auto max-h-screen py-4'>
                    <div className='flex justify-center items-center mb-4 text-white'>
                        <h1 className='flex justify-center text-center font-semibold text-lg p-3 border w-1/2 bg-black rounded-lg'>Customize your options</h1>
                    </div>
                    <div>
                        <CheckedSelect onSelectedValuesChanged={onSelectedValuesChanged} />
                    </div>
                    <div className='flex justify-center pt-4'>
                        <button onClick={async () => {
                            await getSomething();
                            handleFoodSearch();
                        }} className='p-2 border rounded-lg w-1/2 bg-black text-white'>Done</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Main
