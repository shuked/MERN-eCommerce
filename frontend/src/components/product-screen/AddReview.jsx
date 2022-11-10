import { ListGroup, Button, Form } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import Message from "../global/Message"
import { Link, useParams } from "react-router-dom"
import { createProductReview } from "../../actions/productActions"

const AddReview = ({ error, rating, setRating, comment, setComment }) => {
	const dispatch = useDispatch()
	const { id } = useParams()
	const userLogin = useSelector((state) => state.userLogin)
	const { userInfo } = userLogin

	const submitHandler = (e) => {
		e.preventDefault()
		dispatch(createProductReview(id, { rating, comment }))
	}

	return (
		<ListGroup.Item>
			<h2>Write a customer review</h2>
			{error && <Message variant='danger'>{error}</Message>}
			{userInfo ? (
				<Form onSubmit={submitHandler}>
					<Form.Group controlId='rating'>
						<Form.Label> Rating </Form.Label>
						<Form.Control
							as='select'
							value={rating}
							onChange={(e) => setRating(e.target.value)}
						>
							<option value=''>Select...</option>
							<option value='1'>1 - Poor</option>
							<option value='2'>2 - Fair</option>
							<option value='3'>3 - Good</option>
							<option value='4'>4 - Very Good</option>
							<option value='5'>5 - Excellent</option>
						</Form.Control>
					</Form.Group>
					<Form.Group controlId='comment'>
						<Form.Label>Comment</Form.Label>
						<Form.Control
							as='textarea'
							row='3'
							value={comment}
							onChange={(e) => setComment(e.target.value)}
						></Form.Control>
					</Form.Group>
					<Button
						type='submit'
						variant='primary'
					>
						Submit
					</Button>
				</Form>
			) : (
				<Message>
					Please <Link to='/login'>login</Link> to write a customer review
				</Message>
			)}
		</ListGroup.Item>
	)
}

export default AddReview
