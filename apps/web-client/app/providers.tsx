"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import React, { createContext, useContext, useEffect, useState } from "react";

export type ThemeContextType = {
  accentColor: string;
  setAccentColor: (color: string) => void;
  density: 'Compact' | 'Comfortable';
  setDensity: (density: 'Compact' | 'Comfortable') => void;
};

const ThemeContext = createContext<ThemeContextType>({
  accentColor: '#0061FF',
  setAccentColor: () => {},
  density: 'Comfortable',
  setDensity: () => {}
});

export const useAppTheme = () => useContext(ThemeContext);

export function Providers({ children }: { children: React.ReactNode }) {
  const [accentColor, setAccentColor] = useState('#0061FF');
  const [density, setDensity] = useState<'Compact' | 'Comfortable'>('Comfortable');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedAccent = localStorage.getItem('accentColor');
    if (savedAccent) setAccentColor(savedAccent);
    const savedDensity = localStorage.getItem('density') as 'Compact' | 'Comfortable';
    if (savedDensity) setDensity(savedDensity);
  }, []);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem('accentColor', accentColor);
      localStorage.setItem('density', density);
    }
  }, [accentColor, density, mounted]);

  return (
    <NextThemesProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <ThemeContext.Provider value={{ accentColor, setAccentColor, density, setDensity }}>
        {mounted && (
          <style dangerouslySetInnerHTML={{ __html: `:root { --color-accent: ${accentColor}; }` }} />
        )}
        <div className={density === 'Compact' ? 'density-compact' : 'density-comfortable'}>
          {children}
        </div>
      </ThemeContext.Provider>
    </NextThemesProvider>
  );
}
