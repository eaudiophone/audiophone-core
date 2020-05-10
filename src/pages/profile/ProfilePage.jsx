import React, { Component } from 'react';

import FormProfileComponent from '../../components/form/profile-form/FormProfileComponent';

import { Image, Nav } from 'react-bootstrap';
import { Formik } from 'formik';

import ProfileSchema from '../../components/form/profile-form/ProfileSchema';
import Profile from '../../models/ProfileModels';

import BackendService from './../../services/BackendService';

import ToastComponent from './../../components/toasts/ToastComponent';

import './ProfilePage.css';

class ProfilePage extends Component {

	backendService = new BackendService();
	message = '';
	action = '';

	constructor( props ) {

		super( props );

		this.state = { showToast: false };

		this.getFormData = this.getFormData.bind( this );

		this.user = new Profile(
			'Gabriel Martinez',
			'gabmart1995@gmail.com'
			);
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

		this.backendService.putClient(`apiaudiophoneuser/update/6`, values )
			.then( resp => {
				
				this.action = 'Exito';
				this.message = 'Usuario actualizado';

				this.setState({ showToast: true });
			})
			.catch( error => {
				
				this.message = 'Error interno del servidor';
				this.action = 'Error';

				this.setState({ showToast: true });
			});
	}

	render() {
		
		return (

			<div>
				{ this.getHeader() }
				{ this.getTabs() }
				<div>
					<Formik
						component={ FormProfileComponent.FormProfileComponent } 
						onSubmit={ this.getFormData }
						initialValues={ this.user }
						validationSchema={ new ProfileSchema().getSchema() }
						validateOnChange={ false }
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