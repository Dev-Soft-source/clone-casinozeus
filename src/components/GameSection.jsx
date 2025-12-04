import React from 'react';
import { GameCard } from './GameCard';
import { Button } from './ui/button';
import { ChevronRight } from 'lucide-react';

export const GameSection = ({ title, games, onGameClick, icon }) => {
  

  return (
    <section>
      <div className="container mx-auto px-4 mt-6">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-3">
            <img src={icon} className='w-5 h-5'></img>
            {/* {icon && <span className="text-2xl">{icon}</span>} */}
            <h2 className="font-sans text-[20px] font-bold">{title}</h2>
          </div>
          <Button variant="ghost" className="text-primary hover:text-primary/80">
            Ver Más
            <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        </div>

        {/* Games Grid */}
        <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-10 xl:grid-cols-10 gap-4">
          {games.map((game) => (
            <GameCard key={game.id} game={game} onClick={onGameClick} />
          ))}
        </div>
      </div>
    </section>
  );
};