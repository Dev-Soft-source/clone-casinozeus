import React from 'react';
import { Play, Star } from 'lucide-react';
import { Badge } from './ui/badge';

export const GameCard = ({ game, onClick }) => {
  return (
    <div className="game-card border-2 border-[#4b4a4a] group relative" onClick={() => onClick(game)}>
      {/* Game Image */}
      <div className="aspect-[4/3] overflow-hidden rounded-lg bg-secondary">
        <img
          src={game.image}
          alt={game.title}
          className="w-full h-full object-cover"
        />

        {/* Hover Overlay */}
        <div
          className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 
                transition-opacity duration-300 flex items-center justify-center"
        >
          {/* OUTER BLACK CIRCLE */}
          <div
            className="w-14 h-14 rounded-full bg-black/60 backdrop-blur-md 
                  flex items-center justify-center"
          >
            {/* INNER WHITE CIRCLE */}
            <div className="w-8 h-8 rounded-full border-2 border-white/80 flex items-center justify-center">
              {/* Play Icon */}
              <Play className="h-5 w-5 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Hot/Popular Badge */}
      {game.isHot && (
        <div className="absolute top-2 right-2">
          <div className="bg-accent rounded-full p-1.5 shadow-lg">
            <Star className="h-3 w-3 text-white fill-white" />
          </div>
        </div>
      )}
    </div>
  );
};