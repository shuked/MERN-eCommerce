import React from 'react'
import {  ListGroup, Button, Card } from "react-bootstrap"
import {  useNavigate } from "react-router-dom"


const CartCheckoutCard = ({items}) => {
  const navigate = useNavigate()
  const checkoutHandler = () => {
		navigate("/login?redirct=shipping")
	}
  return (
    <Card>
					<ListGroup variant='flush'>
						<ListGroup.Item>
							<h2>
								Subtotal ({items.reduce((acc, item) => acc + item.qty, 0)})
								items{" "}
							</h2>
							$
							{items
								.reduce((acc, item) => acc + item.qty * item.price, 0)
								.toFixed(2)}
						</ListGroup.Item>
						<ListGroup.Item>
							<Button
								type='button'
								className='btn-block'
								disabled={items.length === 0}
								onClick={checkoutHandler}
							>
								{" "}
								Proceed to Checkout
							</Button>
						</ListGroup.Item>
					</ListGroup>
				</Card>
  )
}

export default CartCheckoutCard