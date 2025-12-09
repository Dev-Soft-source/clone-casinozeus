import React, {useState, useEffect, useContext} from 'react';
import { Play} from 'lucide-react';
import Placeholder from '../assets/img/placeholder.png';
import { AppContext } from '@/AppContext';

export const GameCard = ({ game, onClick }) => {

  const [loaded, setLoaded] = useState(false);
  const [ imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    let imageDataSrc = game.image;
    setImageUrl(imageDataSrc);
  }, [game]);

  return (
    <div
      className="game-card border-2 border-[#4b4a4a] group cursor-pointer"
      onClick={() => onClick(game)}
    >
      {/* LOCKED ASPECT BOX */}
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg bg-secondary">
        
        {/* Placeholder */}
        <img
          src={Placeholder}
          alt="placeholder"
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
            loaded ? "opacity-0" : "opacity-100"
          }`}
        />

        {/* Real Image */}
        <img
          src={game.image}
          alt={game.title}
          loading="lazy"
          onLoad={() => setLoaded(true)}
          onError={(e) => {
            e.currentTarget.src = Placeholder;
            setLoaded(true);
          }}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${
            loaded ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* Hover Overlay */}
        <div
          className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100
                     transition-opacity duration-300 flex items-center justify-center"
        >
          <div className="w-14 h-14 rounded-full bg-black/60 backdrop-blur-md flex items-center justify-center">
            <div className="w-8 h-8 rounded-full border-2 border-white/80 flex items-center justify-center">
              <Play className="h-5 w-5 text-white" />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};