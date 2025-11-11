import { useProfile } from "../context/ProfileContext"

export default function ProfilePage() {
	const { profile, loading, setProfile } = useProfile()
	if (loading) {
		return <div>Loading profile...</div>
	}
	return (
		<div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md space-y-4">
			<h2 className="text-lg font-medium">Profile Information</h2>
			{profile ? (
				<div>
					<p>
						<strong>Name:</strong> {profile.name}
					</p>
					<p>
						<strong>Email:</strong> {profile.email}
					</p>
					{/* Add more profile fields as needed */}
				</div>
			) : (
				<p>No profile information available.</p>
			)}
		</div>
	)
}
