import React from 'react'
import Image from 'next/image'
import Logo from '../../public/images/food-logo-transformed.png'

const Nav = () => {
    return (
        <header className='h-[5rem]'>
            <div className='px-2 py-2'>
                <Image
                    src={Logo}
                    alt='The MealFind logo'
                    width={82}
                    height={82}
                />
            </div>
        </header>
    )
}

export default Nav