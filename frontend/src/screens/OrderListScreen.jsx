import React, { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import Message from "../components/global/Message"
import Loader from "../components/global/Loader"
import OrderListTable from "../components/order-list-screen/OrderListTable"

import { listOrder } from "../actions/orderActions"

const OrderListScreen = () => {
	const dispatch = useDispatch()
	const navigate = useNavigate()

	const orderList = useSelector((state) => state.orderList)
	const { loading, error, orders } = orderList

	const userLogin = useSelector((state) => state.userLogin)
	const { userInfo } = userLogin

	useEffect(() => {
		if (userInfo && userInfo.isAdmin) {
			dispatch(listOrder())
		} else {
			navigate("/login")
		}
	}, [dispatch, navigate, userInfo])

	return (
		<>
			<h1>Orders</h1>
			{loading ? (
				<Loader />
			) : error ? (
				<Message variant='danger'>{error}</Message>
			) : (
				<OrderListTable orders={orders} />
			)}
		</>
	)
}

export default OrderListScreen
