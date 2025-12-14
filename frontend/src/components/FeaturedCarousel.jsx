import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

import ListingCard from "./ListingCard";

export default function FeaturedCarousel({ items }) {
  if (!items || !items.length) return null;

  return (
    <Swiper
      modules={[Navigation, Autoplay]}
      spaceBetween={24}
      slidesPerView={1}
      navigation
      autoplay={{ delay: 3000, disableOnInteraction: false }}
      loop={true}
      breakpoints={{
        640: { slidesPerView: 1.2 },
        768: { slidesPerView: 2 },
        1024: { slidesPerView: 3 },
      }}
      style={{ paddingBottom: "10px" }}
    >
      {items.map((item) => (
        <SwiperSlide key={item._id}>
          <div className="transition-all duration-300 hover:-translate-y-1 hover:shadow-xl rounded-xl">
            <ListingCard listing={item} />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
