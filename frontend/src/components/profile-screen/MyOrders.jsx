import React from "react"
import { LinkContainer } from "react-router-bootstrap"
import { Button, Table } from "react-bootstrap"

const MyOrders = ({ orders }) => {
	return (
		<Table
			striped
			bordered
			hover
			responsive
			className='tacle-sm'
		>
			<thead>
				<tr>
					<th>ID</th>
					<th>DATE</th>
					<th>TOTAL</th>
					<th>PAID</th>
					<th>DELIVERED</th>
					<th></th>
				</tr>
			</thead>
			<tbody>
				{orders.map((order) => (
					<tr key={order._id}>
						<td>{order._id}</td>
						<td>{order.createdAt.substring(0, 10)}</td>
						<td>{order.totalPrice}</td>
						<td>
							{order.isPaid ? (
								order.paidAt.substring(0, 10)
							) : (
								<i
									className='fas fa-times'
									style={{ color: "red" }}
								></i>
							)}
						</td>
						<td>
							{order.isDelivered ? (
								order.deliveredAt.substring(0, 10)
							) : (
								<i
									className='fas fa-times'
									style={{ color: "red" }}
								></i>
							)}
						</td>
						<td>
							<LinkContainer to={`/orders/${order._id}`}>
								<Button
									className='btn btn-sm'
									variant='light'
								>
									Details
								</Button>
							</LinkContainer>
						</td>
					</tr>
				))}
			</tbody>
		</Table>
	)
}

export default MyOrders
