import React, { Component } from 'react';
import FormProfileComponent from '../../components/form/profile-form/FormProfileComponent';
import { Image, Nav } from 'react-bootstrap';
import { Formik } from 'formik'
import ProfileSchema from '../../components/form/profile-form/ProfileSchema';
import Profile from '../../models/ProfileModels';
import './ProfilePage.css';
// import 'bootstrap/js/dist/tab';  // bootstrap-tabs

class ProfilePage extends Component {

	constructor( props ) {

		super( props );

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
    				aria-selected="false"
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
		console.log( values );
		actions.setSubmitting( false );
	}

	render() {
		
		return (

			<div>
				{ this.getHeader() }
				{ this.getImage() }
				{ this.getTabs() }
				<div>
					{ /* <Formik
						component={ FormProfileComponent } 
						onSubmit={ this.getFormData }
						initialValues={ this.user }
						validationSchema={ new ProfileSchema().getSchema() }
					/> */}
				</div>
			</div>
		);
	}
}

export default ProfilePage;