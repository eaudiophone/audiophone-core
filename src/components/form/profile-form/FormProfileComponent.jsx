import React from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';

const FormProfileComponent = ( props ) => {

	const {
		handleSubmit,
		handleChange,
		handleReset,
		values,
		errors
	} = props;

	const getFormPassword = ( title, name, error ) => (

		<Form.Group as={ Row }>
			<Form.Label 
				className="form-label" 
				column sm={ 2 }
			>{ title }</Form.Label>
			<Col sm="10">
				<Form.Control 
					as="input"
					type="password"
					onChange={ handleChange }
					name={ name }
					isInvalid={ !!error }
				>
					<Form.Control.Feedback type="invalid">
		    		{ error }
					</Form.Control.Feedback>
				</Form.Control>
			</Col>
		</Form.Group>
	);

	const getFormInput = ( title, name, value, error ) => (

		<Form.Group as={ Row }>
			<Form.Label 
				className="form-label" 
				column sm={ 2 }
			>{ title }</Form.Label>
			<Col sm="10">
				<Form.Control 
					as="input"
					value={ value }
					name={ name }
					onChange={ handleChange }
					isInvalid={ !!error }
				>
					<Form.Control.Feedback type="invalid">
		    		{ error }
					</Form.Control.Feedback>
				</Form.Control>
			</Col>
		</Form.Group>
	);

	const getButtons = () => (
		
		<Form.Row>
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

		<Form className="form" onSubmit={ handleSubmit }>
			{ getFormInput( 'Nombre', 'name', values.name, errors.name ) }
			{ getFormInput( 'Correo', 'email', values.email, errors.email ) }
			{ getFormPassword( 'contraseña:', 'password', errors.password ) }
			{ getFormPassword( 'confirmar contraseña:', 'confirmPassword', errors.confirmPassword ) }
			{ getButtons() }
		</Form>
	);
};

export default FormProfileComponent;