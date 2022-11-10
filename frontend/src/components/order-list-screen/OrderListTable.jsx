import React from 'react'
import { Table, Button } from "react-bootstrap"
import { LinkContainer } from "react-router-bootstrap"

const OrderListTable = ({orders}) => {
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
							<th>USER</th>
							<th>DATE</th>
							<th>TOTAL</th>
							<th>PAID</th>
							<th>DELIVERED</th>
							<th>ID</th>
						</tr>
					</thead>
					<tbody>
						{orders.map((order) => (
							<tr key={order._id}>
								<td>{order._id}</td>
								<td>{order.user && order.user.name}</td>
								<td>
									{order.createdAt.substring(0,10)}
								</td>
                <td>
									${order.totalPrice}
								</td>
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
											variant='light'
											className='btn-sm'
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

export default OrderListTable