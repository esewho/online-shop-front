import { Navigate } from "react-router-dom"

interface ProtectedRouteProps {
	children: React.ReactNode
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
	const token = Boolean(localStorage.getItem("accessToken"))
	const guestId = localStorage.getItem("guestId")
	if (!token && !guestId) {
		return <Navigate to="/home" replace />
	}
	return <>{children}</>
}
