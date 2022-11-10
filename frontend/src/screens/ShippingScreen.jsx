import FormContainer from "../components/global/FormContainer"
import CheckoutSteps from "../components/global/CheckoutSteps"

import ShippingForm from "../components/shipping-screen/ShippingForm"

const ShippingScreen = () => {
	return (
		<FormContainer>
			<CheckoutSteps
				step1={true}
				step2={true}
			/>
			<h1>Shipping</h1>
			<ShippingForm />
		</FormContainer>
	)
}

export default ShippingScreen
