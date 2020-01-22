import React, { Component } from 'react';

class IndexEventPage extends Component {

	getHeader() {

		return (

			<div className="d-flex justify-content-start flex-wrap flex-md-nowrap 
				align-items-center pb-2 mb-3 border-bottom">
				<h2>Eventos</h2> 
			</div>
		);
	}


	render() {
		return (
			
			<div>
				{ this.getHeader() }
			</div>
		);
	}
}

export default IndexEventPage;