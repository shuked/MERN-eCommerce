import React, { useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { Button, Row, Col } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import Message from "../components/global/Message"
import Loader from "../components/global/Loader"
import Paginate from "../components/global/Paginate"
import ProductListTable from "../components/product-list-screen/ProductListTable"
import { listProducts, createProduct } from "../actions/productActions"
import { PRODUCT_CREATE_RESET } from "../constants/productConstants"

const ProductListScreen = () => {
	const { pageNumber = 1 } = useParams()

	const dispatch = useDispatch()
	const navigate = useNavigate()

	const productList = useSelector((state) => state.productList)
	const { loading, error, products, pages } = productList

	const productDelete = useSelector((state) => state.productDelete)
	const {
		loading: loadingDelete,
		error: errorDelete,
		success: successDelete,
	} = productDelete

	const productCreate = useSelector((state) => state.productCreate)
	const {
		loading: loadingCreate,
		error: errorCreate,
		success: successCreate,
		product: createdProduct,
	} = productCreate

	const userLogin = useSelector((state) => state.userLogin)
	const { userInfo } = userLogin

	useEffect(() => {
		dispatch({ type: PRODUCT_CREATE_RESET })
		if (!userInfo.isAdmin) {
			navigate("/login")
		}

		if (successCreate) {
			navigate(`/admin/product/${createdProduct._id}/edit`)
		} else {
			dispatch(listProducts("", pageNumber))
		}
	}, [
		dispatch,
		navigate,
		userInfo,
		successDelete,
		successCreate,
		createdProduct,
		pageNumber,
	])

	const createProductHandler = () => {
		dispatch(createProduct())
	}

	return (
		<>
			<Row className='align-items-center'>
				<Col>
					<h1>Products</h1>
				</Col>
				<Col className='text-align-right'>
					<Button
						className='my-3'
						onClick={createProductHandler}
					>
						<i className='fas fa-plus' />
						Create a Product
					</Button>
				</Col>
			</Row>
			{loadingDelete && <Loader />}
			{errorDelete && <Message variant='danger'> {errorDelete}</Message>}
			{loadingCreate && <Loader />}
			{errorCreate && <Message variant='danger'> {errorCreate}</Message>}
			{loading ? (
				<Loader />
			) : error ? (
				<Message variant='danger'>{error}</Message>
			) : (
				<>
					<ProductListTable products={products} />
					<Paginate
						pages={pages}
						page={pages}
						isAdmin={true}
					/>
				</>
			)}
		</>
	)
}

export default ProductListScreen
