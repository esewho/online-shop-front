import { useState } from "react"
import SliderRangePrice from "./SliderRangePrice"

type FilterProps = {
	categories: { id: string; name: string }[]
	onFilter: (filters: any) => void
	priceRange: [number, number]
	setPriceRange: React.Dispatch<React.SetStateAction<[number, number]>>
	setCategoryId: React.Dispatch<React.SetStateAction<string>>
	categoryId: string
}

export default function Filter({
	categories,
	onFilter,
	priceRange,
	setPriceRange,
	setCategoryId,
	categoryId,
}: FilterProps) {
	// const [categoryId, setCategoryId] = useState<string>("")
	// const [priceMin, setPriceMin] = useState<string>("")
	// const [priceMax, setPriceMax] = useState<string>("")

	const applyFilters = () => {
		onFilter({
			categoryId: categoryId ? parseInt(categoryId) : undefined,
			price_min: priceRange[0],
			price_max: priceRange[1],
			// price_min: priceMin ? parseFloat(priceMin) : undefined,
			// price_max: priceMax ? parseFloat(priceMax) : undefined,
		})
	}
	return (
		<div className="opacity-100">
			<div className=" flex flex-row justify-between items-center p-4 border rounded min-w-full ">
				<div className="flex flex-col gap-2 ">
					<select
						value={categoryId}
						onChange={(e) => setCategoryId(e.target.value)}
						className=" px-3 py-2 border rounded cursor-pointer "
					>
						<option value="">All categories</option>
						{categories.map((cat) => (
							<option key={cat.id} value={cat.id}>
								{cat.name}
							</option>
						))}
					</select>
				</div>
				<div className="flex flex-col gap-2 items-center w-1/4">
					<div className=" w-full justify-between">
						<span className="dark:text-white font-semibold">
							Rango de precio:
						</span>
						<div className="flex justify-between text-sm dark:text-white">
							<span>${priceRange[0]}</span>
							<span>${priceRange[1]}</span>
						</div>
					</div>

					<SliderRangePrice
						min={0}
						max={3500}
						value={priceRange}
						onInput={setPriceRange}
						defaultValue={[0, 3500]}
					/>
				</div>

				{/* <div className="flex flex-row gap-2 ">
					<input
						type="number"
						placeholder="precio mínimo"
						className="border p-2 rounded placeholder:opacity-50"
						value={priceMin}
						onChange={(e) => setPriceMin(e.target.value)}
					/>
					<input
						type="number"
						placeholder="precio máximo"
						className="border p-2 rounded placeholder:opacity-50"
						value={priceMax}
						onChange={(e) => setPriceMax(e.target.value)}
					/>
				</div> */}

				<button
					className="w-max bg-black  dark:hover:bg-gray-300 transition-all  font-semibold  dark:text-black ease-in-out duration-200  dark:bg-gray-200 text-white p-2 rounded cursor-pointer shadow"
					onClick={applyFilters}
				>
					Aplicar filtros
				</button>
			</div>
		</div>
	)
}
