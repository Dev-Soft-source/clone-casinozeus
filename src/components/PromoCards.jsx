import React from 'react';
import { Button } from './ui/button';
import { Trophy, Sparkles, Video } from 'lucide-react';

export const PromoCards = () => {
  const promos = [
    {
      id: 1,
      title: 'TODOS LOS DEPORTES',
      subtitle: 'Las mejores cuotas',
      image: 'https://images.unsplash.com/photo-1764438344341-d4700ad674f0',
      buttonText: 'APOSTA YA',
      gradient: 'from-blue-600/80 to-cyan-600/80',
      icon: Trophy,
    },
    {
      id: 2,
      title: 'LOS MEJORES SLOTS',
      subtitle: 'Miles de juegos disponibles',
      image: 'https://images.unsplash.com/photo-1636583133884-fbefc7ac3fb3',
      buttonText: 'JUGA YA!',
      gradient: 'from-purple-600/80 to-pink-600/80',
      icon: Sparkles,
    },
    {
      id: 3,
      title: 'CASINO EN VIVO',
      subtitle: 'Dealers en vivo 24/7',
      image: 'https://images.pexels.com/photos/5920857/pexels-photo-5920857.jpeg',
      buttonText: 'JUGA YA!',
      gradient: 'from-amber-600/80 to-orange-600/80',
      icon: Video,
    },
  ];

  return (
    <section className="py-12 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                <div className={`absolute inset-0 bg-gradient-to-br ${promo.gradient} mix-blend-multiply`} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                
                {/* Content */}
                <div className="relative h-full flex flex-col justify-end p-8">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="inline-flex items-center space-x-2 mb-2">
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                      <h3 className="text-2xl sm:text-3xl font-bold text-white leading-tight">
                        {promo.title}
                      </h3>
                      <p className="text-white/90 text-sm">{promo.subtitle}</p>
                    </div>
                    
                    <Button 
                      size="lg"
                      className="bg-white/20 backdrop-blur-sm border-2 border-white/40 hover:bg-white/30 text-white font-bold rounded-full shadow-lg w-full sm:w-auto"
                    >
                      {promo.buttonText}
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};