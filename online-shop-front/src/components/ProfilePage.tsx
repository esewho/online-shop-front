import { useEffect, useState } from "react"
import { useAuth } from "../context/LoginContext"
import { updateProfile } from "../lib/lib"
import toast from "react-hot-toast"

export default function ProfilePage() {
	const { user } = useAuth()

	const [loading, setLoading] = useState(true)

	// Campos editables
	const [address, setAddress] = useState("")
	const [phone, setPhone] = useState("")
	const [avatarUrl, setAvatarUrl] = useState("")

	useEffect(() => {
		// cuando llega el usuario, rellenamos los campos
		if (user) {
			setAddress(user.address ?? "")
			setPhone(user.phone ?? "")
			setAvatarUrl(user.avatarUrl ?? "")
		}

		setLoading(false)
	}, [user])

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()

		try {
			await updateProfile({ address, phone, avatarUrl })
			toast.success("Perfil actualizado correctamente 🎉")
		} catch (err) {
			console.error(err)
			toast.error("Error actualizando el perfil")
		}
	}

	if (loading)
		return <div className="text-center mt-10">Loading profile...</div>

	return (
		<div className="max-w-md mx-auto mt-10 bg-white rounded-xl shadow-md p-6">
			<h2 className="text-2xl font-bold text-zinc-800 mb-4 text-center">
				Mi Perfil
			</h2>

			{user ? (
				<div className="space-y-4">
					<div className="bg-black/5 p-4 rounded-md shadow-inner">
						<p className="text-sm text-zinc-500 mb-1">Nombre</p>
						<p className="font-semibold text-zinc-700">{user.name}</p>

						<p className="text-sm text-zinc-500 mt-3 mb-1">Email</p>
						<p className="font-semibold text-zinc-700">{user.email}</p>

						<p className="text-sm text-zinc-500 mt-3 mb-1">User ID</p>
						<p className="font-semibold text-zinc-700">{user.id}</p>

						<p className="text-sm text-zinc-500 mt-3 mb-1">Dirección</p>
						<p className="font-semibold text-zinc-700">{user.address}</p>

						<p className="text-sm text-zinc-500 mt-3 mb-1">Teléfono</p>
						<p className="font-semibold text-zinc-700">{user.phone}</p>
					</div>

					<h3 className="text-lg font-semibold text-zinc-700 mt-6">
						Editar perfil
					</h3>

					<form onSubmit={handleSubmit} className="space-y-4">
						<div>
							<label className="block text-sm font-medium mb-1 text-zinc-600">
								Dirección
							</label>
							<input
								type="text"
								value={address}
								onChange={(e) => setAddress(e.target.value)}
								className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-black/50 focus:outline-none placeholder:opacity-40"
								placeholder="Introduce tu dirección"
							/>
						</div>

						<div>
							<label className="block text-sm font-medium mb-1 text-zinc-600">
								Teléfono
							</label>
							<input
								type="text"
								value={phone}
								onChange={(e) => setPhone(e.target.value)}
								className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-black/50  focus:outline-none placeholder:opacity-40"
								placeholder="Ej: 600123456"
							/>
						</div>

						<div>
							<label className="block text-sm font-medium mb-1 text-zinc-600">
								Avatar URL
							</label>
							<input
								type="text"
								value={avatarUrl}
								onChange={(e) => setAvatarUrl(e.target.value)}
								className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-black/50 focus:outline-none placeholder:opacity-40"
								placeholder="https://imagen.com/avatar.png"
							/>
						</div>

						<button
							onClick={handleSubmit}
							type="submit"
							className="w-full py-2 bg-black/50 text-white font-semibold rounded-lg hover:bg-black/100 transition ease-in-out duration-200 cursor-pointer shadow"
						>
							Guardar cambios
						</button>
					</form>
				</div>
			) : (
				<p className="text-center text-zinc-600">
					No hay datos de perfil disponibles.
				</p>
			)}
		</div>
	)
}
