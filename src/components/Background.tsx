import React from 'react'
import Image from 'next/image'
import bgImg from '../../public/images/cutout-food.png'

const Background = () => {
    return (
        
            <div className='fixed h-screen w-full -z-10'>
                <Image
                    src={bgImg}
                    alt='A roasted chicken dish mixed with tomatoes, limes, and parsley in a recyclable bowl'
                    fill
                    className='object-cover hidden lg:block'
                />
            </div>
           
        
    )
}

export default Background