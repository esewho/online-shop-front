import type { Product } from "../types/product-type"

const API_URL = import.meta.env.BASE_URL || "http://localhost:3000"

export async function getAllProducts(): Promise<Product[]> {
	const token = localStorage.getItem("accessToken") || ""
	const response = await fetch(`${API_URL}/products`, {
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

export async function getProductById(id: number): Promise<Product> {
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

export async function searchProducts(query: string): Promise<Product[]> {
	const token = localStorage.getItem("accessToken")
	const response = await fetch(
		`${API_URL}/products?query=${encodeURIComponent(query)}`,
		{
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		}
	)
	if (!response.ok) {
		throw new Error("Failed to search products")
	}
	return response.json()
}

export async function getUserCart(): Promise<Product[]> {
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

export async function addToCart(productId: string): Promise<void> {
	const token = localStorage.getItem("accessToken")
	const response = await fetch(`${API_URL}/cart`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
		body: JSON.stringify({ productId }),
	})
	if (!response.ok) {
		throw new Error("Failed to add product to cart")
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
