import React from 'react';
import PropTypes from 'prop-types';
import { Toast, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const ToastComponent = ({ showToast, content, context, onHide }) => {

	if ( context === 'Warning' ) {

		return (
			<Toast 
				className="toast-style warning-toast"
				delay={ 3000 }
				onClose={ () => onHide() }
				show={ showToast }
				autohide
			>
				<Toast.Body>
					
					<Row className="p-2">
						<Col sm={ 2 } className="d-flex flex-column align-items-center justify-content-center">
							<FontAwesomeIcon icon="exclamation-circle" size="2x"/>
						</Col>
						<Col sm={ 10 } className="text-center">
							<h5 className="font-weight-bold">Precaución</h5>
							<p>{ content }</p>
						</Col>
					</Row>
					
				</Toast.Body>
			</Toast>		

		);

	} else if ( context === 'Exito' ) {

		
		return (
			<Toast 
				className="toast-style success-toast" 
				delay={ 3000 }
				onClose={ () => onHide() }
				show={ showToast }
				autohide
			>
				<Toast.Body>
					
					<Row className="p-2">
						<Col sm={ 2 } className="d-flex flex-column align-items-center justify-content-center">
							<FontAwesomeIcon icon="check-circle" size="2x"/>
						</Col>
						<Col sm={ 10 } className="text-center">
							<h5 className="font-weight-bold">{ context }</h5>
							<p>{ content }</p>
						</Col>
					</Row>
					
				</Toast.Body>
			</Toast>		
		);

	}	

	return (
		<Toast 
				className="toast-style fail-toast" 
				delay={ 3000 }
				onClose={ () => onHide() }
				show={ showToast }
				autohide
		>
			<Toast.Body>

				<Row className="p-2">
					<Col sm={ 2 } className="d-flex flex-column align-items-center justify-content-center">
						<FontAwesomeIcon icon="times-circle" size="2x"/>
					</Col>
					<Col sm={ 10 } className="text-center">
						<h5 className="font-weight-bold">{ context }</h5>
						<p>{ content }</p>
					</Col>
				</Row>

			</Toast.Body>
		</Toast>
	);
};

ToastComponent.propTypes = {
	content: PropTypes.string.isRequired,
	context: PropTypes.string.isRequired,
	onHide: PropTypes.func.isRequired,
	showToast: PropTypes.bool.isRequired
};