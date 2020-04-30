import React, { Component } from 'react';
import { Table } from 'react-bootstrap';
import { USERS } from '../../hardcode/UsersHardcode';

import BackendService from '../../services/BackendService';
import PaginationComponent from '../../components/pagination/PaginationComponent'; 
import SearchBarComponent from '../../components/searchbar/SearchBarComponent';

class TableComponent extends Component {

	backendService = new BackendService();

	constructor( props ) {
		super( props );

		this.state = {
			users: [],
			usersTotal: 0
		}
	}

	componentDidMount() {

		this.backendService.getClient('apiaudiophoneuser/show')
			.then( resp => {

				const { 
					apiaudiophoneuserdata, 
					bduserstotal
				} = resp.data;
				
				this.setState({ 
					users: this.state.users.concat( apiaudiophoneuserdata ),
					usersTotal: bduserstotal 
				});

				console.log( this.state.users );
			})
			.catch( error => console.error( error ) );
	}

	setHeaderTable() {
		return USERS.header.map( ( element, index ) => (
			<th className="text-center" key={ index }>{ element }</th>
		));
	}

	setData() {
		return this.state.users.map( ( user, index ) => (
			<tr className="text-center" key={ index + 1 }>
				<td>{ index + 1 }</td>
				<td>{ user.apiaudiophoneusers_fullname }</td>
				<td>{ user.apiaudiophoneusers_email }</td>
				<td>{ user.apiaudiophoneusers_role }</td>
				<td>{ user.created_at.substr( 0, 10 ) }</td>
				<td className="d-flex flex-row justify-content-around">
					<i 
						className="fas fa-user point" 
					></i> 
					<i 
						className="fas fa-trash point"
					></i>	
				</td>
			</tr> 
		))
	}

	render() {

		return (

			<div>
				<SearchBarComponent />
				<Table className="mt-4" striped responsive hover>
					<thead className="thead-dark">
						<tr>
							{ this.setHeaderTable() }
						</tr>
					</thead>
					<tbody>
						{ this.setData() }
					</tbody>
				</Table>
				<div className="d-flex flex-row justify-content-center">
					<PaginationComponent />
				</div>
			</div>
		);
	}
}

export default TableComponent;