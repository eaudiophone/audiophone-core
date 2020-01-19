import  React, { Component } from 'react';
import FormEventComponent from './../../components/form/FormEventComponent';

class NewEventPage extends Component {

	render() {

		return (

			<div>
				<div className="d-flex justify-content-start flex-wrap flex-md-nowrap 
					align-items-center pb-2 mb-3 border-bottom">
					<h2>Nuevo evento</h2> 
				</div>

				<FormEventComponent />
			</div>
		);
	}
}

export default NewEventPage;