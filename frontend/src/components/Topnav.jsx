import { FaMapMarkerAlt, FaPhoneAlt, FaFacebookF, FaTwitter, FaYoutube } from "react-icons/fa";

const Header = () => {
  return (
    <div className=" h-[40px] bg-blue-900 text-white py-2 px-4 md:px-10 flex flex-col md:flex-row items-center justify-between text-sm gap-3 md:gap-0 text-center md:text-left">
  {/* Address Section */}
  <div className="flex items-center gap-2 flex-wrap justify-center md:justify-start">
    <FaMapMarkerAlt />
    <span>Birtamode-03, Sainikmode, Jhapa, Nepal</span>
  </div>

  {/* Phone Section */}
  <div className="flex items-center gap-2 flex-wrap justify-center md:justify-start">
    <FaPhoneAlt />
    <span>+977-023-531992, /531993, /530153</span>
  </div>

  {/* Social Icons Section */}
  <div className="flex items-center gap-4 justify-center md:justify-end">
    <a href="fb.com" className="hover:text-gray-400 transition-colors"><FaFacebookF /></a>
    <a href="twitter.com" className="hover:text-gray-400 transition-colors"><FaTwitter /></a>
    <a href="youtube.com" className="hover:text-gray-400 transition-colors"><FaYoutube /></a>
  </div>
</div>

  
  );
};

export default Header;
