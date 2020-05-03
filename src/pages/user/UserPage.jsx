import React, { Component } from 'react';

import TableComponent from '../../components/tables/TableComponent';

class UserPage extends Component {

	getHeader() {

		return (

			<div className="d-flex justify-content-start flex-wrap flex-md-nowrap 
						align-items-center pb-2 mb-3 border-bottom">
				<h2>Gestión de usuarios</h2>	
			</div>
		);
	}


	render() {
		
		return ( 
			
			<div>
				{ this.getHeader() }
				<TableComponent />
			</div>
		);
	}
}

export default UserPage;