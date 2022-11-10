import React from "react"
import { Row, Col, ListGroup, Image } from "react-bootstrap"
import { Link } from "react-router-dom"

import Message from "../global/Message"

const OrderDetails = ({ order }) => {
	return (
		<ListGroup variant='flush'>
			<ListGroup.Item>
				<h2>Shipping</h2>
				<p>
					<strong>Name:</strong> {order.user.name}
				</p>
				<p>
					<strong>eMail:</strong>{" "}
					<a href={`mailto:${order.user.email}`}>{order.user.email}</a>
				</p>

				<p>
					<strong>Address:</strong>
					{order.shippingAddress.address},{order.shippingAddress.city},
					{order.shippingAddress.postalCode},{order.shippingAddress.country}
				</p>
				{order.isDelivered ? (
					<Message variant='success'>Delivere on {order.deliveredAt} </Message>
				) : (
					<Message variant='danger'>Not Delivere</Message>
				)}
			</ListGroup.Item>
			<ListGroup.Item>
				<h2>Payment Method</h2>
				<p>
					<strong>Method:</strong>
					{order.paymentMethod}
				</p>
				{order.isPaid ? (
					<Message variant='success'>Paid on {order.paidAt} </Message>
				) : (
					<Message variant='danger'>Not paid</Message>
				)}
			</ListGroup.Item>
			<ListGroup.Item>
				<h2>Order Items</h2>
				{order.orderItems.length === 0 ? (
					<Message> Order is empty </Message>
				) : (
					<ListGroup variant='flush'>
						{order.orderItems.map((item, index) => (
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
