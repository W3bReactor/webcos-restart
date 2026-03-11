import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { type ThemeProviderProps } from 'next-themes';



export const ThemeProvider = ({ children }: ThemeProviderProps) => {
    return (
        <NextThemesProvider defaultTheme={'dark'}>
            {children}
        </NextThemesProvider>
    );
};