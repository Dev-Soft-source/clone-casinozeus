import React from 'react';
import { Facebook, Twitter, Instagram, Youtube, Mail } from 'lucide-react';
import { Separator } from './ui/separator';

export const Footer = () => {
  return (
    <footer className="bg-card border-t border-border mt-12">
      <div className="container mx-auto px-4 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <span className="text-xl font-bold text-white">CN</span>
              </div>
              <span className="text-xl font-bold">
                CASINO<span className="text-primary">XTREME</span>
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              La mejor experiencia de casino online con juegos de alta calidad y soporte 24/7.
            </p>
            {/* Social Links */}
            <div className="flex space-x-4">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Soporte */}
          <div>
            <h3 className="font-semibold mb-4">SOPORTE</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-foreground transition-colors">Centro de ayuda</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Preguntas frecuentes</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Chat en vivo</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Contacto</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold mb-4">LEGAL</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-foreground transition-colors">Términos y condiciones</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Política de privacidad</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Juego responsable</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Licencias</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-semibold mb-4">NEWSLETTER</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Suscríbete para recibir las mejores ofertas y promociones
            </p>
            <div className="flex space-x-2">
              <input
                type="email"
                placeholder="tu@email.com"
                className="flex-1 px-3 py-2 bg-secondary border border-border rounded-lg text-sm focus:outline-none focus:border-primary"
              />
              <button className="bg-primary hover:bg-primary/90 text-white p-2 rounded-lg transition-colors">
                <Mail className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        <Separator className="my-8" />

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-sm text-muted-foreground text-center md:text-left">
            ©2025. Todos los derechos reservados.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-xs text-muted-foreground">
            <span>Casino en ayuda</span>
            <span>•</span>
            <span>Apuestas deportivas</span>
            <span>•</span>
            <span>Juego responsable</span>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-8 p-4 bg-secondary/50 rounded-lg border border-border">
          <p className="text-xs text-muted-foreground text-center">
            Advertencia: El juego puede ser adictivo. Juega con responsabilidad. Solo para mayores de 18 años.
            Si crees que tienes un problema con el juego, busca ayuda profesional.
          </p>
        </div>
      </div>
    </footer>
  );
};