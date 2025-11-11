import { createContext, useContext, useEffect, useState } from "react"
import { getProfile } from "../lib/lib"
import type { Profile } from "../types/profile-type"

type ProfileCtxType = {
	profile: Profile | null
	setProfile: React.Dispatch<React.SetStateAction<Profile | null>>
	loading: boolean
}

export const ProfileContext = createContext<ProfileCtxType | null>(null)

export function ProfileProvider({ children }: { children: React.ReactNode }) {
	const [profile, setProfile] = useState<Profile | null>(null)
	const [loading, setLoading] = useState<boolean>(true)

	useEffect(() => {
		async function fetchProfile() {
			try {
				const profile = await getProfile()
				setProfile(profile)
			} catch (error) {
				console.error("Error fetching profile:", error)
			} finally {
				setLoading(false)
			}
		}
		fetchProfile()
	}, [])
	return (
		<ProfileContext.Provider value={{ profile, setProfile, loading }}>
			{children}
		</ProfileContext.Provider>
	)
}

export const useProfile = () => {
	const context = useContext(ProfileContext)
	if (!context) {
		throw new Error("useProfile must be used within a ProfileProvider")
	}
	return context
}
