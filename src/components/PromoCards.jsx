import React from 'react';
import { Button } from './ui/button';
import { Trophy, Sparkles, Video } from 'lucide-react';
import Messi from '../assets/games/messi-sports.png';
import Jackpot from '../assets/games/jackpot.png';
import LiveCasino from '../assets/games/live-casino.png';

export const PromoCards = () => {
  const promos = [
    {
      id: 1,
      title: 'TODOS LOS DEPORTES',
      subtitle: 'Las mejores cuotas',
      image: Messi,
      buttonText: 'APOSTA YA',
      gradient: 'from-blue-600/80 to-cyan-600/80',
      icon: Trophy,
    },
    {
      id: 2,
      title: 'LOS MEJORES SLOTS',
      subtitle: 'Miles de juegos disponibles',
      image: Jackpot,
      buttonText: 'JUGA YA!',
      gradient: 'from-purple-600/80 to-pink-600/80',
      icon: Sparkles,
    },
    {
      id: 3,
      title: 'CASINO EN VIVO',
      subtitle: 'Dealers en vivo 24/7',
      image: LiveCasino,
      buttonText: 'JUGA YA!',
      gradient: 'from-amber-600/80 to-orange-600/80',
      icon: Video,
    },
  ];

  return (
    <section className="pt-12 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-3 gap-6">
          {promos.map((promo) => {
            const Icon = promo.icon;
            return (
              <div
                key={promo.id}
                className="group relative overflow-hidden rounded-2xl h-[300px] shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]"
              >
                {/* Background Image */}
                <img
                  src={promo.image}
                  alt={promo.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
                
                {/* Gradient Overlay */}
                
                
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};