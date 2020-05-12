import React, { Component } from 'react';

import { Table } from 'react-bootstrap';

import BackendService from '../../services/BackendService';

import ToastComponent from '../../components/toasts/ToastComponent';
import PaginationComponent from '../../components/pagination/PaginationComponent'; 
import SearchBarComponent from '../../components/searchbar/SearchBarComponent';
import ModalProfileComponent from '../../components/modal/modal-profile/ModalProfileComponent';

import { getDateWithHour } from './../../util-functions/date-format';

class TableComponent extends Component {

	backendService = new BackendService();
	message = '';
	action = '';
	headerTable = [ 'Nombre', 'Correo', 'Rol', 'Fecha de registro', 'Status', 'Acciones' ];

	constructor( props ) {

		super( props );

		this.state = {
			users: [],
			totalUsers: 0,
			showEditModal: false, 
			showDeleteModal: false,
			showToast: false,
			data: {},  // user
		}

		this.getPagination = this.getPagination.bind( this );
	}

	componentDidMount() {

		this.backendService.postClient('apiaudiophoneuser/show')
			.then( resp => {

				const { 
					apiaudiophoneuserdata, 
					bduserstotal
				} = resp.data;

				let users = apiaudiophoneuserdata.map( ( user ) => ({
					...user,
					apiaudiophoneusers_status: user.apiaudiophoneusers_status > 0 ? true : false,
					created_at: getDateWithHour( user.created_at )
				}));
				
				this.setState({ 
					users,
					totalUsers: bduserstotal 
				});

			})
			.catch( error => {
				
				// console.error( error );

				this.message = 'Comprueba tu conexion a internet';
				this.action = 'Error';

				this.setState({ showToast: true });
			});
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

	editUserRole( user ) {

		if ( user !== null ) {
			
			user = {
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

	deleteUser( idUser ) {

		if ( idUser !== null ) {

			let status = this.state.users.find( ( user ) => idUser === user.apiaudiophoneusers_id ).apiaudiophoneusers_status;
			let method = status ? 'inactivate' : 'activate';
			let data = { apiaudiophoneusers_status: !status };

			console.log( status, method, data );

			this.backendService.putClient(`apiaudiophoneuser/${ method }/${ idUser }`, data )
				.then( ({ data }) => {
			
					const user = method === 'inactivate' ? data.apiaudiophoneuserinactive : data.apiaudiophoneuseractivate;

					const result = this.state.users.map( ( element ) => {
						
						if ( element.apiaudiophoneusers_id === user.apiaudiophoneusers_id  ) {
							return {
								...element,
								apiaudiophoneusers_status: user.apiaudiophoneusers_status
							}
						}

						return element;
					});

					this.message = 'Estado del usuario actualizado';
					this.action = 'Exito';
					
					this.setState({ 
						showToast: true, 
						users: result,
						showDeleteModal: false
					});
				})
				.catch( error => {
					
					this.message = 'ha ocurrido un imprevisto';
					this.action = 'Error';

					this.setState({ 
						showDeleteModal: false, 
						showToast: true
					});

				});
		
		} else {

			this.setState({ showDeleteModal: false });
		} 
		
	}
	
	sendSearch( search ) {

		this.backendService.postClient(`apiaudiophoneuser/show?stringsearch=${ search }`)
			.then( resp => {
				
				const { apiaudiophoneuserdata } = resp.data;

				this.setState({
					users: apiaudiophoneuserdata
				});

			})
			.catch( error => {

				// console.error( error );

				this.message = 'Comprueba tu conexión a internet';
				this.action = 'Error';

				this.setState({ showToast: true });
			});
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
		return this.headerTable.map( ( element, index ) => (
			<th className="text-center" key={ index }>{ element }:</th>
		));
	}

	setData() {
		return this.state.users.map( ( user, index ) => (
			<tr className="text-center" key={ user.apiaudiophoneusers_id }>
				<td>{ user.apiaudiophoneusers_fullname }</td>
				<td>{ user.apiaudiophoneusers_email }</td>
				<td>{ user.apiaudiophoneusers_role }</td>
				<td>{  user.created_at }</td>
				<td>{ user.apiaudiophoneusers_status ? 'activo' : 'inactivo' }</td>
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
					deleteUser={ ( id = null ) => this.deleteUser( id ) }
					id={ this.state.data }
				/>
				<ModalProfileComponent.ChangeRoleModal 
					showModal={ this.state.showEditModal }
					editUser={ ( user = null ) => this.editUserRole( user ) }
					user={ this.state.data }
				/>
				<ToastComponent
					showToast={ this.state.showToast }
					content={ this.message }
					context={ this.action }
					onHide={ () => this.setState({ showToast: false }) }
				/>
			</div>
		);
	}
}

export default TableComponent;