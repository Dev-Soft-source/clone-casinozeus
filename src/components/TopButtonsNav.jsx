import React, { useRef, useEffect } from "react";

import slotsIcon from "../assets/custom-icons/slots.png";
import jackpotIcon from "../assets/custom-icons/jackpot.png";
import megawaysIcon from "../assets/custom-icons/megaways.png";
import ruletasIcon from "../assets/custom-icons/ruleta.png";
import tableIcon from "../assets/custom-icons/juegos-mesa.png";
import bingoIcon from "../assets/custom-icons/bingo.png";

export const TopButtonsNav = () => {
  const scrollRef = useRef(null);
  const isDown = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  // Always start from left on mobile
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft = 0;
    }
  }, []);

  const handleMouseDown = (e) => {
    isDown.current = true;
    startX.current = e.pageX - scrollRef.current.offsetLeft;
    scrollLeft.current = scrollRef.current.scrollLeft;
  };

  const handleMouseLeave = () => {
    isDown.current = false;
  };

  const handleMouseUp = () => {
    isDown.current = false;
  };

  const handleMouseMove = (e) => {
    if (!isDown.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX.current) * 1;
    scrollRef.current.scrollLeft = scrollLeft.current - walk;
  };

  const items = [
    { label: "Slots", icon: slotsIcon },
    { label: "Jackpot", icon: jackpotIcon },
    { label: "Megaways", icon: megawaysIcon },
    { label: "Ruletas", icon: ruletasIcon },
    { label: "Table Games", icon: tableIcon },
    { label: "Bingo", icon: bingoIcon },
  ];

  return (
    <div
  ref={scrollRef}
  onMouseDown={handleMouseDown}
  onMouseLeave={handleMouseLeave}
  onMouseUp={handleMouseUp}
  onMouseMove={handleMouseMove}
  className="w-full overflow-x-auto no-scrollbar scroll-smooth mx-auto flex justify-start md:justify-center cursor-grab active:cursor-grabbing"
>
      <div className="flex gap-3 min-w-max px-2">
        {items.map((item) => (
          <button
            key={item.label}
            className="py-1 rounded-full h-6 bg-[#222] w-32 sm:w-50 xl:w-60 lg:w-60 text-white hover:bg-[#333] transition text-[12px]
                       flex justify-center items-center"
          >
            <span className="flex items-center gap-2">
              <img src={item.icon} alt={item.label} className="w-3 h-3" />
              {item.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};
