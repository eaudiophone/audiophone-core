import React, { Component } from 'react';
import SearchBarComponent from '../../components/searchbar/SearchBarComponent';
 
class UserPage extends Component {

	getHeader() {

		return (
			
			<div className="d-flex justify-content-start flex-wrap flex-md-nowrap 
						align-items-center pb-2 mb-3 border-bottom">
				<h2>Gestion de usuarios</h2>	
			</div>
		);
	}

	render() {
		
		return ( 
			
			<div>
				{ this.getHeader() }
				<SearchBarComponent />
			</div>
		);
	}
}

export default UserPage;