import React from "react"
import { Table, Button } from "react-bootstrap"
import { useDispatch } from "react-redux"
import { deleteProduct } from "../../actions/productActions"
import { LinkContainer } from "react-router-bootstrap"


const ProductListTable = ({products}) => {
	const dispatch = useDispatch()

	const deleteHandler = (id) => {
		if (window.confirm("Are you sure?")) {
			dispatch(deleteProduct(id))
		}
	}

	return (
		<Table
			striped
			bordered
			hover
			responsive
			className='table-sm'
		>
			<thead>
				<tr>
					<th>ID</th>
					<th>NAME</th>
					<th>PRICE</th>
					<th>CATEGORY</th>
					<th>BRAND</th>
					<th></th>
				</tr>
			</thead>
			<tbody>
				{products.map((product) => (
					<tr key={product._id}>
						<td>{product._id}</td>
						<td>{product.name}</td>
						<td>${product.price}</td>
						<td>{product.category}</td>
						<td>{product.brand}</td>
						<td>
							<LinkContainer to={`/admin/product/${product._id}/edit`}>
								<Button
									variant='light'
									className='btn-sm'
								>
									<i className='fas fa-edit'></i>
								</Button>
							</LinkContainer>
							<Button
								variant='danger'
								className='btn-sm'
								onClick={() => {
									deleteHandler(product._id)
								}}
							>
								<i className='fas fa-trash'></i>
							</Button>
						</td>
					</tr>
				))}
			</tbody>
		</Table>
	)
}

export default ProductListTable
