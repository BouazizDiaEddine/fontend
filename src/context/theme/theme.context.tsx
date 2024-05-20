import React, { Dispatch, SetStateAction,createContext,useState, PropsWithChildren } from 'react';
import { THEMES } from './theme.config';
import { ThemeType, Theme } from './theme.model';

interface ThemeContextProps {
    themeType: ThemeType;
    theme: Theme,
    setCurrentTheme: Dispatch<SetStateAction<ThemeType>>
}

export const ThemeContext = createContext<ThemeContextProps>({
    themeType: 'green',
    theme: THEMES['green'],
} as ThemeContextProps);

export const ThemeProvider: React.FC<PropsWithChildren> = ({ children }) => {
    const [currentTheme, setCurrentTheme] = useState<ThemeType>('green');

    return (
        <ThemeContext.Provider value={{
            themeType: currentTheme,
            theme: THEMES[currentTheme],
            setCurrentTheme,
        }}>
            {children}
        </ThemeContext.Provider>
    )
}
export const useTheme = () => React.useContext(ThemeContext);
