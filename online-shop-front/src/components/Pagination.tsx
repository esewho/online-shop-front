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
				className="px-4 py-2 mx-1 dark:bg-gray-200  bg-black text-white dark:hover:bg-gray-300 dark:text-black ease-in-out transition-all duration-200 rounded border font-semibold  cursor-pointer"
			>
				Anterior
			</button>
			<span className="mx-2 dark:text-white">Pagina {page}</span>
			<button
				onClick={() => handlePageChange(page + 1)}
				className="px-4 py-2 mx-1 dark:bg-gray-200  bg-black text-white dark:hover:bg-gray-300 dark:text-black ease-in-out transition-all duration-200 rounded border font-semibold  cursor-pointer"
			>
				Siguiente
			</button>
		</div>
	)
}
