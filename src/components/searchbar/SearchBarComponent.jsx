import React from 'react'
import { InputGroup, Form, Button } from 'react-bootstrap';

const SearchBarComponent = ( props ) => {

	const {
		handleChange,
		handleSubmit,
		values
	} = props;

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
			</InputGroup>
		</Form>
	);
};

export default SearchBarComponent;