import React, { useState, useRef, useEffect, useContext } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useUser } from "@/features/user/useUser";
import { useNavigate } from "react-router-dom";
import { PATHS } from "@/features/navigation/paths";
import { useGames } from "@/features/games/useGames";
import { AppContext } from "@/AppContext";

export function GameModal({ game, open, onOpenChange }) {
  const [showPassword, setShowPassword] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const modalRef = useRef(null);
  const backdropRef = useRef(null);
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const { logIn, isLogInLoading } = useUser();
  const navigate = useNavigate();
  const { startGameSession } = useGames();
  const [filterGame, setFilterGame] = useState({});
  const { contextData} = useContext(AppContext);
  if(game)
    localStorage.setItem("redirectAfterLogin", `${PATHS.launchGame}?internalId=${game.id}`);
  const startClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      onOpenChange(false);
    }, 300);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    logIn(username, password, () => {
      startClose();
      const redirect = localStorage.getItem("redirectAfterLogin");

      if (redirect) {
        startGameSession(game.id);
        navigate(redirect);
        localStorage.removeItem("redirectAfterLogin");
      } else {
        navigate("/");
      }
    });
  };

  // ESC close
  useEffect(() => {
    if (!open) return;
    if(!game.image){
      let imageDataSrc = game.image_url;
      if (game.image_local !== null) {
        imageDataSrc = contextData.cdnUrl + game.image_local;
      }
      setFilterGame((prev) => ({
        ...prev,
        name: game.name,
        image: imageDataSrc
      }));
    }else{
      setFilterGame((prev) => ({
        ...prev,
        name: game.name,
        image: game.image
      }));
    }

    const handleEsc = (e) => {
      if (e.key === "Escape") startClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [open]);

  // Focus modal on open
  useEffect(() => {
    if (open && modalRef.current) {
      modalRef.current.focus();
    }
  }, [open]);

  // Prevent instant unmount
  if (!open && !isClosing) return null;

  // CLICK OUTSIDE CLOSE (fixed)
  const handleBackdropClick = (e) => {
    if (!modalRef.current.contains(e.target)) {
      startClose();
    }
  };

  return (
    <div
      ref={backdropRef}
      className="fixed inset-0 z-50 flex items-center justify-center"
      onMouseDown={handleBackdropClick}
    >
      {/* Backdrop blur — now mouse transparent */}
      <div className="absolute inset-0 bg-black/20 backdrop-blur-sm transition-opacity pointer-events-none"></div>

      {/* Modal */}
      <div
        ref={modalRef}
        tabIndex={-1}
        onMouseDown={(e) => e.stopPropagation()}
        className={`
          relative z-10 w-[520px] max-w-[90%] p-10 rounded-2xl 
          text-black bg-[#1e1e1e]/95 border border-[#B31250] shadow-2xl outline-none
          ${isClosing ? "animate-modalFadeOut" : "animate-modalDrop"}
        `}
      >
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-5">

          {filterGame?.image && (
            <div className="w-full flex justify-center">
              <img
                src={filterGame.image}
                alt={filterGame.name || "Game"}
                className="w-40 h-40 object-cover rounded-full border border-[#B31250]/40"
              />
            </div>
          )}

            {/* Username */}
            <div>
              <label className="text-[12px] text-gray-300">Usuario</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUserName(e.target.value)}
                className="w-full mt-1 rounded-full bg-white/95 px-4 py-2.5 h-9 focus:outline-2"
                required
              />
            </div>

            {/* Password */}
            <div>
              <label className="text-[12px] text-white">Contraseña</label>

              <div className="flex items-center w-full mt-1 bg-white rounded-full overflow-hidden">
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type={showPassword ? "text" : "password"}
                  className="flex-1 bg-transparent px-4 py-2.5 text-black h-9 focus:outline-none"
                  required
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

            {/* Submit */}
            <div className="w-full flex justify-end mt-5">
              <button
                type="submit"
                disabled={isLogInLoading}
                className="group h-8 w-[80px] rounded-full p-[2px] mt-5 bg-blue-600 shadow-[0_0_8px_rgba(0,0,0,0.4)]"
              >
                <span
                  className="flex items-center justify-center w-full h-full rounded-full bg-gradient-to-r from-pink-600 to-pink-700
                    text-white font-semibold text-sm tracking-wide group-hover:from-pink-700 group-hover:to-pink-800 transition-all duration-300"
                >
                  Entrar
                </span>
              </button>
            </div>

          </div>
        </form>
      </div>
    </div>
  );
}
