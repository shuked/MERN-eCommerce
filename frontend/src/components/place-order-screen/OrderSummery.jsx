import React from "react"
import { Button, Row, Col, ListGroup, Card } from "react-bootstrap"
import { useDispatch } from "react-redux"
import { createOrder } from "../../actions/orderActions"
import Message from "../global/Message"

const OrderSummery = ({ cart, error }) => {
	const dispatch = useDispatch()

	const placeOrderHandler = () => {
		dispatch(
			createOrder({
				orderItems: cart.cartItems,
				shippingAddress: cart.shippingAddress,
				paymentMethod: cart.paymentMethod,
				itemsPrice: cart.itemsPrice,
				shippingPrice: cart.shippingPrice,
				taxPrice: cart.taxPrice,
				totalPrice: cart.totalPrice,
			})
		)
	}

	return (
		<Card>
			<ListGroup variant='flush'>
				<ListGroup.Item>
					<h2>Order summary</h2>
				</ListGroup.Item>
				<ListGroup.Item>
					<Row>
						<Col> Items</Col>
						<Col> ${cart.itemsPrice}</Col>
					</Row>
				</ListGroup.Item>
				<ListGroup.Item>
					<Row>
						<Col> Shipping</Col>
						<Col> ${cart.shippingPrice}</Col>
					</Row>
				</ListGroup.Item>
				<ListGroup.Item>
					<Row>
						<Col> Tax</Col>
						<Col> ${cart.taxPrice}</Col>
					</Row>
				</ListGroup.Item>
				<ListGroup.Item>
					<Row>
						<Col> Total</Col>
						<Col> ${cart.totalPrice}</Col>
					</Row>
				</ListGroup.Item>

				<ListGroup.Item>
					{error && <Message variant='danger'>{error}</Message>}
				</ListGroup.Item>

				<ListGroup.Item>
					<Button
						type='button'
						className='btn-block'
						disabled={cart.cartItems.length === 0}
						onClick={placeOrderHandler}
					>
						{" "}
						Place Order
					</Button>
				</ListGroup.Item>
			</ListGroup>
		</Card>
	)
}

export default OrderSummery
