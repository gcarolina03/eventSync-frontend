import { useEffect, useRef, useState } from 'react'
import { ArrowLeft, ArrowRight } from '../common/Icons';
import CardServices from '../services/Card';
import CardEvents from '../events/Card';

function Carousel({ data, type }) {
  const maxScrollWidth = useRef(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const carousel = useRef(null);

  const movePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevState) => prevState - 1);
    }
  }

  const moveNext = () => {
    if (
      carousel.current !== null &&
      carousel.current.offsetWidth * currentIndex <= maxScrollWidth.current
    ) {
      setCurrentIndex((prevState) => prevState + 1);
    }
  }

  const isDisabled = (direction) => {
    if (direction === 'prev') {
      return currentIndex <= 0
    }

    if (direction === 'next' && carousel.current !== null) {
      return (
        carousel.current.offsetWidth * currentIndex >= maxScrollWidth.current
      )
    }

    return false
  }

  useEffect(() => {
    maxScrollWidth.current = carousel.current
      ? carousel.current.scrollWidth - carousel.current.offsetWidth
      : 0;
  }, [])

  useEffect(() => {
    if (carousel !== null && carousel.current !== null) {
      carousel.current.scrollLeft = carousel.current.offsetWidth * currentIndex;
    }
  }, [currentIndex])

  return (
  <div className="carousel mt-12 mb-4 mx-auto">
    <div className="relative">
      <div className="flex justify-between absolute top left w-full h-[400px]">
        <button
          onClick={movePrev}
          className="hover:bg-dark text-white w-10 h-full text-center opacity-75 hover:opacity-80 disabled:opacity-25 disabled:cursor-not-allowed z-10 p-0 m-0 transition-all ease-in-out duration-500"
          disabled={isDisabled('prev')}
        >
          <ArrowLeft className='h-8 w-20 -ml-5'/>
          <span className="sr-only">Prev</span>
        </button>
        <button
          onClick={moveNext}
          className="hover:bg-dark text-white w-10 h-full text-center opacity-75 hover:opacity-80 disabled:opacity-25 disabled:cursor-not-allowed z-10 p-0 m-0 transition-all ease-in-out duration-500"
          disabled={isDisabled('next')}
        >
          <ArrowRight className='h-8 w-20 -ml-5' />
          <span className="sr-only">Next</span>
        </button>
      </div>
      <div
        ref={carousel}
        className="carousel-container relative flex gap-8 overflow-hidden h-[410px] scroll-smooth snap-x snap-mandatory touch-pan-x z-0"
      >
        {data.map((resource) => {
          if(type === 'services') {
            return (
              <div
                key={resource._id}
                className="carousel-item text-center relative snap-start"
              >
            <CardServices data={resource}/>
            </div>)
          }

          if(type === 'events') {
            return (
              <div
                key={resource._id}
                className="carousel-item text-center relative snap-start"
              >
            <CardEvents data={resource}/>
            </div>)
          }
        })}
      </div>
    </div>
  </div>
  )
}

export default Carousel