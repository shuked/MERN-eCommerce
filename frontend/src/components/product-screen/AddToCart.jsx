import {useState} from "react"
import { Row, Col, ListGroup, Card, Button, Form } from "react-bootstrap"
import { useParams, useNavigate } from "react-router-dom"

const AddToCart = ({product}) => {
  const {id} = useParams()
	const [qty, setQty] = useState(1)

  const navigate = useNavigate()
  const addToCartHandler = () => {
		navigate(`/cart/${id}?qty=${qty}`)
	}
	return (
		<Card>
			<ListGroup variant='flush'>
				<ListGroup.Item>
					<Row>
						<Col>Price:</Col>
						<Col>
							<strong>$ {product.price}</strong>
						</Col>
					</Row>
				</ListGroup.Item>
				<ListGroup.Item>
					<Row>
						<Col>Status:</Col>
						<Col>{product.countInStock > 0 ? "In Stock" : "Out of Stock"}</Col>
					</Row>
				</ListGroup.Item>

				{product.countInStock > 0 && (
					<ListGroup.Item>
						<Row>
							<Col> Qty </Col>
							<Col>
								{" "}
								<Form.Control
									as='select'
									value={qty}
									onChange={(e) => setQty(e.target.value)}
								>
									{[...Array(product.countInStock).keys()].map((x) => (
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
						</Row>
					</ListGroup.Item>
				)}

				<ListGroup.Item xl={12}>
					<Button
						onClick={addToCartHandler}
						className='btn-block w-100'
						type='button'
						disabled={product.countInStock === 0}
					>
						add to cart{" "}
					</Button>
				</ListGroup.Item>
			</ListGroup>
		</Card>
	)
}

export default AddToCart
