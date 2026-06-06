"use client";
import { useState } from "react";

const Footer = () => {
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleSocialClick = (platform) => {
    const socialLinks = {
      instagram: "https://instagram.com/sporton",
      facebook: "https://facebook.com/sporton",
      tiktok: "https://tiktok.com/@sporton",
      youtube: "https://youtube.com/sporton",
    };
    window.open(socialLinks[platform], "_blank");
  };

  const PrivacyModal = () => (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setShowPrivacyModal(false)}>
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <div className="sticky top-0 bg-white border-b p-4 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-dark">Privacy Policy</h2>
          <button onClick={() => setShowPrivacyModal(false)} className="text-gray-500 hover:text-primary text-2xl">&times;</button>
        </div>
        <div className="p-6 text-gray-700">
          <p className="mb-4">Last updated: January 1, 2025</p>
          <h3 className="font-semibold text-lg mt-4 mb-2">1. Information We Collect</h3>
          <p className="mb-3">We collect personal information including name, email address, shipping address, and payment information when you make a purchase or create an account.</p>
          
          <h3 className="font-semibold text-lg mt-4 mb-2">2. How We Use Your Information</h3>
          <p className="mb-3">We use your information to process orders, personalize your experience, improve our website, and send periodic emails about your order or other products.</p>
          
          <h3 className="font-semibold text-lg mt-4 mb-2">3. Information Protection</h3>
          <p className="mb-3">We implement security measures to maintain the safety of your personal information when you place an order or enter, submit, or access your personal information.</p>
          
          <h3 className="font-semibold text-lg mt-4 mb-2">4. Cookies</h3>
          <p className="mb-3">We use cookies to understand and save your preferences for future visits and compile aggregate data about site traffic and interaction.</p>
          
          <h3 className="font-semibold text-lg mt-4 mb-2">5. Third-Party Disclosure</h3>
          <p className="mb-3">We do not sell, trade, or otherwise transfer your personally identifiable information to outside parties.</p>
          
          <h3 className="font-semibold text-lg mt-4 mb-2">6. Contact Us</h3>
          <p className="mb-3">If you have questions about this Privacy Policy, please contact us at privacy@sporton.com</p>
        </div>
        <div className="sticky bottom-0 bg-white border-t p-4">
          <button onClick={() => setShowPrivacyModal(false)} className="w-full bg-primary text-white py-2 rounded-xl hover:bg-primary/85 transition-colors">Close</button>
        </div>
      </div>
    </div>
  );

  const TermsModal = () => (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setShowTermsModal(false)}>
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <div className="sticky top-0 bg-white border-b p-4 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-dark">Terms & Conditions</h2>
          <button onClick={() => setShowTermsModal(false)} className="text-gray-500 hover:text-primary text-2xl">&times;</button>
        </div>
        <div className="p-6 text-gray-700">
          <p className="mb-4">Last updated: January 1, 2025</p>
          <h3 className="font-semibold text-lg mt-4 mb-2">1. Acceptance of Terms</h3>
          <p className="mb-3">By accessing and using SportOn website, you accept and agree to be bound by these Terms & Conditions.</p>
          
          <h3 className="font-semibold text-lg mt-4 mb-2">2. Products and Pricing</h3>
          <p className="mb-3">All product descriptions, prices, and availability are subject to change without notice. We reserve the right to modify or discontinue any product at any time.</p>
          
          <h3 className="font-semibold text-lg mt-4 mb-2">3. Orders and Payment</h3>
          <p className="mb-3">We reserve the right to refuse any order. All payments must be made at the time of purchase using our approved payment methods.</p>
          
          <h3 className="font-semibold text-lg mt-4 mb-2">4. Shipping and Delivery</h3>
          <p className="mb-3">Shipping times are estimates and not guaranteed. We are not responsible for delays caused by shipping carriers or customs.</p>
          
          <h3 className="font-semibold text-lg mt-4 mb-2">5. Returns and Refunds</h3>
          <p className="mb-3">Returns are accepted within 30 days of delivery for unused items in original packaging. Refunds will be processed within 14 days of receiving returned items.</p>
          
          <h3 className="font-semibold text-lg mt-4 mb-2">6. Account Responsibility</h3>
          <p className="mb-3">You are responsible for maintaining the confidentiality of your account and password and for restricting access to your computer.</p>
          
          <h3 className="font-semibold text-lg mt-4 mb-2">7. Limitation of Liability</h3>
          <p className="mb-3">SportOn shall not be liable for any indirect, incidental, or consequential damages arising from your use of our products or website.</p>
          
          <h3 className="font-semibold text-lg mt-4 mb-2">8. Contact Information</h3>
          <p className="mb-3">Questions about Terms & Conditions should be sent to us at legal@sporton.com</p>
        </div>
        <div className="sticky bottom-0 bg-white border-t p-4">
          <button onClick={() => setShowTermsModal(false)} className="w-full bg-primary text-white py-2 rounded-xl hover:bg-primary/85 transition-colors">Close</button>
        </div>
      </div>
    </div>
  );

  return (
    <footer className="bg-dark-alternate text-white">
      <div className="container mx-auto flex justify-between pt-14 pb-24">
        <div className="w-105">
          <img
            src="/images/logo-footer.svg"
            alt="logo sporton footer"
            className="w-[187px] h-[44px]"
          />
          <div className="mt-8">
            <p>Engineered for endurance and designed for speed.</p>
            <p>Experience gear that moves as fast as you do.</p>
          </div>
        </div>
        <div className="w-96 grid grid-cols-2 gap-8">
          <div className="flex gap-4 flex-col">
            <h3 className="font-semibold text-lg mb-2">Menu</h3>
            <a
              href="#hero-section"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("hero-section");
              }}
              className="text-white-300 hover:text-primary hover:translate-x-1 transition-all duration-300 cursor-pointer"
            >
              Home
            </a>
            <a
              href="#category-section"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("category-section");
              }}
              className="text-white-300 hover:text-primary hover:translate-x-1 transition-all duration-300 cursor-pointer"
            >
              Categories
            </a>
            <a
              href="#products-section"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("products-section");
              }}
              className="text-white-300 hover:text-primary hover:translate-x-1 transition-all duration-300 cursor-pointer"
            >
              Products
            </a>
            <a
              href="#about"
              onClick={(e) => {
                e.preventDefault();
                const aboutSection = document.getElementById("hero-section");
                if (aboutSection) {
                  aboutSection.scrollIntoView({ behavior: "smooth" });
                }
              }}
              className="text-white-300 hover:text-primary hover:translate-x-1 transition-all duration-300 cursor-pointer"
            >
              About Us
            </a>
          </div>
          <div className="flex gap-4 flex-col">
            <h3 className="font-semibold text-lg mb-2">Follow Us</h3>
            <button
              onClick={() => handleSocialClick("instagram")}
              className="text-white-300 hover:text-primary hover:translate-x-1 transition-all duration-300 cursor-pointer text-left"
            >
              Instagram
            </button>
            <button
              onClick={() => handleSocialClick("facebook")}
              className="text-white-300 hover:text-primary hover:translate-x-1 transition-all duration-300 cursor-pointer text-left"
            >
              Facebook
            </button>
            <button
              onClick={() => handleSocialClick("tiktok")}
              className="text-white-300 hover:text-primary hover:translate-x-1 transition-all duration-300 cursor-pointer text-left"
            >
              TikTok
            </button>
            <button
              onClick={() => handleSocialClick("youtube")}
              className="text-white-300 hover:text-primary hover:translate-x-1 transition-all duration-300 cursor-pointer text-left"
            >
              YouTube
            </button>
          </div>
        </div>
      </div>
      <div className="border-t border-white/15">
        <div className="container mx-auto py-6 flex justify-between px-4">
          <div className="text-white-400">SportsOn © 2025 All Rights Reserved.</div>
          <div className="w-96 grid grid-cols-2 gap-8">
            <button
              onClick={() => setShowPrivacyModal(true)}
              className="text-white-400 hover:text-primary transition-colors duration-300 cursor-pointer text-left"
            >
              Privacy Policy
            </button>
            <button
              onClick={() => setShowTermsModal(true)}
              className="text-white-400 hover:text-primary transition-colors duration-300 cursor-pointer text-left"
            >
              Terms Conditions
            </button>
          </div>
        </div>
      </div>

      {showPrivacyModal && <PrivacyModal />}
      {showTermsModal && <TermsModal />}
    </footer>
  );
};

export default Footer;