import React, { useState, useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import Message from "../components/Message"
import Loader from "../components/Loader"
import FormContainer from "../components/FormContainer"
import RegisterForm from "../components/register-screen/RegisterForm"
import LoginLink from "../components/register-screen/LoginLink"

const RegisterScreen = () => {
	const [message, setMessage] = useState(null)

	const location = useLocation()
	const navigate = useNavigate()

	const userRegister = useSelector((state) => state.userRegister)
	const { loading, error, userInfo } = userRegister

	const redirect = location.search ? location.search.split("=")[1] : "/"

	useEffect(() => {
		if (userInfo) {
			navigate(redirect)
		}
	}, [navigate, redirect, userInfo])

	return (
		<FormContainer>
			<h1>Sign Up</h1>
			{message && <Message variant='danger'>{message}</Message>}
			{error && <Message variant='danger'>{error}</Message>}
			{loading && <Loader />}
			<RegisterForm setMessage={setMessage} />
			<LoginLink redirect={redirect} />
		</FormContainer>
	)
}

export default RegisterScreen
