import React from 'react'
import { Row, Col } from "react-bootstrap"
import { Link} from "react-router-dom"


const LoginLink = ({redirect}) => {
  return (
    <Row className='py-3'>
				<Col>
					Have an Acount?{" "}
					<Link to={redirect ? `/login?redirect=${redirect}` : "/login"}>
						{" "}
						Login{" "}
					</Link>
				</Col>
			</Row>
  )
}

export default LoginLink