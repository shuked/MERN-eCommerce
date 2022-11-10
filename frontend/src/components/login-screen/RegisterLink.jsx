import React from 'react'
import { Row, Col } from "react-bootstrap"
import { Link} from "react-router-dom"


const RegisterLink = ({redirect}) => {
  return (
    <Row className='py-3'>
				<Col>
					New Customer?{" "}
					<Link to={redirect ? `/register?redirect=${redirect}` : "/register"}>
						{" "}
						Register{" "}
					</Link>
				</Col>
			</Row>
  )
}

export default RegisterLink