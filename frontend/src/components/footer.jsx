import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaYoutube,
  FaWhatsapp,
  FaArrowUp,
  FaEnvelope,
  FaPhoneAlt,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-black text-white pt-8">
      {/* Top Section */}
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 text-center md:text-left">
        {/* Contact Details */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
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
            <a
              key={index}
              href={link}
              className="flex items-center gap-2 text-gray-400 hover:text-white justify-center md:justify-start mt-2 transition-colors"
            >
              <Icon /> {text}
            </a>
          ))}
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-gray-400">
            {[
              "Social Welfare Council",
              "Nepal Netra Jyoti Sangh",
              "General Health Care",
              "Hospital Activities",
              "Outreach Activities",
            ].map((link, index) => (
              <li key={index} className="hover:text-blue-400 cursor-pointer">
                {link}
              </li>
            ))}
          </ul>
        </div>

        {/* Opening Hours */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Opening Hours</h3>
          <ul className="text-gray-400 space-y-2">
            {[
              "Thursday: 8:00 AM - 3:30 PM",
              "Friday: 8:00 AM - 3:30 PM",
              "Saturday: 8:00 AM - 12:00 PM",
              "Sunday: 8:00 AM - 3:30 PM",
            ].map((hour, index) => (
              <li key={index}>{hour}</li>
            ))}
          </ul>
        </div>

        {/* Embedded Google Map */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Our Location</h3>
          <div className="rounded-lg overflow-hidden shadow-md border border-gray-700">
            <iframe
              title="Google Map Location"
              src="https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d108478.68234937712!2d87.99187029712543!3d26.634953854966728!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1smechi%20eye%20and%20aesthetic!5e1!3m2!1sen!2snp!4v1744827665749!5m2!1sen!2snp"
              width="100%"
              height="200"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full"
            ></iframe>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="bg-gray-900 mt-8 py-6">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Social Media */}
          <div className="flex items-center gap-4">
            <span className="text-lg font-semibold">Follow Us</span>
            {[FaFacebookF, FaTwitter, FaYoutube].map((Icon, index) => (
              <Icon
                key={index}
                className="text-xl hover:text-blue-500 cursor-pointer transition-transform transform hover:scale-110"
              />
            ))}
          </div>

          {/* Newsletter Subscription */}
          <div className="flex flex-col md:flex-row items-center gap-4">
            <span className="font-semibold text-center">
              Sign in and don't miss anything!
            </span>
            <div className="flex w-full sm:w-auto">
              <input
                type="email"
                placeholder="Enter your e-mail"
                className="px-4 py-2 rounded-l-lg text-white bg-gray-800 focus:outline-none w-full sm:w-auto"
              />
              <button className="bg-red-600 px-4 py-2 rounded-r-lg hover:bg-blue-700 transition">
                SUBSCRIBE
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Buttons */}
      <div className="fixed bottom-6 right-6 flex flex-col gap-4 z-50">
        {/* WhatsApp Button */}
        <a
          href="https://wa.me/+9779826991540"
          className="bg-green-500 text-white p-3 rounded-full shadow-lg hover:bg-green-600 transition transform hover:scale-110"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaWhatsapp className="text-2xl" />
        </a>

        {/* Scroll to Top Button */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="bg-blue-500 text-white p-3 rounded-full shadow-lg hover:bg-blue-600 transition transform hover:scale-110"
        >
          <FaArrowUp className="text-2xl" />
        </button>
      </div>
    </footer>
  );
};

export default Footer;
