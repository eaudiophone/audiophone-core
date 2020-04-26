import React from 'react';
import { Toast } from 'react-bootstrap';

const ToastComponent = ({ showToast, content, context, onHide }) => {

	if ( context === 'success' ) {

		return (
			<Toast 
					className="toast-style success-toast" 
					delay={ 2000 }
					onClose={ () => onHide() }
					show={ showToast }
					autohide
			>
				<Toast.Body>
					<span>{ context }</span>
					<div className="text-center">{ content }</div>
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
					<span>{ context }</span>
					<div className="text-center">{ content }</div>
				</Toast.Body>
			</Toast>
		);
	}
};

export default ToastComponent;