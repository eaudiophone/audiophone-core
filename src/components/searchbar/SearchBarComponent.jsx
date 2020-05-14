import React, { useState } from 'react'
import { InputGroup, Form, Button } from 'react-bootstrap';
import './SearchBarComponent.css';

const SearchBarComponent = ({ sendSearch }) => {

	const [ search, setSearch ] = useState('');
	const [ validation, showValidation ] = useState( false );

	const validateText = () => {

		const string = /^[A-Za-z]+$/;
		const email = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
		// const email = /^[A-Za-z0-9]+@[A-Za-z0-9]+(?:\.[A-Za-z]{2,3})$/;

		if ( email.test( search ) || string.test( search ) ) {
			
			showValidation( false );
			sendSearch( search );
		
		} else {

			showValidation( true );
		}

	};

	return (

		<Form.Row className="searchBarComponent">
			<InputGroup className="input">
				<Form.Control
					type="text"  
					value={ search }
					onChange={ ( $event ) => setSearch( $event.target.value ) }
					placeholder="Buscar ..."
				/>
				<InputGroup.Append>
					<Button
						variant="primary"
						onClick={ () => validateText() }
					>
						<i className="fas fa-search"></i>
					</Button>
				</InputGroup.Append>
			</InputGroup>
			{ validation && (  
				<div className="text-danger mt-2">Búsqueda inválida</div>
			)}
		</Form.Row>
	);	
};

const SearchFilterComponent = ({ filterSearch }) => {

	const options = ['Todos', 'activos', 'inactivos'];

	return (
		<Form.Row>
			<Form.Label>Buscar por:</Form.Label>
			<Form.Control 
				as="select"
				onChange={ ( $event ) => filterSearch( $event.target.value ) }
				name="searchSelect"
				defaultValue="Todos"
			>
				{ options.map( ( element, index ) => (
						<option value={ element } key={ index }>{ element }</option> 
					)) 
				}
			</Form.Control>
		</Form.Row>
	);
};

export default {
	SearchFilterComponent,
	SearchBarComponent
};
