import { useEffect, useState } from "react"
import { useAuth } from "../context/LoginContext"
import toast from "react-hot-toast"

export default function ProfilePage() {
	const { user } = useAuth()
	const [loading, setLoading] = useState<boolean>(true)

	useEffect(() => {
		// Simulate loading profile data
		const timer = setTimeout(() => {
			setLoading(false)
		}, 1000)

		return () => clearTimeout(timer)
	}, [])

	if (loading) {
		return <div>Loading profile...</div>
	}
	return (
		<div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md space-y-4">
			<h2 className="text-lg font-medium">Profile Information</h2>
			{user ? (
				<div>
					<p>
						<strong>Name:</strong> {user.name}
					</p>
					<p>
						<strong>Email:</strong> {user.email}
					</p>

					<p>
						<strong>User ID:</strong> {user.id}
					</p>

					<p>
						<strong>Address:</strong>
					</p>

					<p>
						<strong>Phone Number:</strong>
					</p>

					{/* Add more profile fields as needed */}
				</div>
			) : (
				<p>No profile information available.</p>
			)}
		</div>
	)
}
