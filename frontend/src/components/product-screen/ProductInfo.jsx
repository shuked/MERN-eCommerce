import React from "react"
import { ListGroup } from "react-bootstrap"
import Rating from "../global/Rating"

const ProductInfo = ({ product }) => {
	return (
		<ListGroup variant='flush'>
			<ListGroup.Item>
				<h3>{product.name}</h3>
			</ListGroup.Item>
			<ListGroup.Item>
				<Rating
					value={product.rating}
					text={`${product.numReviews} Reviews`}
				/>
			</ListGroup.Item>
			<ListGroup.Item>Price: ${product.price}</ListGroup.Item>
			<ListGroup.Item>Description: {product.description}</ListGroup.Item>
		</ListGroup>
	)
}

export default ProductInfo
