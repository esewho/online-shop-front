import { Outlet } from "react-router-dom"

import Navbar from "./Navbar"

export default function LayoutApp() {
	// if (loading) {
	// 	return <div>Loading...</div>
	// }

	// if (error) {
	// 	return <div>Error: {error}</div>
	// }
	return (
		<div className="min-h-screen flex flex-col ">
			<Navbar />
			<main className="flex-1 flex flex-col px-10 py-6 items-center overflow-x-hidden">
				<div className="w-full h-full max-w-7xl">
					<Outlet />
				</div>
			</main>
		</div>
	)
}
