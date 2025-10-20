import { useState } from "react"

export default function RegisterForm() {
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [loading, setLoading] = useState(false)

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		if (!email || !password) {
			throw new Error("Email and password are required")
		}
		const { accessToken } = await register(email, password)
		localStorage.setItem("accessToken", accessToken)
	}
	return <>register page</>
}
