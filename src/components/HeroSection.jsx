import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Sparkles } from "lucide-react";
import Casino from "../assets/img/banners/casino_desktop.jpg";
import Slot from "../assets/img/banners/slots_desktop.jpg";
import Sports from "../assets/img/banners/sports_desktop.jpg";
import Vipro from "../assets/img/banners/viproulette_desktop.jpg";

export const HeroSection = () => {
  const images = [Slot, Casino, Sports, Vipro];

  const [current, setCurrent] = useState(0);
  const [prev, setPrev] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setPrev(current);
      setCurrent((prevIdx) => (prevIdx + 1) % images.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [current, images.length]);

  return (
    <div className="flex justify-center items-center px-2 w-full">
      <section className="relative mt-4 w-full container rounded-2xl overflow-hidden">
        <div className="relative h-[180px] md:h-[360px]">
          <div className="absolute inset-0 overflow-hidden">
            {images.map((img, index) => {
              let animationClass = "";
              if (index === current) animationClass = "slide-in";
              if (index === prev) animationClass = "slide-out";

              return (
                <img
                  key={index}
                  src={img}
                  alt="hero"
                  className={`absolute inset-0 w-full h-full object-cover ${animationClass}`}
                />
              );
            })}
          </div>

          {/* Spot indicators */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-20">
            {images.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full ${index === current ? 'bg-red-500' : 'bg-gray-400'}`}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
