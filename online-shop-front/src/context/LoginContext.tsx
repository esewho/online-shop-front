import { useContext, createContext, useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import type { User } from "../types/user-type"
import { getProfile, loginGuest } from "../lib/lib"

export interface AuthContextType {
	user: User | null
	token: string
	loginAction: (data: { email: string; password: string }) => Promise<void>
	registerAction: (data: {
		name: string
		email: string
		password: string
	}) => Promise<void>
	logOut: () => void
}

const API_URL = "http://localhost:3000"

const AuthContext = createContext<AuthContextType | null>(null)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
	const [user, setUser] = useState<User | null>(null)
	const [token, setToken] = useState(localStorage.getItem("accessToken") || "")
	const navigate = useNavigate()

	useEffect(() => {
		const storedToken = localStorage.getItem("accessToken")
		if (storedToken) {
			setToken(storedToken)
		}
	}, [])
	useEffect(() => {
		async function loadProfile() {
			if (!token) return
			try {
				const profile = await getProfile()
				setUser(profile)
			} catch (error) {
				console.error("Failed to fetch profile:", error)
			}
		}
		loadProfile()
	}, [token])

	useEffect(() => {
		async function handleGuestLogin() {
			if (localStorage.getItem("accessToken")) return
			if (window.location.pathname.startsWith("/auth")) return
			let guestId = localStorage.getItem("guestId")
			if (!guestId) {
				guestId = crypto.randomUUID()
				localStorage.setItem("guestId", guestId)
			}
			try {
				const response = await loginGuest(guestId)
				localStorage.setItem("accessToken", response.accessToken)
				setToken(response.accessToken)
			} catch (error) {
				console.error("Error logging in as guest:", error)
			}
		}
		handleGuestLogin()
	}, [])

	const loginAction = async (data: { email: string; password: string }) => {
		try {
			const response = await fetch(`${API_URL}/auth/login`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(data),
			})
			if (!response.ok) {
				throw new Error("Failed to login")
			}
			const result = await response.json()
			if (result.accessToken) {
				localStorage.removeItem("guestId")
				setUser(result.user)
				setToken(result.accessToken)
				localStorage.setItem("accessToken", result.accessToken)
				navigate("/home")
				return
			}
		} catch (error) {
			console.error("Login failed:", error)
		}
	}

	const registerAction = async (data: {
		name: string
		email: string
		password: string
	}) => {
		try {
			const response = await fetch(`${API_URL}/auth/register`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(data),
			})
			if (!response.ok) {
				throw new Error("Failed to register")
			}
			const result = await response.json()
			if (result.accessToken) {
				setUser(result.user)
				setToken(result.accessToken)
				localStorage.setItem("accessToken", result.accessToken)
				navigate("/home")
				return
			}
		} catch (error) {
			console.error("Registration failed:", error)
		}
	}
	const logOut = () => {
		setUser(null)
		setToken("")
		localStorage.removeItem("accessToken")
		localStorage.removeItem("guestId")
		navigate("/auth/login")
	}
	return (
		<AuthContext.Provider
			value={{ user, token, loginAction, logOut, registerAction }}
		>
			{children}
		</AuthContext.Provider>
	)
}

export const useAuth = () => {
	const context = useContext(AuthContext)
	if (!context) {
		throw new Error("useAuth must be used within an AuthProvider")
	}
	return context
}
