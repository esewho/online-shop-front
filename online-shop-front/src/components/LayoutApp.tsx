import { Outlet } from "react-router-dom"

import Navbar from "./Navbar"

export default function LayoutApp() {
	return (
		<div className="min-h-screen">
			<Navbar />
			<main className="flex flex-col h-full px-10 py-6 justify-center items-center overflow-x-hidden">
				<div className="gap-6 items-center">
					<Outlet />
				</div>
			</main>
		</div>
	)
}
