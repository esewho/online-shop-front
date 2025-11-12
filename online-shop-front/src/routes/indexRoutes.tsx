import { Route, Routes } from "react-router-dom"
import LayoutApp from "../components/LayoutApp"
import Dashboard from "../components/Dashboard"
import ProductDetail from "../components/ProductDetail"
import Cart from "../components/Cart"
import ProtectedRoute from "./ProtectedRoute"
import ProfilePage from "../components/ProfilePage"
import RegisterForm from "../components/RegisterForm"
import LoginForm from "../components/LoginForm"
export default function IndexRoutes() {
	return (
		<>
			<Routes>
				<Route path="auth/register" element={<RegisterForm />} />
				<Route path="auth/login" element={<LoginForm />} />

				<Route element={<LayoutApp />}>
					<Route path="/home" element={<Dashboard />} />
					<Route path="/home/products/:id" element={<ProductDetail />} />
					<Route path="/home/cart" element={<Cart />} />
				</Route>

				<Route
					path="/profile/me"
					element={
						<ProtectedRoute>
							<ProfilePage />
						</ProtectedRoute>
					}
				></Route>
			</Routes>
		</>
	)
}
