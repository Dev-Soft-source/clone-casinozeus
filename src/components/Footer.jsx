import React from 'react';
import { Facebook, Twitter, Instagram, Youtube, Mail } from 'lucide-react';
import { ReactComponent as CasinoZeusBlanco } from '../assets/img/domains/casinozeus.svg';
import { Separator } from './ui/separator';

export const Footer = () => {
  return (
    <footer className="bg-card border-t border-border mt-12 bg-[#222]">
      <div className="container mx-auto px-2 py-12">
        
        {/* Main Footer Content */}
        <div className="grid grid-cols-3 mb-8">
          
          {/* Brand */}
          <div className="flex flex-col items-start">
            <a href="/">
              <CasinoZeusBlanco alt="logo" className="h-10" />
            </a>
          </div>

          {/* Soporte (Centered Column) */}
          <div className="flex flex-col items-center">
            <h3 className="font-semibold mb-4">SOPORTE</h3>
            <ul className="space-y-2 text-sm text-muted-foreground text-center">
              <li><a href="#" className="hover:text-foreground transition-colors">Centro de ayuda</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Juego responsable</a></li>
            </ul>
          </div>

          {/* Legal (Right Column) */}
          <div className="flex flex-col items-end">
            <h3 className="font-semibold mb-4">LEGAL</h3>
            <ul className="space-y-2 text-sm text-muted-foreground text-right">
              <li><a href="#" className="hover:text-foreground transition-colors">Términos y condiciones</a></li>
              <li><a href="#" className="hover:text-foreground transition-colors">Política de privacidad</a></li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
<div className="flex justify-center items-center">
  <p className="text-sm text-muted-foreground">
    ©2025. Todos los derechos reservados.
  </p>
</div>


      </div>
    </footer>
  );
};
