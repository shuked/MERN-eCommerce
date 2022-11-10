import React, { useEffect } from "react"
import { Link, useParams, useLocation } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { Row, Col } from "react-bootstrap"
import { addToCart } from "../actions/cartActions"
import Message from "../components/global/Message"
import CartItems from "../components/cart-screen/CartItems"
import CartCheckoutCard from "../components/cart-screen/CartCheckoutCard"

const CartScreen = () => {
	const productId = useParams().id
	const search = useLocation().search
	const qty = search ? Number(search.split("=")[1]) : 1

	const dispatch = useDispatch()

	const cart = useSelector((state) => state.cart)
	const { cartItems } = cart

	useEffect(() => {
		if (productId) {
			dispatch(addToCart(productId, qty))
		}
	}, [dispatch, productId, qty])

	return (
		<Row>
			<Col md={8}>
				<h1>Shopping Cart</h1>
				{cartItems.length === 0 ? (
					<Message>
						{" "}
						Your cart has no items <Link to={`/`}>Go Back </Link>
					</Message>
				) : (
					<CartItems items={cartItems} />
				)}
			</Col>
			<Col md={4}>
				<CartCheckoutCard items={cartItems} />
			</Col>
		</Row>
	)
}

export default CartScreen
