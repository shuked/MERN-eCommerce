import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Row, Col } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import Message from "../components/global/Message"
import Loader from "../components/global/Loader"
import { getUserDetails } from "../actions/userActions"
import { listMyOrders } from "../actions/orderActions"
import MyOrders from "../components/profile-screen/MyOrders"
import UserProfile from "../components/profile-screen/UserProfile"

const ProfileScreen = () => {
	const [message, setMessage] = useState(null)

	const navigate = useNavigate()
	const dispatch = useDispatch()

	const userDetails = useSelector((state) => state.userDetails)
	const { loading, error, user } = userDetails

	const userLogin = useSelector((state) => state.userLogin)
	const { userInfo } = userLogin

	const userUpdateProfile = useSelector((state) => state.userUpdateProfile)
	const { success } = userUpdateProfile

	const orderListMy = useSelector((state) => state.orderListMy)
	const { loading: loadingOrders, error: errorOrders, orders } = orderListMy

	useEffect(() => {
		if (!userInfo) {
			navigate("/login")
		} else {
			if (!user.name) {
				dispatch(getUserDetails("profile"))
				dispatch(listMyOrders())
			}
		}
	}, [dispatch, navigate, userInfo, user])

	return (
		<Row>
			<Col md={3}>
				<h2>User Profile</h2>
				{message && <Message variant='danger'>{message}</Message>}
				{error && <Message variant='danger'>{error}</Message>}
				{success && <Message variant='success'>Profile updated</Message>}
				{loading && <Loader />}
				<UserProfile
					user={user}
					setMessage={setMessage}
				/>
			</Col>
			<Col md={9}>
				<h2>My Orders</h2>
				{loadingOrders ? (
					<Loader />
				) : errorOrders ? (
					<Message variant='danger'>{errorOrders}</Message>
				) : (
					<MyOrders orders={orders} />
				)}
			</Col>
		</Row>
	)
}

export default ProfileScreen
