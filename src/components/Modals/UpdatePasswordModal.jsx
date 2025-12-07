import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Header } from "../Header";
import Logout from "../../assets/custom-icons/login-exit.png";
import { useUser } from "@/features/user/useUser";
import { useNavigate } from "react-router-dom";

export function UpdatePasswordModal({ open, onClose }) {
  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);
  const [show3, setShow3] = useState(false);
  const [pass1, setPass1] = useState(true);
  const [pass2, setPass2] = useState(true);
  const [pass3, setPass3] = useState(true);
  const { user, logOut, changePassword } = useUser();

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogout = () => {
    logOut();
    onClose();
  };

  const handleClose = () => {
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    onClose();
  };

  const handleChangePassword = async () => {
    // Reset errors
    setPass1(false);
    setPass2(false);
    setPass3(false);
  
    // VALIDACIONES
    if (!currentPassword) {
      setPass1(false);
      return;
    }
    if (!newPassword) {
      setPass2(false);
      return;
    }
    if (newPassword !== confirmPassword) {
      setPass3(false);
      return;
    }

    setLoading(true);
    // Only close on success
    changePassword(currentPassword, newPassword, () => {
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
        onClose();
    });
    // If ok → close modal
    onClose();
    setLoading(false);
  };
  
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-[#262626] w-full max-w-xl p-8 shadow-xl rounded-xl">
        {/* HEADER */}
        <div className="flex bg-[#1e1e1e] rounded-2xl px-6 py-3 mb-6 text-white">
          {/* LEFT — NOMBRE */}
          <div className="flex-1 flex flex-col">
            <p className="text-[12px] text-gray-400">NOMBRE</p>
            <p className="text-[14px] font-semibold">{user.username}</p>
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
              defaultValue={user.username}
              disabled
            />
          </div>

          {/* CURRENT PASSWORD */}
          <div>
            <label className="text-[10px] text-white pl-2">
              CONTRASEÑA ACTUAL
            </label>
            {pass1 ? (
              <div className="relative">
                <input
                  type={show1 ? "text" : "password"}
                  className="w-full bg-[#0f0f0f] text-white rounded-full px-4 py-2 mt-1 outline-none"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
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
            ) : (
              <div className="col-span-2 inline-flex items-center gap-3">
                <div className="relative">
                  <input
                    type={show1 ? "text" : "password"}
                    className="w-full bg-[#0f0f0f] text-white rounded-full px-4 py-2 mt-1 outline-none"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
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
                <div className="flex items-center">
                  <p className="text-[12px]">La contraseña actual es requerida</p>
                </div>
              </div>
            )}

            {/* NEW PASSWORD */}
            <div className="mt-3">
              <label className="text-[10px] text-white pl-2">
                CONTRASEÑA NUEVA
              </label>
              {pass2 ? (
                <div className="relative">
                  <input
                    type={show2 ? "text" : "password"}
                    className="w-full bg-[#0f0f0f] text-white rounded-full px-4 py-2 mt-1 outline-none"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
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
              ) : (
                <div className="col-span-2 inline-flex items-center gap-3">
                  <div className="relative">
                    <input
                      type={show2 ? "text" : "password"}
                      className="w-full bg-[#0f0f0f] text-white rounded-full px-4 py-2 mt-1 outline-none"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
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
                  <div className="flex justify-end items-center">
                    <p className="text-[12px]">La contraseña es requerida</p>
                  </div>
                </div>
              )}
            </div>

            {/* CONFIRM PASSWORD */}
            <div className="mt-3">
              <label className="text-[10px] text-white pl-2">
                CONFIRMAR CONTRASEÑA NUEVA
              </label>
              {pass3 ? (
                <div className="relative">
                  <input
                    type={show3 ? "text" : "password"}
                    className="w-full bg-[#0f0f0f] text-white rounded-full px-4 py-2 mt-1 outline-none"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
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
              ) : (
                <div className="col-span-2 inline-flex items-center gap-3">
                  <div className="relative">
                    <input
                      type={show3 ? "text" : "password"}
                      className="w-full bg-[#0f0f0f] text-white rounded-full px-4 py-2 mt-1 outline-none"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
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
                  <div className="flex justify-end items-center">
                    <p className="text-[12px]">Las contraseñas deben coincidir</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        {/* ACTION BUTTONS */}
        <div className="flex justify-between pt-5 px-5">
          <button
            onClick={handleChangePassword}
            disabled={loading}
            className="bg-pink-700 text-white font-semibold px-6 py-1 rounded-full text-[10px] sm:text-[14px]
                      disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "ACTUALIZANDO..." : "ACTUALIZAR"}
          </button>

          <button
            onClick={handleClose}
            className="border border-pink-600 text-white font-semibold px-6 py-1 rounded-full text-[10px] sm:text-[14px]"
          >
            CANCELAR
          </button>

          <button
            onClick={handleLogout}
            className="bg-pink-700 text-white font-semibold px-6 py-2 rounded-full 
                   flex items-center gap-2 text-[10px] sm:text-[14px] shadow-md"
          >
            <p>SALIR</p>
            <img src={Logout} className="w-5 h-5"></img>
          </button>
        </div>
      </div>
    </div>
  );
}
