"use client";
import { useState, useEffect } from "react";
import { FiSearch, FiShoppingBag, FiX } from "react-icons/fi";

const Header = () => {
  const [activeSection, setActiveSection] = useState("hero-section");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
      setActiveSection(sectionId);
    }
  };

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

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      const productsSection = document.getElementById("products-section");
      if (productsSection) {
        productsSection.scrollIntoView({ behavior: "smooth" });
        setActiveSection("products-section");
      }
      console.log("Searching for:", searchQuery);
      setSearchQuery("");
      setIsSearchOpen(false);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="flex justify-between gap-10 container mx-auto py-7">
        <img
          src="/images/logo.svg"
          alt="sporton logo"
          className="w-[127px] h-[30px] cursor-pointer"
          onClick={() => scrollToSection("hero-section")}
        />
        <nav className="flex gap-24 font-medium">
          <a
            href="#hero-section"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("hero-section");
            }}
            className={`relative transition-all duration-300 hover:text-primary ${
              activeSection === "hero-section"
                ? "text-primary after:content-[''] after:block after:bg-primary after:rounded-full after:h-[3px] after:w-1/2 after:absolute after:left-1/2 after:-translate-x-1/2 after:translate-y-1"
                : "text-black-600 after:content-[''] after:block after:bg-transparent after:rounded-full after:h-[3px] after:w-0 after:absolute after:left-1/2 after:-translate-x-1/2 after:translate-y-1 after:transition-all after:duration-300 hover:after:w-1/2 hover:after:bg-primary"
            }`}
          >
            Home
          </a>
          <a
            href="#category-section"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("category-section");
            }}
            className={`relative transition-all duration-300 hover:text-primary ${
              activeSection === "category-section"
                ? "text-primary after:content-[''] after:block after:bg-primary after:rounded-full after:h-[3px] after:w-1/2 after:absolute after:left-1/2 after:-translate-x-1/2 after:translate-y-1"
                : "text-black-600 after:content-[''] after:block after:bg-transparent after:rounded-full after:h-[3px] after:w-0 after:absolute after:left-1/2 after:-translate-x-1/2 after:translate-y-1 after:transition-all after:duration-300 hover:after:w-1/2 hover:after:bg-primary"
            }`}
          >
            Categories
          </a>
          <a
            href="#products-section"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("products-section");
            }}
            className={`relative transition-all duration-300 hover:text-primary ${
              activeSection === "products-section"
                ? "text-primary after:content-[''] after:block after:bg-primary after:rounded-full after:h-[3px] after:w-1/2 after:absolute after:left-1/2 after:-translate-x-1/2 after:translate-y-1"
                : "text-black-600 after:content-[''] after:block after:bg-transparent after:rounded-full after:h-[3px] after:w-0 after:absolute after:left-1/2 after:-translate-x-1/2 after:translate-y-1 after:transition-all after:duration-300 hover:after:w-1/2 hover:after:bg-primary"
            }`}
          >
            Explore Products
          </a>
        </nav>
        <div className="flex gap-10">
          <div className="relative">
            <FiSearch 
              size={24} 
              className="cursor-pointer hover:text-primary transition-colors" 
              onClick={() => setIsSearchOpen(true)}
            />
          </div>
          <div className="relative cursor-pointer hover:text-primary transition-colors">
            <FiShoppingBag size={24} />
            <div className="bg-primary rounded-full w-3.5 h-3.5 absolute -top-1 -right-1 text-[10px] text-white text-center leading-[14px]">
              3
            </div>
          </div>
        </div>
      </div>

      {isSearchOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center pt-20">
          <div className="bg-white rounded-2xl w-full max-w-2xl mx-4 shadow-2xl animate-in fade-in slide-in-from-top-4 duration-300">
            <div className="flex justify-between items-center p-4 border-b">
              <h3 className="font-semibold text-lg">Search Products</h3>
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
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-primary transition-colors"
                autoFocus
              />
              <div className="flex gap-3 mt-4">
                <button
                  type="submit"
                  className="flex-1 bg-primary text-white py-2 rounded-xl hover:bg-primary/85 transition-all hover:scale-105 font-medium"
                >
                  Search
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsSearchOpen(false);
                    setSearchQuery("");
                  }}
                  className="flex-1 bg-gray-100 text-gray-700 py-2 rounded-xl hover:bg-gray-200 transition-all font-medium"
                >
                  Cancel
                </button>
              </div>
            </form>
            <div className="p-4 border-t bg-gray-50 rounded-b-2xl">
              <p className="text-sm text-gray-500 mb-2">Popular searches:</p>
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
                    className="px-3 py-1 bg-white border border-gray-300 rounded-full text-sm hover:border-primary hover:text-primary transition-colors"
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