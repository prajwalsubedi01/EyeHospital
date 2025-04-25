import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Welcome from './welcome.jsx';
// Import images
import Car1 from "./../assets/images/car1.jpg";
import Car2 from "./../assets/images/car2.jpg";
import Car3 from "./../assets/images/car3.jpg";
import Car4 from './../assets/images/car4.jpeg';
const images = [Car1, Car4, Car2, Car3, Car2];

const ImageSlider = () => {
  return (
    <>
    <div className="w-full mx-auto py-2 px-1 relative">
      {/* Swiper Carousel for All Screen Sizes */}
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        slidesPerView={1}
        spaceBetween={0}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 4000, disableOnInteraction: false }} // Auto-slide every 5 sec
        className="rounded-none"
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <img
              src={image}
              alt={`Slide ${index + 1}`}
              className="w-full h-[250px] sm:h-[350px] md:h-[650px] lg:h-[650px] xl:h-[550px] object-cover"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
    <Welcome/>
    </>
  );
};

export default ImageSlider;
