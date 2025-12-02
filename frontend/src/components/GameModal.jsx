import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Play, Star, Info, ExternalLink } from 'lucide-react';
import { Separator } from './ui/separator';

export const GameModal = ({ game, isOpen, onClose }) => {
  if (!game) return null;

  const handlePlayNow = () => {
    // Mock: In real app, this would launch the game
    console.log('Launching game:', game.title);
    // Simulate opening game in new window
    alert(`Lanzando ${game.title}... (Demo: esto abriría el juego en una nueva ventana)`);
  };

  const handlePlayDemo = () => {
    console.log('Launching demo for:', game.title);
    alert(`Modo demo de ${game.title}... (Demo: esto abriría la versión de prueba)`);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold flex items-center">
            {game.title}
            {game.isHot && (
              <Badge className="ml-2 bg-accent">
                <Star className="h-3 w-3 mr-1 fill-white" />
                Popular
              </Badge>
            )}
            {game.isNew && (
              <Badge className="ml-2 bg-primary">Nuevo</Badge>
            )}
          </DialogTitle>
          <DialogDescription>
            {game.provider && `Por ${game.provider}`}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Game Image */}
          <div className="aspect-video overflow-hidden rounded-lg bg-secondary">
            <img
              src={game.image}
              alt={game.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Game Info */}
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground">Proveedor</p>
                <p className="font-semibold">{game.provider || 'N/A'}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Categoría</p>
                <p className="font-semibold">{game.category || 'Slot'}</p>
              </div>
              <div>
                <p className="text-muted-foreground">RTP</p>
                <p className="font-semibold">{game.rtp || '96.5%'}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Volatilidad</p>
                <p className="font-semibold">{game.volatility || 'Media'}</p>
              </div>
            </div>

            <Separator />

            {/* Game Description */}
            <div>
              <h4 className="font-semibold mb-2 flex items-center">
                <Info className="h-4 w-4 mr-2" />
                Descripción
              </h4>
              <p className="text-sm text-muted-foreground">
                {game.description || 
                  `${game.title} es un emocionante juego de casino que ofrece grandes premios y entretenimiento sin fin. Disfruta de gráficos impresionantes y una jugabilidad inmersiva.`}
              </p>
            </div>

            {/* Game Features */}
            <div>
              <h4 className="font-semibold mb-2">Características</h4>
              <div className="flex flex-wrap gap-2">
                {game.features?.map((feature, index) => (
                  <Badge key={index} variant="outline">{feature}</Badge>
                )) || (
                  <>
                    <Badge variant="outline">Giros Gratis</Badge>
                    <Badge variant="outline">Multiplicadores</Badge>
                    <Badge variant="outline">Bonus Round</Badge>
                    <Badge variant="outline">Wild Symbols</Badge>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              size="lg"
              className="flex-1 bg-gradient-to-r from-primary to-accent hover:opacity-90 text-white font-bold"
              onClick={handlePlayNow}
            >
              <Play className="mr-2 h-5 w-5 fill-white" />
              Jugar Ahora
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="flex-1"
              onClick={handlePlayDemo}
            >
              <ExternalLink className="mr-2 h-4 w-4" />
              Jugar Demo
            </Button>
          </div>

          {/* Disclaimer */}
          <p className="text-xs text-muted-foreground text-center">
            Juego responsable. +18 años. Aplican términos y condiciones.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};