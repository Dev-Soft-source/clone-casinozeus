import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { Search, User, Menu, X } from "lucide-react";
import { Input } from "./ui/input";
import { Building2 } from "lucide-react";
import { ProviderModal } from "./Modals/ProviderModal";
import { PATHS } from "@/features/navigation/paths";

export const ProviderFilter = ({providers, pagename}) => {
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && searchTerm.trim() !== "") {
      navigate(`${PATHS.search}?query=${encodeURIComponent(searchTerm)}`);
    }
  };

  return (
    <div className="pt-4">
      <div >
        <div className="flex items-center justify-center gap-2 overflow-x-auto hide-scrollbar py-2">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="BUSCAR JUEGOS"
              value={searchTerm}
              onKeyDown={handleKeyDown}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-64 h-7 rounded-full bg-secondary/20 border text-[12px] border-border/50 focus-visible:ring-0 focus-visible:border-pink-500/40 focus-visible:shadow-[0_0_2px_2px_rgba(255,0,128,0.45)]"
            />
          </div>

          <Button
            className="whitespace-nowrap rounded-full w-44 h-7 text-[13px] bg-[#b22549]"
            onClick={() => setOpen(true)}
          >
            PROVEEDORES
          </Button>
        </div>
      </div>

      <ProviderModal
        open={open}
        onClose={() => setOpen(false)}
        providers={providers}
        pagename={pagename}
      />
    </div>
  );
};
