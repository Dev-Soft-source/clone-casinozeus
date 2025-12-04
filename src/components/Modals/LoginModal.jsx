import React, { useState, useRef, useEffect } from "react";
import { Eye, EyeOff } from "lucide-react";
import { ReactComponent as CasinoZeus } from "../../assets/img/domains/casinozeus.svg";

export function LoginModal({ open, onOpenChange }) {
  const [showPassword, setShowPassword] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const modalRef = useRef(null);

  // ESC close
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") startClose();
    };

    if (open) {
      window.addEventListener("keydown", handleEsc);
    } else {
      window.removeEventListener("keydown", handleEsc);
    }

    return () => window.removeEventListener("keydown", handleEsc);
  }, [open]);

  // Focus trap
  useEffect(() => {
    if (open && modalRef.current) {
      modalRef.current.focus();
    }
  }, [open]);

  if (!open && !isClosing) return null;

  const startClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      onOpenChange(false);
    }, 350); // matches fadeOut animation
  };

  const handleBackdropClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      startClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      onMouseDown={handleBackdropClick}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-yellow/60 backdrop-blur-sm transition-opacity"></div>

      {/* Modal */}
      <div
        ref={modalRef}
        tabIndex={-1}
        className={` relative z-10 w-[520px] max-w-[90%] p-10 rounded-2xl text-black bg-[#0e0e11]/95 border border-[#B31250] shadow-2xl outline-none
          ${isClosing ? "animate-modalFadeOut" : "animate-modalDrop"}
        `}
      >
        {/* Logo */}
        <div className="flex flex-col items-center mb-4">
          <CasinoZeus alt="logo" className="h-16 w-auto object-contain" />
        </div>

        {/* Form */}
        <div className="flex flex-col gap-5">
          {/* Username */}
          <div>
            <label className="text-[12px] text-gray-300">Usuario</label>
            <input
              type="text"
              className="w-full mt-1 rounded-full bg-white/95 px-4 py-2.5 h-9 focus:outline-none focus:ring-2 focus:ring-pink-600"
            />
          </div>

          {/* Password */}
          <div>
            <label className="text-[12px] text-white">Contraseña</label>

            <div className="flex items-center w-full mt-1 bg-white rounded-full overflow-hidden">
              <input
                type={showPassword ? "text" : "password"}
                className="flex-1 bg-transparent px-4 py-2.5 text-black h-9 focus:outline-none"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="w-12 flex items-center justify-center h-[var(--fill-available)] bg-gradient-to-r from-[#B31250] to-[#E24A67]"
              >
                {showPassword ? (
                  <EyeOff size={20} className="text-black" />
                ) : (
                  <Eye size={20} className="text-black" />
                )}
              </button>
            </div>
          </div>

          <div className="w-full flex justify-end mt-5">
            <button className="group h-8 w-[80px] rounded-full p-[2px] mt-5 bg-blue-600 shadow-[0_0_8px_rgba(0,0,0,0.4)]">
              <span
                className="flex items-center justify-center w-full h-full rounded-full bg-gradient-to-r from-pink-600 to-pink-700
                                        text-white font-semibold text-sm tracking-wide group-hover:from-pink-700 group-hover:to-pink-800 transition-all duration-300"
              >
                Entrar
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
