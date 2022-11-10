import { useEffect , useState} from "react"
import { Form, Button } from "react-bootstrap"
import { Link, useParams, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"

import { getUserDetails, updateUser } from "../../actions/userActions"


const EditUserForm = ({ user }) => {
	const [name, setName] = useState("")
	const [email, setEmail] = useState("")
	const [isAdmin, setIsAdmin] = useState(false)
	const dispatch = useDispatch()
	const userId = useParams().id

	useEffect(() => {
		if (user.name) {
			setName(user.name)
			setEmail(user.email)
			setIsAdmin(user.isAdmin)
		}
	},[])

	const submitHandler = (e) => {
		e.preventDefault()
		dispatch(updateUser({ _id: userId, name, email, isAdmin }))
	}

	return (
		<Form onSubmit={submitHandler}>
			<Form.Group controlId='name'>
				<Form.Label> Name </Form.Label>
				<Form.Control
					type='name'
					placeholder='Enter name'
					value={name}
					onChange={(e) => setName(e.target.value)}
				></Form.Control>
			</Form.Group>
			<Form.Group controlId='email'>
				<Form.Label> Email Address</Form.Label>
				<Form.Control
					type='email'
					placeholder='Enter email'
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				></Form.Control>
			</Form.Group>
			<Form.Group controlId='isadmin'>
				<Form.Check
					type='checkbox'
					label='Is Admin'
					checked={isAdmin}
					onChange={(e) => setIsAdmin(e.target.checked)}
				></Form.Check>
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

export default EditUserForm
