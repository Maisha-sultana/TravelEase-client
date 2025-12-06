import React, { createContext, useContext, useState, useEffect } from 'react';

export const ThemeContext = createContext(null);

export const useTheme = () => useContext(ThemeContext);

const ThemeProvider = ({ children }) => {
  
    const [theme, setTheme] = useState(() => {
        const localTheme = localStorage.getItem('app-theme');
        return localTheme || 'light';
    });

    useEffect(() => {
        localStorage.setItem('app-theme', theme);
        // Applies 'light-theme' or 'dark-theme' class to the body
        document.body.className = `${theme}-theme`;
    }, [theme]);

    const toggleTheme = () => {
        setTheme(currentTheme => (currentTheme === 'light' ? 'dark' : 'light'));
    };

    const themeInfo = {
        theme,
        toggleTheme,
    };

    return (
        <ThemeContext.Provider value={themeInfo}>
            {children}
        </ThemeContext.Provider>
    );
};

export default ThemeProvider;