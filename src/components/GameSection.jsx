import React from 'react';
import { GameCard } from './GameCard';
import { Button } from './ui/button';
import { ChevronRight } from 'lucide-react';

export const GameSection = ({ title, games, onGameClick, icon }) => {
  

  return (
    <section className="py-8">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            {icon && <span className="text-2xl">{icon}</span>}
            <h2 className="text-2xl sm:text-3xl font-bold">{title}</h2>
          </div>
          <Button variant="ghost" className="text-primary hover:text-primary/80">
            Ver Más
            <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        </div>

        {/* Games Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {games.map((game) => (
            <GameCard key={game.id} game={game} onClick={onGameClick} />
          ))}
        </div>
      </div>
    </section>
  );
};