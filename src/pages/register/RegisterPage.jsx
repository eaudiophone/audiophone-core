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

	message = '';
	action = '';

	constructor( props ) {

		super( props );

		this.state = { 
			redirect: false,
			toast: false 
		};

		this.getFormData = this.getFormData.bind( this );
		this.setToast = this.setToast.bind( this );
	}

	setToast() {
		this.setState({ toast: false })
	}

	getFormData( values, actions ) {
		
		actions.setSubmitting( false );
	
		this.backendService.postClient( 'apiaudiophoneuser/store',  values )
			.then( resp => {

				// console.log( resp )
				
				this.message = 'Creación de usuario exitosa';
				this.action = 'Éxito';
				
				this.setState({ toast: true });

				setTimeout( () => {
					this.setState({ redirect: true });
				}, 2000 );

			})
			.catch( error => {

				// console.error( error );

				this.message = 'Ha ocurrido un imprevisto';
				this.action = 'Error'

				this.setState({ toast: true });
			});

	}

	render() {
		
		return ( 

			<Container className="container-register">

				{ this.state.redirect && ( <RedirectService route="/login" /> ) }

				<ToastComponent 
					showToast={ this.state.toast }    
					context={ this.action } 
					content={ this.message }
					onHide={ () => this.setToast() } 
				/>

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

			</Container>
		);
	}
} 

export default RegisterPage;