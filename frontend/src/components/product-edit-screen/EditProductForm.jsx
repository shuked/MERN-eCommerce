import axios from "axios"
import { useState } from "react"
import { useParams } from "react-router-dom"
import { useDispatch } from "react-redux"
import { updateProduct } from "../../actions/productActions"
import { Form, Button } from "react-bootstrap"
import Loader from "../global/Loader"

const EditProductForm = ({
	name,
	setName,
	price,
	setPrice,
	image,
	setImage,
	brand,
	setBrand,
	countInStock,
	setCountInStock,
	category,
	setCategory,
	description,
	setDescription,
}) => {
	const dispatch = useDispatch()
	const [uploading, setUploading] = useState(false)
	const productId = useParams().id

	const submitHandler = (e) => {
		e.preventDefault()
		dispatch(
			updateProduct({
				_id: productId,
				name,
				price,
				image,
				brand,
				category,
				description,
				countInStock,
			})
		)
	}

	const uploadFileHandler = async (e) => {
		const file = e.target.files[0]
		const formData = new FormData()
		formData.append("image", file)
		setUploading(true)

		try {
			const config = {
				headers: {
					"Content-Type": "multipart/form-data",
				},
			}

			const { data } = await axios.post("/api/upload", formData, config)

			setImage(data)
			setUploading(false)
		} catch (error) {
			console.error(error)
			setUploading(false)
		}
	}

	return (
		<Form onSubmit={submitHandler}>
			<Form.Group controlid='name'>
				<Form.Label> Name </Form.Label>
				<Form.Control
					type='name'
					placeholder='Enter name'
					value={name}
					onChange={(e) => setName(e.target.value)}
				></Form.Control>
			</Form.Group>

			<Form.Group controlid='price'>
				<Form.Label> Price</Form.Label>
				<Form.Control
					type='number'
					placeholder='Enter Price'
					value={price}
					onChange={(e) => setPrice(e.target.value)}
				></Form.Control>
			</Form.Group>

			<Form.Group controlid='image'>
				<Form.Label>Image</Form.Label>
				<Form.Control
					type='text'
					placeholder='Enter image url'
					value={image}
					onChange={(e) => setImage(e.target.value)}
				></Form.Control>
				<Form.Control
					type='file'
					id='image-file'
					label='Choose File'
					custom='true'
					onChange={uploadFileHandler}
				></Form.Control>
				{uploading && <Loader />}
			</Form.Group>

			<Form.Group controlid='brand'>
				<Form.Label> Brand</Form.Label>
				<Form.Control
					type='text'
					placeholder='Enter brand'
					value={brand}
					onChange={(e) => setBrand(e.target.value)}
				></Form.Control>
			</Form.Group>

			<Form.Group controlid='countInStock'>
				<Form.Label> Count In Stock</Form.Label>
				<Form.Control
					type='number'
					placeholder='Enter Count In Stock'
					value={countInStock}
					onChange={(e) => setCountInStock(e.target.value)}
				></Form.Control>
			</Form.Group>

			<Form.Group controlid='category'>
				<Form.Label> Category</Form.Label>
				<Form.Control
					type='text'
					placeholder='Enter category'
					value={category}
					onChange={(e) => setCategory(e.target.value)}
				></Form.Control>
			</Form.Group>

			<Form.Group controlid='description'>
				<Form.Label> Description</Form.Label>
				<Form.Control
					type='text'
					placeholder='Enter Description'
					value={description}
					onChange={(e) => setDescription(e.target.value)}
				></Form.Control>
			</Form.Group>

			<Button
				type='submit'
				variant='primary'
			>
				{" "}
				Update{" "}
			</Button>
		</Form>
	)
}

export default EditProductForm
