import { useEffect, useState } from "react"
import { loginGuest } from "../lib/lib"

export default function useLoginGuest() {
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState<string | null>(null)

	useEffect(() => {
		async function login() {
			let guestId = localStorage.getItem("guestId")
			if (!guestId) {
				guestId = crypto.randomUUID()
				localStorage.setItem("guestId", guestId)
			}
			try {
				const response = await loginGuest(guestId)
				localStorage.setItem("accessToken", response.accesstoken)
				setLoading(false)
			} catch (error) {
				console.error("Error logging in as guest:", error)
				setError("Failed to login as guest")
				setLoading(false)
			}
		}
		login()
	}, [])
	return { loading, error }
}
