import React, { Component } from 'react';

class Modal extends Component {

	setModalTitle() {

		return (

			<div className="modal-title">
				<h5 className="modal-title">Prueba</h5>
				<button 
					className="close"
					data-dismiss="modal"
					aria-label="close"		
				>
					<span aria-hidden="true">&times;</span>
				</button>
			</div>
		);
	}

	setModalBody() {

		return (

			<div className="modal-body">
				<p>Prueba de contenido</p>
			</div>
		);
	}

	setModalFooter() {

		return (
			 <div className="modal-footer">
        		<button 
        			type="button" 
        			className="btn btn-primary"
        		>
        			Save changes
        		</button>
        		<button 
        			type="button" 
        			className="btn btn-secondary" 
        			data-dismiss="modal"
        		>
        			Close
        		</button>
      		</div>
		);
	}

	render() {

		return (

			<div className="modal" id="prueba" tabIndex="-1" role="dialog">
				<div className="modal-dialog" role="document">
					<div className="modal-content">
						{ this.setModalTitle() }
						{ this.setModalBody() }
						{ this.setModalFooter() }
					</div>
				</div>
			</div>

		); 
	}
}


export default Modal; 