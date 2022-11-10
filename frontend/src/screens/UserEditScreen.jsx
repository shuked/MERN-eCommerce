import React, { useEffect } from "react"
import { Link, useParams, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import Message from "../components/global/Message"
import Loader from "../components/global/Loader"
import FormContainer from "../components/global/FormContainer"
import { getUserDetails } from "../actions/userActions"
import { USER_UPDATE_RESET } from "../constants/userConstants"
import EditUserForm from "../components/user-edit-screen/EditUserForm"

const UserEditScreen = () => {
	const userId = useParams().id

	const dispatch = useDispatch()
	const navigate = useNavigate()

	const userDetails = useSelector((state) => state.userDetails)
	const { loading, error, user } = userDetails

	const userUpdate = useSelector((state) => state.userUpdate)
	const {
		loading: loadingUpdate,
		error: errorUpdate,
		success: successUpdate,
	} = userUpdate

	useEffect(() => {
		if (successUpdate) {
			dispatch({ type: USER_UPDATE_RESET })
			navigate("/admin/userlist")
		} else {
			if (!user.name || user._id !== userId) {
				dispatch(getUserDetails(userId))
			}
		}
	}, [user, dispatch, userId, successUpdate, navigate])

	return (
		<>
			<Link
				to='/admin/userlist'
				className='btn btn-light my-3'
			>
				Go Back
			</Link>
			<FormContainer>
				<h1>Edit User</h1>
				{loadingUpdate && <Loader />}
				{errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
				{loading ? (
					<Loader />
				) : error ? (
					<Message variant='danger'>{error}</Message>
				) : (
					<EditUserForm user={user} />
				)}
			</FormContainer>
		</>
	)
}

export default UserEditScreen
