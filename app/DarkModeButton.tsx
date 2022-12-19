'use client';
import { useTheme } from 'next-themes';
import { useState, useEffect } from 'react';
import { MoonIcon, SunIcon } from '@heroicons/react/24/solid';

function DarkModeButton() {
  const [mounted, setMounted] = useState(false);
  const { systemTheme, theme, setTheme } = useTheme();

  // When mounted on client, now we can show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const currentTheme = theme === 'system' ? systemTheme : theme;

  return (
    <div>
      {currentTheme === 'dark' ? (
        <SunIcon
          className="h-8 w-8 text-yellow-500 pr-4"
          onClick={() => setTheme('light')}
        />
      ) : (
        <MoonIcon
          className="h-8 w-8 text-gray-900 pr-4"
          onClick={() => setTheme('dark')}
        />
      )}
    </div>
  );
}

export default DarkModeButton;
