import React, { useState } from 'react'
import Image from 'next/image'
import foodPadding from '../../public/images/cutout-food-padding.png'
import foodMobile from '../../public/images/cutout-food.png'
import Logo from './Logo'
import axios from 'axios'


const Main = () => {

    // Here we will handle the state of the API request. First make a modal where you can select and deselect the amount of queries you can perform. (FoodSelection.tsx)
    // Save the state using a save button to lock in the API request.
    // Once the request is made, three cards can be made.(FoodCard.tsx) If the user would like to try a different set, they can press the button and it will retrigger the request.
    const [modal, setModal] = useState(false)


    const handleFoodSearch = () => {
        setModal(!modal)
    }

    //TEST API CALL
    let apiEndpoint = `https://api.spoonacular.com/recipes/716429/information?apiKey=${process.env.NEXT_PUBLIC_API_KEY}&includeNutrition=true`

    async function getSomething() {
        try {
            const response = await axios.get(apiEndpoint)
            console.log(response)
        } catch (error) {
            console.log(error)
        }
    }
    //

    return (
        <div>
            <div>
                <div className='py-6 flex flex-col md:flex-row justify-around items-center text-center md:text-left'>
                    <div>
                        <h1 className='text-[#183618] text-7xl font-bold lg:max-w-[500px] w-full'>
                            Find your next meal.
                        </h1>
                    </div>
                    <Logo />
                </div>
                <div className='flex justify-center items-center rounded-lg p-2 border border-black max-w-[200px] mx-auto cursor-pointer'>
                    <p onClick={handleFoodSearch}>Switch the modal</p>
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
            <div className={modal ? 'fixed left-0 top-0 w-full h-screen bg-black/70 z-20' : ''}>
                <p>Modal here</p>
            </div>
        </div>
    )
}

export default Main
