export type Props = {
	size: number
}

export function CartIcon(props: Props) {
	const { size } = props

	return (
		<svg width={size} height={size} viewBox="0 0 24 24">
			<path
				fill="currentColor"
				d="M17 18c-1.11 0-2 .89-2 2a2 2 0 0 0 2 2a2 2 0 0 0 2-2a2 2 0 0 0-2-2M1 2v2h2l3.6 7.59l-1.36 2.45c-.15.28-.24.61-.24.96a2 2 0 0 0 2 2h12v-2H7.42a.25.25 0 0 1-.25-.25q0-.075.03-.12L8.1 13h7.45c.75 0 1.41-.42 1.75-1.03l3.58-6.47c.07-.16.12-.33.12-.5a1 1 0 0 0-1-1H5.21l-.94-2M7 18c-1.11 0-2 .89-2 2a2 2 0 0 0 2 2a2 2 0 0 0 2-2a2 2 0 0 0-2-2"
			/>
		</svg>
	)
}

export function UserIcon(props: Props) {
	const { size } = props
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width={size}
			height={size}
			viewBox="0 0 24 24"
		>
			<path
				fill="currentColor"
				fill-rule="evenodd"
				d="M12 4a8 8 0 0 0-6.96 11.947A4.99 4.99 0 0 1 9 14h6a4.99 4.99 0 0 1 3.96 1.947A8 8 0 0 0 12 4m7.943 14.076q.188-.245.36-.502A9.96 9.96 0 0 0 22 12c0-5.523-4.477-10-10-10S2 6.477 2 12a9.96 9.96 0 0 0 2.057 6.076l-.005.018l.355.413A9.98 9.98 0 0 0 12 22q.324 0 .644-.02a9.95 9.95 0 0 0 5.031-1.745a10 10 0 0 0 1.918-1.728l.355-.413zM12 6a3 3 0 1 0 0 6a3 3 0 0 0 0-6"
				clip-rule="evenodd"
			/>
		</svg>
	)
}

export function HomeIcon(props: Props) {
	const { size } = props
	return (
		<svg width={size} height={size} viewBox="0 0 24 24">
			<path fill="currentColor" d="M10 20v-6h4v6h5v-8h3L12 3L2 12h3v8z" />
		</svg>
	)
}

export function SearchIcon(props: Props) {
	const { size } = props
	return (
		<svg width={size} height={size} viewBox="0 0 24 24">
			<path
				fill="#ffffff"
				d="m19.6 21l-6.3-6.3q-.75.6-1.725.95T9.5 16q-2.725 0-4.612-1.888T3 9.5t1.888-4.612T9.5 3t4.613 1.888T16 9.5q0 1.1-.35 2.075T14.7 13.3l6.3 6.3zM9.5 14q1.875 0 3.188-1.312T14 9.5t-1.312-3.187T9.5 5T6.313 6.313T5 9.5t1.313 3.188T9.5 14"
			/>
		</svg>
	)
}

export function DetailsIcon(props: Props) {
	const { size } = props
	return (
		<svg width={size} height={size} viewBox="0 0 24 24">
			<path
				fill="currentColor"
				d="M12 9a3 3 0 0 0-3 3a3 3 0 0 0 3 3a3 3 0 0 0 3-3a3 3 0 0 0-3-3m0 8a5 5 0 0 1-5-5a5 5 0 0 1 5-5a5 5 0 0 1 5 5a5 5 0 0 1-5 5m0-12.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5"
			/>
		</svg>
	)
}
export function TrashIcon(props: Props) {
	const { size } = props
	return (
		<svg width={size} height={size} viewBox="0 0 24 24">
			<path
				fill="none"
				stroke="currentColor"
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="2"
				d="M4 7h16m-10 4v6m4-6v6M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2l1-12M9 7V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v3"
			/>
		</svg>
	)
}

export function IncrementIcon(props: Props) {
	const { size } = props
	return (
		<svg width={size} height={size} viewBox="0 0 24 24">
			<path
				fill="currentColor"
				d="M13 6.5V11h4.5v2H13v4.5h-2V13H6.5v-2H11V6.5z"
			/>
		</svg>
	)
}

export function DecrementIcon(props: Props) {
	const { size } = props
	return (
		<svg width={size} height={size} viewBox="0 0 24 24">
			<path fill="currentColor" d="M19 13H5v-2h14z" />
		</svg>
	)
}

export function LogOutIcon(props: Props) {
	const { size } = props
	return (
		<svg width={size} height={size} viewBox="0 0 24 24">
			<path
				fill="currentColor"
				d="M5 22a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1zm10-6l5-4l-5-4v3H9v2h6z"
			/>
		</svg>
	)
}
