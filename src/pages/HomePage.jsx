import React, { useState, useMemo } from 'react';
import { Header } from '../components/Header';
import { HeroSection } from '../components/HeroSection';
import { ProviderFilter } from '../components/ProviderFilter';
import { GameSection } from '../components/GameSection';
import { PromoCards } from '../components/PromoCards';
import { Footer } from '../components/Footer';
import { GameModal } from '../components/GameModal';
import { Sparkles, Star, Video, Zap, Clock } from 'lucide-react';
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
  const filteredRecentlyPlayed = useMemo(() => filterGames(recentlyPlayedGames), [selectedProvider, searchQuery]);

  const handleGameClick = (game) => {
    setSelectedGame(game);
    setIsGameModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsGameModalOpen(false);
    setTimeout(() => setSelectedGame(null), 300);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header onSearch={setSearchQuery} />
      
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
          filteredMegaways.length === 0 &&
          filteredRecentlyPlayed.length === 0
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
            icon={<Star className="h-6 w-6 text-primary fill-primary" />}
          />
        )}

        {filteredNewGames.length > 0 && (
          <GameSection
            title="Nuevos"
            games={filteredNewGames}
            onGameClick={handleGameClick}
            icon={<Sparkles className="h-6 w-6 text-accent" />}
          />
        )}

        {filteredLiveCasino.length > 0 && (
          <GameSection
            title="Top Live Casino"
            games={filteredLiveCasino}
            onGameClick={handleGameClick}
            icon={<Video className="h-6 w-6 text-primary" />}
          />
        )}

        {filteredMegaways.length > 0 && (
          <GameSection
            title="Megaways"
            games={filteredMegaways}
            onGameClick={handleGameClick}
            icon={<Zap className="h-6 w-6 text-accent" />}
          />
        )}

        {filteredRecentlyPlayed.length > 0 && (
          <GameSection
            title="Recientemente jugado"
            games={filteredRecentlyPlayed}
            onGameClick={handleGameClick}
            icon={<Clock className="h-6 w-6 text-muted-foreground" />}
          />
        )}

        <PromoCards />
      </main>

      <Footer />

      <GameModal
        game={selectedGame}
        isOpen={isGameModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
};