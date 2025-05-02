import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaYoutube,
  FaWhatsapp,
  FaArrowUp,
  FaEnvelope,
  FaPhoneAlt,
  FaLinkedinIn,
  FaInstagram
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {/* Contact Information */}
          <div>
            <h3 className="text-xl font-bold mb-6 pb-2 border-b border-gray-700">Contact Us</h3>
            <ul className="space-y-4">
              {[
                {
                  icon: FaPhoneAlt,
                  text: "023-591464 / +977-9802331993",
                  link: "tel:023-591464",
                },
                {
                  icon: FaPhoneAlt,
                  text: "FrontDesk Support: +977-9801422415",
                  link: "tel:+9779801422415",
                },
                {
                  icon: FaPhoneAlt,
                  text: "Eye Checkup: +977-9801442493",
                  link: "tel:+9779801442493",
                },
                {
                  icon: FaEnvelope,
                  text: "mechiaesthetic@gmail.com.np",
                  link: "mailto:mecc@ntc.net.np",
                },
              ].map(({ icon: Icon, text, link }, index) => (
                <li key={index}>
                  <a
                    href={link}
                    className="flex items-start gap-3 text-gray-300 hover:text-white transition-colors"
                  >
                    <Icon className="mt-1 flex-shrink-0" />
                    <span>{text}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-6 pb-2 border-b border-gray-700">Quick Links</h3>
            <ul className="space-y-3">
              {[
                { text: "Home", link: "#" },
                { text: "About Us", link: "#" },
                { text: "Services", link: "#" },
                { text: "Social Welfare Council", link: "#" },
                { text: "Nepal Netra Jyoti Sangh", link: "#" },
                { text: "General Health Care", link: "#" },
              ].map((item, index) => (
                <li key={index}>
                  <a
                    href={item.link}
                    className="text-gray-300 hover:text-blue-400 transition-colors"
                  >
                    {item.text}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Opening Hours */}
          <div>
            <h3 className="text-xl font-bold mb-6 pb-2 border-b border-gray-700">Opening Hours</h3>
            <ul className="space-y-3 text-gray-300">
              {[
                "Monday - Wednesday: 8:00 AM - 5:00 PM",
                "Thursday - Friday: 8:00 AM - 3:30 PM",
                "Saturday: 8:00 AM - 12:00 PM",
                "Sunday: 8:00 AM - 3:30 PM",
                "Emergency: 24/7 Available",
              ].map((hour, index) => (
                <li key={index} className="flex gap-2">
                  <span>•</span>
                  <span>{hour}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter & Social Media */}
          <div>
            <h3 className="text-xl font-bold mb-6 pb-2 border-b border-gray-700">Stay Connected</h3>

            {/* Newsletter Subscription */}
            <div className="mb-6">
              <p className="text-gray-300 mb-3">
                Subscribe to our newsletter for updates and health tips.
              </p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="px-4 py-2 rounded-l-lg text-gray-800 bg-gray-100 focus:outline-none w-full"
                />
                <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-r-lg text-white transition-colors">
                  Subscribe
                </button>
              </div>
            </div>

            {/* Social Media */}
            <div>
              <h4 className="text-lg font-semibold mb-3 text-gray-300">Follow Us</h4>
              <div className="flex gap-4">
                {[
                  { Icon: FaFacebookF, url: "https://www.facebook.com/profile.php?id=61574550796978", color: "hover:text-blue-500" },
                  { Icon: FaTwitter, url: "https://twitter.com/yourhandle", color: "hover:text-blue-400" },
                  { Icon: FaYoutube, url: "https://youtube.com/yourchannel", color: "hover:text-red-500" },
                  { Icon: FaInstagram, url: "https://instagram.com/yourprofile", color: "hover:text-pink-500" },
                  { Icon: FaLinkedinIn, url: "https://linkedin.com/yourcompany", color: "hover:text-blue-400" },
                ].map(({ Icon, url, color }, index) => (
                  <a
                    key={index}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`text-xl text-gray-300 ${color} transition-transform hover:scale-110`}
                  >
                    <Icon />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Map Section */}
      <div className="bg-gray-800 py-8">
        <div className="max-w-7xl mx-auto px-4">
          <h3 className="text-xl font-bold mb-6 text-center">Our Location</h3>
          <div className="rounded-lg overflow-hidden shadow-xl">
            <iframe
              title="Google Map Location"
              src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d108478.68234937712!2d87.99187029712543!3d26.634953854966728!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1smechi%20eye%20and%20aesthetic!5e1!3m2!1sen!2snp!4v1744827665749!5m2!1sen!2snp"
              width="100%"
              height="300"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full border-0"
            ></iframe>
          </div>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="bg-black py-6">
        <div className="max-w-7xl mx-auto px-4 flex justify-center"> {/* Flex with justify-center */}
          <div className="text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} Mechi Eye and Aesthetic. All Rights Reserved.
          </div>
        </div>
      </div>

      {/* Floating Action Buttons */}
      <div className="fixed bottom-6 right-6 flex flex-col gap-4 z-50">
        {/* WhatsApp Button */}
        <a
          href="https://wa.me/+9779826991540"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-green-500 text-white p-3 rounded-full shadow-lg hover:bg-green-600 transition-transform hover:scale-110 flex items-center justify-center"
          aria-label="Chat on WhatsApp"
        >
          <FaWhatsapp className="text-2xl" />
        </a>

        {/* Scroll to Top Button */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-transform hover:scale-110 flex items-center justify-center"
          aria-label="Scroll to top"
        >
          <FaArrowUp className="text-2xl" />
        </button>
      </div>
    </footer>
  );
};

export default Footer;