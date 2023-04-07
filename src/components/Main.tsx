import React from 'react'
import Image from 'next/image'
import foodPadding from '../../public/images/cutout-food-padding.png'
import foodMobile from '../../public/images/cutout-food.png'

const Main = () => {
    return (
        <div className='relative h-screen'>
            <div>
                <div className='px-3 py-6 max-w-[666px]'>
                    <h1 className='text-[#183618] text-8xl font-bold'>
                        Find your next meal.
                    </h1>
                </div>
            </div>
            <div className='bottom-0 absolute lg:static'>
                <Image
                    src={foodPadding}
                    alt='A roasted chicken dish mixed with tomatoes, limes, and parsley in a recyclable bowl'
                    className='-z-10 hidden md:block bg-lite-green'
                />
                <Image
                    src={foodMobile}
                    alt='A roasted chicken dish mixed with tomatoes, limes, and parsley in a recyclable bowl'
                    className='-z-10 md:hidden'
                />
            </div>
        </div>
    )
}

export default Main

// #cbefa4