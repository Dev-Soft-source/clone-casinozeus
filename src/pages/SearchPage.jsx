import React, { useState, useEffect, useContext, useRef } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useSearchParams } from "react-router-dom";
import { SubgameSection } from "@/components/SubgameSection";
import { AppContext } from "@/AppContext";
import { callApi } from "@/utils/Utils";
import { enqueueSnackbar } from "notistack";
import { Layout } from "@/components/Layout";
import { ProviderModal } from "@/components/Modals/ProviderModal";

export const SearchPage = ({ categories, address }) => {
  const { contextData } = useContext(AppContext);
  const calledRef = useRef(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchParams] = useSearchParams();
  const [foundGames, setFoundGames] = useState([]);
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const query = searchParams.get("query");
  useEffect(() => {
    if (calledRef.current) return;
    calledRef.current = true;
    getSearchResult(query);
  }, []);

  const getSearchResult = (term) => {
    setFoundGames([]);
    let pageSize = 500;

    callApi(
      contextData,
      "GET",
      "/search-content?keyword=" + term + "&page_group_code=default_pages_" + "&length=" + pageSize, (result) => {
        if (result.status === 500 || result.status === 422) {
          return;
        } else {
          setFoundGames(result.content);
          setIsLoading(false);
          calledRef.current = false;
        }
      },
      null
    );
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && searchTerm.trim() !== "") {
      getSearchResult(searchTerm);
    }
  };

  return (
    <Layout address={address}>
      <main>
        <div className="pt-6">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-center gap-4 overflow-x-auto hide-scrollbar py-2">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Buscar juegos..."
                  value={searchTerm}
                  onKeyDown={handleKeyDown}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-64 h-8 rounded-full bg-secondary/50 border border-border/50 focus-visible:ring-0 focus-visible:border-pink-500/40 focus-visible:shadow-[0_0_2px_2px_rgba(255,0,128,0.45)]"
                />
              </div>

              <Button
                size="sm"
                className="whitespace-nowrap rounded-full w-44 h-8 leading-none"
                onClick={() => setOpen(true)}
              >
                PROVEEDORES
              </Button>
            </div>
          </div>

          <ProviderModal
            open={open}
            onClose={() => setOpen(false)}
            providers={categories}
          />
        </div>

        {/* Show message if search returns no results */}
        {searchQuery && (
          <div className="container mx-auto px-4 py-12 text-center">
            <p className="text-muted-foreground">
              No se encontraron juegos para "{searchQuery}"
            </p>
          </div>
        )}

        {foundGames.length > 0 && (
          <SubgameSection title={query} games={foundGames} loading={isLoading} />
        )}
      </main>
    </Layout>
  );
};
