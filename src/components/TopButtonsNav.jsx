import React from "react";

import slotsIcon from "../assets/custom-icons/slots.png";
import jackpotIcon from "../assets/custom-icons/jackpot.png";
import megawaysIcon from "../assets/custom-icons/megaways.png";
import ruletasIcon from "../assets/custom-icons/ruleta.png";
import tableIcon from "../assets/custom-icons/juegos-mesa.png";
import bingoIcon from "../assets/custom-icons/bingo.png";

export const TopButtonsNav = () => {
  const items = [
    { label: "Slots", icon: slotsIcon },
    { label: "Jackpot", icon: jackpotIcon },
    { label: "Megaways", icon: megawaysIcon },
    { label: "Ruletas", icon: ruletasIcon },
    { label: "Table Games", icon: tableIcon },
    { label: "Bingo", icon: bingoIcon },
  ];

  return (
    <div className="container mx-auto flex justify-center gap-3 flex-wrap">
      {items.map((item) => (
        <button
        key={item.label}
        className="py-1 rounded-full h-6 bg-[#222] w-60 text-white hover:bg-[#333] transition text-[12px]
                   flex justify-center items-center"
      >
        <span className="flex items-center gap-2">
          <img src={item.icon} alt={item.label} className="w-3 h-3" />
          {item.label}
        </span>
      </button>
      ))}
    </div>
  );
};
