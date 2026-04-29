import logo from '/src/assets/logo.svg';

const Footer = () => {
  return (
    <footer className="bg-dark-alternate text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Logo & Description */}
          <div className="lg:col-span-2">
            <img src={logo} alt="SPORTON" className="h-8 mb-4 brightness-0 invert" />
            <p className="text-gray-400 leading-relaxed mt-4">
              Engineered for endurance and designed for speed. Experience gear
              that moves as fast as you do.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-400 hover:text-primary transition-colors">Home</a></li>
              <li><a href="#" className="text-gray-400 hover:text-primary transition-colors">Categories</a></li>
              <li><a href="#" className="text-gray-400 hover:text-primary transition-colors">Products</a></li>
              <li><a href="#" className="text-gray-400 hover:text-primary transition-colors">About Us</a></li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Follow Us</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-400 hover:text-primary transition-colors">Instagram</a></li>
              <li><a href="#" className="text-gray-400 hover:text-primary transition-colors">Facebook</a></li>
              <li><a href="#" className="text-gray-400 hover:text-primary transition-colors">TikTok</a></li>
              <li><a href="#" className="text-gray-400 hover:text-primary transition-colors">YouTube</a></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">SportOn © 2025 All Rights Reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="text-gray-400 hover:text-primary transition-colors text-sm">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors text-sm">Terms & Conditions</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;