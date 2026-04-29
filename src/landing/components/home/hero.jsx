import { FiFastForward } from "react-icons/fi";
import ornament from '/src/assets/img-ornament-hero.svg';
import basketball from '/src/assets/img-basketball.svg';
import heroImage from '/src/assets/img-hero.png';

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Ornament - Pojok Kanan */}
      <div className="absolute -right-20 top-20 w-[350px] h-[350px] opacity-40 pointer-events-none">
        <img 
          src={ornament} 
          alt="Ornament"
          className="w-full h-full object-contain"
        />
      </div>

      {/* GRADASI BOLA BASKET - Background Tengah */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] opacity-20 pointer-events-none z-0">
        <img 
          src={basketball} 
          alt="Basketball Gradient"
          className="w-full h-full object-contain scale-150"
        />
      </div>

      {/* Efek Blur tambahan untuk gradasi */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-orange-500/5 rounded-full blur-3xl pointer-events-none"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="relative flex flex-col lg:flex-row items-center justify-between">
          {/* Content Kiri */}
          <div className="max-w-2xl">
            <div className="text-primary italic font-semibold text-lg mb-4">
              Friday Sale, 50%
            </div>
            <h1 className="font-extrabold text-6xl lg:text-7xl xl:text-[88px] italic leading-[1.1] bg-gradient-to-b from-black to-[#979797] bg-clip-text text-transparent">
              WEAR YOUR <br /> TOP-QUALITY <br /> SPORTSWEAR
            </h1>
            <p className="w-full lg:w-4/5 mt-6 text-gray-600 leading-relaxed">
              Engineered for endurance and designed for speed. Experience gear
              that moves as fast as you do. Premium fabrics. Unmatched comfort.
              Limitless motion.
            </p>
            
            {/* Buttons */}
            <div className="flex flex-wrap gap-5 mt-10">
              <button className="bg-primary text-white px-8 py-3 rounded-lg font-semibold flex items-center gap-2 hover:bg-primary/90 transition-all">
                Explore More <FiFastForward />
              </button>
              <button className="bg-transparent border border-primary text-primary px-8 py-3 rounded-lg font-semibold flex items-center gap-2 hover:bg-primary hover:text-white transition-all">
                Watch Video
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="12" fill="#FF5F3F" />
                  <path d="M10 8L16 12L10 16V8Z" fill="white" />
                </svg>
              </button>
            </div>
          </div>

          {/* Hero Image - Gambar Sepatu dan Raket di Kanan */}
          <div className="hidden lg:block mt-10 lg:mt-0">
            <img 
              src={heroImage} 
              alt="SportOn Shoes & Racket"
              className="w-[500px] h-auto object-contain drop-shadow-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;