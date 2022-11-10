import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Row, Col } from "react-bootstrap"
import { useSelector } from "react-redux"

import CheckoutSteps from "../components/global/CheckoutSteps"

import OrderSummery from "../components/place-order-screen/OrderSummery"
import OrderDetails from "../components/place-order-screen/OrderDetails"

const PlaceOrderScreen = () => {
	const cart = useSelector((state) => state.cart)
	const navigate = useNavigate()
	const addDecimel = (num) => {
		return (Math.round(num * 100) / 100).toFixed(2)
	}

	cart.itemsPrice = addDecimel(
		cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
	)
	cart.shippingPrice = addDecimel(cart.itemsPrice > 100 ? 0 : 10)
	cart.taxPrice = addDecimel(Number((0.17 * cart.itemsPrice).toFixed(2)))
	cart.totalPrice = addDecimel(
		Number(cart.itemsPrice) + Number(cart.shippingPrice) + Number(cart.taxPrice)
	)

	const orderCreate = useSelector((state) => state.orderCreate)
	const { order, success, error } = orderCreate

	useEffect(() => {
		if (success) {
			navigate(`/orders/${order._id}`)
		}
		// eslint-disable-next-line
	}, [success, navigate])

	return (
		<>
			<CheckoutSteps
				step1={true}
				step2={true}
				step3={true}
				step4={true}
			/>
			<Row>
				<Col md={8}>
					<OrderDetails cart={cart} />
				</Col>
				<Col md={4}>
					<OrderSummery
						cart={cart}
						error={error}
					/>
				</Col>
			</Row>
		</>
	)
}

export default PlaceOrderScreen
