import React, { Component } from 'react';
import { Nav } from 'react-bootstrap';
import Profile from '../../models/ProfileModels';
import { RedirectService } from '../../services/RedirectService';
import FormProfileComponent from '../../components/form/profile-form/FormProfileComponent';
import { ToastComponent } from './../../components/toasts/ToastComponent';
import { UserService } from './../../services/UserService';
import './ProfilePage.css';

export class ProfilePage extends Component {

	userService = new UserService();
	message = '';
	action = '';
	idUser = 0;

	constructor( props ) {

		super( props );

		this.state = {
			showToast: false,
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

		// console.log( values );

		this.userService.editUser( this.idUser, values )
			.then(({ state, message, action }) => {

				actions.setSubmitting( false );
				actions.setFieldValue( 'apiaudiophoneusers_password', '' );
				this.message = message;
				this.action = action;
				this.setState( state );
			})
			.catch(( error ) => {

				actions.setSubmitting( false );

				if ( error.status === 401 ) {
					return this.setState({ redirect: true })
				}

				actions.resetForm();
				this.message = error.message;
				this.action = error.action;
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
					<FormProfileComponent
						profile={ this.state.user }
						getFormData={ this.getFormData }
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
