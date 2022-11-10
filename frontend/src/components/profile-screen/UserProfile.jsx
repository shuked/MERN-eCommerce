import {useState, useEffect} from 'react'
import { useDispatch, useSelector } from "react-redux"
import { getUserDetails, updateUserProfile } from "../../actions/userActions"

import { Form, Button, Row, Col, Table } from "react-bootstrap"


const UserProfile = ({setMessage, user}) => {
  const [name, setName] = useState("")
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [confirmPassword, setConfirmPassword] = useState("")

  const dispatch = useDispatch()

  useEffect(() => {

			if (user.name) {
				setName(user.name)
				setEmail(user.email)
			}
		
	}, [dispatch,  user])

  const submitHandler = (e) => {
		e.preventDefault()

		if (password !== confirmPassword) {
			setMessage("Passwords do not match")
		} else {
			dispatch(updateUserProfile({ id: user._id, name, email, password }))
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
						Update{" "}
					</Button>
				</Form>
  )
}

export default UserProfile