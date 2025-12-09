import React, { useContext, useEffect, useState, useRef } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { GameDataContext } from "@/components/GameDataContext";
import { Box, Stack } from "@mui/material";
import { useGames } from "../features/games/useGames";
import { useAppDispatch } from "../utils/store";
import { setGameSession } from "../features/games/gamesSlice";

// Render backend HTML safely
function HTMLGameFrame({ html }) {
  return (
    <div
      dangerouslySetInnerHTML={{ __html: html }}
      style={{ width: "100%", height: "100%" }}
    />
  );
}

export default function GameLunchPage() {
  const [searchParams] = useSearchParams();
  const internalId = searchParams.get("internalId");

  const { setLoading } = useContext(GameDataContext);
  const { startGameSession, gameSession } = useGames();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);

    const initSession = async () => {
      dispatch(setGameSession({ SessionId: null, SessionUrl: null, SessionHTML: null }));
      if (internalId) {
        await startGameSession(parseInt(internalId));
      }
      setLoading(false);
    };

    initSession();
  }, [internalId, dispatch, startGameSession, setLoading]);

  useEffect(() => {
    const handlePopState = () => navigate("/", { replace: true });
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [navigate]);

  const Spinner = () => (
    <div className="flex items-center justify-center h-screen">
      <div className="w-10 h-10 border-4 border-gray-300 border-t-primary rounded-full animate-spin"></div>
    </div>
  );

  return (
    <Box position="fixed" left={0} right={0} top={0} bottom={0} width="100%" height="100vh" zIndex={9999}>
      {gameSession.SessionHTML ? (
        <HTMLGameFrame html={gameSession.SessionHTML} />
      ) : gameSession.SessionUrl ? (
        <iframe
          style={{ width: "100%", height: "100%", border: "none" }}
          src={gameSession.SessionUrl}
          allowFullScreen
          allow="autoplay"
          title={gameSession.SessionId ?? ""}
        />
      ) : (
        <div className="flex items-center justify-center min-h-screen bg-[#101011] pb-20">
          <Spinner />
        </div>
      )}
    </Box>
  );
}
