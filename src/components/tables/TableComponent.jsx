import React, { Component } from 'react';
import { Table } from 'react-bootstrap';

import { USERS } from '../../hardcode/UsersHardcode';

import BackendService from '../../services/BackendService';

import PaginationComponent from '../../components/pagination/PaginationComponent'; 
import SearchBarComponent from '../../components/searchbar/SearchBarComponent';

import  ModalProfileComponent from '../../components/modal/modal-profile/ModalProfileComponent';

class TableComponent extends Component {

	backendService = new BackendService();

	constructor( props ) {
		super( props );

		this.state = {
			users: [],
			totalUsers: 0,
			showEditModal: false, 
			showDeleteModal: false,
			data: {},  // user
		}

		this.getPagination = this.getPagination.bind( this );
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

	editUserRole( response, user ) {

		if ( response ) {
			
			user = {
				...user,
				apiaudiophoneusers_role: user.apiaudiophoneusers_role === 'ADMIN_ROLE' ? 'USER_ROLE' : 'ADMIN_ROLE'
			};

			this.backendService.putClient(
				`apiaudiophoneuser/update/${ user.apiaudiophoneusers_id }`,
				user
			)
			.then( resp => console.log( resp ) )
			.catch( error => console.log( error ) );
		}

		this.setState({ showEditModal: false });
	}

	deleteUser( confirm, idUser ) {

		if ( confirm ) {
			this.backendService.deleteClient(`apiaudiophoneuser/destroy/${ idUser }`)
				.then( resp => {

					let result = this.state.users.filter( ( user ) => idUser !== user.apiaudiophoneusers_id  );

					this.setState({
						users: result,
						totalUsers: this.state.totalUsers - 1
					});
				})
				.catch( error => console.log( error ) );
		} 
		
		this.setState({ showDeleteModal: false });
	}

	componentDidMount() {

		this.backendService.postClient('apiaudiophoneuser/show')
			.then( resp => {

				const { 
					apiaudiophoneuserdata, 
					bduserstotal
				} = resp.data;
				
				this.setState({ 
					users: apiaudiophoneuserdata,
					totalUsers: bduserstotal 
				});

				console.log( this.state.users );
			})
			.catch( error => console.error( error ) );
	}

	sendSearch( search ) {

		this.backendService.postClient(`apiaudiophoneuser/show?stringsearch=${ search }`)
			.then( resp => {
				
				const { 
					apiaudiophoneuserdata, 
					apiaudiophoneusercount 
				} = resp.data;

				this.setState({
					users: apiaudiophoneuserdata,
					totalUsers: apiaudiophoneusercount
				});

			})
			.catch( error => console.log( error ) );
	}

	getPagination({ start, end }) {

		const url = `apiaudiophoneuser/show?start=${ start }&end=${ end }`;

		this.backendService.postClient( url )
			.then( resp => {
				
				const { 
					apiaudiophoneuserdata, 
					bduserstotal 
				} = resp.data;

				this.setState({ 
					users: apiaudiophoneuserdata,
					totalUsers: bduserstotal 
				});

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
			<tr className="text-center" key={ user.apiaudiophoneusers_id }>
				<td>{ user.apiaudiophoneusers_id }</td>
				<td>{ user.apiaudiophoneusers_fullname }</td>
				<td>{ user.apiaudiophoneusers_email }</td>
				<td>{ user.apiaudiophoneusers_role }</td>
				<td>{ user.created_at.substr( 0, 10 ) }</td>
				<td className="d-flex flex-row justify-content-around">
					<i 
						className="fas fa-user point" 
						onClick={ () => this.showModal( 'edit', user ) }
					></i> 
					<i 
						className="fas fa-trash point"
						onClick={ () => this.showModal( 'delete', user.apiaudiophoneusers_id ) }
					></i>	
				</td>
			</tr> 
		))
	}

	getTable() {

		if ( this.state.users.length > 0 ) {

			return (
				<div>
					<SearchBarComponent 
						sendSearch={ ( search ) => this.sendSearch( search ) } 
					/>
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
					<div className="mt-3 d-flex flex-row justify-content-center">
						<PaginationComponent 
							totalRegisters={ this.state.totalUsers } 
							send={ ( params ) => this.getPagination( params ) }
						/>
					</div>
				</div>
			);

		} else {

			return (
				<p className="text-danger text-center">
					No hallaron resultados
				</p>
			);
		}
	}

	render() {

		return (

			<div>
				{ this.getTable() }
				<ModalProfileComponent.DeleteProfileModal 
					showModal={ this.state.showDeleteModal }  
					deleteUser={ ( confirm, id ) => this.deleteUser( confirm, id ) }
					id={ this.state.data }
				/>
				<ModalProfileComponent.ChangeRoleModal 
					showModal={ this.state.showEditModal }
					editUser={ ( resp, user ) => this.editUserRole( resp, user ) }
					user={ this.state.data }
				/>
			</div>
		);
	}
}

export default TableComponent;