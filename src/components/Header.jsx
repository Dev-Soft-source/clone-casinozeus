import React, { useState, useContext } from "react";
import { Button } from "./ui/button";
import { LoginModal } from "./Modals/LoginModal";
import { UpdatePasswordModal } from "./Modals/UpdatePasswordModal";
import { SupportModal } from "./Modals/SupportModal";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useUser } from "@/features/user/useUser";
import { AppContext } from "@/AppContext";

import { ReactComponent as CasinoZeus } from "../assets/img/domains/casinozeus.svg";
import Profile from "../assets/custom-icons/misc/perfil.png";
import Dinero from "../assets/custom-icons/misc/dinero.png";
import Unregister from "../assets/custom-icons/misc/login.png";
import MenuImg from "../assets/custom-icons/misc/menu.svg";

/* ---------------- helpers ---------------- */

const formatBalance = (value) => {
  if (value == null) return "0.00";

  const num = Number(value);
  if (isNaN(num)) return "0.00";

  return num.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

/* ---------------- component ---------------- */

export const Header = ({ address }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isPasswordOpen, setIsPasswordOpen] = useState(false);
  const [supportOpen, setSupportOpen] = useState(false);

  const { user } = useUser();
  useContext(AppContext); // preserved (even if not used yet)
  const navigate = useNavigate();

  const session = localStorage.getItem("session");

  if (!session) {
    localStorage.removeItem("Casinozeus_user");
    localStorage.removeItem("Casinozeus_token");
  }

  const menuItems = [
    { label: "Casino", icon: "🏠", link: "/casino" },
    { label: "Casino en Vivo", icon: "🃏", link: "/live-casino" },
    { label: "Crash", icon: "🎰", link: "/crash" },
    { label: "Deportes", icon: "⚽", link: "/sport" },
  ];

  return (
    <>
      {/* ================= HEADER ================= */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#1e1e1e] backdrop-blur-sm">
        <div className="container mx-auto px-4">
          {/* Use relative to allow absolute centering of nav */}
          <div className="relative flex items-center h-16">
            {/* LEFT - Logo */}
            <div className="flex items-center">
              <a href="/">
                <CasinoZeus className="h-8 w-auto" />
              </a>
            </div>

            {/* Desktop navigation */}
            <nav className="hidden lg:flex items-center absolute left-1/2 -translate-x-1/2 space-x-4">
              {menuItems.map((item, idx) => (
                <React.Fragment key={item.label}>
                  {idx > 0 && (
                    <span className="h-5 w-px bg-gray-500/40" />
                  )}
                  <a
                    href={item.link}
                    className="text-sm text-muted-foreground hover:text-foreground"
                  >
                    {item.label}
                  </a>
                </React.Fragment>
              ))}

              <span className="h-5 w-px bg-gray-500/40" />
              <button
                onClick={() => setSupportOpen(true)}
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                Soporte
              </button>
            </nav>

            {/* Right side */}
            <div className="ml-auto flex items-center gap-4">
              {user && session ? (
                <>
                  {/* Profile */}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full bg-[#1a1a1a] hover:bg-[#1a1a1a]"
                    onClick={() => setIsPasswordOpen(true)}
                  >
                    <img src={Profile} alt="" className="w-5 h-5" />
                  </Button>

                  {/* Balance */}
                  <div className="flex items-center space-x-1 bg-gradient-to-r from-[#c22653] to-[#8b1e40] px-2 rounded-full shadow-inner">
                    <div className="rounded-full p-1 flex items-center justify-center">
                      <img src={Dinero} className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-semibold text-white tracking-wide">
                      {formatBalance(user.balance)}
                    </span>
                  </div>
                </>
              ) : (
                <div className="relative group">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full hover:bg-[#1e1e1e]"
                    onClick={() => setIsAuthOpen(true)}
                  >
                    <img src={Unregister} alt="" className="w-4 h-4 lg:w-5 lg:h-5" />
                  </Button>

                  <span className="absolute left-1/2 -translate-x-1/2 top-full mt-2 text-xs bg-black text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition">
                    Login
                  </span>
                </div>
              )}

              {/* Mobile menu button */}
              <Button
                className="lg:hidden bg-[#1e1e1e] hover:bg-[#1e1e1e]"
                onClick={() => setIsMenuOpen(prev => !prev)}
              >
                <img src={MenuImg} alt="" className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>

        {/* ================= MOBILE MENU ================= */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="absolute w-full bg-[#1e1e1e] p-6 space-y-4 shadow-xl"
            >
              {menuItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => {
                    navigate(item.link);
                    setIsMenuOpen(false);
                  }}
                  className="w-full flex items-center gap-3 py-2 bg-[#0f0f0f] rounded-lg text-white hover:text-[#c22653] transition"
                >
                  <span className="text-lg">{item.icon}</span>
                  <span className="text-sm font-medium">{item.label}</span>
                </button>
              ))}

              <button
                onClick={() => {
                  setSupportOpen(true);
                  setIsMenuOpen(false);
                }}
                className="w-full flex items-center gap-3 py-2 bg-[#0f0f0f] rounded-lg text-white hover:text-[#c22653]"
              >
                <span className="text-lg">🛎️</span>
                <span className="text-sm font-medium">Soporte</span>
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* ================= MODALS ================= */}
      <LoginModal open={isAuthOpen} onOpenChange={setIsAuthOpen} />
      <UpdatePasswordModal
        open={isPasswordOpen}
        onClose={() => setIsPasswordOpen(false)}
      />
      {supportOpen && (
        <SupportModal
          address={address}
          close={() => setSupportOpen(false)}
        />
      )}
    </>
  );
};
