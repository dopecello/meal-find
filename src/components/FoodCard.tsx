import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

interface FoodCardProps {
    data: Recipe[]
}

const FoodCard: React.FC<FoodCardProps> = ({ data }) => {

    return (
        <>
            {data.map((recipe, index) => {
                return (
                    <div key={index} className='bg-white shadow-md rounded-lg p-4 flex flex-col mx-4'>
                        <h1 className='text-xl font-semibold mb-2 text-center'>{recipe.title}</h1>
                        {recipe.image && (
                            <Image
                                src={recipe.image}
                                className='w-full object-contain rounded-lg mb-4'
                                alt={recipe.title}
                                width={352}
                                height={260}
                            />
                        )}
                        <p className='text-gray-700 text-sm flex-grow mb-4' id='summary' dangerouslySetInnerHTML={{ __html: recipe.summary }}></p>
                        <div className='flex justify-between'>
                            <div className='text-indigo-600 font-semibold hover:text-indigo-800 cursor-pointer'>
                                <Link href={recipe.sourceUrl} target='_blank' rel='noopener noreferrer'>
                                    <p>View Recipe</p>
                                </Link>
                            </div>
                            <div className='text-indigo-600 font-semibold hover:text-indigo-800 cursor-pointer'>
                                <p>Search Similar</p>
                            </div>
                        </div>
                    </div>
                )
            })}
        </>
    )
}

export default FoodCard