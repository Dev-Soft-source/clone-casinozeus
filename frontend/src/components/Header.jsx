import React, { useState } from 'react';
import { Search, User, Menu, X } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Label } from './ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

export const Header = ({ onSearch }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    if (onSearch) {
      onSearch(value);
    }
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center space-x-8">
              <a href="/" className="flex items-center space-x-2">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                  <span className="text-xl font-bold text-white">CN</span>
                </div>
                <span className="text-xl font-bold hidden sm:block">
                  CASINO<span className="text-primary">XTREME</span>
                </span>
              </a>

              {/* Desktop Navigation */}
              <nav className="hidden lg:flex items-center space-x-6">
                <a href="#casino" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Casino en Vivo
                </a>
                <a href="#slots" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Slots
                </a>
                <a href="#deportes" className="text-sm text-primary font-medium hover:text-primary/80 transition-colors">
                  Deportes
                </a>
                <a href="#soporte" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Soporte
                </a>
              </nav>
            </div>

            {/* Right Section */}
            <div className="flex items-center space-x-4">
              {/* Search - Hidden on mobile */}
              <div className="hidden md:block relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Buscar juegos..."
                  value={searchQuery}
                  onChange={handleSearch}
                  className="pl-10 w-64 bg-secondary/50 border-border/50 focus:border-primary/50"
                />
              </div>

              {/* Balance Display */}
              <div className="hidden sm:flex items-center space-x-2 bg-gradient-to-r from-primary/20 to-accent/20 px-4 py-2 rounded-full border border-primary/30">
                <span className="text-xs text-muted-foreground">Saldo:</span>
                <span className="text-sm font-bold text-foreground">$320.50</span>
              </div>

              {/* User Button */}
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full"
                onClick={() => setIsAuthOpen(true)}
              >
                <User className="h-5 w-5" />
              </Button>

              {/* Mobile Menu Toggle */}
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>

          {/* Mobile Search */}
          <div className="md:hidden pb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Buscar juegos..."
                value={searchQuery}
                onChange={handleSearch}
                className="pl-10 w-full bg-secondary/50 border-border/50"
              />
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-border bg-card">
            <nav className="container mx-auto px-4 py-4 flex flex-col space-y-4">
              <a href="#casino" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Casino en Vivo
              </a>
              <a href="#slots" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Slots
              </a>
              <a href="#deportes" className="text-sm text-primary font-medium">
                Deportes
              </a>
              <a href="#soporte" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Soporte
              </a>
            </nav>
          </div>
        )}
      </header>

      {/* Auth Dialog */}
      <Dialog open={isAuthOpen} onOpenChange={setIsAuthOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Bienvenido</DialogTitle>
            <DialogDescription>
              Inicia sesión o crea una cuenta para empezar a jugar
            </DialogDescription>
          </DialogHeader>
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Iniciar Sesión</TabsTrigger>
              <TabsTrigger value="register">Registrarse</TabsTrigger>
            </TabsList>
            <TabsContent value="login" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Correo Electrónico</Label>
                <Input id="email" type="email" placeholder="tu@email.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Contraseña</Label>
                <Input id="password" type="password" placeholder="••••••••" />
              </div>
              <Button className="w-full" onClick={() => setIsAuthOpen(false)}>
                Iniciar Sesión
              </Button>
            </TabsContent>
            <TabsContent value="register" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nombre Completo</Label>
                <Input id="name" placeholder="Juan Pérez" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email-reg">Correo Electrónico</Label>
                <Input id="email-reg" type="email" placeholder="tu@email.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password-reg">Contraseña</Label>
                <Input id="password-reg" type="password" placeholder="••••••••" />
              </div>
              <Button className="w-full" onClick={() => setIsAuthOpen(false)}>
                Crear Cuenta
              </Button>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>
    </>
  );
};