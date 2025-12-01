import React from 'react';
import { Button } from './ui/button';
import { Building2 } from 'lucide-react';

export const ProviderFilter = ({ providers, selectedProvider, onProviderChange }) => {
  return (
    <div className="py-6 bg-secondary/50 border-y border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center space-x-4 overflow-x-auto hide-scrollbar">
          <div className="flex items-center space-x-2 text-muted-foreground whitespace-nowrap">
            <Building2 className="h-4 w-4" />
            <span className="text-sm font-medium">PROVEEDORES:</span>
          </div>
          
          <Button
            variant={selectedProvider === 'all' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => onProviderChange('all')}
            className="whitespace-nowrap rounded-full"
          >
            Todos
          </Button>
          
          {providers.map((provider) => (
            <Button
              key={provider}
              variant={selectedProvider === provider ? 'default' : 'ghost'}
              size="sm"
              onClick={() => onProviderChange(provider)}
              className="whitespace-nowrap rounded-full"
            >
              {provider}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};