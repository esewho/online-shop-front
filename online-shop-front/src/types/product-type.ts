export type Product = {
	id: string
	category: {
		id: number
		name: string
		slug: string
	}

	externalId: string
	title?: string
	name?: string
	price_min: number
	price_max: number
	price: number
	description: string
	images: string[]
}
