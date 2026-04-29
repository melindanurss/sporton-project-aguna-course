import { FiSearch, FiShoppingBag } from "react-icons/fi";
import logo from '/src/assets/logo.svg';

const Header = () => {
  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-5">
          {/* Logo */}
          <img 
            src={logo} 
            alt="SPORTON" 
            className="h-8 w-auto"
          />

          {/* Navigation */}
          <nav className="hidden md:flex gap-10 font-medium">
            <a 
              href="#" 
              className="relative text-gray-800 after:content-[''] after:absolute after:-bottom-1 after:left-1/2 after:-translate-x-1/2 after:w-1/2 after:h-[3px] after:bg-primary after:rounded-full"
            >
              Home
            </a>
            <a href="#" className="text-gray-600 hover:text-primary transition-colors">
              Category
            </a>
            <a href="#" className="text-gray-600 hover:text-primary transition-colors">
              Explore Products
            </a>
          </nav>

          {/* Icons */}
          <div className="flex items-center gap-6">
            <FiSearch size={22} className="text-gray-600 hover:text-primary cursor-pointer transition-colors" />
            <div className="relative">
              <FiShoppingBag size={22} className="text-gray-600 hover:text-primary cursor-pointer transition-colors" />
              <span className="absolute -top-2 -right-2 bg-primary text-white text-[10px] rounded-full w-4 h-4 flex items-center justify-center">
                3
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;