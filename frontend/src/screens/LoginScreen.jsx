import React, { useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import Message from "../components/Message"
import Loader from "../components/Loader"
import FormContainer from "../components/FormContainer"
import LoginForm from "../components/login-screen/LoginForm"
import RegisterLink from "../components/login-screen/RegisterLink"

const LoginScreen = () => {
	const location = useLocation()
	const navigate = useNavigate()

	const userLogin = useSelector((state) => state.userLogin)
	const { loading, error, userInfo } = userLogin

	const redirect = location.search ? location.search.split("=")[1] : ""

	console.log(redirect)

	useEffect(() => {
		if (userInfo) {
			navigate(`/${redirect}`)
		}
	}, [navigate, redirect, location, userInfo])

	return (
		<FormContainer>
			<h1>Sign In</h1>
			{error && <Message variant='danger'>{error}</Message>}
			{loading && <Loader />}
			<LoginForm />
			<RegisterLink redirect={redirect}/>
		</FormContainer>
	)
}

export default LoginScreen
