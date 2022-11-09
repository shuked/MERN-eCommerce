import React from 'react'
import {Helmet} from 'react-helmet'

const Meta = ({title, description, keywords}) => {
  return (
    <Helmet>
			<title>{title}</title>
			<meta name='description' content={description} />
			<meta name='keywords' content={keywords} />
		</Helmet>
  )
}

Meta.defaultProps = {
  title: 'Welcome to eCommerce',
  description: 'Best Products Best Price',
  keywords: 'products, cheap, best price'
}

export default Meta