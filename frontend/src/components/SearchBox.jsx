import { useState } from "react"
import { Form, Button, Row, Col } from "react-bootstrap"
import { useNavigate } from "react-router-dom"

const SearchBox = () => {
	const navigate = useNavigate()
	const [keyword, setKeyword] = useState("")

	const submitHandler = (e) => {
		e.preventDefault()
		if (keyword.trim()) {
			navigate(`/search/${keyword}`)
		} else {
			navigate("/")
		}
	}

	return (
		<Form
			onSubmit={submitHandler}
			inline='true'
		>
			<Row>
				<Col xs={8}>
					<Form.Control
						type='text'
						name='q'
						onChange={(e) => setKeyword(e.target.value)}
						placeholder='Search Products'
						className='mr-sm-2 ml-sm-5'
					></Form.Control>
				</Col>
				<Col xs={4}>
					<Button
						type='submit'
						variant='outline-success'
						className='p-2'
					>
						{" "}
						Search
					</Button>
				</Col>
			</Row>
		</Form>
	)
}

export default SearchBox
