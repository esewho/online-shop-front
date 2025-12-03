import { useTheme } from "../context/DarkThemeContext"

export default function DarkThemeButton() {
	const { theme, toggleTheme } = useTheme()

	return (
		<button
			onClick={toggleTheme}
			className="p-2 rounded-md bg-none text-white cursor-pointer"
		>
			{theme === "light" ? "🌞" : "🌜"}
		</button>
	)
}
