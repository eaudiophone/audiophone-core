import React, { Component } from 'react';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import { Formik } from 'formik';
import RedirectService from './../../services/RedirectService';
import User from './../../models/UserModels';
import RegisterSchema from './RegisterSchema';
import './RegisterPage.css';

class RegisterPage extends Component {

	constructor( props ) {

		super( props );

		this.state = { redirect: false };
	}

	handleSubmit( values, actions ) {
		console.log( values, actions );
		
		actions.setSubmitting( false );

		this.setState({ redirect: true });
	}

	redirectTo() {

		if ( this.state.redirect ) {
			return ( <RedirectService route="/" /> );
		}
	}

	getInput( title, type, name, value, handleChange, error ) {

		return (

			<Form.Group>
				<Form.Label>{ title }</Form.Label>
				<Form.Control
					as="input" 
					type={ type }
					name={ name }
					size="lg"
					value={ value }
					onChange={ handleChange }
					isInvalid={ !!error }
				/>
				<Form.Control.Feedback type="invalid">
					{ error }
				</Form.Control.Feedback>
			</Form.Group>
		);

	}

	getInputPassword(  value, handleChange, error ) {

		return ( 

			<Form.Group>
				<Form.Label>Contraseña</Form.Label>
				<Form.Control
					className="mb-0"
					as="input" 
					type="password"
					name="password"
					size="lg"
					value={ value }
					onChange={ handleChange }
					isInvalid={ !!error }
				/>
				<Form.Control.Feedback type="invalid">
					{ error }
				</Form.Control.Feedback>
			</Form.Group>
		);

	}

	getButtons() {

		return(

			<Row className="mt-5">
				<Col sm="6">
					<Button type="submit" variant="primary" size="lg" block>
						Registrar
					</Button>
				</Col>
				<Col sm="6">
					<Button type="reset" variant="secondary" size="lg" block 
					onClick={ this.resetForm }>
						Cancelar
					</Button>
				</Col>
			</Row>
		);
	}

	render() {
		
		return ( 

			<Container>
				
				<Formik 
					validationSchema={ new RegisterSchema().getSchema() }
					initialValues={ new User() }
					onSubmit={ this.handleSubmit } 
				>
					{ ({
						handleSubmit,
        		handleChange,
        		values,
        		errors,
						}) => (
							
							<Form 
								className="form-register" 
								onSubmit={ handleSubmit }
								noValidate
							>
								<h2 className="mb-5">
									Registro de usuarios
								</h2>

								{ this.getInput( 'nombre', 'text', 'name', values.name, handleChange, errors.name ) }
								{ this.getInput( 'correo', 'email', 'email', values.email, handleChange, errors.email ) }
								{ this.getInputPassword( values.password, handleChange, errors.password ) }
								
								{ this.getButtons() }

							</Form>
						)
					}
				</Formik>

				<p className="mt-5 text-center">
					<a href="/">Volver al login</a>
				</p>

				{ this.redirectTo() }
			</Container>
		);
	}
} 

export default RegisterPage;