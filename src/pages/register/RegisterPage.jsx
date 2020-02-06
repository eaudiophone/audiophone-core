import React, { Component } from 'react';
import { Container, Form, Button, Col } from 'react-bootstrap';
import { Formik } from 'formik';
import RedirectService from './../../services/RedirectService';
import User from './../../models/UserModels';
import RegisterSchema from './RegisterSchema';
import './RegisterPage.css';

class RegisterPage extends Component {

	constructor( props ) {

		super( props );

		this.state = { redirect: false };

		this.getFormData = this.getFormData.bind( this );
	}

	getFormData( values, actions ) {
		
		actions.setSubmitting( false );
		
		console.log( values );

		alert( 'usuario registrado' );

		this.setState({ redirect: true });
	}

	redirectTo() {

		if ( this.state.redirect ) {
			return ( <RedirectService route="/" /> );
		}
	}

	getInput( title, type, name, value, stateChange, error ) {

		return (

			<Form.Group>
				<Form.Label>{ title }</Form.Label>
				<Form.Control
					as="input" 
					type={ type }
					name={ name }
					value={ value }
					onChange={ stateChange }
					isInvalid={ !!error }
				/>
				<Form.Control.Feedback type="invalid">
					{ error }
				</Form.Control.Feedback>
			</Form.Group>
		);

	}

	getInputPassword(  value, stateChange, error ) {

		return ( 

			<Form.Group>
				<Form.Label>Contraseña</Form.Label>
				<Form.Control
					className="mb-0"
					as="input" 
					type="password"
					name="password"
					value={ value }
					onChange={ stateChange }
					isInvalid={ !!error }
				/>
				<Form.Control.Feedback type="invalid">
					{ error }
				</Form.Control.Feedback>
			</Form.Group>
		);

	}

	getButtons( resetState ) {

		return(

			<Form.Row className="mt-5">
				<Col sm="6">
					<Button type="submit" variant="primary" block>
						Registrar
					</Button>
				</Col>
				<Col sm="6">
					<Button type="reset" variant="secondary" block onClick={ resetState }>
						Cancelar
					</Button>
				</Col>
			</Form.Row>
		);
	}

	render() {
		
		return ( 

			<Container>
				
				<Formik 
					validationSchema={ new RegisterSchema().getSchema() }
					initialValues={ new User() }
					onSubmit={ this.getFormData } 
				>
					{ ({ handleSubmit, handleChange, handleReset, values, errors }) => (
							
							<Form 
								className="form-register" 
								onSubmit={ handleSubmit }
								noValidate
							>
								<h2 className="mb-5">
									Registro de usuarios
								</h2>

								{ this.getInput( 'Nombre:', 'text', 'name', values.name, handleChange, errors.name ) }
								{ this.getInput( 'Correo:', 'email', 'email', values.email, handleChange, errors.email ) }
								{ this.getInputPassword( values.password, handleChange, errors.password ) }
								
								{ this.getButtons( handleReset ) }

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