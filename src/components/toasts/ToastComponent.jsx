import React from 'react';
import { Toast, Row, Col } from 'react-bootstrap';

const ToastComponent = ({ showToast, content, context, onHide }) => {

	if ( context !== 'Error' ) {

		return (
			<Toast 
				className="toast-style success-toast" 
				delay={ 2000 }
				onClose={ () => onHide() }
				show={ showToast }
				autohide
			>
				<Toast.Body>
					
					<Row className="p-2">
						<Col sm={ 2 } className="d-flex flex-column align-items-center justify-content-center">
							<i className="fas fa-check-circle fa-2x"></i>
						</Col>
						<Col sm={ 10 } className="text-center">
							<h5 className="font-weight-bold">{ context }</h5>
							<p>{ content }</p>
						</Col>
					</Row>
					
				</Toast.Body>
			</Toast>		
		);

	} else {

		return (
			<Toast 
					className="toast-style fail-toast" 
					delay={ 2000 }
					onClose={ () => onHide() }
					show={ showToast }
					autohide
			>
				<Toast.Body>

					<Row className="p-2">
						<Col sm={ 2 } className="d-flex flex-column align-items-center justify-content-center">
							<i className="fas fa-times-circle fa-2x"></i>
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
};

export default ToastComponent;