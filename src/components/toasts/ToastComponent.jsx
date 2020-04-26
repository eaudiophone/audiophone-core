import React, { useState } from 'react';
import { Toast, Button } from 'react-bootstrap';

const ToastComponent = ({ content, context }) => {

	const [ show, setShow ] = useState( false );
	
	return (
		
		<div>
			<Toast 
				className="toast-style success-toast" 
				delay={ 2000 }
				onClose={ () => setShow( false ) }
				show={ show }
				autohide
			>
					<Toast.Body>
						<span>{ context }</span>
						<div className="text-center">{ content }</div>
					</Toast.Body>
				</Toast>
				<Button onClick={ () => setShow( true ) }>Mostrar</Button>
		</div>
	);
};




export default ToastComponent;