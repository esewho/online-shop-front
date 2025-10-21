import { useEffect, useState } from "react"
import { getProductById } from "../lib/lib"
import type { Product } from "../types/product-type"
import { useParams } from "react-router-dom"
import toast from "react-hot-toast"

export default function ProductDetail() {
	const [loading, setLoading] = useState<boolean>(false)
	const [product, setProduct] = useState<Product | null>(null)
	const [error, setError] = useState<null | string>(null)
	const { id } = useParams<{ id: string }>()
	useEffect(() => {
		async function fetchProduct() {
			try {
				setLoading(true)
				const data = await getProductById(id!)
				setProduct(data)
			} catch (e: any) {
				setError(e?.message ?? "Unknown error")
			} finally {
				setLoading(false)
			}
		}
		fetchProduct()
	}, [id])
	if (loading) return toast.loading("Loading product details...")
	if (error) return toast.error("Error loading product details")
	return (
		<div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md space-y-4">
			{product && (
				<>
					<img
						className="w-full h-48 object-cover rounded-md"
						src={product.images[0]}
						alt={product.title}
					/>
					<h2 className="text-2xl font-bold text-gray-900">{product.title}</h2>
					<p className="text-gray-700">{product.description}</p>
					<span className="text-xl font-semibold text-gray-900">
						${product.price.toFixed(2)}
					</span>
				</>
			)}
		</div>
	)
}
