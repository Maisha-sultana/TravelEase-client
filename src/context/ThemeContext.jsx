import React, { createContext, useContext, useState, useEffect } from 'react';

export const ThemeContext = createContext(null);

export const useTheme = () => useContext(ThemeContext);

const ThemeProvider = ({ children }) => {
    // 1. Initialize theme from localStorage or default to 'light'
    const [theme, setTheme] = useState(() => {
        const localTheme = localStorage.getItem('app-theme');
        return localTheme || 'light';
    });

    // 2. Effect to save theme to localStorage and apply class to body
    useEffect(() => {
        localStorage.setItem('app-theme', theme);
        // Applies 'light-theme' or 'dark-theme' class to the body
        document.body.className = `${theme}-theme`;
    }, [theme]);

    // 3. Toggle function
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