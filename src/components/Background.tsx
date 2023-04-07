import React from 'react'
import Image from 'next/image'
import bgImg from '../../public/assets/food-bg.jpg'
import bgImgVert from '../../public/assets/food-bg-vert.jpg'

const Background = () => {
    return (
        <div>
            <div className='fixed h-screen w-full -z-10'>
                <Image
                    src={bgImg}
                    alt='A roasted chicken dish mixed with tomatoes, limes, and parsley in a recyclable bowl on top of a wooden table'
                    fill
                    className='object-cover hidden lg:block'
                />
            </div>
            <div className='fixed h-screen w-full -z-10'>
                <Image
                    src={bgImgVert}
                    alt='A roasted chicken dish mixed with tomatoes, limes, and parsley in a recyclable bowl on top of a wooden table'
                    fill
                    className='object-cover lg:hidden'
                />
            </div>
        </div>
    )
}

export default Background