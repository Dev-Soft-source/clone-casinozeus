import React from 'react';
import { Button } from './ui/button';
import { Search, User, Menu, X } from "lucide-react";
import { Input } from "./ui/input";
import { Building2 } from 'lucide-react';

export const ProviderFilter = ({ providers, selectedProvider, onProviderChange }) => {
  return (
    <div className="pt-6">
    <div className="container mx-auto px-4">
      
      <div className="flex items-center justify-center gap-4 overflow-x-auto hide-scrollbar py-2">
  
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Buscar juegos..."
            className="
              pl-10 w-64 h-8 rounded-full
              bg-secondary/50 border border-border/50
              focus-visible:ring-0
              focus-visible:border-pink-500/40
              focus-visible:shadow-[0_0_2px_2px_rgba(255,0,128,0.45)]
            "
          />
        </div>
  
        <Button
          size="sm"
          className="whitespace-nowrap rounded-full w-44 h-8 leading-none"
        >
          PROVEEDORES
        </Button>
  
      </div>
  
    </div>
  </div>
  
  );
};