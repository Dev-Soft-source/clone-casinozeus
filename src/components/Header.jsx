import React, { useState } from "react";
import { Button } from "./ui/button";
import { LoginModal } from "./Modals/LoginModal";
import { UpdatePasswordModal } from "./Modals/UpdatePasswordModal";
import { useUser } from "@/features/user/useUser";

import { ReactComponent as CasinoZeus } from "../assets/img/domains/casinozeus.svg";
import Profile from "../assets/custom-icons/misc/perfil.png";
import Dinero from "../assets/custom-icons/misc/dinero.png";
import Unregister from "../assets/custom-icons/misc/login.png";
import MenuImg from "../assets/custom-icons/misc/menu.svg";

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isAuth, setIsAuth] = useState(true);
  const [open, setOpen] = useState(false);
  const {user, token, logOut} = useUser();

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#1e1e1e] backdrop-blur-sm border-b border-border">
        <div className="container mx-auto px-4">
          {/* Use relative to allow absolute centering of nav */}
          <div className="relative flex items-center h-16">
            {/* LEFT - Logo */}
            <div className="flex items-center">
              <a href="/">
                <CasinoZeus className="h-9 w-auto" />
              </a>
            </div>

            {/* CENTER - nav (absolute centered on desktop) */}
            <nav className="hidden lg:flex items-center absolute left-1/2 transform -translate-x-1/2 space-x-4">
              <a
                href="#casino"
                className="text-muted-foreground text-sm hover:text-foreground"
              >
                Casino en Vivo
              </a>
              <span className="h-5 w-px bg-gray-500/40" />
              <a
                href="#slots"
                className="text-muted-foreground text-sm hover:text-foreground"
              >
                Slots
              </a>
              <span className="h-5 w-px bg-gray-500/40" />
              <a
                href="#deportes"
                className="text-muted-foreground text-sm hover:text-foreground"
              >
                Deportes
              </a>
              <span className="h-5 w-px bg-gray-500/40" />
              <a
                href="#soporte"
                className="text-muted-foreground text-sm hover:text-foreground"
              >
                Soporte
              </a>
            </nav>

            {/* RIGHT - make this take remaining space so its children can align right */}
            <div className="ml-auto flex items-center space-x-4">
              {!user ? (
                <div className="relative group">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full hover:bg-[#1e1e1e]"
                    onClick={() => setIsAuthOpen(true)}
                  >
                    <img src={Unregister} className="w-3 h-3 lg:w-5 lg:h-5" />
                  </Button>

                  {/* Tooltip */}
                  <span
                    className="absolute left-1/2 -translate-x-1/2 top-full mt-2 text-sm
                                 bg-black text-white px-2 py-2 rounded 
                                 opacity-0 group-hover:opacity-100 transition"
                  >
                    Login
                  </span>
                </div>
              ) : (
                <>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full bg-[#1a1a1a] hover:bg-[#1a1a1a]"
                    onClick={() => setOpen(true)}
                  >
                    <img src={Profile} className="w-5 h-5" />
                  </Button>

                  <div className="flex items-center space-x-1 bg-gradient-to-r from-[#c22653] to-[#8b1e40] px-2 rounded-full shadow-inner">
                    <div className="rounded-full p-1 flex items-center justify-center">
                      <img src={Dinero} className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-semibold text-white tracking-wide">
                      ARS 12345
                    </span>
                  </div>
                </>
              )}

              {/* MOBILE MENU BUTTON - always at right because parent has ml-auto */}
              <Button
                className="lg:hidden bg-[#1e1e1e] hover:bg-[#1e1e1e]"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <img src={MenuImg} className="w-5 h-5"></img>
              </Button>
            </div>
          </div>
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

      {/* Auth Dialog
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
       */}
      <LoginModal open={isAuthOpen} onOpenChange={setIsAuthOpen} />

      <UpdatePasswordModal open={open} onClose={() => setOpen(false)} />
    </>
  );
};
