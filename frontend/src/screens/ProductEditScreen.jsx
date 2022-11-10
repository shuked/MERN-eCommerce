import React, { useState, useEffect } from "react"
import { Link, useParams, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import Message from "../components/global/Message"
import Loader from "../components/global/Loader"
import FormContainer from "../components/global/FormContainer"
import { listProductDetails } from "../actions/productActions"
import { PRODUCT_UPDATE_RESET } from "../constants/productConstants"
import EditProductForm from "../components/product-edit-screen/EditProductForm"

const ProductEditScreen = () => {
	const [name, setName] = useState("")
	const [price, setPrice] = useState(0)
	const [image, setImage] = useState("")
	const [brand, setBrand] = useState("")
	const [category, setCategory] = useState("")
	const [countInStock, setCountInStock] = useState(0)
	const [description, setDescription] = useState("")

	const productId = useParams().id

	const dispatch = useDispatch()
	const navigate = useNavigate()

	const productDetails = useSelector((state) => state.productDetails)
	const { loading, error, product } = productDetails

	const productUpdate = useSelector((state) => state.productUpdate)
	const {
		loading: loadingUpdate,
		error: errorUpdate,
		success: successUpdate,
	} = productUpdate

	useEffect(() => {
		if (successUpdate) {
			dispatch({ type: PRODUCT_UPDATE_RESET })
			navigate("/admin/productlist")
		} else {
			if (!product.name || product._id !== productId) {
				dispatch(listProductDetails(productId))
			} else {
				setName(product.name)
				setPrice(product.price)
				setImage(product.image)
				setBrand(product.brand)
				setCategory(product.category)
				setCountInStock(product.countInStock)
				setDescription(product.description)
			}
		}
	}, [dispatch, productId, product, navigate, successUpdate])

	return (
		<>
			<Link
				to='/admin/productlist'
				className='btn btn-light my-3'
			>
				Go Back
			</Link>
			<FormContainer>
				<h1>Edit Product</h1>
				{loadingUpdate && <Loader />}
				{errorUpdate && <Message variant='danger'> {errorUpdate}</Message>}
				{loading ? (
					<Loader />
				) : error ? (
					<Message variant='danger'>{error}</Message>
				) : (
					<EditProductForm
						name={name}
						setName={setName}
						price={price}
						setPrice={setPrice}
						image={image}
						setImage={setImage}
						brand={brand}
						setBrand={setBrand}
						countInStock={countInStock}
						setCountInStock={setCountInStock}
						category={category}
						setCategory={setCategory}
						description={description}
						setDescription={setDescription}
					/>
				)}
			</FormContainer>
		</>
	)
}

export default ProductEditScreen
