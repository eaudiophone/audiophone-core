import React, { Component } from 'react';
import { Container } from 'react-bootstrap';
import { Formik } from 'formik';
import RedirectService from './../../services/RedirectService';
import Profile from './../../models/ProfileModels';
import ProfileSchema from './../../components/form/profile-form/ProfileSchema';
import FormProfileComponent from '../../components/form/profile-form/FormProfileComponent';
import './RegisterPage.css';

class RegisterPage extends Component {

	constructor( props ) {

		super( props );

		this.state = { redirect: false };
		this.getFormData = this.getFormData.bind( this );
	}

	getFormData( values, actions ) {
		
		actions.setSubmitting( false );
		
		const data = {
			audiophoneusers_fullname: values.name,
			audiophoneusers_email: values.email,
			audiophoneusers_password: values.password
		};
		
		console.log( data );

		alert( 'usuario registrado' );

		this.setState({ redirect: true });
	}

	redirectTo() {

		if ( this.state.redirect ) {
			return ( <RedirectService route="/" /> );
		}
	}

	render() {
		
		return ( 

			<Container className="container-register">

				<h2 className="mb-5 text-center">
					Registro de usuarios
				</h2>
				
				<Formik 
					validationSchema={ new ProfileSchema().getSchema() }
					initialValues={ new Profile() }
					onSubmit={ this.getFormData } 
					validateOnChange={ false }
					component={ FormProfileComponent.FormProfileComponent }
				/>
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