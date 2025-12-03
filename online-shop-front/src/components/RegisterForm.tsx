import { useState } from "react"
import { loginGuest } from "../lib/lib"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../context/LoginContext"
import toast from "react-hot-toast"

export default function RegisterForm() {
	const [name, setName] = useState("")
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")

	const navigate = useNavigate()

	const { registerAction } = useAuth()

	async function loginAsGuest() {
		let guestId = localStorage.getItem("guestId")
		if (!guestId) {
			guestId = crypto.randomUUID()
			localStorage.setItem("guestId", guestId)
		}

		const response = await loginGuest(guestId)
		localStorage.setItem("accessToken", response.accessToken)
		return guestId
	}

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		try {
			if (!name || !email || !password) {
				alert("Por favor, completa todos los campos.")
				return
			}
			if (password.length < 6) {
				alert("La contraseña debe tener al menos 6 caracteres.")
				return
			}
			if (!/\S+@\S+\.\S+/.test(email)) {
				alert("Por favor, ingresa un correo electrónico válido.")
				return
			}
			if (name.length < 2) {
				alert("El nombre debe tener al menos 2 caracteres.")
				return
			}
			if (name.length > 50) {
				alert("El nombre no puede exceder los 50 caracteres.")
				return
			}
			await registerAction({ name, email, password })
			toast.success("¡Registro exitoso! Bienvenid@.")
			navigate("/home")
		} catch (error) {
			console.error("Registration failed:", error)
		}
	}

	return (
		<div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 to-amber-100">
			<form
				onSubmit={handleSubmit}
				className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md space-y-6"
			>
				<h2 className="text-3xl font-bold text-center text-zinc-700">
					Crear cuenta
				</h2>
				<div className="space-y-4">
					<div>
						<label
							htmlFor="name"
							className="block text-sm font-medium text-zinc-600 mb-1"
						>
							Nombre
						</label>
						<input
							type="text"
							id="name"
							value={name}
							onChange={(e) => setName(e.target.value)}
							required
							className="w-full px-4 py-2 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400 transition-all"
						/>
					</div>

					<div>
						<label
							htmlFor="email"
							className="block text-sm font-medium text-zinc-600 mb-1"
						>
							Correo electrónico
						</label>
						<input
							type="email"
							id="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							required
							className="w-full px-4 py-2 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400 transition-all"
						/>
					</div>

					<div>
						<label
							htmlFor="password"
							className="block text-sm font-medium text-zinc-600 mb-1"
						>
							Contraseña
						</label>
						<input
							type="password"
							id="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							required
							className="w-full px-4 py-2 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400 transition-all"
						/>
					</div>
				</div>
				<button
					type="submit"
					className="w-full py-2 mt-4 bg-amber-500 hover:bg-amber-600 text-white font-semibold rounded-lg transition-all shadow-sm hover:shadow-md cursor-pointer"
					onClick={() => navigate("/home")}
				>
					Registrarme
				</button>
				<p className="text-sm text-center text-zinc-500">
					¿Ya tienes una cuenta?{" "}
					<a
						href="/auth/login"
						className="text-amber-600 font-medium hover:underline"
					>
						Inicia sesión
					</a>
				</p>
				<div className="flex flex-row gap-1 justify-center items-center mt-4">
					<div className="text-center text-zinc-500 text-sm">
						<p>Si quieres continuar sin registrarte</p>
					</div>
					<div className="text-center text-sm text-amber-600 font-medium hover:underline cursor-pointer">
						<button
							className="cursor-pointer hover:underline "
							onClick={async () => {
								loginAsGuest()
								navigate("/home")
							}}
						>
							Click aquí
						</button>
					</div>
				</div>
			</form>
		</div>
	)
}
