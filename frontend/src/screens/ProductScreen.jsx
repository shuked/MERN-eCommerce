import React, { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { Row, Col, Image, ListGroup } from "react-bootstrap"
import { listProductDetails } from "../actions/productActions"
import Message from "../components/global/Message"
import Loader from "../components/global/Loader"
import Meta from "../components/global/Meta"
import ProductReviews from "../components/product-screen/ProductReviews"
import { PRODUCT_CREATE_REVIEW_RESET } from "../constants/productConstants"
import ProductInfo from "../components/product-screen/ProductInfo"
import AddReview from "../components/product-screen/AddReview"
import AddToCart from "../components/product-screen/AddToCart"

const ProductScreen = () => {
	const { id } = useParams()

	const [rating, setRating] = useState(0)
	const [comment, setComment] = useState("")

	const dispatch = useDispatch()

	const productDetails = useSelector((state) => state.productDetails)
	const { loading, error, product } = productDetails

	const productReviewCreate = useSelector((state) => state.productReviewCreate)
	const { success: successProductReview, error: errorProductReview } =
		productReviewCreate

	useEffect(() => {
		if (successProductReview) {
			alert("review submited")
			setRating(0)
			setComment("")
			dispatch({ type: PRODUCT_CREATE_REVIEW_RESET })
		}
		dispatch(listProductDetails(id))
	}, [dispatch, id, successProductReview])

	return (
		<>
			<Link
				className='btn btn-light my-3'
				to='/'
			>
				Go Back
			</Link>
			{loading ? (
				<Loader />
			) : error ? (
				<Message value={"danger"}>{error}</Message>
			) : (
				<>
					<Meta title={product.name} />
					<Row>
						<Col md={6}>
							<Image
								src={product.image}
								alt={product.name}
								fluid
							/>
						</Col>
						<Col md={3}>
							<ProductInfo product={product} />
						</Col>
						<Col md={3}>
							<AddToCart product={product} />
						</Col>
					</Row>
					<Row>
						<Col md={6}>
							<h2>Reviews</h2>
							{product.reviews.length === 0 && <Message> No reviews</Message>}
							<ListGroup>
								<ProductReviews reviews={product.reviews} />
								<AddReview
									error={errorProductReview}
									rating={rating}
									setRating={setRating}
									comment={comment}
									setComment={setComment}
								/>
							</ListGroup>
						</Col>
					</Row>
				</>
			)}
		</>
	)
}

export default ProductScreen
