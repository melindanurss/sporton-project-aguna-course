"use client";
import { getImageUrl } from "@/app/lib/api";
import Image from "next/image";
import Link from "next/link";
import { FiArrowRight, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { useRef, useState, useEffect } from "react";

const CategoriesSection = ({ categories }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slidesToShow, setSlidesToShow] = useState(6);
  const [totalSlides, setTotalSlides] = useState(0);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);

  useEffect(() => {
    const updateSlidesToShow = () => {
      const width = window.innerWidth;
      if (width >= 1280) setSlidesToShow(6);
      else if (width >= 1024) setSlidesToShow(5);
      else if (width >= 768) setSlidesToShow(4);
      else if (width >= 640) setSlidesToShow(3);
      else setSlidesToShow(2);
    };

    updateSlidesToShow();
    window.addEventListener('resize', updateSlidesToShow);
    return () => window.removeEventListener('resize', updateSlidesToShow);
  }, []);

  useEffect(() => {
    if (categories) {
      setTotalSlides(categories.length);
      setShowLeftArrow(currentIndex > 0);
      setShowRightArrow(currentIndex + slidesToShow < categories.length);
    }
  }, [categories, currentIndex, slidesToShow]);

  const slideNext = () => {
    if (currentIndex + slidesToShow < totalSlides) {
      const newIndex = currentIndex + 1;
      setCurrentIndex(newIndex);
      scrollToIndex(newIndex);
    }
  };

  const slidePrev = () => {
    if (currentIndex > 0) {
      const newIndex = currentIndex - 1;
      setCurrentIndex(newIndex);
      scrollToIndex(newIndex);
    }
  };

  const scrollToIndex = (index: number) => {
    if (scrollContainerRef.current) {
      const cardWidth = scrollContainerRef.current.children[0]?.clientWidth || 0;
      const gap = 48;
      const scrollPosition = index * (cardWidth + gap);
      
      scrollContainerRef.current.scrollTo({
        left: scrollPosition,
        behavior: 'smooth'
      });
    }
  };

  const handleScroll = () => {
    if (scrollContainerRef.current && categories) {
      const scrollLeft = scrollContainerRef.current.scrollLeft;
      const cardWidth = scrollContainerRef.current.children[0]?.clientWidth || 0;
      const gap = 48;
      const newIndex = Math.round(scrollLeft / (cardWidth + gap));
      
      if (newIndex !== currentIndex) {
        setCurrentIndex(newIndex);
      }
      
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(
        scrollLeft + scrollContainerRef.current.clientWidth < 
        scrollContainerRef.current.scrollWidth - 10
      );
    }
  };

  const handleSeeAllClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (showRightArrow) {
      slideNext();
    } else {
      setCurrentIndex(0);
      scrollToIndex(0);
    }
  };

  if (!categories || categories.length === 0) {
    return (
      <section id="category-section" className="container mx-auto pb-20">
        <div className="flex justify-between">
          <h2 className="font-bold text-2xl">Browse By Categories</h2>
          <Link href="#" className="flex gap-2 text-primary font-medium">
            <span className="self-center">See All Categories</span>
            <FiArrowRight className="self-center" />
          </Link>
        </div>
        <div className="text-center py-10 text-gray-500">No categories found.</div>
      </section>
    );
  }

  return (
    <section id="category-section" className="container mx-auto pb-20">
      <div className="flex justify-between items-center mb-8">
        <h2 className="font-bold text-2xl">Browse By Categories</h2>
        <button 
          onClick={handleSeeAllClick}
          className="flex gap-2 text-primary font-medium hover:gap-3 transition-all duration-300 cursor-pointer group"
        >
          <span className="self-center">See All Categories</span>
          <FiArrowRight className="self-center transition-transform duration-300 group-hover:translate-x-1" />
        </button>
      </div>

      <div className="relative group">
        {showLeftArrow && (
          <button
            onClick={slidePrev}
            className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full shadow-lg p-2 hover:bg-primary hover:text-white transition-all duration-200 opacity-0 group-hover:opacity-100 focus:opacity-100"
            aria-label="Previous categories"
          >
            <FiChevronLeft size={24} />
          </button>
        )}

        <div
          ref={scrollContainerRef}
          onScroll={handleScroll}
          className="flex gap-12 overflow-x-auto scroll-smooth pb-4 hide-scrollbar"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            WebkitOverflowScrolling: 'touch',
            scrollSnapType: 'x mandatory'
          }}
        >
          {categories.map((category, idx) => (
            <div
              key={category._id}
              className="rounded-lg bg-gradient-to-r from-[#F1F1F1] to-[#F7F7F7] w-[calc((100%-240px)/6)] min-w-[150px] flex-shrink-0 aspect-square flex justify-center transition-all duration-300 hover:scale-105 scroll-snap-align-start"
              style={{
                scrollSnapAlign: 'start',
                width: `calc((100% - (${slidesToShow - 1} * 48px)) / ${slidesToShow})`
              }}
            >
              <div className="self-center text-center">
                <Image
                  src={getImageUrl(category.imageUrl)}
                  width={86}
                  height={86}
                  alt={category.name}
                  className="mb-[10px] mx-auto"
                />
                <div className="text-primary font-medium text-xl text-center">
                  {category.name}
                </div>
              </div>
            </div>
          ))}
        </div>

        {showRightArrow && (
          <button
            onClick={slideNext}
            className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 bg-white rounded-full shadow-lg p-2 hover:bg-primary hover:text-white transition-all duration-200 opacity-0 group-hover:opacity-100 focus:opacity-100"
            aria-label="Next categories"
          >
            <FiChevronRight size={24} />
          </button>
        )}
      </div>

      <style jsx>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .scroll-snap-align-start {
          scroll-snap-align: start;
        }
      `}</style>
    </section>
  );
};

export default CategoriesSection;