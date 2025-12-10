type Props = {
	page: number
	handlePageChange: (page: number) => void
}

export default function Pagination(props: Props) {
	const { page, handlePageChange } = props
	return (
		<div className="sticky bottom-0">
			<button
				disabled={page === 1}
				onClick={() => handlePageChange(page - 1)}
				className="px-4 py-2 mx-1 bg-gray-700 dark:hover:text-white hover:bg-gray-900 dark:bg-white dark:text-black text-white  dark:hover:bg-amber-400 ease-in-out transition-all duration-200 rounded border font-semibold  cursor-pointer"
			>
				Anterior
			</button>
			<span className="mx-2 dark:text-white">Pagina {page}</span>
			<button
				onClick={() => handlePageChange(page + 1)}
				className="px-4 py-2 mx-1 bg-gray-700 dark:bg-white dark:hover:text-white dark:text-black hover:bg-gray-900 dark:hover:bg-amber-400 ease-in-out transition-all duration-200 text-white font-semibold border rounded cursor-pointer"
			>
				Siguiente
			</button>
		</div>
	)
}
