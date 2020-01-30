import React, { Component } from 'react';
import { 
	Form,
	Row,
	Col,
	Image,
	Nav
} from 'react-bootstrap';

import 'bootstrap/js/dist/tab';  // bootstrap-tabs
import './ProfilePage.css';

class ProfilePage extends Component {

	getTabs() {
		
		return (
			
			<Nav variant="tabs">
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
    				Perfil
    			</Nav.Link>
				</Nav.Item>
				<Nav.Item>
					<Nav.Link
						className="nav-item nav-link" 
    				id="nav-contact-tab" 
    				data-toggle="tab" 
    				href="#nav-security" 
    				role="tab" 
    				aria-controls="nav-contact" 
    				aria-selected="false"
					>
						Seguridad
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

	getDataUser() {

		return (

			<div 
				className="tab-pane fade show active" 
	  		id="nav-profile" 
	  		role="tabpanel" 
	  		aria-labelledby="nav-home-tab"
	  	>
				<div className="form">
					{ this.getInputText( 'nombre', 'Gabriel Martínez' ) }
					{ this.getInputText( 'correo', 'gabmart1995@gmail.com' ) }
					{ this.getInputText( 'rol de aplicación', 'USER_ROLE' ) }
				</div>
				
			</div>
		); 
	}

	getInputPassword( label ) {

		return (

			<Form.Group as={ Row }>
				<Form.Label 
					className="form-label" 
					column sm={ 2 }
				>{ label }</Form.Label>
				<Col sm="10">
					<Form.Control type="password"></Form.Control>
				</Col>
			</Form.Group>
		);
	}

	getInputText( label, value ) {

		return (

			<Form.Group as={ Row }>
					<Form.Label 
						className="form-label" 
						column sm={ 2 }
					>{ label }</Form.Label>
					<Col sm="10">
						<Form.Control readOnly defaultValue={ value }></Form.Control>
					</Col>
				</Form.Group>
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

	getFormSecurity() {

		return (

			<div 
					className="tab-pane fade show" 
		  		id="nav-security" 
		  		role="tabpanel" 
		  		aria-labelledby="nav-security-tab"
		  	>
				<Form className="form">
					{ this.getInputPassword( 'contraseña:' ) }
					{ this.getInputPassword( 'confirmar contraseña:' ) }
				</Form>
			</div>
		);
	}

	render() {

		return (

			<div>
				{ this.getHeader() }

				{ this.getImage() }
				{ this.getTabs() }
				<div className="tab-content" id="nav-tabContent">
					{ this.getDataUser() }
					{ this.getFormSecurity() }
				</div>
			</div>
		);
	}
}

export default ProfilePage;