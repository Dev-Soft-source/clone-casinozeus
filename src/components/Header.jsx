import React, { useState, useContext } from "react";
import { Button } from "./ui/button";
import { LoginModal } from "./Modals/LoginModal";
import { useNavigate } from "react-router-dom";
import { UpdatePasswordModal } from "./Modals/UpdatePasswordModal";
import { useUser } from "@/features/user/useUser";
import { SupportModal } from "./Modals/SupportModal";
import { motion, AnimatePresence } from "framer-motion";
import { AppContext } from "@/AppContext";

import { ReactComponent as CasinoZeus } from "../assets/img/domains/casinozeus.svg";
import Profile from "../assets/custom-icons/misc/perfil.png";
import Dinero from "../assets/custom-icons/misc/dinero.png";
import Unregister from "../assets/custom-icons/misc/login.png";
import MenuImg from "../assets/custom-icons/misc/menu.svg";

export const Header = ({address}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const {user} = useUser();
  const { contextData } = useContext(AppContext);
  const [ support, setSupport ] = useState(false);
  const navigate = useNavigate ();

  const session = localStorage.getItem("session");
  if(!session)
  {
    localStorage.removeItem("Casinozeus_user");
    localStorage.removeItem("Casinozeus_token");
  }

  const menuItems = [
    { label: "Casino", icon: "🏠", link:"/casino" },
    { label: "Casino en Vivo", icon: "🃏", link:"/live-casino" },
    { label: "Crash", icon: "🎰", link:"/crash" },
    { label: "Deportes", icon: "⚽", link:"/sport" },
  ];

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#1e1e1e] backdrop-blur-sm border-b border-border">
        <div className="container mx-auto px-4">
          {/* Use relative to allow absolute centering of nav */}
          <div className="relative flex items-center h-16">
            {/* LEFT - Logo */}
            <div className="flex items-center">
              <a href="/">
                <CasinoZeus className="h-9 w-auto" />
              </a>
            </div>

            {/* CENTER - nav (absolute centered on desktop) */}
            <nav className="hidden lg:flex items-center absolute left-1/2 transform -translate-x-1/2 space-x-4">
              <a
                href="/casino"
                className="text-muted-foreground text-sm hover:text-foreground"
              >
                Casino
              </a>
              <span className="h-5 w-px bg-gray-500/40" />
              <a
                href="/live-casino"
                className="text-muted-foreground text-sm hover:text-foreground"
              >
                Casino en Vivo
              </a>
              <span className="h-5 w-px bg-gray-500/40" />
              <a
                href="/crash"
                className="text-muted-foreground text-sm hover:text-foreground"
              >
                Crash
              </a>
              <span className="h-5 w-px bg-gray-500/40" />
              <a
                href="/sport"
                className="text-muted-foreground text-sm hover:text-foreground"
              >
                Deportes
              </a>
              <span className="h-5 w-px bg-gray-500/40" />
              <a
                onClick={() => setSupport(true)}
                className="text-muted-foreground text-sm hover:text-foreground"
              >
                Soporte
              </a>
            </nav>

            {/* RIGHT - make this take remaining space so its children can align right */}
            <div className="ml-auto flex items-center space-x-4">
              {user && session ? (
                <>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full bg-[#1a1a1a] hover:bg-[#1a1a1a]"
                    onClick={() => setOpen(true)}
                  >
                    <img src={Profile} className="w-5 h-5" />
                  </Button>

                  <div className="flex items-center space-x-1 bg-gradient-to-r from-[#c22653] to-[#8b1e40] px-2 rounded-full shadow-inner">
                    <div className="rounded-full p-1 flex items-center justify-center">
                      <img src={Dinero} className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-semibold text-white tracking-wide">
                      {Math.trunc(user.balance)}
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
                    <img src={Unregister} className="w-3 h-3 lg:w-5 lg:h-5" />
                  </Button>

                  {/* Tooltip */}
                  <span className="absolute left-1/2 -translate-x-1/2 top-full mt-2 text-sm bg-black text-white px-2 py-2 rounded opacity-0 group-hover:opacity-100 transition">
                    Login
                  </span>
                </div>
              )}

              {/* MOBILE MENU BUTTON - always at right because parent has ml-auto */}
              <Button
                className="lg:hidden bg-[#1e1e1e] hover:bg-[#1e1e1e]"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <img src={MenuImg} className="w-5 h-5"></img>
              </Button>
            </div>
          </div>
        </div>
        {/* Mobile Menu */}
        <AnimatePresence>
  {isMenuOpen && (
    <motion.div
      initial={{ opacity: 0, y: -12, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -8, scale: 0.98 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="absolute w-full bg-[#1e1e1e] rounded-xl p-6 space-y-4 shadow-xl justify-center items-center"
    >
      {menuItems.map((item) => (
        <button
          key={item.label}
          onClick={() => {
            navigate(item.link);
            setIsMenuOpen(false);
          }}
          className="w-full items-center py-2 gap-3 bg-[#0f0f0f] rounded-lg text-white hover:text-[#c22653] transition"
        >
          <span className="text-lg">{item.icon}</span>
          <span className="text-sm font-medium tracking-wide"> {item.label} </span>
        </button>
      ))}

      <button
        onClick={() => {
          setSupport(true);
          setIsMenuOpen(false);
        }}
        className="w-full items-center py-2 gap-3 bg-[#0f0f0f] rounded-lg text-white hover:text-[#c22653] transition"
      >
        <span className="text-lg">🛎️</span>
        <span className="text-sm font-medium tracking-wide"> Soporte </span>
      </button>
    </motion.div>
  )}
</AnimatePresence>


      </header>
  
      <LoginModal open={isAuthOpen} onOpenChange={setIsAuthOpen} />

      <UpdatePasswordModal open={open} onClose={() => setOpen(false)} />

      {support&& <SupportModal address={address} close={() => setSupport(false)}/>}
    </>
  );
};
