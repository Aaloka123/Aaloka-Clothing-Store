import React from "react";

const Footer = () => {
  return (
    <footer className="bg-primary text-white py-10">
      <div className="container mx-auto px-4 sm:px-8 lg:px-20 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
        {/* Brand Info */}
        <div className="flex flex-col items-start">
          <h2 className="text-2xl sm:text-3xl font-bold font-blastula">
            Aaloka Store
          </h2>
          <p className="text-secondaray mt-2 max-w-full sm:max-w-xs text-sm sm:text-base">
            Your one-stop shop for quality products at the best prices.
          </p>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col gap-2">
          <h3 className="text-lg sm:text-xl font-semibold">Quick Links</h3>
          <a
            href="/"
            className="text-secondaray hover:underline transition-all duration-300 text-sm sm:text-base"
          >
            Home
          </a>
          <a
            href="/shop"
            className="text-secondaray hover:underline transition-all duration-300 text-sm sm:text-base"
          >
            Shop
          </a>
          <a
            href="/about"
            className="text-secondaray hover:underline transition-all duration-300 text-sm sm:text-base"
          >
            About
          </a>
          <a
            href="/contact"
            className="text-secondaray hover:underline transition-all duration-300 text-sm sm:text-base"
          >
            Contact
          </a>
        </div>

        {/* Social Links */}
        <div className="flex flex-col gap-2">
          <h3 className="text-lg sm:text-xl font-semibold">Follow Us</h3>
          <a
            href="#"
            className="text-secondaray hover:underline transition-all duration-300 text-sm sm:text-base"
          >
            Facebook
          </a>
          <a
            href="#"
            className="text-secondaray hover:underline transition-all duration-300 text-sm sm:text-base"
          >
            Instagram
          </a>
          <a
            href="#"
            className="text-secondaray hover:underline transition-all duration-300 text-sm sm:text-base"
          >
            Twitter
          </a>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="text-secondaray text-center text-sm sm:text-base mt-6">
        © {new Date().getFullYear()} Aaloka Store. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
