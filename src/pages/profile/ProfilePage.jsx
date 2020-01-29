import React, { Component } from 'react';
import { 
	Form,
	Row,
	Col,
	Image
} from 'react-bootstrap';
import './ProfilePage.css';

class ProfilePage extends Component {

	getImage() {

		return (
				
			<div className="img-container">
				<Image 
					alt="img-dummy" 
					src="https://dummyimage.com/100x%20100/000/fff"
					roundedCircle
				/>
			</div>
		); 
	}

	getForm() {

		return (
			
			<Form className="form">

				{ this.getInputText( 'nombre', 'Gabriel Martínez' ) }
				{ this.getInputText( 'correo', 'gabmart1995@gmail.com' ) }
				{ this.getInputText( 'rol de aplicación', 'USER_ROLE' ) }

			</Form>
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

	render() {

		return (

			<div>
				{ this.getHeader() }
				{ this.getImage() }
				{ this.getForm() }
			</div>
		);
	}
}

export default ProfilePage;