import  React, { Component } from 'react';
import EditEventComponent from './../../components/form/EditEventComponent';

class EditEventPage extends Component {

	render() {

		return (

			<div>
				<div className="d-flex justify-content-start flex-wrap flex-md-nowrap 
					align-items-center pb-2 mb-3 border-bottom">
					<h2>Editar evento</h2> 
				</div>

				<EditEventComponent />
			</div>
		);
	}
}

export default EditEventPage;