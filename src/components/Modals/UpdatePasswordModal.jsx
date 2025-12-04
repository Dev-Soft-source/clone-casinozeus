import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Header } from "../Header";
import Logout from '../../assets/custom-icons/login-exit.png';

export function UpdatePasswordModal({ open, onClose }) {
  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);
  const [show3, setShow3] = useState(false);

  if (!open) return null;

  return (
      <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
        <div className="bg-[#262626] w-full max-w-xl p-8 shadow-xl rounded-xl">
          {/* HEADER */}
          <div className="flex bg-[#1e1e1e] rounded-2xl px-6 py-3 mb-6 text-white">
            {/* LEFT — NOMBRE */}
            <div className="flex-1 flex flex-col">
              <p className="text-[12px] text-gray-400">NOMBRE</p>
              <p className="text-[14px] font-semibold">pruebaabc1</p>
            </div>

            {/* DIVIDER */}
            <div className="w-px h-10 bg-white mx-6 self-center"></div>

            {/* RIGHT — CORREO */}
            <div className="flex-1 flex flex-col">
              <p className="text-[12px] text-gray-400">CORREO</p>
              <p className="text-[14px] font-semibold"></p>
            </div>
          </div>

          {/* CONTENT BLOCK (FIXED) */}
          <div className="bg-[#1e1e1e] rounded-2xl px-6 py-4 text-white space-y-3">
            {/* TITLE */}
            <h2 className="text-white font-bold text-sm pl-2 pt-2">
              ACTUALIZAR CONTRASEÑA
            </h2>

            {/* FORM */}

            {/* USERNAME */}
            <div>
              <label className="text-[10px] text-white pl-2">
                NOMBRE DE USUARIO
              </label>
              <input
                className="w-full bg-[#2A2A2A] text-white rounded-full px-4 py-2 mt-1 outline-none"
                defaultValue="pruebaabc1"
                disabled
              />
            </div>

            {/* CURRENT PASSWORD */}
            <div>
              <label className="text-[10px] text-white pl-2">
                CONTRASEÑA ACTUAL
              </label>
              <div className="relative">
                <input
                  type={show1 ? "text" : "password"}
                  className="w-full bg-[#0f0f0f] text-white rounded-full px-4 py-2 mt-1 outline-none"
                />
                <button
                    type="button"
                    onClick={() => setShow1(!show1)}
                    className="absolute right-0 top-1 h-[calc(100%-0.2rem)] px-2 rounded-e-2xl flex items-center justify-center bg-gradient-to-r from-[#B31250] to-[#E24A67]"
                  >
                    {show1 ? (
                      <EyeOff size={20} className="text-white" />
                    ) : (
                      <Eye size={20} className="text-white" />
                    )}
                  </button>
              </div>

              {/* NEW PASSWORD */}
              <div className="mt-3">
                <label className="text-[10px] text-white pl-2">
                  CONTRASEÑA NUEVA
                </label>
                <div className="relative">
                  <input
                    type={show2 ? "text" : "password"}
                    className="w-full bg-[#0f0f0f] text-white rounded-full px-4 py-2 mt-1 outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setShow2(!show2)}
                    className="absolute right-0 top-1 h-[calc(100%-0.2rem)] px-2 rounded-e-2xl flex items-center justify-center bg-gradient-to-r from-[#B31250] to-[#E24A67]"
                  >
                    {show2 ? (
                      <EyeOff size={20} className="text-white" />
                    ) : (
                      <Eye size={20} className="text-white" />
                    )}
                  </button>
                </div>
              </div>

              {/* CONFIRM PASSWORD */}
              <div className="mt-3">
                <label className="text-[10px] text-white pl-2">
                  CONFIRMAR CONTRASEÑA NUEVA
                </label>

                <div className="relative">
                  <input
                    type={show3 ? "text" : "password"}
                    className="w-full bg-[#0f0f0f] text-white rounded-full px-4 py-2 mt-1 outline-none"
                  />

                  <button
                    type="button"
                    onClick={() => setShow3(!show3)}
                    className="absolute right-0 top-1 h-[calc(100%-0.2rem)] px-2 rounded-e-2xl flex items-center justify-center bg-gradient-to-r from-[#B31250] to-[#E24A67]"
                  >
                    {show3 ? (
                      <EyeOff size={20} className="text-white" />
                    ) : (
                      <Eye size={20} className="text-white" />
                    )}
                  </button>
                </div>
              </div>
            </div>
            </div>
            {/* ACTION BUTTONS */}
            <div className="flex justify-between pt-5 px-5">
              <button className="bg-pink-700 text-white font-semibold px-6 py-1 rounded-full text-[10px] sm:text-[14px]">
                ACTUALIZAR
              </button>

              <button
                onClick={onClose}
                className="border border-pink-600 text-white font-semibold px-6 py-1 rounded-full text-[10px] sm:text-[14px]"
              >
                CANCELAR
              </button>

              <button className="bg-pink-700 text-white font-semibold px-6 py-2 rounded-full 
                   flex items-center gap-2 text-[10px] sm:text-[14px] shadow-md">
                <p>SALIR</p>
                <img src={Logout} className="w-5 h-5"></img>
             </button>   
            </div>
          
        </div>
      </div>
  );
}
