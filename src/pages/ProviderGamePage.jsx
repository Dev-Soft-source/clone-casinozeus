import React, { useState, useEffect, useContext, useRef, useMemo } from "react";
import { SubgameCard } from "../components/SubgameCard";
import { GameModal } from "../components/Modals/GameModal";
import { useUser } from "@/features/user/useUser";
import { PATHS } from "@/features/navigation/paths";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useGames } from "@/features/games/useGames";
import { AppContext } from "@/AppContext";
import { Layout } from "@/components/Layout";
import { callApiService, callApi } from "@/utils/Utils";

export const ProviderGamePage = ({ address }) => {
  const { user } = useUser();
  const navigate = useNavigate();
  const { startGameSession } = useGames();
  const { contextData } = useContext(AppContext);

  const [searchParams] = useSearchParams();
  const pageName = searchParams.get("pageName");
  const providerName = searchParams.get("providerName");

  const [categories, setCategories] = useState([]);
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(false);

  const [selectedGame, setSelectedGame] = useState(null);
  const [isGameModalOpen, setIsGameModalOpen] = useState(false);

  const pageRef = useRef(0);

  /* -------------------------
   API: Categories
  ------------------------- */
  useEffect(() => {
    if (!pageName) return;

    setLoading(true);

    const pageMap = {
      livecasino: "/get-page?page=livecasino",
      arcade: "/get-page?page=arcade",
      home: "/get-page?page=home",
    };

    callApi(contextData, "GET", pageMap[pageName] || pageMap.home, (res) => {
      setCategories(res?.data?.categories || []);
      setLoading(false);
    });
  }, [pageName, contextData]);

  /* -------------------------
   Selected Category
  ------------------------- */
  const selectedCategory = useMemo(() => {
    return categories.find((c) => c.name === providerName);
  }, [categories, providerName]);

  /* -------------------------
   Fetch Games
  ------------------------- */
  useEffect(() => {
    if (!selectedCategory) return;

    pageRef.current = 0;
    setGames([]);
    fetchGames(selectedCategory, 0);
  }, [selectedCategory]);

  const fetchGames = (category, page) => {
    const pageSize = 30;

    const apiUrl =
      `/games/?page_group_type=categories&page_group_code=default_pages_home` +
      `&table_name=${category.table_name}` +
      `&apigames_category_id=${category.id}` +
      `&page=${page}&length=${pageSize}`;

    setLoading(true);

    callApiService(contextData, "GET", apiUrl, (res) => {
      if (res?.code === "0" && Array.isArray(res.data)) {
        setGames((prev) => {
          const map = new Map();
          [...prev, ...res.data].forEach((g) => map.set(g.id, g));
          return Array.from(map.values());
        });
      }
      setLoading(false);
    });
  };

  /* -------------------------
   Events
  ------------------------- */
  const handleGameClick = (game) => {
    const session = localStorage.getItem("session");

    if (user && session) {
      startGameSession(game.id);
      navigate(`${PATHS.launchGame}?internalId=${game.id}`);
      return;
    }

    if (user && !session) {
      window.location.reload();
      return;
    }

    setSelectedGame(game);
    setIsGameModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsGameModalOpen(false);
    setTimeout(() => setSelectedGame(null), 300);
  };

  /* -------------------------
   UI
  ------------------------- */
  const Spinner = () => (
    <div className="flex items-center justify-center">
      <div className="w-7 h-7 border-4 border-gray-200 border-t-gray-700 rounded-full animate-spin" />
    </div>
  );

  return (
    <Layout address={address}>
      <main>
        <section className="container mx-auto px-4 mt-6">
          <div className="flex items-center gap-3 mb-4">
            <h2 className="text-[30px] font-bold">{providerName}</h2>
            {loading && <Spinner />}
          </div>

          <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-10 gap-4">
            {games.map((game) => (
              <SubgameCard
                key={`${selectedCategory?.id}-${game.id}`}
                game={game}
                onClick={handleGameClick}
              />
            ))}
          </div>

          <GameModal
            game={selectedGame}
            open={isGameModalOpen}
            onOpenChange={handleCloseModal}
          />
        </section>
      </main>
    </Layout>
  );
};
