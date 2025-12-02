import React, { useState } from "react";
import { Search, User, Menu, X } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "./ui/dialog";
import { Label } from "./ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { ReactComponent as CasinoZeus } from "../assets/img/domains/casinozeus.svg";
import Profile from "../assets/custom-icons/misc/perfil.png";
import Dinero from "../assets/custom-icons/misc/dinero.png";

export const Header = ({ onSearch }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    if (onSearch) {
      onSearch(value);
    }
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#1e1e1e] backdrop-blur-sm border-b border-border">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-[1fr_auto_1fr] items-center h-16">
            {/* LEFT - Logo */}
            <div className="flex items-center justify-start">
              <a href="/">
                <CasinoZeus alt="logo" className="h-9 w-auto" />
              </a>
            </div>

            {/* CENTER - Navigation */}
            <nav className="hidden lg:flex items-center justify-center space-x-4">
              <a
                href="#casino"
                className="text-muted-foreground text-sm hover:text-foreground transition-colors"
              >
                Casino en Vivo
              </a>

              <span className="h-5 w-px bg-gray-500/40" />

              <a
                href="#slots"
                className="text-muted-foreground text-sm hover:text-foreground transition-colors"
              >
                Slots
              </a>

              <span className="h-5 w-px bg-gray-500/40" />

              <a
                href="#deportes"
                className="text-muted-foreground text-sm hover:text-foreground transition-colors"
              >
                Deportes
              </a>

              <span className="h-5 w-px bg-gray-500/40" />

              <a
                href="#soporte"
                className="text-muted-foreground text-sm hover:text-foreground transition-colors"
              >
                Soporte
              </a>
            </nav>

            {/* RIGHT - Search + Balance + User */}
            <div className="flex items-center justify-end space-x-4">
              {/* Search */}
              {/* <div className="hidden md:block relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Buscar juegos..."
                  value={searchQuery}
                  onChange={handleSearch}
                  className="pl-10 w-64 bg-secondary/50 border-border/50 focus:border-primary/50"
                />
              </div> */}

              <Button variant="ghost" size="icon" className="rounded-full bg-[#1a1a1a] hover:bg-[#1a1a1a]" >
                <img src={Profile} className="w-5 h-5" />
              </Button>

              {/* Balance */}
              <div className="hidden sm:flex items-center space-x-1 bg-gradient-to-r from-[#c22653] to-[#8b1e40] px-2 rounded-full shadow-inner">
                <div className=" rounded-full p-1 flex items-center justify-center">
                  <img src={Dinero} className="w-5 h-5" />
                </div>

                <span className="text-xs font-semibold text-white tracking-wide">
                  ARS 0
                </span>
              </div>

              {/* User BTN */}

              {/* Mobile menu */}
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </Button>
            </div>
          </div>

          {/* Mobile Search
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
          </div> */}
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-border bg-card">
            <nav className="container mx-auto px-4 py-4 flex flex-col space-y-4">
              <a
                href="#casino"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Casino en Vivo
              </a>
              <a
                href="#slots"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Slots
              </a>
              <a
                href="#deportes"
                className="text-sm text-muted-foreground font-medium"
              >
                Deportes
              </a>
              <a
                href="#soporte"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
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
                <Input
                  id="password-reg"
                  type="password"
                  placeholder="••••••••"
                />
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
