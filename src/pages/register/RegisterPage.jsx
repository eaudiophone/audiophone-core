import React, { Component } from 'react';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import RedirectService from './../../services/RedirectService';
import User from './../../models/UserModels';
import RegisterMessages from './RegisterMessages';
import './RegisterPage.css';

class RegisterPage extends Component {

	constructor( props ) {

		super( props );

		this.state = {
			redirect: false,
			name: '',
			email: '',
			password: '',
			validate: false
		}

		this.handleSubmit = this.handleSubmit.bind( this );
		this.handleChange = this.handleChange.bind( this );
		this.resetForm = this.resetForm.bind( this );

		this.validationMessages = new RegisterMessages();
	}

	handleChange( event ) {

		const name = event.target.name;
		const value = event.target.value;

		this.setState({ [ name ] : value });
	}

	resetForm( event ) {
        
    this.setState({
    	name: '',
      email: '',
      password: '',
    });
  }

	handleSubmit( event ) {

		const form = event.currentTarget;

		if ( form.checkValidity() ) {

			const user = new User( 
				this.state.name,
				this.state.email,
				this.state.password
			);

			alert('cliente registrado');

			this.setState({ redirect: true });

			console.log( user );
			
		} else {

			this.setState({ validate: true });

			event.preventDefault();
    	event.stopPropagation();
		
		}	
	}

	redirectTo() {

		if ( this.state.redirect ) {
			return ( <RedirectService route="/" /> );
		}
	}

	getInput( name, title, type, state ) {

		return (

			<Form.Group>
				<Form.Label>{ title }</Form.Label>
				<Form.Control
					as="input" 
					type={ type }
					name={ name }
					size="lg"
					value={ state }
					onChange={ this.handleChange }
					required
				/>
				<Form.Control.Feedback type="invalid">
					Campo requerido
				</Form.Control.Feedback>
			</Form.Group>
		);

	}

	getInputPassword( state ) {

		return ( 

			<Form.Group>
				<Form.Label>Contraseña</Form.Label>
				<Form.Control
					className="mb-0"
					as="input" 
					type="password"
					name="password"
					size="lg"
					value={ state }
					onChange={ this.handleChange }
					required
				/>
				<Form.Control.Feedback type="invalid">
					Campo requerido
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
				
				<Form 
					className="form-register" 
					onSubmit={ this.handleSubmit }
					noValidate
					validated={ this.state.validate }
				>

					<h2 className="mb-5">
						Registro de usuarios
					</h2>
					
					{ this.getInput( 'name', 'Nombre del usuario:', 'text', this.state.name ) }
					{ this.getInput( 'email', 'Correo electronico:', 'email', this.state.email ) }
					{ this.getInputPassword( this.state.password ) }
					{ this.getButtons() }
					
				</Form>

				<p className="mt-5 text-center">
					<a href="/">Volver al login</a>
				</p>

				{ this.redirectTo() }
			</Container>
		);
	}
} 

export default RegisterPage;