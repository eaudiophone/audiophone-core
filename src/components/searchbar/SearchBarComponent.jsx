import React from 'react'
import { InputGroup, Form, Button } from 'react-bootstrap';
 
const SearchBarComponent = ({ handleChange, handleSubmit, values, errors }) => {

	return (

		<Form onSubmit={ handleSubmit }>
			<InputGroup>
				<Form.Control 
					placeholder="Buscar usuario ..."
					aria-label="search-form"
					onChange={ handleChange }
					value={ values.search }
					name="search"
				/>
				<InputGroup.Append>
					<Button 
						variant="dark" 
						className="m-0"
						type="submit"
					>
						<i className="fas fa-search" />
					</Button>
				</InputGroup.Append>
				<Form.Control.Feedback type="invalid">
					{ !!errors.search }
				</Form.Control.Feedback>
			</InputGroup>
		</Form>
	);
};

export default SearchBarComponent;