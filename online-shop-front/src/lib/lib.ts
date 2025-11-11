import toast from "react-hot-toast"
import type { Cart } from "../types/cart-type"
import type { Product } from "../types/product-type"
import type { Profile } from "../types/profile-type"

const API_URL = "http://localhost:3000"

export async function getAllProducts(params: {
	title?: string
	price?: number
	description?: string
	categoryId?: number
	limit?: number
	offset?: number
	price_min?: number
	price_max?: number
}): Promise<Product[]> {
	const searchParams = new URLSearchParams()
	if (params.title) searchParams.append("title", params.title)
	if (params.price) searchParams.append("price", params.price.toString())
	if (params.description) searchParams.append("description", params.description)
	if (params.categoryId)
		searchParams.append("categoryId", params.categoryId.toString())
	if (params.limit) searchParams.append("limit", params.limit.toString())
	if (params.offset || params.offset === 0)
		searchParams.append("offset", params.offset.toString())
	if (params.price_min)
		searchParams.append("price_min", params.price_min.toString())
	if (params.price_max)
		searchParams.append("price_max", params.price_max.toString())
	const queryString = searchParams.toString()

	const url = queryString
		? `${API_URL}/products?${queryString}`
		: `${API_URL}/products`
	const token = localStorage.getItem("accessToken") || ""
	const response = await fetch(`${url}`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
	})
	if (!response.ok) {
		throw new Error("Failed to fetch products")
	}
	return response.json()
}

export async function getProductById(id: string): Promise<Product> {
	const token = localStorage.getItem("accessToken")
	const response = await fetch(`${API_URL}/products/${id}`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
	})
	if (!response.ok) {
		throw new Error("Failed to fetch product")
	}
	return response.json()
}

export async function loginGuest(
	guestId: string
): Promise<{ accessToken: string }> {
	const response = await fetch(`${API_URL}/auth/login-guest`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ guestId }),
	})
	if (!response.ok) {
		throw new Error("Failed to login as guest")
	}
	return response.json()
}

export async function searchProducts(query: {
	title: string
	price: number
	description: string
}): Promise<Product[]> {
	const searchParams = new URLSearchParams()
	searchParams.append("title", query.title)
	searchParams.append("price", query.price.toString())
	searchParams.append("description", query.description)

	const queryString = searchParams.toString()

	const token = localStorage.getItem("accessToken")

	const response = await fetch(`${API_URL}/products?${queryString}`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
	})
	if (!response.ok) {
		throw new Error("Failed to search products")
	}
	return response.json()
}

export async function getUserCart(): Promise<Cart> {
	const token = localStorage.getItem("accessToken")
	const response = await fetch(`${API_URL}/cart`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
	})
	if (!response.ok) {
		throw new Error("Failed to fetch user cart")
	}
	return response.json()
}

export async function addToCart(externalId: string): Promise<void> {
	const token = localStorage.getItem("accessToken")
	console.log(
		externalId,
		token,
		"-------------------------------------------------"
	)
	const response = await fetch(`${API_URL}/cart/items`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
		body: JSON.stringify({ externalId }),
	})
	if (!response.ok) {
		throw new Error("Failed to add product to cart")
	}
	return await toast.promise(response.json(), {
		loading: "Adding to cart...",
		success: "Product added to cart!",
		error: "Error adding product to cart",
	})
}

export async function incrementCartItem(
	productId: string,
	quantity?: number
): Promise<void> {
	const token = localStorage.getItem("accessToken")
	const response = await fetch(`${API_URL}/cart/items/${productId}/increment`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
		body: JSON.stringify({ quantity }),
	})
	if (!response.ok) {
		throw new Error("Failed to increment product quantity in cart")
	}
	return response.json()
}

export async function decrementCartItem(
	productId: string,
	quantity?: number
): Promise<void> {
	const token = localStorage.getItem("accessToken")
	const response = await fetch(`${API_URL}/cart/items/${productId}/decrement`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
		body: JSON.stringify({ quantity }),
	})
	if (!response.ok) {
		throw new Error("Failed to decrement product quantity in cart")
	}
	return response.json()
}

export async function removeFromCart(
	productId: string,
	quantity?: number
): Promise<void> {
	const token = localStorage.getItem("accessToken")
	const response = await fetch(`${API_URL}/cart/items/${productId}`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
		body: JSON.stringify({ quantity }),
	})
	if (!response.ok) {
		throw new Error("Failed to remove product from cart")
	}
	return response.json()
}

export async function register(
	email: string,
	password: string
): Promise<{ accessToken: string }> {
	const response = await fetch(`${API_URL}/auth/register`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ email, password }),
	})
	if (!response.ok) {
		throw new Error("Failed to register user")
	}
	return response.json()
}

export async function login(
	email: string,
	password: string
): Promise<{ accessToken: string }> {
	const response = await fetch(`${API_URL}/auth/login`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ email, password }),
	})
	if (!response.ok) {
		throw new Error("Failed to login")
	}
	return response.json()
}

export async function getProfile() {
	const token = localStorage.getItem("accessToken")
	const response = await fetch(`${API_URL}/profile/me`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
	})
	if (!response.ok) {
		throw new Error("Failed to fetch user profile")
	}
	return response.json()
}

export async function updateProfile(data: Profile): Promise<void> {
	const token = localStorage.getItem("accessToken")
	const response = await fetch(`${API_URL}/profile/me`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
		body: JSON.stringify(data),
	})
	if (!response.ok) {
		throw new Error("Failed to update user profile")
	}
	return response.json()
}
