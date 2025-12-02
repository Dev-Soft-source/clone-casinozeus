import React from 'react';
import { Button } from './ui/button';
import { Sparkles } from 'lucide-react';

export const HeroSection = () => {
  return (
    <section className="relative mt-16 overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="relative h-[400px] md:h-[500px]">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1764438344341-d4700ad674f0?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2NzR8MHwxfHNlYXJjaHwxfHxzb2NjZXIlMjBwbGF5ZXIlMjBjZWxlYnJhdGluZ3xlbnwwfHx8fDE3NjQ2NTczNDB8MA&ixlib=rb-4.1.0&q=85"
            alt="Sports Betting Hero"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        </div>

        {/* Content */}
        <div className="relative container mx-auto px-4 h-full flex flex-col justify-center">
          <div className="max-w-2xl space-y-6">
            <div className="inline-flex items-center space-x-2 bg-primary/20 border border-primary/30 rounded-full px-4 py-2 backdrop-blur-sm">
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary">Nuevo</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight">
              GANA EN TODOS LOS
              <span className="block bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                DEPORTES
              </span>
            </h1>
            
            <p className="text-lg sm:text-xl text-muted-foreground max-w-xl">
              Las mejores cuotas y bonificaciones digitales
            </p>
            
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-primary to-accent hover:opacity-90 text-white font-semibold px-8 py-6 text-lg rounded-full shadow-lg shadow-primary/30"
            >
              <Sparkles className="mr-2 h-5 w-5" />
              APOSTA YA
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};