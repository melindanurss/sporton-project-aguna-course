"use client";
import { FiFastForward } from "react-icons/fi";
import { useState, useEffect } from "react";
import Button from "../ui/button";
import Image from "next/image";

const HeroSection = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  
  const images = [
    "/images/img-hero.png",
    "/images/human-running.png"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentImage((prev) => (prev + 1) % images.length);
        setTimeout(() => {
          setIsTransitioning(false);
        }, 50);
      }, 300);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Fungsi untuk Explore More - scroll ke section products
  const handleExploreMore = () => {
    const productsSection = document.getElementById('products-section');
    if (productsSection) {
      productsSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    } else {
      // Alternative: scroll ke bawah halaman
      window.scrollTo({
        top: window.innerHeight,
        behavior: 'smooth'
      });
    }
  };

  // Fungsi untuk Watch Video - membuka modal video
  const handleWatchVideo = () => {
    setIsVideoOpen(true);
  };

  // Fungsi untuk close modal
  const closeVideoModal = () => {
    setIsVideoOpen(false);
  };

  return (
    <>
      <section id="hero-section" className="container mx-auto h-screen flex">
        <div className="relative self-center">
          <img
            src="/images/img-basketball-gradasi.png"
            width={432}
            height={423}
            alt="image sporton"
            className="grayscale absolute left-0 -top-20"
          />
          <div className="relative ml-40 w-full">
            <div className="text-primary italic">Friday Sale, 50%</div>
            <h1 className="font-extrabold text-[95px] italic bg-gradient-to-b leading-tight from-black to-[#979797] bg-clip-text text-transparent">
              WEAR YOUR <br /> TOP-QUALITY <br /> SPORTSWEAR
            </h1>
            <p className="w-1/2 mt-10 leading-loose">
              Engineered for endurance and designed for speed. Experience gear
              that moves as fast as you do. Premium fabrics. Unmatched comfort.
              Limitless motion.
            </p>
            <div className="flex gap-5 mt-14">
              <Button onClick={handleExploreMore}>
                Explore More <FiFastForward />
              </Button>
              <Button variant="ghost" onClick={handleWatchVideo}>
                Watch Video{" "}
                <img
                  src="/images/icon-play-video.svg"
                  alt="icon playvideo"
                  width={29}
                  height={29}
                />
              </Button>
            </div>
          </div>
          {currentImage === 0 && (
            <img
              src="/images/img-hero.png"
              width={700}
              height={950}
              alt="image sporton hero"
              className={`absolute -right-5 top-1/2 -translate-y-1/2 transition-all duration-500 ease-in-out ${
                isTransitioning ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
              }`}
            />
          )}
          {currentImage === 1 && (
            <img
              src="/images/human-running.png"
              alt="human running"
              className={`absolute transition-all duration-500 ease-in-out ${
                isTransitioning ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
              }`}
              style={{
                right: '15%',
                top: '47%',
                transform: 'translateY(-50%)',
                width: '500px',
                height: 'auto',
                objectFit: 'contain',
              }}
            />
          )}
        </div>
        <img
          src="/images/img-ornament-hero.svg"
          width={420}
          height={420}
          alt="image sporton"
          className="absolute -right-[100px] top-1/2 -translate-y-1/2"
        />
      </section>
      {isVideoOpen && (
        <div 
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4"
          onClick={closeVideoModal}
        >
          <div 
            className="relative bg-black rounded-2xl max-w-4xl w-full aspect-video"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Tombol Close */}
            <button
              onClick={closeVideoModal}
              className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            {/* Video Player */}
            <iframe
              className="w-full h-full rounded-2xl"
              src="https://www.youtube.com/embed/13Mt8tG84Lw?si=oVphCFc-gvWVIALh"
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