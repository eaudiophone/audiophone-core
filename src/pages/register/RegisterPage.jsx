import React, { Component } from 'react';
import { Container } from 'react-bootstrap';
import { Formik } from 'formik';

import BackendService from './../../services/BackendService';
import RedirectService from './../../services/RedirectService';

import Profile from './../../models/ProfileModels';
import ProfileSchema from './../../components/form/profile-form/ProfileSchema';

import FormProfileComponent from '../../components/form/profile-form/FormProfileComponent';
import ToastComponent from '../../components/toasts/ToastComponent'; 

import './RegisterPage.css';

class RegisterPage extends Component {

	backendService = new BackendService();

	message = 'Creacion de usuario exitosa';
	action = 'success';

	constructor( props ) {

		super( props );

		this.state = { 
			redirect: false, 
		};

		this.getFormData = this.getFormData.bind( this );
	}

	getFormData( values, actions ) {
		
		actions.setSubmitting( false );
	
		this.backendService.postClient( 'apiaudiophoneuser/store',  values )
			.then( resp => {
				// this.message = 'Creación de usuario exitosa';
				// this.action = 'success';
				this.setState({ redirect: true });
			})
			.catch( error => console.error( error ) );

	}

	redirectTo() {

		if ( this.state.redirect ) {
			return ( <RedirectService route="/login" /> );
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
					<a href="/login">
						<i className="fas fa-sign-in-alt mr-2"></i>
						Volver al login
					</a>
				</p>

				{ this.redirectTo() }
				
				<ToastComponent   context={ this.action } content={ this.message } />

			</Container>
		);
	}
} 

export default RegisterPage;