"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { FiSearch, FiShoppingBag, FiX } from "react-icons/fi";

const Header = () => {
  const [activeSection, setActiveSection] = useState("hero-section");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Fungsi scroll ke section dengan offset yang pas
  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      // Offset 80px untuk menghindari header tertutup
      const offset = 80;
      const sectionTop = section.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: sectionTop - offset,
        behavior: "smooth"
      });
      setActiveSection(sectionId);
    }
  };

  // Deteksi section aktif saat scrolling
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["hero-section", "category-section", "products-section"];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Fungsi pencarian produk
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      const productsSection = document.getElementById("products-section");
      if (productsSection) {
        const offset = 80;
        const sectionTop = productsSection.getBoundingClientRect().top + window.pageYOffset;
        window.scrollTo({
          top: sectionTop - offset,
          behavior: "smooth"
        });
        setActiveSection("products-section");
      }
      console.log("Searching for:", searchQuery);
      setSearchQuery("");
      setIsSearchOpen(false);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="flex justify-between items-center container mx-auto py-5 px-4">
        {/* Logo */}
        <div className="relative w-[127px] h-[30px] cursor-pointer" onClick={() => scrollToSection("hero-section")}>
          <Image
            src="/images/logo.svg"
            alt="sporton logo"
            fill
            className="object-contain"
            priority
          />
        </div>

        {/* Navigation - SAMA PERSIS DENGAN REFERENSI */}
        <nav className="hidden md:flex items-center gap-24">
          <button
            onClick={() => scrollToSection("hero-section")}
            className={`relative text-[18px] transition-all duration-300 font-poppins font-medium ${
              activeSection === "hero-section"
                ? "text-black after:content-[''] after:absolute after:-bottom-2 after:left-1/2 after:-translate-x-1/2 after:w-1/2 after:h-0.5 after:bg-primary after:rounded-full"
                : "text-black hover:text-primary after:content-[''] after:absolute after:-bottom-2 after:left-1/2 after:-translate-x-1/2 after:w-0 after:h-0.5 after:bg-primary after:rounded-full after:transition-all after:duration-300 hover:after:w-1/2"
            }`}
          >
            Home
          </button>
          <button
            onClick={() => scrollToSection("category-section")}
            className={`relative text-[18px] transition-all duration-300 font-poppins font-medium ${
              activeSection === "category-section"
                ? "text-black after:content-[''] after:absolute after:-bottom-2 after:left-1/2 after:-translate-x-1/2 after:w-1/2 after:h-0.5 after:bg-primary after:rounded-full"
                : "text-black hover:text-primary after:content-[''] after:absolute after:-bottom-2 after:left-1/2 after:-translate-x-1/2 after:w-0 after:h-0.5 after:bg-primary after:rounded-full after:transition-all after:duration-300 hover:after:w-1/2"
            }`}
          >
            Categories
          </button>
          <button
            onClick={() => scrollToSection("products-section")}
            className={`relative text-[18px] transition-all duration-300 font-poppins font-medium ${
              activeSection === "products-section"
                ? "text-black after:content-[''] after:absolute after:-bottom-2 after:left-1/2 after:-translate-x-1/2 after:w-1/2 after:h-0.5 after:bg-primary after:rounded-full"
                : "text-black hover:text-primary after:content-[''] after:absolute after:-bottom-2 after:left-1/2 after:-translate-x-1/2 after:w-0 after:h-0.5 after:bg-primary after:rounded-full after:transition-all after:duration-300 hover:after:w-1/2"
            }`}
          >
            Explore Products
          </button>
        </nav>

        {/* Icons */}
        <div className="flex items-center gap-10">
          <FiSearch 
            size={22} 
            className="cursor-pointer hover:text-primary transition-colors text-black" 
            onClick={() => setIsSearchOpen(true)}
          />
          <div className="relative cursor-pointer hover:text-primary transition-colors text-black">
            <FiShoppingBag size={22} />
            <span className="bg-primary rounded-full w-4 h-4 absolute -top-2 -right-2 text-[10px] text-white text-center leading-4 font-poppins font-medium">
              3
            </span>
          </div>
        </div>
      </div>

      {/* Search Modal */}
      {isSearchOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center pt-20">
          <div className="bg-white rounded-2xl w-full max-w-2xl mx-4 shadow-2xl animate-in fade-in slide-in-from-top-4 duration-300">
            <div className="flex justify-between items-center p-4 border-b">
              <h3 className="font-semibold text-lg font-poppins">Search Products</h3>
              <FiX 
                size={24} 
                className="cursor-pointer hover:text-primary transition-colors" 
                onClick={() => {
                  setIsSearchOpen(false);
                  setSearchQuery("");
                }}
              />
            </div>
            <form onSubmit={handleSearch} className="p-4">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for sportswear, shoes, accessories..."
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-primary transition-colors font-poppins"
                autoFocus
              />
              <div className="flex gap-3 mt-4">
                <button
                  type="submit"
                  className="flex-1 bg-primary text-white py-2 rounded-xl hover:bg-primary/85 transition-all hover:scale-105 font-medium font-poppins"
                >
                  Search
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsSearchOpen(false);
                    setSearchQuery("");
                  }}
                  className="flex-1 bg-gray-100 text-gray-700 py-2 rounded-xl hover:bg-gray-200 transition-all font-medium font-poppins"
                >
                  Cancel
                </button>
              </div>
            </form>
            <div className="p-4 border-t bg-gray-50 rounded-b-2xl">
              <p className="text-sm text-gray-500 mb-2 font-poppins">Popular searches:</p>
              <div className="flex gap-2 flex-wrap">
                {["Running Shoes", "Football", "Basketball", "Tennis Racket"].map((item) => (
                  <button
                    key={item}
                    onClick={() => {
                      setSearchQuery(item);
                      setTimeout(() => {
                        handleSearch(new Event('submit'));
                      }, 100);
                    }}
                    className="px-3 py-1 bg-white border border-gray-300 rounded-full text-sm hover:border-primary hover:text-primary transition-colors font-poppins"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;