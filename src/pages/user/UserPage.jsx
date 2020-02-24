import React, { Component } from 'react';
import { Formik } from 'formik';
import SearchBarComponent from '../../components/searchbar/SearchBarComponent';
import { USERS } from '../../hardcode/UsersHardcode';
import { Table, Pagination } from 'react-bootstrap';
 
class UserPage extends Component {

	getHeader() {

		return (
			<div className="d-flex justify-content-start flex-wrap flex-md-nowrap 
						align-items-center pb-2 mb-3 border-bottom">
				<h2>Gestion de usuarios</h2>	
			</div>
		);
	}

	editProfile( user ) {
		console.log( user );
	}

	deleteUser( idUser ) {
		console.log( idUser );
	}

	setSearch( values, actions ) {
		console.log( values.search );
		actions.setSubmitting( false );
	}

	setData() {

		let arrayUsers = USERS.data.filter( ( user ) => user.state === true );

		return arrayUsers.map( ( user ) => (
				<tr key={ user.id }>
					<td>{ user.id }</td>
					<td>{ user.name }</td>
					<td>{ user.email }</td>
					<td>{ user.role }</td>
					<td>{ user.registrationDate }</td>
					<td className="d-flex flex-row justify-content-around">
						<i 
							className="fas fa-pen"
							onClick={ () => this.editProfile( user ) }
						></i>
						<i 
							className="fas fa-trash"
							onClick={ () => this.deleteUser( user.id ) }
						></i>
					</td>
				</tr> 
			)	
		);
	}

	setHeaderTable() {

		return USERS.header.map( ( element, index ) => (
				<th key={ index }>{ element }</th>
			) 
		);
	}

	render() {
		
		return ( 
			
			<div>
				{ this.getHeader() }
				<div className="mt-4">
					<Formik 
						component={ SearchBarComponent } 
						onSubmit={ this.setSearch }
						initialValues={ { search: '' } }
					/>
				</div>
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
				<div className="d-flex flex-row justify-content-center mt-4"> 
					<PaginationComponent />
				</div>
			</div>
		);
	}
}

class PaginationComponent extends Component {
	
	setPagination() {

		let active = 1;
		let items = [];

		for ( let number = 1; number <= 5; number++ ) {
			items.push(
				<Pagination.Item 
					key={ number }
					active={ number === active }
				>
					{ number }
				</Pagination.Item>
			);
		}

		return items;
	}


	render() {
		
		return(
			<Pagination>
				<Pagination.Prev />
					{ this.setPagination() }
				<Pagination.Next />
			</Pagination>
		);
	}
}

export default UserPage;