import React from 'react'
import Image from 'next/image'
import foodPadding from '../../public/images/cutout-food-padding.png'
import foodMobile from '../../public/images/cutout-food.png'
import Logo from './Logo'

const Main = () => {
    return (
        <div>
            <div>
                <div className='py-6 flex flex-col md:flex-row justify-between items-center text-center md:text-left'>
                    <div>
                        <h1 className='text-[#183618] text-7xl font-bold lg:max-w-[500px] w-full'>
                            Find your next meal.
                        </h1>
                    </div>
                    <Logo />
                </div>
                <div className='flex justify-center items-center rounded-lg p-2 border border-black max-w-[200px] mx-auto cursor-pointer'>
                    <p>Test out the API</p>
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
        </div>
    )
}

export default Main

// #cbefa4