import React, {useState} from "react";

export const BottomMenuItem = ({
  link,
  title,
  icon,
  active,
  hoverTitleColor = "",
}) => {
  const [hovered, setHovered] = useState(false);

  return (
    <a
      href={link}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="w-[20%] flex flex-col items-center justify-center pb-3"
    >
      {/* RENDER ICON CORRECTLY */}
      {icon && typeof icon === "function" && (
        <div className="w-4 h-4 flex items-center justify-center">
          {icon({ hovered })}  {/* <<< THIS IS THE FIX */}
        </div>
      )}

      <span className="text-[10px] mt-3 transition-all text-white " >
        {title}
      </span>
    </a>
  );
};


