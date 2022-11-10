import React from "react"
import { Button, Row, Col, ListGroup, Card } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { PayPalButton } from "react-paypal-button-v2"
import { useParams } from "react-router-dom"
import { payOrder, deliverOrder } from "../../actions/orderActions"
import Loader from "../global/Loader"

const OrderSummery = ({ order, loadingDeliver, loadingPay, sdkReady }) => {
	const dispatch = useDispatch()
	const userLogin = useSelector((state) => state.userLogin)
	const { userInfo } = userLogin

	const orderId = useParams().id

	const successPaymentHandler = (paymentResult) => {
		console.log(paymentResult)
		dispatch(payOrder(orderId, paymentResult))
	}

	const deliverHandler = () => {
		dispatch(deliverOrder(order))
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
						<Col> ${order.itemsPrice}</Col>
					</Row>
				</ListGroup.Item>
				<ListGroup.Item>
					<Row>
						<Col> Shipping</Col>
						<Col> ${order.shippingPrice}</Col>
					</Row>
				</ListGroup.Item>
				<ListGroup.Item>
					<Row>
						<Col> Tax</Col>
						<Col> ${order.taxPrice}</Col>
					</Row>
				</ListGroup.Item>
				<ListGroup.Item>
					<Row>
						<Col> Total</Col>
						<Col> ${order.totalPrice}</Col>
					</Row>
				</ListGroup.Item>
				{!order.isPaid && (
					<ListGroup.Item>
						{loadingPay && <Loader />}
						{!sdkReady ? (
							<Loader />
						) : (
							<PayPalButton
								amount={order.totalPrice}
								onSuccess={successPaymentHandler}
							/>
						)}
					</ListGroup.Item>
				)}
				{loadingDeliver && <Loader />}
				{userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered && (
					<ListGroup.Item>
						<Button
							type='button'
							className='btn btn-block'
							onClick={deliverHandler}
						>
							{" "}
							Mark as delivered{" "}
						</Button>
					</ListGroup.Item>
				)}
			</ListGroup>
		</Card>
	)
}

export default OrderSummery
