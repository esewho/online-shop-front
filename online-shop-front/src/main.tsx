import { createRoot } from "react-dom/client"
import "./index.css"
import App from "./App.tsx"
import { Toaster } from "react-hot-toast"
import { BrowserRouter } from "react-router-dom"
import { CartItemProvider } from "./context/CartItemContext.tsx"
import { ProfileProvider } from "./context/ProfileContext.tsx"
import { AuthProvider } from "./context/LoginContext.tsx"

createRoot(document.getElementById("root")!).render(
	<>
		<Toaster position="bottom-center" reverseOrder={false} />
		<BrowserRouter>
			<AuthProvider>
				<ProfileProvider>
					<CartItemProvider>
						<App />
					</CartItemProvider>
				</ProfileProvider>
			</AuthProvider>
		</BrowserRouter>
	</>
)
