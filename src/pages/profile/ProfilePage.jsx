import React, { Component } from 'react';

import { Image, Nav } from 'react-bootstrap';

import Profile from '../../models/ProfileModels';

import { AuthService } from './../../services/AuthService';
import RedirectService from '../../services/RedirectService';

import FormProfileComponent from '../../components/form/profile-form/FormProfileComponent';
import ToastComponent from './../../components/toasts/ToastComponent';

import './ProfilePage.css';

class ProfilePage extends Component {

	AuthService = new AuthService();
	message = '';
	action = '';
	id = null;

	constructor( props ) {

		super( props );

		this.state = { 
			showToast: false, 
			loading: false,
			user: new Profile(
				this.AuthService.getLogged().fullname,
				this.AuthService.getLogged().email
			),
			redirect: false
		};

		this.getFormData = this.getFormData.bind( this );

		this.id = this.AuthService.getLogged().id;
	}

	getTabs() {
		
		return (
			
			<Nav variant="tabs" defaultActiveKey="#nav-profile">
				<Nav.Item>
					<Nav.Link 
						className="nav-item nav-link" 
    				id="nav-profile-tab" 
    				data-toggle="tab" 
    				href="#nav-profile" 
    				role="tab" 
    				aria-controls="nav-profile" 
    				aria-selected="true"
    			>
    				Perfil de usuario
    			</Nav.Link>
				</Nav.Item>
			</Nav>
		);
	}

	getImage() {

		return (
				
			<div className="img-container">
				<Image 
					alt="img-dummy" 
					src="/assets/favicon.ico"
					roundedCircle
				/>
			</div>
		); 
	}

	
	getHeader() {

		return (
			
			<div className="d-flex justify-content-between flex-wrap flex-md-nowrap
			align-items-center pb-2 mb-3 border-bottom">
				<h2>Perfil de Usuario</h2>
			</div>
		);
	}

	getFormData( values, actions ) {

		actions.setSubmitting( false );

		this.setState({ loading: true })

		setTimeout( () => {

			this.AuthService.putClient(`apiaudiophoneuser/update/${ this.id }`, values )
			.then( resp => {

				if ( resp.data.status === 401 ) {
					return this.setState({ redirect: true })
				}
				
				const { apiaudiophoneusermessage, apiaudiophoneuserupdate } = resp.data; 
			
				this.action = 'Exito';
				this.message = apiaudiophoneusermessage;

				let logged = JSON.parse( sessionStorage.getItem('logged'));

				logged = {
					...logged,
					email: apiaudiophoneuserupdate.apiaudiophoneusers_email,
					fullname: apiaudiophoneuserupdate.apiaudiophoneusers_fullname,
				}

				sessionStorage.setItem('logged', JSON.stringify( logged ) );
				
				actions.setFieldValue( 'apiaudiophoneusers_password', '' );

				this.setState({ 
					showToast: true, 
					loading: false, 
					user: new Profile(
						JSON.parse( sessionStorage.getItem('logged')).fullname,
						JSON.parse( sessionStorage.getItem('logged')).email
					) 
				});
			})
			.catch( error => {
				
				this.message = 'Error interno del servidor';
				this.action = 'Error';
				
				actions.resetForm();

				this.setState({ showToast: true, loading: false });
			});

		}, 1000 );
	}

	render() {
		
		return (

			<div>
				{ this.state.redirect && ( <RedirectService route="/login" /> ) }
				{ this.getHeader() }
				{ this.getTabs() }
				<div>
					<FormProfileComponent.FormProfileComponent 
						profile={ this.state.user }
						getFormData={ this.getFormData }
						loading={ this.state.loading }
						register={ false }
					/>
				</div>
				<ToastComponent 
					showToast={ this.state.showToast }
					content={ this.message }
					context={ this.action }
					onHide={ () => this.setState({ showToast: false }) }
				/>
			</div>
		);
	}
}

export default ProfilePage;