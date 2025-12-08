import React, { useState, useEffect, useContext, useRef } from 'react';
import { HeroSection } from '../components/HeroSection';
import { ProviderFilter } from '../components/ProviderFilter';
import { GameSection } from '../components/GameSection';
import { PromoCards } from '../components/PromoCards';
import BetsLogSection from '../components/BetsLogSection';
import { AppContext } from '@/AppContext';
import { callApi } from '@/utils/Utils';
import Slots from '../assets/custom-icons/slots.png';
import Megaways from '../assets/custom-icons/megaways.png';
import Nuevos from '../assets/custom-icons/nuevo.webp';
import BlackJack from '../assets/custom-icons/blackjack.webp';
import { Layout } from '../components/Layout';
import { PATHS } from '@/features/navigation/paths';

export const HomePage = ({ categories, address }) => {
  const [ topCasino, setTopCasino ] = useState([]);
  const [ topLiveGames, setTopLiveGames ] = useState([]);
  const [ topCrash, setTopCrash ] = useState([]);
  const {contextData} = useContext(AppContext);
  const [isLoading, setIsLoading] = useState(true);
  const [betsData, setBetsData] = useState([])
  const calledRef = useRef(false);
  const [topGames, setTopGames] = useState([]);
  const [topLiveCasino, setTopLiveCasino] = useState([]);
  const [topCrashGames, setTopCrashGames] = useState([]);

  const getCategories = () => {
    callApi(contextData, "GET", "/get-status", callbackGetCategories, null);
  };

  const callbackGetCategories = (result) => {
    if (result.status === 500 || result.status === 422) {
      setMessageCustomAlert(["error", result.message]);
    } else {
      setTopGames(result.top_slot);
      setTopLiveCasino(result.top_livecasino);
      setTopCrashGames(result.top_arcade);
    }
  };

  useEffect(() => {
    if (calledRef.current) return;
    calledRef.current = true;
    handleMybet();
    getCategories();
  }, []);
 
  useEffect(() => {
    if (topGames && topGames.length > 0) {
      const games = topGames.map(game => {
        let imageDataSrc = game.image_url;
        if (game.image_local !== null) {
          imageDataSrc = contextData.cdnUrl + game.image_local;
        }
        return {
          id: game.id,
          title: game.name,
          players: game.plays,
          image: imageDataSrc,
        };
      });
      setTopCasino(games);
    }
  }, [topGames]);

  const handleMybet = (async () => {
    try {
      const winnerData = await getAllWinners();
      setBetsData(winnerData || []);
    }
    catch (err) {
      showErrorToast("¡Error del servidor!")
    }
  })

  const getAllWinners = () =>
    new Promise((resolve) => {
      callApi(contextData, "GET", '/get-prize-ranking', (result) => {
        if (result.status === 500 || result.status === 422) resolve({});
        else resolve(result.data);
      });
    });

  useEffect(() => {
    if (topLiveCasino && topLiveCasino.length > 0) {
      const games = topLiveCasino.map(game => {
        let imageDataSrc = game.image_url;
        if (game.image_local !== null) {
          imageDataSrc = contextData.cdnUrl + game.image_local;
        }
        return {
          id: game.id,
          title: game.name,
          players: game.plays,
          image: imageDataSrc,
        };
      });
      setTopLiveGames(games);
    }
  }, [topLiveCasino]);

  useEffect(() => {
    if (topCrashGames && topCrashGames.length > 0) {
      const games = topCrashGames.map(game => {
        let imageDataSrc = game.image_url;
        if (game.image_local !== null) {
          imageDataSrc = contextData.cdnUrl + game.image_local;
        }
        return {
          id: game.id,
          title: game.name,
          players: game.plays,
          image: imageDataSrc,
        };
      });
      setTopCrash(games);
    }
  }, [topCrashGames]);

  useEffect(() => {
    const hasAllData =
      topGames && topGames.length > 0 &&
      topLiveCasino && topLiveCasino.length > 0 &&
      topCrashGames && topCrashGames.length > 0;
  
    if (hasAllData) {
      setIsLoading(false);
    }
  }, [topGames, topLiveCasino, topCrashGames]);

  const Spinner = () => (
    <div className="flex items-center justify-center h-screen">
      <div className="w-10 h-10 border-4 border-gray-300 border-t-primary rounded-full animate-spin"></div>
    </div>
  );

  if (isLoading) {
    return (
        <Spinner />
    );
  }

  return (
    <Layout address={address} >
      <main>
        <HeroSection />
        
        <ProviderFilter providers={categories}/>

        {topGames.length > 0 && (
          <GameSection
            title="Juegos Principales"
            games={topCasino}
            icon={Slots}
            link={PATHS.casino}
            // icon={<Star className="h-6 w-6 text-primary fill-primary" />}
          />
        )}

        {topLiveCasino.length > 0 && (
          <GameSection
            title="Mejor Casino en Vivo"
            games={topLiveGames}
            icon={Nuevos}
            link={PATHS.liveCasino}
          />
        )}

        {topCrashGames.length > 0 && (
          <GameSection
            title="Mejores Juegos de Crash"
            games={topCrash}
            icon={BlackJack}
            link={PATHS.crash}
          />
        )}
        <BetsLogSection betsData={betsData} />
        <PromoCards />
      </main>

    </Layout>      
  );
};