import React, { useCallback, useEffect, useState } from 'react'
import Image from 'next/image'
import foodPadding from '../../public/images/cutout-food-padding.png'
import foodMobile from '../../public/images/cutout-food.png'
import Logo from './Logo'
import axios from 'axios'
import CheckedSelect from './CheckedSelect'
import useBodyClass from '@/hooks/useBodyClass'
import { GrClose } from 'react-icons/gr'



const Main = () => {

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

        let apiEndpoint = `https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.NEXT_PUBLIC_API_KEY}&instructionsRequired=true&addRecipeInformation=true&number=111`

        if (selectedValues.query) {
            apiEndpoint += `&query=${selectedValues.query}`
        } else {
            apiEndpoint += '&query='
        }
        if (selectedValues.maxReadyTime) {
            apiEndpoint += `&maxReadyTime=${selectedValues.maxReadyTime}`
        }
        if (selectedValues.maxCalories) {
            apiEndpoint += `&maxCalories=${selectedValues.maxCalories}`
        }
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

        console.log(apiEndpoint)

        try {
            const response = await axios.get(apiEndpoint);
            console.log(response);
            console.log(response.data.totalResults)
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <div>
            <div className='flex flex-col min-h-screen overflow-auto' id='home-screen'>
                <div className='flex-1 z-10'>
                    <div className='py-6 px-8 flex flex-col md:flex-row justify-around items-center text-center md:text-left'>
                        <div>
                            <h1 className='text-dark-green text-7xl font-bold lg:max-w-[500px] w-full'>
                                Find your next meal.
                            </h1>
                        </div>
                        <Logo />
                    </div>
                    <div className='flex justify-center items-center rounded-lg p-2 border-4 border-black max-w-[200px] mx-auto cursor-pointer bg-dark-green' onClick={handleFoodSearch}>
                        <p className='font-semibold text-white'>Search Recipes</p>
                    </div>
                </div>
                <div className='relative'>
                    <Image
                        src={foodPadding}
                        alt='A roasted chicken dish mixed with tomatoes, limes, and parsley in a recyclable bowl'
                        className='hidden md:block bg-lite-green w-full'
                    />
                    <Image
                        src={foodMobile}
                        alt='A roasted chicken dish mixed with tomatoes, limes, and parsley in a recyclable bowl'
                        className='md:hidden bg-lite-green w-full'
                    />
                </div>
            </div>

            {/* Cards */}
            <div className='w-full bg-dark-green flex flex-col items-center justify-center overflow-auto pb-4'>
                <div className='w-full max-w-7xl'>
                    <h3 className='text-center text-white mb-8'>Your Results</h3>
                    <div className='w-full grid md:grid-cols-2 lg:grid-cols-3 gap-4'>
                        {/* Card component */}
                        <div className='bg-white shadow-md rounded-lg p-4 flex flex-col mx-4'>
                            <h1 className='text-xl font-semibold mb-2'>Recipe 1</h1>
                            <Image src={'/'} className='w-full h-40 object-cover rounded-md mb-4' height={160} width={160} alt='placeholder' />
                            <p className='text-gray-700 text-sm flex-grow mb-4'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex libero vitae reiciendis suscipit nobis odit et sequi! Laborum in minus sint sequi cumque, deserunt deleniti excepturi illum inventore, expedita animi.</p>
                            <div className='flex justify-between'>
                                <div className='text-indigo-600 font-semibold hover:text-indigo-800 cursor-pointer'>
                                    <p>View Recipe</p>
                                </div>
                                <div className='text-indigo-600 font-semibold hover:text-indigo-800 cursor-pointer'>
                                    <p>Search Similar</p>
                                </div>
                            </div>
                        </div>
                        {/* Add more cards here */}
                        <div className='bg-white shadow-md rounded-lg p-4 flex flex-col mx-4'>
                            <h1 className='text-xl font-semibold mb-2'>Recipe 1</h1>
                            <Image src={'/'} className='w-full h-40 object-cover rounded-md mb-4' height={160} width={160} alt='placeholder' />
                            <p className='text-gray-700 text-sm flex-grow mb-4'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex libero vitae reiciendis suscipit nobis odit et sequi! Laborum in minus sint sequi cumque, deserunt deleniti excepturi illum inventore, expedita animi.</p>
                            <div className='flex justify-between'>
                                <div className='text-indigo-600 font-semibold hover:text-indigo-800 cursor-pointer'>
                                    <p>View Recipe</p>
                                </div>
                                <div className='text-indigo-600 font-semibold hover:text-indigo-800 cursor-pointer'>
                                    <p>Search Similar</p>
                                </div>
                            </div>
                        </div>
                        <div className='bg-white shadow-md rounded-lg p-4 flex flex-col mx-4'>
                            <h1 className='text-xl font-semibold mb-2'>Recipe 1</h1>
                            <Image src={'/'} className='w-full h-40 object-cover rounded-md mb-4' height={160} width={160} alt='placeholder' />
                            <p className='text-gray-700 text-sm flex-grow mb-4'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex libero vitae reiciendis suscipit nobis odit et sequi! Laborum in minus sint sequi cumque, deserunt deleniti excepturi illum inventore, expedita animi.</p>
                            <div className='flex justify-between'>
                                <div className='text-indigo-600 font-semibold hover:text-indigo-800 cursor-pointer'>
                                    <p>View Recipe</p>
                                </div>
                                <div className='text-indigo-600 font-semibold hover:text-indigo-800 cursor-pointer'>
                                    <p>Search Similar</p>
                                </div>
                            </div>
                        </div>
                        <div className='bg-white shadow-md rounded-lg p-4 flex flex-col mx-4'>
                            <h1 className='text-xl font-semibold mb-2'>Recipe 1</h1>
                            <Image src={'/'} className='w-full h-40 object-cover rounded-md mb-4' height={160} width={160} alt='placeholder' />
                            <p className='text-gray-700 text-sm flex-grow mb-4'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex libero vitae reiciendis suscipit nobis odit et sequi! Laborum in minus sint sequi cumque, deserunt deleniti excepturi illum inventore, expedita animi.</p>
                            <div className='flex justify-between'>
                                <div className='text-indigo-600 font-semibold hover:text-indigo-800 cursor-pointer'>
                                    <p>View Recipe</p>
                                </div>
                                <div className='text-indigo-600 font-semibold hover:text-indigo-800 cursor-pointer'>
                                    <p>Search Similar</p>
                                </div>
                            </div>
                        </div>
                        <div className='bg-white shadow-md rounded-lg p-4 flex flex-col mx-4'>
                            <h1 className='text-xl font-semibold mb-2'>Recipe 1</h1>
                            <Image src={'/'} className='w-full h-40 object-cover rounded-md mb-4' height={160} width={160} alt='placeholder' />
                            <p className='text-gray-700 text-sm flex-grow mb-4'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex libero vitae reiciendis suscipit nobis odit et sequi! Laborum in minus sint sequi cumque, deserunt deleniti excepturi illum inventore, expedita animi.</p>
                            <div className='flex justify-between'>
                                <div className='text-indigo-600 font-semibold hover:text-indigo-800 cursor-pointer'>
                                    <p>View Recipe</p>
                                </div>
                                <div className='text-indigo-600 font-semibold hover:text-indigo-800 cursor-pointer'>
                                    <p>Search Similar</p>
                                </div>
                            </div>
                        </div>
                        <div className='bg-white shadow-md rounded-lg p-4 flex flex-col mx-4'>
                            <h1 className='text-xl font-semibold mb-2'>Recipe 1</h1>
                            <Image src={'/'} className='w-full h-40 object-cover rounded-md mb-4' height={160} width={160} alt='placeholder' />
                            <p className='text-gray-700 text-sm flex-grow mb-4'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex libero vitae reiciendis suscipit nobis odit et sequi! Laborum in minus sint sequi cumque, deserunt deleniti excepturi illum inventore, expedita animi.</p>
                            <div className='flex justify-between'>
                                <div className='text-indigo-600 font-semibold hover:text-indigo-800 cursor-pointer'>
                                    <p>View Recipe</p>
                                </div>
                                <div className='text-indigo-600 font-semibold hover:text-indigo-800 cursor-pointer'>
                                    <p>Search Similar</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* modal */}
            <div className={modal ? 'fixed left-0 top-0 w-full h-screen bg-black/70 z-20' : 'hidden'}>
                <div className='bg-white/70 w-full h-screen overflow-auto max-h-screen py-4'>
                    <div className='flex justify-between items-center mb-4 text-white'>
                        <div> {/*Spacer div*/} </div>
                        <h1 className='flex justify-center font-semibold text-lg p-3 border w-1/2 bg-black rounded-lg'>Customize your options</h1>
                        <div>
                            <GrClose onClick={handleFoodSearch} size={40} className='cursor-pointer mr-[2rem] p-2 border-2 bg-white/70 rounded-full' />
                        </div>
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
