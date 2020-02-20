import React, { Component } from 'react';
import { Container, Form, Button, Col } from 'react-bootstrap';
import { Formik } from 'formik';
import RedirectService from './../../services/RedirectService';
import Profile from './../../models/ProfileModels';
import RegisterSchema from './../../components/form/profile-form/ProfileSchema';
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

	getInput( title, type, name, value, handleChange, error ) {

		return (

			<Form.Group>
				<Form.Label>{ title }</Form.Label>
				<Form.Control
					as="input" 
					type={ type }
					name={ name }
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
				<Form.Label>Contraseña:</Form.Label>
				<Form.Control
					className="mb-0"
					as="input" 
					type="password"
					name="password"
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

	getButtons( handleReset ) {

		return(

			<Form.Row className="mt-5">
				<Col sm={ 6 } className="d-flex flex-row justify-content-center">
					<Button className="button-w80" block type="reset" variant="secondary" onClick={ handleReset }>
						Cancelar
					</Button>
				</Col>
				<Col sm={ 6 } className="d-flex flex-row justify-content-center">
					<Button block type="submit" variant="primary" className="button-w80">
						Registrar
					</Button>
				</Col>
			</Form.Row>
		);
	}

	render() {
		
		return ( 

			<Container className="container-register">
				
				<Formik 
					validationSchema={ new RegisterSchema().getSchema() }
					initialValues={ new Profile() }
					onSubmit={ this.getFormData } 
					validateOnChange={ true }
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
								
								<Form.Row>
									<Col sm={ 12 }>
										{ this.getInput( 'Correo:', 'email', 'email', values.email, handleChange, errors.email ) }
									</Col>
									<Col sm={ 12 }>
										{ this.getInputPassword( values.password, handleChange, errors.password ) }
									</Col>
								</Form.Row>

								{ this.getButtons( handleReset ) }

							</Form>
						)
					}
				</Formik>

				<p className="mt-5 text-center">
					<a href="/">
						<i className="fas fa-sign-in-alt mr-2"></i>
						Volver al login
					</a>
				</p>

				{ this.redirectTo() }

			</Container>
		);
	}
} 

export default RegisterPage;