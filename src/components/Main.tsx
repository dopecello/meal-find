import React, { useCallback, useEffect, useState } from 'react'
import Image from 'next/image'
import foodPadding from '../../public/images/cutout-food-padding.png'
import foodMobile from '../../public/images/cutout-food.png'
import Logo from './Logo'
import axios from 'axios'
import CheckedSelect from './CheckedSelect'
import useBodyClass from '@/hooks/useBodyClass'
import { GrClose } from 'react-icons/gr'
import FoodCard from './FoodCard'



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
    const [apiData, setApiData] = useState<Recipe[]>([])


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

    const getSomething = async () => {
        try {
            const queryParams = {
                ...selectedValues,
                cuisines: selectedValues.cuisines.join(','),
                diets: selectedValues.diets.join(','),
                intolerances: selectedValues.intolerances.join(','),
                mealTypes: selectedValues.mealTypes.join(','),
            };
            const response = await axios.get('/api/recipes', { params: queryParams });
            console.log(response);
            console.log(response.data.totalResults);
            setApiData(response.data.results);
        } catch (error) {
            console.log(error);
        }
    };


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
                </div>
                <div className='flex justify-center items-center rounded-lg p-2 border-4 border-black max-w-[200px] mx-auto cursor-pointer bg-dark-green' onClick={handleFoodSearch}>
                    <p className='font-semibold text-white'>Search Recipes</p>
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
                        {apiData ? (
                            <FoodCard data={apiData} />
                        ) : (
                            <p>Loading.... </p>
                        )}
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
