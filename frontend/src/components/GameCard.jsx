import React from 'react';
import { Play, Star } from 'lucide-react';
import { Badge } from './ui/badge';

export const GameCard = ({ game, onClick }) => {
  return (
    <div 
      className="game-card group relative" 
      onClick={() => onClick(game)}
    >
      {/* Game Image */}
      <div className="aspect-[4/3] overflow-hidden rounded-lg bg-secondary">
        <img
          src={game.image}
          alt={game.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          loading="lazy"
        />
        
        {/* Overlay on Hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <div className="bg-primary/90 rounded-full p-4 transform scale-0 group-hover:scale-100 transition-transform duration-300">
            <Play className="h-6 w-6 text-white fill-white" />
          </div>
        </div>
      </div>

      {/* Game Info */}
      <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-semibold text-white truncate">
              {game.title}
            </h3>
            {game.provider && (
              <p className="text-xs text-gray-300 truncate">{game.provider}</p>
            )}
          </div>
          {game.isNew && (
            <Badge className="ml-2 bg-primary text-white text-xs">
              Nuevo
            </Badge>
          )}
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