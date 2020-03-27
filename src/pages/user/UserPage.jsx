import React, { Component } from 'react';
import { Formik } from 'formik';
import SearchBarComponent from '../../components/searchbar/SearchBarComponent';
import { USERS } from '../../hardcode/UsersHardcode';
import { Table } from 'react-bootstrap';
import  ModalProfileComponent from '../../components/modal/modal-profile/ModalProfileComponent';
import PaginationComponent from '../../components/pagination/PaginationComponent'; 

class UserPage extends Component {

	constructor( props ) {

		super( props );

		this.state = { 
			showEditModal: false, 
			showDeleteModal: false,
			data: {},  // user
		};

		this.editUser = this.editUser.bind( this );
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
				<h2>Gestion de usuarios</h2>	
			</div>
		);
	}

	editUser( user ) {

		if ( user !== null ) {
			console.log( user );
		}

		this.setState({ showEditModal: false });
	}

	deleteUser( confirm, idUser ) {

		if ( confirm ) {
			console.log( idUser );
		
		} else {
			console.log('no se ejecuta ninguna acción');
		}
		
		this.setState({ showDeleteModal: false });
	}

	setSearch( values, actions ) {

		actions.setSubmitting( false );

		console.log( values.search );
	}

	setData() {

		let arrayUsers = USERS.data.filter( ( user ) => user.state );

		return arrayUsers.map( ( user ) => (

				<tr key={ user.id }>
					<td>{ user.id }</td>
					<td>{ user.name }</td>
					<td>{ user.email }</td>
					<td>{ user.role }</td>
					<td>{ user.registrationDate }</td>
					<td className="d-flex flex-row justify-content-around">
						<i 
							className="fas fa-pen point"
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
				<th key={ index }>{ element }</th>
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
				
				<ModalProfileComponent.DeleteProfileModal 
					showModal={ this.state.showDeleteModal }  
					deleteUser={ ( confirm, id ) => this.deleteUser( confirm, id ) }
					id={ this.state.data }
				/>

				<ModalProfileComponent.EditProfileModal 
					showModal={ this.state.showEditModal }
					editUser={ ( user ) => this.editUser( user ) }
					user={ this.state.data }
				/>

				{ this.getHeader() }

				<div className="mt-4">
					<Formik 
						component={ SearchBarComponent.SearchBarComponent } 
						onSubmit={ this.setSearch }
						initialValues={ { search: '' } }
					/>
				</div>

				{ this.getTableUsers() }
				
				<div className="d-flex flex-row justify-content-center mt-4"> 
					<PaginationComponent />
				</div>

			</div>
		);
	}
}

export default UserPage;