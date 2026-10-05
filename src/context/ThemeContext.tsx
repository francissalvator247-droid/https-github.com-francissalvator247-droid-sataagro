import React, { createContext, useContext, useEffect, useState } from 'react';
import { TextSizeMode, ThemeMode } from '../types';

interface ThemeContextType {
  theme: ThemeMode;
  toggleTheme: () => void;
  setTheme: (theme: ThemeMode) => void;
  textSize: TextSizeMode;
  toggleTextSize: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<ThemeMode>(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('sata_theme') as ThemeMode | null;
      if (savedTheme === 'light' || savedTheme === 'dark') {
        return savedTheme;
      }
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'light';
  });

  const [textSize, setTextSizeState] = useState<TextSizeMode>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('sata_text_size') as TextSizeMode | null;
      if (saved === 'standard' || saved === 'accessible-large') {
        return saved;
      }
    }
    return 'standard';
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('sata_theme', theme);
  }, [theme]);

  useEffect(() => {
    const root = document.documentElement;
    if (textSize === 'accessible-large') {
      root.classList.add('accessible-text-large');
    } else {
      root.classList.remove('accessible-text-large');
    }
    localStorage.setItem('sata_text_size', textSize);
  }, [textSize]);

  const toggleTheme = () => {
    setThemeState((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const setTheme = (newTheme: ThemeMode) => {
    setThemeState(newTheme);
  };

  const toggleTextSize = () => {
    setTextSizeState((prev) => (prev === 'standard' ? 'accessible-large' : 'standard'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme, textSize, toggleTextSize }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
