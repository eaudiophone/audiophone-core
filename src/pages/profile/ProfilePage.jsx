import React, { Component } from 'react';
import { Nav } from 'react-bootstrap';
import Profile from '../../models/ProfileModels';
import { RedirectService } from '../../services/RedirectService';
import FormProfileModule from '../../components/form/profile-form/FormProfileComponent';
import { ToastComponent } from './../../components/toasts/ToastComponent';
import { UserService } from './../../services/UserService';
import './ProfilePage.css';

class ProfilePage extends Component {

	UserService = new UserService();
	message = '';
	action = '';
	idUser = 0;

	constructor( props ) {

		super( props );

		this.state = { 
			showToast: false, 
			loading: false,
			user: new Profile(
				JSON.parse( sessionStorage.getItem('logged') ).fullname,
				JSON.parse( sessionStorage.getItem('logged') ).email
			),
			redirect: false
		};

		this.getFormData = this.getFormData.bind( this );
		this.idUser = JSON.parse( sessionStorage.getItem('logged') ).id;
	}

	getFormData( values, actions ) {

		actions.setSubmitting( false );

		this.setState({ loading: true })

		this.UserService.editUser( this.idUser, values )
			.then(({ state, message, action }) => {
				
				this.message = message;
				this.action = action;
				actions.setFieldValue( 'apiaudiophoneusers_password', '' );
				this.setState( state );
			})
			.catch(( error ) => {

				if ( error.status === 401 ) {
					return this.setState({ loading: false, redirect: true })
				}

				this.message = 'Error interno del servidor';
				this.action = 'Error';
				actions.resetForm();
				this.setState({ loading: false, showToast: true });
			});
	}

	render() {
		
		return (

			<div>
				{ this.state.redirect && ( <RedirectService route="/login" /> ) }
				<div className="d-flex justify-content-between flex-wrap flex-md-nowrap
					align-items-center pb-2 mb-3 border-bottom">
					<h2>Perfil de Usuario</h2>
				</div>
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
				<div>
					<FormProfileModule.FormProfileComponent 
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