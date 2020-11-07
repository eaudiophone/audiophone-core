import React, { Component } from 'react';
import { Table, Row, Col, Button } from 'react-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { UserService } from '../../services/UserService';
import { SearchBarComponent, SearchFilterComponent, PaginationComponent, ToastComponent } from '../index';
import { DeleteProfileModal, ChangeRoleModal } from '../modal/index';
import { getDateWithHour } from './../../util-functions/date-format';

export class TableComponent extends Component { 

	message = '';
	action = '';
	headerTable = [ 'Nombre', 'Correo', 'Rol', 'Fecha de registro', 'Estado', 'Acciones' ];
	history = [];  // array de navegacion
	userService = new UserService();

	constructor( props ) {

		super( props );

		this.state = {
			users: [],
			totalUsers: 0,
			showEditModal: false, 
			showDeleteModal: false,
			showToast: false,
			data: {},  // user
			redirect: false
		}
	}

	componentDidMount() {

		this.userService.getUsers()
			.then(( resp ) => {
				this.setHistory( resp );
				this.setState( resp );
			})
			.catch( ( error ) => {
				
				if ( error.status === 401 ) {
					return this.props.redirect();
				}

				this.message = error.message;
				this.action = error.action;
				this.setState({ showToast: true });
			})
	}

	setHistory( action ) {
		this.history = this.history.concat([ action ]);
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

			this.userService.editUserRole( user, this.state.users )
				.then(( resp ) => {

					this.message = resp.message;
					this.action = resp.action;

					this.setState({
						showEditModal: false,
						showToast: true,
						users: resp.users
					}); 
				})
				.catch( error => {
					
					// console.log( error )
					
					if ( error.status === 401 ) {
						return this.props.redirect();
					}

					this.message = error.message;
					this.action = error.action;
					this.setState({ showToast: true, showEditModal: false });
			
				});

		} else {

			this.setState({
				showEditModal: false,
			});
		}
	}

	deleteUser( idUser ) {

		if ( idUser !== null ) {

			this.userService.deleteUser( idUser, this.state.users )
				.then( resp => {

					this.message = resp.message;
					this.action = resp.action;
					
					this.setState({ 
						showToast: true, 
						users: resp.users,
						showDeleteModal: false
					});
				})
				.catch( error => {

					if ( error.status === 401 ) {
						return this.props.redirect();
					}

					this.message = error.message;
					this.action = error.action;
					this.setState({ showToast: true, showEditModal: false });
				});
		
		} else {

			this.setState({ showDeleteModal: false });
		} 
		
	}
	
	sendSearch( search = '' ) {

		return this.userService.searchUser( search )
			.then( resp => this.setState( resp ) )
			.catch( error => {

				if ( error.status === 401 ) {
					return this.props.redirect();
				}

				this.message = error.message;
				this.action = error.action;
				this.setState({ showToast: true });
			});
	}

	getPagination({ start, end }) {

		const url = `apiaudiophoneuser/show?start=${ start }&end=${ end }`;

		this.userService.paginationUsers( url )
			.then( resp => {
				this.setHistory( resp );
				this.setState( resp );
			})
			.catch( error => {

				if ( error.status === 401 ) {
					return this.props.redirect();
				}

				this.message = error.message;
				this.action = error.action;
				this.setState({ showToast: true });
			});
	}

	filterSearch( filter ) {
		
		let results = [];

		switch ( filter ) {
			
			case 'activos': 

				results = this.history[ this.history.length - 1 ].users.filter( 
					( user ) => user.apiaudiophoneusers_status === 1 );
				
				this.setState({
					users: results,
					totalUsers: results.length
				});
				
			break;

			case 'inactivos':

				results = this.history[ this.history.length - 1 ].users.filter( 
					( user ) => user.apiaudiophoneusers_status === 0 );
				
				this.setState({
					users: results,
					totalUsers: results.length
				});

			break;

			default: // todos
				
				this.setState( this.history[ this.history.length - 1 ] );

			break;
		}
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
				<td>{ getDateWithHour( user.created_at ) }</td>
				<td>{ user.apiaudiophoneusers_status === 1 ? 'activo' : 'inactivo' }</td>

				<td className="d-flex flex-row justify-content-around">
					<Button 
						variant="warning"
						onClick={ () => this.showModal( 'edit', user ) }
						disabled={ user.apiaudiophoneusers_id === JSON.parse( sessionStorage.getItem('logged') ).id }
					>
						<FontAwesomeIcon icon="user" className="point" />
					</Button>

					<Button
						variant="danger"
						onClick={ () => this.showModal( 'delete', user ) }
						disabled={ user.apiaudiophoneusers_id === JSON.parse( sessionStorage.getItem('logged') ).id }
					>
						<FontAwesomeIcon icon="trash" className="point" />	
					</Button>
				</td>
			</tr> 

		))
	}

	getTable() {

		if ( this.state.users.length > 0 && JSON.parse( sessionStorage.getItem('logged') ) ) {

			return (
				<div>
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
							pagination={ 5 }
						/>
					</div>
				</div>
			);

		} else {

			return (
				<p className="text-danger font-weight-bold text-center mt-4">
					No se hallaron resultados
				</p>
			);
		}
	}

	render() {

		return (

			<div>
				<Row>
					<Col xs={ 12 } className="mb-10" sm={ 6 }>
						<SearchFilterComponent filterSearch={ ( filter ) => this.filterSearch( filter ) } />
					</Col>
					<Col xs={ 12 } sm={ 6 }>
						<SearchBarComponent sendSearch={ ( search ) => this.sendSearch( search ) } />
					</Col>
				</Row>
				{ this.getTable() }
				<DeleteProfileModal 
					showModal={ this.state.showDeleteModal }  
					deleteUser={ ( id = null ) => this.deleteUser( id ) }
					user={ this.state.data }
				/>
				<ChangeRoleModal 
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
