import { createRoot } from "react-dom/client"
import App from "./App.tsx"
import { Toaster } from "react-hot-toast"
import { BrowserRouter } from "react-router-dom"
import { CartItemProvider } from "./context/CartItemContext.tsx"
// import { ProfileProvider } from "./context/ProfileContext.tsx"
import { AuthProvider } from "./context/LoginContext.tsx"
import { ThemeProvider } from "./context/DarkThemeContext.tsx"
import "react-range-slider-input/dist/style.css"
import "./index.css"

createRoot(document.getElementById("root")!).render(
	<>
		<Toaster position="bottom-center" reverseOrder={false} />
		<BrowserRouter>
			<ThemeProvider>
				<AuthProvider>
					{/* <ProfileProvider> */}
					<CartItemProvider>
						<App />
					</CartItemProvider>
					{/* </ProfileProvider> */}
				</AuthProvider>
			</ThemeProvider>
		</BrowserRouter>
	</>
)
