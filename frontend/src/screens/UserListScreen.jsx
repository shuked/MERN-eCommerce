import React, { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import Message from "../components/global/Message"
import Loader from "../components/global/Loader"
import UsersListTable from "../components/user-list-screen/UsersListTable"
import { listUsers } from "../actions/userActions"

const UserListScreen = () => {
	const dispatch = useDispatch()
	const navigate = useNavigate()

	const userList = useSelector((state) => state.userList)
	const { loading, error, users } = userList

	const userLogin = useSelector((state) => state.userLogin)
	const { userInfo } = userLogin

	const userDelete = useSelector((state) => state.userDelete)
	const { success: successDelete } = userDelete

	useEffect(() => {
		if (userInfo && userInfo.isAdmin) {
			dispatch(listUsers())
		} else {
			navigate("/login")
		}
	}, [dispatch, navigate, userInfo, successDelete])

	return (
		<>
			<h1>Users</h1>
			{loading ? (
				<Loader />
			) : error ? (
				<Message variant='danger'>{error}</Message>
			) : (
				<UsersListTable users={users} />
			)}
		</>
	)
}

export default UserListScreen
