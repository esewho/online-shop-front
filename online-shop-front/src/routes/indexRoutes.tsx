import { Route, Routes } from "react-router-dom"
import Profile from "../pages/Profile"
import Cart from "../pages/Cart"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import RegisterForm from "../components/RegisterForm"
import LayoutApp from "../components/LayoutApp"
import Dashboard from "../components/Dashboard"
export default function IndexRoutes() {
	const authed = Boolean(localStorage.getItem("accessToken"))

	return (
		<>
			<Routes>
				{/* <Route path="auth/register" element={<RegisterForm />} /> */}

				<Route element={<LayoutApp />}>
					<Route path="/home" element={<Dashboard />} />
				</Route>
			</Routes>
		</>
	)
}
