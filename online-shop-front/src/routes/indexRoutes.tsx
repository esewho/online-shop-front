import { Route, Routes } from "react-router-dom"
import LayoutApp from "../components/LayoutApp"
import Dashboard from "../components/Dashboard"
import ProductDetail from "../components/ProductDetail"
import Cart from "../components/Cart"
export default function IndexRoutes() {
	const authed = Boolean(localStorage.getItem("accessToken"))

	return (
		<>
			<Routes>
				{/* <Route path="auth/register" element={<RegisterForm />} /> */}

				<Route element={<LayoutApp />}>
					<Route path="/home" element={<Dashboard />} />
					<Route path="/home/products/:id" element={<ProductDetail />} />
					<Route path="/home/cart" element={<Cart />} />
				</Route>
			</Routes>
		</>
	)
}
