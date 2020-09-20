import React, { Component } from 'react';
import { Container } from 'react-bootstrap';
import { RedirectService } from './../../services/RedirectService';
import FormProfileComponent from '../../components/form/profile-form/FormProfileComponent';
import { ToastComponent } from '../../components/toasts/ToastComponent'; 
import { AuthService } from './../../services/AuthService';
import Profile from './../../models/ProfileModels';
import './RegisterPage.css';

class RegisterPage extends Component {

	AuthService = new AuthService();

	message = '';
	action = '';

	constructor( props ) {

		super( props );

		this.state = { 
			redirect: false,
			toast: false,
			loading: false,
		};

		this.getFormData = this.getFormData.bind( this );
	}

	getFormData( values, actions ) {
		
		actions.setSubmitting( false );

		this.setState({ loading: true });

		this.AuthService.post( 'apiaudiophoneuser/store',  values )
			.then( resp => {

				// console.log( resp )
				
				this.message = resp.data.apiaudiophoneusermessage;
				this.action = 'Éxito';
				
				this.setState({ toast: true, loading: false });

				setTimeout( () => {
					this.setState({ redirect: true, });
				}, 1000 );

			})
			.catch( error => {

				// console.error( error );

				this.message = 'Ha ocurrido un imprevisto';
				this.action = 'Error'

				this.setState({ toast: true, loading: false });
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
					onHide={ () => this.setState({ toast: false }) } 
				/>

				<h2 className="mb-5 text-center">
					Registro de usuarios
				</h2>
				
				<FormProfileComponent
					profile={ new Profile() }
					loading={ this.state.loading } 
					getFormData={ this.getFormData } 
					register={ true }
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