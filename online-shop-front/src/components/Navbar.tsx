import { Link } from "react-router-dom"
import { CartIcon, HomeIcon, SearchIcon, UserIcon } from "./Icons"

export default function Navbar() {
	return (
		<header className="sticky top-0 bg-amber-50 border-b shadow-sm z-50 h-14">
			<div className="w-[85%] mx-auto flex items-center justify-between px-4 py-3">
				<div>logo</div>
				<div className="border flex flex-row items-center py-1 px-2 bg-white rounded-sm gap-2">
					<input type="text" className=" outline-0" />
					<SearchIcon size={20} />
				</div>
				<nav className="flex items-center gap-6 text-sm">
					<Link to="/cart">
						<CartIcon size={24} />
					</Link>
					<Link to="/profile">
						<UserIcon size={24} />
					</Link>
					<Link to="/home">
						<HomeIcon size={24} />
					</Link>
				</nav>
			</div>
		</header>
	)
}
