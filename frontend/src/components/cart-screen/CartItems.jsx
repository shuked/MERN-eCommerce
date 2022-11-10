import React from 'react'
import { Row, Col, ListGroup, Image, Form, Button } from "react-bootstrap"
import { Link } from "react-router-dom"
import { useDispatch } from "react-redux"
import { addToCart , removeFromCart } from "../../actions/cartActions"



const CartItems = ({items}) => {
  const dispatch = useDispatch()
  const removeFromCartHandler = (id) => {
		dispatch(removeFromCart(id))
	}
  return (
    <ListGroup variant='flush'>
						{items.map((item) => (
							<ListGroup.Item key={item.product}>
								<Row>
									<Col md={2}>
										<Image
											src={item.image}
											alt={item.name}
											fluid
											rounded
										/>
									</Col>
									<Col md={3}>
										<Link to={`/products/${item.product}`}>{item.name}</Link>
									</Col>
									<Col md={2}>${item.price}</Col>
									<Col md={2}>
										<Form.Control
											as='select'
											value={item.qty}
											onChange={(e) =>
												dispatch(
													addToCart(item.product, Number(e.target.value))
												)
											}
										>
											{[...Array(item.countInStock).keys()].map((x) => (
												<option
													key={x + 1}
													value={x + 1}
												>
													{" "}
													{x + 1}{" "}
												</option>
											))}
										</Form.Control>
									</Col>
									<Col md={2}>
										<Button
											type='button'
											variant='light'
											onClick={() => removeFromCartHandler(item.product)}
										>
											{" "}
											<i className='fas fa-trash'></i>{" "}
										</Button>
									</Col>
								</Row>
							</ListGroup.Item>
						))}
					</ListGroup>
  )
}

export default CartItems