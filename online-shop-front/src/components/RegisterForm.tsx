import { useState } from "react"
import { register } from "../lib/lib"

export default function RegisterForm() {
	const [name, setName] = useState("")
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		try {
			const data = await register(email, password)
		} catch (error) {}
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
				>
					Registrarme
				</button>

				<p className="text-sm text-center text-zinc-500">
					¿Ya tienes una cuenta?{" "}
					<a
						href="/login"
						className="text-amber-600 font-medium hover:underline"
					>
						Inicia sesión
					</a>
				</p>
			</form>
		</div>
	)
}
