import React from "react"
import { Row, Col, ListGroup, Image } from "react-bootstrap"
import { Link } from "react-router-dom"
import Message from "../global/Message"

const OrderDetails = ({ cart }) => {
	return (
		<ListGroup variant='flush'>
			<ListGroup.Item>
				<h2>Shipping</h2>
				<p>
					<strong>Address:</strong>
					{cart.shippingAddress.address},{cart.shippingAddress.city},
					{cart.shippingAddress.postalCode},{cart.shippingAddress.country}
				</p>
			</ListGroup.Item>
			<ListGroup.Item>
				<h2>Payment Method</h2>
				<p>
					<strong>Method:</strong>
					{cart.paymentMethod}
				</p>
			</ListGroup.Item>
			<ListGroup.Item>
				<h2>Order Items</h2>
				{cart.cartItems.length === 0 ? (
					<Message> Your cart is empty </Message>
				) : (
					<ListGroup variant='flush'>
						{cart.cartItems.map((item, index) => (
							<ListGroup.Item key={index}>
								<Row>
									<Col md={1}>
										<Image
											src={item.image}
											alt={item.name}
											fluid
											rounded
										/>
									</Col>
									<Col>
										<Link to={`/products/${item.product}`}> {item.name}</Link>
									</Col>
									<Col md={4}>
										{item.qty} X ${item.price} = $ {item.qty * item.price}
									</Col>
								</Row>
							</ListGroup.Item>
						))}
					</ListGroup>
				)}
			</ListGroup.Item>
		</ListGroup>
	)
}

export default OrderDetails
