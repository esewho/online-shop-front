import { useEffect, useState } from "react"
import { getAllProducts } from "../lib/lib"
import type { Product } from "../types/product-type"
import Card from "./Card"

export default function Dashboard() {
	const [loading, setLoading] = useState<boolean>(false)
	const [error, setError] = useState<boolean>(null)
	const [products, setProducts] = useState<Product[]>([])
	useEffect(() => {
		async function fetchProducts() {
			try {
				setLoading(true)
				const data = await getAllProducts()
				setProducts(data)
				console.log(data)
			} catch (e: any) {
				setError(e?.message ?? "Unknown error")
			} finally {
				setLoading(false)
			}
		}
		fetchProducts()
	}, [])

	if (loading) return <div>Loading...</div>
	if (error) return <div>Error loading dashboard</div>
	return (
		<div className="p-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 overflow-x-hidden">
			{products.map((p) => (
				<Card
					key={p.id}
					title={p.title}
					images={p.images.length > 0 ? p.images[0] : ""}
					price={p.price}
				/>
			))}
		</div>
	)
}
