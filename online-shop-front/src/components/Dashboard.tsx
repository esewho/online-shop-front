import { useEffect, useState } from "react"
import { getAllProducts, getCategories } from "../lib/lib"
import type { Product } from "../types/product-type"
import Card from "./Card"
import Pagination from "./Pagination"
import { useSearchParams } from "react-router-dom"
import Filter from "./Filter"
import toast from "react-hot-toast"

export default function Dashboard() {
	const [loading, setLoading] = useState<boolean>(false)
	const [categories, setCategories] = useState<string[]>([])
	const [error, setError] = useState<boolean>(false)
	const [products, setProducts] = useState<Product[]>([])
	const [page, setPage] = useState<number>(1)
	const [priceRange, setPriceRange] = useState<[number, number]>([0, 3500])
	const [categoryId, setCategoryId] = useState<string>("")
	const [showFilters, setShowFilters] = useState<boolean>(false)

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
				categoryId: categoryId ? parseInt(categoryId) : undefined,

				...filters,
			})
			setProducts(data)
		} catch (e: any) {
			if (e.message.includes("404") || e.message.includes("category")) {
				toast.error("La categoría seleccionada ya no existe.")
				setError(true)
			} else {
				toast.error("Error loading products.")
				setError(true)
			}
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
		<div className="relative ">
			<div className="w-full flex justify-center ">
				<button
					onClick={() => setShowFilters(!showFilters)}
					className="px-4 py-2 bg-amber-500 text-white rounded shadow hover:bg-amber-600 transition-all cursor-pointer mb-2"
				>
					{showFilters ? "Ocultar filtros" : "Mostrar filtros"}
				</button>
			</div>
			{/* FILTRO — le pasamos fetchProducts */}

			<div
				className={`transition-all duration-500 overflow-hidden 
		${showFilters ? "opacity-100 max-h-[500px]" : "opacity-0 max-h-0"}
	`}
			>
				<Filter
					categories={categories}
					onFilter={fetchProducts}
					priceRange={priceRange}
					setPriceRange={setPriceRange}
					setCategoryId={setCategoryId}
					categoryId={categoryId}
				/>
			</div>

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
