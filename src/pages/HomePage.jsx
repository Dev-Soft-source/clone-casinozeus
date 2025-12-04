import React, { useState, useMemo } from 'react';
import { HeroSection } from '../components/HeroSection';
import { ProviderFilter } from '../components/ProviderFilter';
import { GameSection } from '../components/GameSection';
import { PromoCards } from '../components/PromoCards';
import { GameModal } from '../components/GameModal';
import { Sparkles, Star, Video, Zap, Clock } from 'lucide-react';
import Slots from '../assets/custom-icons/slots.png';
import Megaways from '../assets/custom-icons/megaways.png';
import Nuevos from '../assets/custom-icons/nuevo.webp';
import BlackJack from '../assets/custom-icons/blackjack.webp';
import { Layout } from '../components/Layout';

import {
  topSlotsGames,
  newGames,
  liveCasinoGames,
  megawaysGames,
  recentlyPlayedGames,
  providers,
} from '../data/mockGames';

export const HomePage = () => {
  const [selectedProvider, setSelectedProvider] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGame, setSelectedGame] = useState(null);
  const [isGameModalOpen, setIsGameModalOpen] = useState(false);

  // Filter games based on provider and search
  const filterGames = (games) => {
    return games.filter((game) => {
      const matchesProvider = selectedProvider === 'all' || game.provider === selectedProvider;
      const matchesSearch = game.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           (game.provider && game.provider.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesProvider && matchesSearch;
    });
  };
  


  const filteredTopSlots = useMemo(() => filterGames(topSlotsGames), [selectedProvider, searchQuery]);
  const filteredNewGames = useMemo(() => filterGames(newGames), [selectedProvider, searchQuery]);
  const filteredLiveCasino = useMemo(() => filterGames(liveCasinoGames), [selectedProvider, searchQuery]);
  const filteredMegaways = useMemo(() => filterGames(megawaysGames), [selectedProvider, searchQuery]);

  const handleGameClick = (game) => {
    setSelectedGame(game);
    setIsGameModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsGameModalOpen(false);
    setTimeout(() => setSelectedGame(null), 300);
  };

  return (
    <Layout onSearch={setSearchQuery}>
      <main>
        <HeroSection />
        
        <ProviderFilter
          providers={providers}
          selectedProvider={selectedProvider}
          onProviderChange={setSelectedProvider}
        />

        {/* Show message if search returns no results */}
        {searchQuery && (
          filteredTopSlots.length === 0 &&
          filteredNewGames.length === 0 &&
          filteredLiveCasino.length === 0 &&
          filteredMegaways.length === 0
        ) && (
          <div className="container mx-auto px-4 py-12 text-center">
            <p className="text-muted-foreground">
              No se encontraron juegos para "{searchQuery}"
            </p>
          </div>
        )}

        {filteredTopSlots.length > 0 && (
          <GameSection
            title="Top Slots"
            games={filteredTopSlots}
            onGameClick={handleGameClick}
            icon={Slots}
            // icon={<Star className="h-6 w-6 text-primary fill-primary" />}
          />
        )}

        {filteredNewGames.length > 0 && (
          <GameSection
            title="Nuevos"
            games={filteredNewGames}
            onGameClick={handleGameClick}
            icon={Nuevos}
          />
        )}

        {filteredLiveCasino.length > 0 && (
          <GameSection
            title="Top Live Casino"
            games={filteredLiveCasino}
            onGameClick={handleGameClick}
            icon={BlackJack}
          />
        )}

        {filteredMegaways.length > 0 && (
          <GameSection
            title="Megaways"
            games={filteredMegaways}
            onGameClick={handleGameClick}
            icon={Megaways}
          />
        )}
        
        <PromoCards />
      </main>

      <GameModal
        game={selectedGame}
        isOpen={isGameModalOpen}
        onClose={handleCloseModal}
      />
    </Layout>      
  );
};