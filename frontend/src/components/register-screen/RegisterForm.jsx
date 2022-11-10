import React, { useState } from "react"
import { Form, Button } from "react-bootstrap"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { register } from "../../actions/userActions"

const RegisterForm = ({ setMessage }) => {
	const [name, setName] = useState("")
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [confirmPassword, setConfirmPassword] = useState("")

	const dispatch = useDispatch()
	const navigate = useNavigate()

	const submitHandler = (e) => {
		e.preventDefault()

		if (password !== confirmPassword) {
			setMessage("Passwords do not match")
		} else {
			dispatch(register(name, email, password))
			navigate("/")
		}
	}
	return (
		<Form onSubmit={submitHandler}>
			<Form.Group controlId='name'>
				<Form.Label> Name </Form.Label>
				<Form.Control
					type='name'
					placeholder='Enter name'
					value={name}
					onChange={(e) => setName(e.target.value)}
				></Form.Control>
			</Form.Group>
			<Form.Group controlId='email'>
				<Form.Label> Email Address</Form.Label>
				<Form.Control
					type='email'
					placeholder='Enter email'
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				></Form.Control>
			</Form.Group>
			<Form.Group controlId='password'>
				<Form.Label> Password</Form.Label>
				<Form.Control
					type='password'
					placeholder='Enter password'
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				></Form.Control>
			</Form.Group>
			<Form.Group controlId='confirmPassword'>
				<Form.Label>Confirm Password</Form.Label>
				<Form.Control
					type='password'
					placeholder='Confirm password'
					value={confirmPassword}
					onChange={(e) => setConfirmPassword(e.target.value)}
				></Form.Control>
			</Form.Group>
			<Button
				type='submit'
				variant='primary'
			>
				{" "}
				Register{" "}
			</Button>
		</Form>
	)
}

export default RegisterForm
