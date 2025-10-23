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
				className="px-4 py-2 mx-1 bg-blue-500 text-white rounded disabled:bg-gray-400 cursor-pointer"
			>
				Anterior
			</button>
			<span className="mx-2">Pagina {page}</span>
			<button
				onClick={() => handlePageChange(page + 1)}
				className="px-4 py-2 mx-1 bg-blue-500 text-white rounded cursor-pointer"
			>
				Siguiente
			</button>
		</div>
	)
}
