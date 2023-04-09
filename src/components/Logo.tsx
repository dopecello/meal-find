import React from 'react'
import Image from 'next/image'
import LogoImg from '../../public/images/food-logo-transformed.png'

const Logo = () => {
    return (
        <>
            <div className='px-2 py-2 z-10'>
                <Image
                    src={LogoImg}
                    alt='The MealFind logo'
                    width={300}
                    height={300}
                    className='hidden md:block'
                />
            </div>
            <div className='px-6 py-2 z-10 md:hidden flex justify-center sm:justify-end w-full'>
                <Image
                    src={LogoImg}
                    alt='The MealFind logo'
                    width={125}
                    height={125}
                    className='block'
                />
            </div>
        </>
    )
}

export default Logo