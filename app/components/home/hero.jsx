"use client";
import { FiFastForward } from "react-icons/fi";
import { useState } from "react";
import Button from "../ui/button";
import Image from "next/image";

const HeroSection = () => {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  const handleExploreMore = () => {
    const productsSection = document.getElementById('products-section');
    if (productsSection) {
      productsSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    } else {
      window.scrollTo({
        top: window.innerHeight,
        behavior: 'smooth'
      });
    }
  };

  const handleWatchVideo = () => {
    setIsVideoOpen(true);
  };

  const closeVideoModal = () => {
    setIsVideoOpen(false);
  };

  return (
    <>
      <section id="hero-section" className="container mx-auto h-screen flex relative">
        <div className="relative self-center">
          {/* Basketball Ornament - Kiri dengan gradasi yang jelas */}
          <div className="absolute left-0 -top-20 z-0">
            <Image
              src="/images/img-basketball-gradasi.png"
              width={432}
              height={423}
              alt="image sporton"
              className="opacity-100"
              priority
            />
          </div>
          
          {/* Content */}
          <div className="relative ml-40 w-full">
            <div className="inline-flex items-center bg-[#FFF0ED] rounded-full px-5 py-2">
              <span className="text-primary italic">Friday Sale, 50%</span>
            </div>
            <h1 className="font-extrabold text-[95px] italic bg-gradient-to-b leading-tight from-black to-[#979797] bg-clip-text text-transparent">
              WEAR YOUR <br /> TOP-QUALITY <br /> SPORTSWEAR
            </h1>
            <p className="w-1/2 mt-10 leading-loose">
              Engineered for endurance and designed for speed. Experience gear
              that moves as fast as you do. Premium fabrics. Unmatched comfort.
              Limitless motion.
            </p>
            <div className="flex gap-5 mt-14">
              <Button onClick={handleExploreMore} className="rounded-none">
                Explore More <FiFastForward />
              </Button>
              <Button variant="ghost" onClick={handleWatchVideo} className="rounded-none">
                Watch Video{" "}
                <Image
                  src="/images/icon-play-video.svg"
                  alt="icon playvideo"
                  width={29}
                  height={29}
                />
              </Button>
            </div>
          </div>
          
          {/* Hero Image - img-hero.png presisi */}
          <div className="absolute -right-40 top-1/2 -translate-y-1/2">
            <Image
              src="/images/img-hero.png"
              width={700}
              height={950}
              alt="image sporton hero"
            />
          </div>
        </div>
        
        {/* Ornament SVG - ukuran sedang dan presisi */}
        <div className="absolute -right-[350px] top-1/2 -translate-y-1/2">
          <Image
            src="/images/img-ornament-hero.svg"
            width={420}
            height={420}
            alt="image sporton"
            priority
          />
        </div>
      </section>

      {/* Video Modal - Watch Video */}
      {isVideoOpen && (
        <div 
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          onClick={closeVideoModal}
        >
          <div 
            className="relative bg-black rounded-2xl max-w-4xl w-full aspect-video"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeVideoModal}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            <iframe
              className="w-full h-full rounded-2xl"
              src="https://www.youtube.com/embed/13Mt8tG84Lw?si=oVphCFc-gvWVIALh&autoplay=1"
              title="Sporton Video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}
    </>
  );
};

export default HeroSection;