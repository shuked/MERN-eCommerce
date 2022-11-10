import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Form, Button, Col } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import FormContainer from "../components/global/FormContainer"
import CheckoutSteps from "../components/global/CheckoutSteps"
import { savePaymentMethod } from "../actions/cartActions"

const PaymentScreen = () => {
	const dispatch = useDispatch()
	const navigate = useNavigate()

	const cart = useSelector((state) => state.cart)
	const { shippingAddress } = cart

	const [paymentMethod, setPaymentMethod] = useState("PayPal")

	if (!shippingAddress) {
		navigate("/shipping")
	}

	const submitHandler = (e) => {
		e.preventDefault()
		dispatch(savePaymentMethod(paymentMethod))
		navigate("/placeorder")
	}

	return (
		<FormContainer>
			<CheckoutSteps
				step1={true}
				step2={true}
				step3={true}
			/>
			<h1>Payment Method</h1>
			<Form onSubmit={submitHandler}>
				<Form.Group>
					<Form.Label as='legend'> Select Method </Form.Label>
					<Col>
						<Form.Check
							type='radio'
							label='PayPal or Credit Card'
							id='PayPal'
							name='paymentMethod'
							value='PayPal'
							checked
							onChange={(e) => setPaymentMethod(e.target.value)}
						></Form.Check>
					</Col>
				</Form.Group>

				<Button
					type='submit'
					variant='primary'
				>
					Continue
				</Button>
			</Form>
		</FormContainer>
	)
}

export default PaymentScreen
