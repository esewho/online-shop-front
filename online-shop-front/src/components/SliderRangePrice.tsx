import RangeSlider from "react-range-slider-input"

type Props = {
	min: number
	max: number
	value: [number, number]
	onInput: (value: [number, number]) => void
	defaultValue: [number, number]
}

export default function SliderRangePrice(props: Props) {
	return <RangeSlider {...props} />
}
