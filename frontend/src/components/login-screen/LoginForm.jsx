import React from 'react'
import { Form, Button} from "react-bootstrap"
import  { useState} from "react"
import { login } from "../../actions/userActions"
import { useDispatch } from "react-redux"



const LoginForm = () => {
  const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")

  const dispatch = useDispatch()

  const submitHandler = (e) => {
		e.preventDefault()
		dispatch(login(email, password))
	}

  return (
    <Form onSubmit={submitHandler}>
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

    <Button
      type='submit'
      variant='primary'
    >
      {" "}
      Sign In{" "}
    </Button>
  </Form>)
}

export default LoginForm