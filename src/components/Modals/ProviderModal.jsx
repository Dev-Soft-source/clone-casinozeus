import { useContext, useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "@/AppContext";
import { X, Search } from "lucide-react";
import { Input } from "../ui/input";
import Cross from "../../assets/custom-icons/close.svg";

export function ProviderModal({ open, onClose, providers, pagename }) {
  const { contextData } = useContext(AppContext);
  const modalRef = useRef(null);
  const Navigate = useNavigate();
  // State to store search query
  const [searchTerm, setSearchTerm] = useState("");

  // Close modal when clicking outside content
  useEffect(() => {
    const handleClick = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose();
      }
    };

    if (open) {
      document.addEventListener("mousedown", handleClick);
    }
    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, [open, onClose]);

  if (!open) return null;

  // Filter providers based on search term (case-insensitive)
  const filteredProviders = providers.filter((provider) =>
    provider.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div
      className="fixed inset-0 bg-yellow-100/15 backdrop-blur-sm z-50 flex items-center justify-center"
      onClick={onClose} // CLOSE WHEN CLICK OUTSIDE
    >
      {/* MODAL */}
      <div
        ref={modalRef}
        className={`bg-[#212529] w-[500px] max-w-xl max-h-[90vh] overflow-y-auto rounded-2xl p-5 shadow-2xl border border-white/10 no-scrollbar ${
          !open ? "animate-modalFadeOut" : "animate-modalDrop"
        }`}
        onClick={(e) => e.stopPropagation()} // PREVENT BACKDROP CLICK
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="relative w-full mr-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="BUSCAR PROVEEDOR"
              className="pl-10 w-80 h-9 rounded-full bg-[#1a1a1a] border border-border focus-visible:border-pink-500/40 focus-visible:shadow-[0_0_2px_2px_rgba(255,0,128,0.45)]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <button onClick={onClose}>
            <img src={Cross} alt="Close" className="w-8 h-8 mr-10" />
          </button>
        </div>

        {/* Provider Grid */}
        <div className="grid pt-3 grid-cols-2 gap-3 pb-40">
          {filteredProviders.map((provider) => {
            const imageDataSrc = contextData.cdnUrl + provider.image_local;
            return (
              <button
                key={provider.name}
                onClick={() => {
                  onClose();
                  Navigate(
                    `/games?providerName=${encodeURIComponent(provider.name)}&pageName=${encodeURIComponent(pagename)}`
                  );
                }}
                className="flex items-center gap-3 bg-[#1a1a1a] hover:bg-[#232323] transition-all p-3 rounded-[20px] border border-white/20 text-gray-300"
              >
                <img
                  src={imageDataSrc}
                  className="w-8 h-8 object-contain"
                  alt={provider.name}
                />
                <span className="font-medium">{provider.name}</span>
              </button>
            );
          })}
          {filteredProviders.length === 0 && (
            <p className="text-gray-400 col-span-2 text-center mt-4">
              No se encontraron proveedores
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
