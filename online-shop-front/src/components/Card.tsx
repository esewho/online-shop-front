type Props = {
	title: string
	description: string
	price: number
	imageUrl: string
}

export default function Card({ title, description, price, imageUrl }: Props) {
	return (
		<div className="card">
			<img src={imageUrl} alt={title} className="card-image" />
			<div className="bg-black p-4 rounded-b-lg text-white">
				<h2 className="card-title">{title}</h2>
				<p className="card-description">{description}</p>
				<p className="card-price">${price.toFixed(2)}</p>
			</div>
		</div>
	)
}
