import { Link } from "react-router-dom"
import { CartIcon, HomeIcon, LogOutIcon, SearchIcon, UserIcon } from "./Icons"
import { useCartItem } from "../context/CartItemContext"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/LoginContext"
import { useProfile } from "../context/ProfileContext"

export default function Navbar() {
	const { count } = useCartItem()
	const [query, setQuery] = useState("")
	const navigate = useNavigate()

	const { logOut, user } = useAuth()

	useEffect(() => {
		if (query === "" && location.pathname.startsWith("/home")) {
			navigate("/home")
		}
	}, [query])

	const handleSearch = () => {
		if (!query.trim()) return
		navigate(`/home?query=${encodeURIComponent(query)}`)
	}

	return (
		<header className="sticky top-0 bg-amber-50 border-b shadow-sm z-50 h-14">
			<div className="w-[85%] mx-auto flex items-center justify-between px-4 py-3">
				<div>logo</div>
				<div className="border flex flex-row items-center py-1 px-2 bg-white rounded-sm gap-2">
					<input
						placeholder="Buscar producto..."
						type="text"
						className=" outline-0 placeholder:opacity-50"
						value={query}
						onChange={(e) => setQuery(e.target.value)}
						onKeyDown={(e) => e.key === "Enter" && handleSearch()}
					/>
					<SearchIcon size={20} />
				</div>
				<nav className="flex items-center gap-6 text-sm">
					{user && (
						<p className="text-gray-700 font-semibold hidden md:block">
							Hola de nuevo, {user.name}!
						</p>
					)}
					{!user && (
						<div className="flex gap-3">
							<button
								className="underline text-blue-600 cursor-pointer"
								onClick={() => navigate("/auth/login")}
							>
								Iniciar sesión
							</button>
							<button
								onClick={() => navigate("/auth/register")}
								className="underline text-blue-600 cursor-pointer"
							>
								Registrarse
							</button>
						</div>
					)}

					<div className="relative max-w-min">
						<Link to="/home/cart">
							{count > 0 && (
								<span className="absolute bottom-6  left-3  bg-red-500 text-white text-xs font-bold px-2 py-0 rounded-full">
									{count}
								</span>
							)}

							<CartIcon size={24} />
						</Link>
					</div>

					<Link to="/profile/me">
						<UserIcon size={24} />
					</Link>
					<Link to="/home">
						<HomeIcon size={24} />
					</Link>
					<button className="cursor-pointer" onClick={logOut}>
						<LogOutIcon size={24} />
					</button>
				</nav>
			</div>
		</header>
	)
}
