import React from "react"
import { ListGroup } from "react-bootstrap"
import Rating from "../global/Rating"

const Reviews = ({ reviews }) => {
	return (
		<>
			{reviews.map((review) => (
				<ListGroup.Item key={review._id}>
					<strong>{review.name}</strong>
					<Rating value={review.rating} />
					<p>{review.createdAt.substring(0, 10)}</p>
					<p>{review.comment}</p>
				</ListGroup.Item>
			))}
		</>
	)
}

export default Reviews
