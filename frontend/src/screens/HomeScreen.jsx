import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Row, Col } from "react-bootstrap"
import Product from "../components/home-screen/Product"
import Message from "../components/global/Message"
import Loader from "../components/global/Loader"
import Paginate from "../components/global/Paginate"
import Meta from "../components/global/Meta"
import { listProducts } from "../actions/productActions"
import { useParams } from "react-router-dom"
import ProductCarousel from "../components/home-screen/ProductCarousel"

const HomeScreen = () => {
	const { keyword, pageNumber = 1 } = useParams()
	const dispatch = useDispatch()

	const productList = useSelector((state) => state.productList)
	const { loading, products, error, page, pages } = productList

	useEffect(() => {
		dispatch(listProducts(keyword, pageNumber))
	}, [dispatch, keyword, pageNumber])

	return (
		<>
			<Meta />
			{!keyword && <ProductCarousel />}
			<h1>Latest Products</h1>
			{loading ? (
				<Loader />
			) : error ? (
				<Message variant='danger'>{error}</Message>
			) : (
				<>
					<Row>
						{products.map((product) => (
							<Col
								key={product._id}
								sm={12}
								md={6}
								lg={4}
								xl={3}
							>
								<Product product={product} />
							</Col>
						))}
					</Row>
					<Paginate
						pages={pages}
						page={page}
						keyword={keyword ? keyword : ""}
					/>
				</>
			)}
		</>
	)
}

export default HomeScreen
