import { useEffect, useState } from "react"
import { getAllProducts } from "../lib/lib"
import type { Product } from "../types/product-type"
import Card from "./Card"
import toast from "react-hot-toast"
import Pagination from "./Pagination"

export default function Dashboard() {
	const [loading, setLoading] = useState<boolean>(false)
	const [error, setError] = useState<boolean>(null)
	const [products, setProducts] = useState<Product[]>([])
	const [page, setPage] = useState<number>(1)

	useEffect(() => {
		async function fetchProducts() {
			try {
				setLoading(true)
				const data = await getAllProducts({ limit: 10, offset: 0 })
				setProducts(data)
				console.log(data)
			} catch (e: any) {
				setError(e?.message ?? "Unknown error")
			} finally {
				setLoading(false)
			}
		}

		toast.promise(fetchProducts(), {
			loading: "Loading products...",
			success: "Products loaded successfully!",
			error: "Error loading products",
		})
	}, [])

	async function handlePageChange(newPage: number) {
		try {
			setLoading(true)
			const data = await getAllProducts({
				limit: 10,
				offset: newPage * 10,
			})
			setPage(newPage)
			setProducts(data)
			window.scrollTo({ top: 0, behavior: "smooth" })
		} catch (error) {
			console.error("Error fetching products for page change:", error)
		} finally {
			setLoading(false)
		}
	}

	if (error) return <div>Error loading dashboard</div>
	return (
		<div className="relative  ">
			<div className="  p-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 overflow-x-hidden">
				{products.map((p) => (
					<Card
						key={p.id}
						id={p.id}
						title={p.title}
						images={p.images.length > 0 ? p.images[0] : ""}
						price={p.price}
					/>
				))}
			</div>
			<div className="bottom-0 flex flex-row justify-center  ">
				<Pagination page={page} handlePageChange={handlePageChange} />
			</div>
		</div>
	)
}
