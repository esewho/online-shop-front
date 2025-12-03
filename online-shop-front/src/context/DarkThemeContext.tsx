import React, { createContext, useContext, useState, useEffect } from "react"

type themeContextType = {
	theme: "light" | "dark"
	toggleTheme: () => void
}

const ThemeContext = createContext<themeContextType | null>(null)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
	const [theme, setTheme] = useState<"light" | "dark">(
		localStorage.getItem("theme") === "dark" ? "dark" : "light"
	)
	console.log(theme, "-------theme-------")
	useEffect(() => {
		document.documentElement.classList.toggle("dark", theme === "dark")
		localStorage.setItem("theme", theme)
	}, [theme])

	const toggleTheme = () => {
		setTheme((prev) => (prev === "light" ? "dark" : "light"))
	}

	return (
		<ThemeContext.Provider value={{ theme, toggleTheme }}>
			{children}
		</ThemeContext.Provider>
	)
}
export const useTheme = () => {
	const context = useContext(ThemeContext)
	if (!context) {
		throw new Error("useTheme must be used within a ThemeProvider")
	}
	return context
}
