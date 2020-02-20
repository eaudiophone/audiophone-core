import React from 'react';
import { Form, Col, Button } from 'react-bootstrap';

const FormProfileComponent = ( props ) => {

	const {
		handleSubmit,
		handleChange,
		handleReset,
		values,
		errors
	} = props;

	const getFormPassword = ( title, name, value, error ) => (

		<Form.Group>
			<Form.Label className="form-label">{ title }</Form.Label>
			<Form.Control 
				as="input"
				value={ value }
				type="password"
				onChange={ handleChange }
				name={ name }
				isInvalid={ !!error }
			/>
			<Form.Control.Feedback type="invalid">
			{ error }
			</Form.Control.Feedback>
		</Form.Group>

	);

	const getFormInput = ( title, name, value, error ) => (

		<Form.Group>
			<Form.Label className="form-label">{ title }</Form.Label>
			<Form.Control 
				as="input"
				value={ value }
				name={ name }
				onChange={ handleChange }
				isInvalid={ !!error }
			/>
			<Form.Control.Feedback type="invalid">
    		{ error }
			</Form.Control.Feedback>
		</Form.Group>
	);

	const getButtons = () => (
		
		<Form.Row className="mt-5">
			<Col sm={ 6 } className="d-flex flex-row justify-content-center">
				<Button 
					block 
					className="button-w80" 
					variant="secondary"
					type="reset"
					onClick={ handleReset }
				>
					Cancelar
				</Button>
			</Col>
			<Col sm={ 6 } className="d-flex flex-row justify-content-center">
				<Button 
					block 
					className="button-w80" 
					variant="primary"
					type="submit"
				>
					Enviar
				</Button>
			</Col>
		</Form.Row>
	);

	return (

		<Form className="form" onSubmit={ handleSubmit } noValidate>
			{ getFormInput( 'Nombre:', 'name', values.name, errors.name ) }
			{ getFormInput( 'Correo:', 'email', values.email, errors.email ) }
			{ getFormPassword( 'Contraseña:', 'password', values.password,  errors.password ) }
			{ getButtons() } 
		</Form>
	);
};

export default FormProfileComponent;