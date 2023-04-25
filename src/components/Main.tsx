import React, { useCallback, useEffect, useState } from 'react'
import Image from 'next/image'
import foodPadding from '../../public/images/cutout-food-padding.png'
import foodMobile from '../../public/images/cutout-food.png'
import Logo from './Logo'
import axios from 'axios'
import CheckedSelect from './CheckedSelect'
import useBodyClass from '../hooks/useBodyClass'
import { GrClose } from 'react-icons/gr'
import FoodCard from './FoodCard'
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai'
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';



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
    const [totalResults, setTotalResults] = useState(0)
    const [currentSlide, setCurrentSlide] = useState(0);
    const [searchWarning, setSearchWarning] = useState(false)


    const handleFoodSearch = () => {
        setModal(!modal)
    }

    const handleSlideNavigation = (direction: "prev" | "next") => {
        const numberOfSlides = apiData.length;
        const step = 3; // the number of cards displayed per slide
        if (direction === "next") {
            setCurrentSlide((prevSlide) => (prevSlide + step) % numberOfSlides);
        } else if (direction === "prev") {
            setCurrentSlide((prevSlide) => {
                const newSlide = prevSlide - step;
                return newSlide < 0 ? numberOfSlides + newSlide : newSlide;
            });
        }
    };

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
            setTotalResults(response.data.totalResults);
            if (response.data.totalResults === 0) {
                setSearchWarning(true)
                return false
            }
            setApiData(response.data.results);
            return true
        } catch (error) {
            console.log(error);
            return false
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
            <div className={apiData.length !== 0 ? "w-full bg-dark-green flex flex-col items-center justify-center overflow-hidden pb-4" : "hidden"} id="cards">
                <div className="flex justify-between items-center m-auto max-w-[90%] pt-8">
                    <div className="w-full">
                        <h3 className={apiData.length !== 0 ? 'text-center text-white mb-8' : 'hidden'}>{totalResults > 100
                            ? `You got back ${totalResults} results! Try to limit your search because the API only returns 100 results 😋`
                            : `You got back ${totalResults} results!`}
                        </h3>
                        <Carousel
                            additionalTransfrom={0}
                            arrows
                            autoPlaySpeed={3000}
                            centerMode={false}
                            className=""
                            containerClass="container"
                            customLeftArrow={<button className="absolute left-0 z-10 cursor-pointer p-2 bg-white rounded-full"><AiOutlineLeft /></button>}
                            customRightArrow={<button className="absolute right-0 z-10 cursor-pointer p-2 bg-white rounded-full"><AiOutlineRight /></button>}
                            dotListClass=""
                            draggable
                            focusOnSelect={false}
                            infinite
                            itemClass=""
                            keyBoardControl
                            minimumTouchDrag={80}
                            renderButtonGroupOutside={false}
                            renderDotsOutside={false}
                            responsive={{
                                desktop: {
                                    breakpoint: {
                                        max: 3000,
                                        min: 1080,
                                    },
                                    items: 3,
                                    partialVisibilityGutter: 40,
                                },
                                mobile: {
                                    breakpoint: {
                                        max: 464,
                                        min: 0,
                                    },
                                    items: 1,
                                    partialVisibilityGutter: 30,
                                },
                                tablet: {
                                    breakpoint: {
                                        max: 1080,
                                        min: 464,
                                    },
                                    items: 1,
                                    partialVisibilityGutter: 30,
                                },
                            }}
                            showDots={false}
                            sliderClass=""
                            slidesToSlide={1}
                            swipeable
                        >
                            {apiData.map((recipe, index) => (
                                <div key={index} className="w-full p-2">
                                    <FoodCard key={index} data={[recipe]} />
                                </div>
                            ))}
                        </Carousel>
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
                            const hasResults = await getSomething();
                            if (hasResults) {
                                handleFoodSearch();
                            }
                        }} className='p-2 border rounded-lg w-1/2 bg-black text-white'>Done</button>
                    </div>
                    <span className={searchWarning ? 'text-red-500 text-sm font-semibold text-center flex justify-center' : 'hidden'}>Whoops! You got nothing! Try broadening your search.</span>
                </div>
            </div>
        </div>
    )
}

export default Main
