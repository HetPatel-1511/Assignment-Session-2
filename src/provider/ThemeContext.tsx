import React, { createContext, useContext, useState, type JSX } from 'react'

export const ThemeContext = createContext<{
  theme: string,
  setTheme: Function
}>({ theme: "light", setTheme: () => { } });

export default function ThemeProvider({ children }: { children: JSX.Element }) {
  const defaultTheme = localStorage.getItem("theme")
  const [theme, setTheme] = useState(defaultTheme?defaultTheme:"light");
  const changeTheme = (themeVal: string) => {
    localStorage.setItem("theme", themeVal)
    setTheme(themeVal);
  }
  return (
    <ThemeContext.Provider value={{ theme, setTheme:changeTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

