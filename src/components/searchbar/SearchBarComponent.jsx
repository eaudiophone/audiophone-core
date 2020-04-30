import React, { useState } from 'react'
import { InputGroup, Form, Button } from 'react-bootstrap';

const SearchBarComponent = () => {

	const [ search, setSearch ] = useState('');

	const send = () => {
		console.log( search );
	}

	return (

		<Form.Row>
			<InputGroup>
				<Form.Control
					type="text"  
					value={ search }
					onChange={ ( $event ) => setSearch( $event.target.value ) }
					placeholder="Busqueda por correo o nombre"
				/>
				<InputGroup.Append>
					<Button
						variant="primary"
						onClick={ () => send() }
					>
						<i className="fas fa-search"></i>
					</Button>
				</InputGroup.Append>
			</InputGroup>	
		</Form.Row>
	);	
};

export default SearchBarComponent;
