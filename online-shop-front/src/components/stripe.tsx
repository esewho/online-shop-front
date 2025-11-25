export async function startCheckout(cartItems: any[]) {
	const token = localStorage.getItem("accessToken")
	const res = await fetch(
		"http://localhost:3000/payments/create-checkout-session",
		{
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify({
				items: cartItems.map((item) => ({
					title:
						item.product?.title ?? item.product?.name ?? "Producto sin título",
					imageUrl: item.product.images[0],
					price: item.product.price,
					amount: item.product.price * 100,
					quantity: item.quantity,
				})),
			}),
		}
	)

	const data = await res.json()
	const url = data.url
	if (!url) {
		console.error("No checkout URL returned from server")
		return
	}
	console.log("Redirecting to checkout URL:", url)

	window.location.href = url
}
