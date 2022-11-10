import { useState, useEffect } from "react"
import axios from "axios"
import { useNavigate, useParams } from "react-router-dom"
import { Row, Col } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import Message from "../components/global/Message"
import Loader from "../components/global/Loader"
import { getOrderDetails } from "../actions/orderActions"
import {
	ORDER_PAY_RESET,
	ORDER_DELIVER_RESET,
} from "../constants/orderConstants"
import OrderSummery from "../components/order-screen/OrderSummery"
import OrderDetails from "../components/order-screen/OrderDetails"

const OrderScreen = () => {
	const dispatch = useDispatch()
	const navigate = useNavigate()
	const orderId = useParams().id

	const [sdkReady, setSdkReady] = useState(false)

	const orderDetails = useSelector((state) => state.orderDetails)
	const { order, loading, error } = orderDetails

	const orderPay = useSelector((state) => state.orderPay)
	const { loading: loadingPay, success: successPay } = orderPay

	const orderDeliver = useSelector((state) => state.orderDeliver)
	const { loading: loadingDeliver, success: successDeliver } = orderDeliver

	const userLogin = useSelector((state) => state.userLogin)
	const { userInfo } = userLogin

	if (!loading) {
		const addDecimel = (num) => {
			return (Math.round(num * 100) / 100).toFixed(2)
		}

		order.itemsPrice = addDecimel(
			order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
		)
	}

	useEffect(() => {
		if (!userInfo) {
			navigate("/login")
		}

		const addPaypalScript = async () => {
			const { data: clientId } = await axios.get("/api/config/paypal")
			const script = document.createElement("script")
			script.type = "text/javascript"
			script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`
			script.async = true
			script.onload = () => {
				setSdkReady(true)
			}
			document.body.appendChild(script)
		}

		if (!order || successPay || order._id !== orderId || successDeliver) {
			dispatch({ type: ORDER_PAY_RESET })
			dispatch({ type: ORDER_DELIVER_RESET })
			dispatch(getOrderDetails(orderId))
		} else if (!order.isPaid) {
			if (!window.paypal) {
				addPaypalScript()
			} else {
				setSdkReady(true)
			}
		}
	}, [dispatch, order, orderId, successPay, successDeliver, userInfo, navigate])

	return loading ? (
		<Loader />
	) : error ? (
		<Message variant='danger'>{error}</Message>
	) : (
		<>
			<h1> order {order._id} </h1>
			<Row>
				<Col md={8}>
					<OrderDetails order={order} />
				</Col>
				<Col md={4}>
					<OrderSummery
						order={order}
						loadingDeliver={loadingDeliver}
						loadingPay={loadingPay}
						sdkReady={sdkReady}
					/>
				</Col>
			</Row>
		</>
	)
}

export default OrderScreen
