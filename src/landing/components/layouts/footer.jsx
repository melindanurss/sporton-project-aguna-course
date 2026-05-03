const Footer = () => {
  return (
    <footer className="bg-dark-alternate text-white mt-52">
      <div className="container mx-auto flex justify-between pt-14 pb-24">
        <div className="w-105">
          <img
            src="/src/assets/logo-footer.svg"
            alt="logo sporton footer"
            className="w-[187px] h-[44px]"
          />
          <p className="mt-8">
            <p>Engineered for endurance and designed for speed.</p>
            <p>Experience gear that moves as fast as you do.</p>
          </p>
        </div>
        <div className="w-96 grid grid-cols-2 gap-8">
          <div className="flex gap-4 flex-col">
            <h3 className="font-semibold text-lg mb-2">Menu</h3>
            <a href="#" className="text-white-300 hover:text-white transition-colors">Home</a>
            <a href="#" className="text-white-300 hover:text-white transition-colors">Categories</a>
            <a href="#" className="text-white-300 hover:text-white transition-colors">Products</a>
            <a href="#" className="text-white-300 hover:text-white transition-colors">About Us</a>
          </div>
          <div className="flex gap-4 flex-col">
            <h3 className="font-semibold text-lg mb-2">Follow Us</h3>
            <a href="#" className="text-white-300 hover:text-white transition-colors">Instagram</a>
            <a href="#" className="text-white-300 hover:text-white transition-colors">Facebook</a>
            <a href="#" className="text-white-300 hover:text-white transition-colors">TikTok</a>
            <a href="#" className="text-white-300 hover:text-white transition-colors">YouTube</a>
          </div>
        </div>
      </div>
      <div className="border-t border-white/15">
        <div className="container mx-auto py-6 flex justify-between px-4">
          <div className="text-white-400">SportsOn © 2025 All Rights Reserved.</div>
          <div className="w-96 grid grid-cols-2 gap-8">
            <a href="#" className="text-white-400 hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="text-white-400 hover:text-white transition-colors">Terms Conditions</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;