import { useEffect, useState } from "react"
import { getAllProducts, getCategories } from "../lib/lib"
import type { Product } from "../types/product-type"
import Card from "./Card"
import toast from "react-hot-toast"
import Pagination from "./Pagination"
import { useSearchParams } from "react-router-dom"
import Filter from "./filter"
import SliderRangePrice from "./SliderRangePrice"

export default function Dashboard() {
	const [loading, setLoading] = useState<boolean>(false)
	const [categories, setCategories] = useState<string[]>([])
	const [error, setError] = useState<boolean>(false)
	const [products, setProducts] = useState<Product[]>([])
	const [page, setPage] = useState<number>(1)
	const [priceRange, setPriceRange] = useState<[number, number]>([0, 3500])
	const [categoryId, setCategoryId] = useState<string>("")

	// Obtener query de la URL
	const [searchParams] = useSearchParams()
	const query = searchParams.get("query") || ""

	// ✅ 1. ESTA función sí puedes pasarla a <Filter />
	async function fetchProducts(filters = {}) {
		try {
			setLoading(true)
			const data = await getAllProducts({
				limit: 10,
				offset: 0,
				title: query,
				price_min: priceRange[0],
				price_max: priceRange[1],

				...filters,
			})
			setProducts(data)
		} catch (e) {
			setError(true)
		} finally {
			setLoading(false)
		}
	}

	// Cargar productos y categorías al montar o cambiar query
	useEffect(() => {
		fetchProducts() // cargar sin filtros

		getCategories()
			.then(setCategories)
			.catch(() => setError(true))
	}, [query])

	// Paginación
	async function handlePageChange(newPage: number) {
		try {
			setLoading(true)
			const data = await getAllProducts({
				limit: 10,
				offset: newPage * 10,
				price_min: priceRange[0],
				price_max: priceRange[1],
				title: query,
				categoryId: categoryId ? parseInt(categoryId) : undefined,
			})
			setPage(newPage)
			setProducts(data)
			window.scrollTo({ top: 0, behavior: "smooth" })
		} finally {
			setLoading(false)
		}
	}

	if (error) return <div>Error loading dashboard</div>

	return (
		<div className="relative">
			{/* FILTRO — le pasamos fetchProducts */}

			<Filter
				categories={categories}
				onFilter={fetchProducts}
				priceRange={priceRange}
				setPriceRange={setPriceRange}
				setCategoryId={setCategoryId}
				categoryId={categoryId}
			/>

			<div className="p-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
				{products.map((p) => (
					<Card
						key={p.id}
						id={p.id}
						title={p.title ?? "Producto sin título"}
						images={p.images.length > 0 ? p.images[0] : ""}
						price={p.price}
					/>
				))}
			</div>

			<div className="flex justify-center">
				<Pagination page={page} handlePageChange={handlePageChange} />
			</div>
		</div>
	)
}
