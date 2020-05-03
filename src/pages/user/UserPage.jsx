import React, { Component } from 'react';
import { USERS } from '../../hardcode/UsersHardcode';
import { Table } from 'react-bootstrap';

import TableComponent from '../../components/tables/TableComponent';

class UserPage extends Component {

	constructor( props ) {

		super( props );

		this.state = { 
			showEditModal: false, 
			showDeleteModal: false,
			data: {},  // user
		};

		this.editUserRole = this.editUserRole.bind( this );
		this.deleteUser = this.deleteUser.bind( this );
		this.showModal = this.showModal.bind( this );
	}

	showModal( modal, data ) {
		
		if ( modal === 'edit' ) {
			
			this.setState({
				showDeleteModal: false,
				showEditModal: true,
				data
			});
		
		} else {
			
			this.setState({
				showDeleteModal: true,
				showEditModal: false,
				data
			});
		}

	}

	getHeader() {

		return (

			<div className="d-flex justify-content-start flex-wrap flex-md-nowrap 
						align-items-center pb-2 mb-3 border-bottom">
				<h2>Gestión de usuarios</h2>	
			</div>
		);
	}

	editUserRole( response, user ) {

		if ( response ) {
			
			const request = {
				...user,
				role: user.role === 'ADMIN_ROLE' ? 'USER_ROLE' : 'ADMIN_ROLE'
			};

			console.log( request );
		}

		this.setState({ showEditModal: false });
	}

	deleteUser( confirm, idUser ) {

		if ( confirm ) {
			console.log( idUser );
		} 
		
		this.setState({ showDeleteModal: false });
	}

	setSearch( values, actions ) {

		actions.setSubmitting( false );

		console.log( values.search );
	}

	setData() {

		return USERS.data.map( ( user ) => (

				<tr className="text-center" key={ user.id }>
					<td>{ user.id }</td>
					<td>{ user.name }</td>
					<td>{ user.email }</td>
					<td>{ user.role }</td>
					<td>{ user.registrationDate }</td>
					<td className="d-flex flex-row justify-content-around">
						<i 
							className="fas fa-user point" 
							onClick={ () => this.showModal( 'edit', user ) }
						></i> 
						<i 
							className="fas fa-trash point"
							onClick={ () => this.showModal( 'delete', user.id ) }
						></i>	
					</td>
				</tr> 
			)	
		);
	}

	setHeaderTable() {

		return USERS.header.map( ( element, index ) => (
				<th className="text-center" key={ index }>{ element }</th>
			) 
		);
	}

	getTableUsers() {

		return (

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