import React, { Component } from 'react';
import { Table, Row, Col, Button } from 'react-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { UserService } from '../../services/UserService';

import {
	SearchBarComponent,
	SearchFilterComponent,
	PaginationComponent,
	ToastComponent,
	LoadingComponent
} from '../index';

import { DeleteProfileModal, ChangeRoleModal } from '../modal/index';

import { getDateWithHour } from './../../util-functions/date-format';

export class UserTableComponent extends Component {

	message = '';
	action = '';
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
			loading: true
		}
	}

	componentDidMount() {

		this.userService.getUsers()
			.then(( resp ) => {

				sessionStorage.setItem('navigationTableUsers',
					JSON.stringify({
						start: 1,
						end: 5
					})
				);

				return this.setState( resp );
			})
			.catch( ( error ) => {

				if ( error.status === 401 ) {
					return this.props.redirect();
				}

				this.message = error.message;
				this.action = error.action;

				return this.setState({ showToast: true, loading: false });
			});
	}

	showModal( modal, data ) {

		if ( modal === 'edit' ) {

			return this.setState({
				showDeleteModal: false,
				showEditModal: true,
				data
			});

		} else {  // new

			return this.setState({
				showDeleteModal: true,
				showEditModal: false,
				data
			});
		}

	}

	editUserRole( user ) {

		if ( !user ) {
			return this.setState({ showEditModal: false });
		}

		this.userService.editUserRole( user, this.state.users )
			.then(( resp ) => {

				this.message = resp.message;
				this.action = resp.action;

				return this.setState({
					showEditModal: false,
					showToast: true,
					users: resp.users
				});
			})
			.catch( error => {

				if ( error.status === 401 ) {
					return this.props.redirect();
				}

				this.message = error.message;
				this.action = error.action;

				return this.setState({ showToast: true, showEditModal: false });
		});
	}

	deleteUser( idUser ) {

		if ( !idUser ) {
			return this.setState({ showDeleteModal: false });
		}

		this.userService.deleteUser( idUser, this.state.users )
			.then( resp => {

				this.message = resp.message;
				this.action = resp.action;

				return this.setState({
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

				return this.setState({ showToast: true, showEditModal: false });
			});
	}

	sendSearch( search = '' ) {

		this.userService.searchUser( search )
			.then( resp => this.setState( resp ) )
			.catch( error => {

				if ( error.status === 401 ) {
					return this.props.redirect();
				}

				this.message = error.message;
				this.action = error.action;

				return this.setState({ showToast: true });
			});
	}

	getPagination( pagination ) {

		this.userService.paginationUsers( pagination )
			.then( resp => {

				sessionStorage.setItem('navigationTableUsers',
					JSON.stringify({
						start: pagination.start,
						end: pagination.end
					})
				);

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
		let pagination = JSON.parse( sessionStorage.getItem( 'navigationTableUsers'));

		switch ( filter ) {

			case 'activos':

				this.userService.paginationUsers( pagination )
					.then( resp => {
						results = resp.users.filter( ( user ) => user.apiaudiophoneusers_status === 1 );

						return this.setState({
							users: results,
							totalUsers: results.length
						});
					})
					.catch( error => {
						if ( error.status === 401 ) {
							return this.props.redirect();
						}

						this.message = error.message;
						this.action = error.action;

						return this.setState({ showToast: true });
					});

			break;

			case 'inactivos':

				this.userService.paginationUsers( pagination )
					.then( resp => {
						results = resp.users.filter( ( user ) => user.apiaudiophoneusers_status === 0 );

						return this.setState({
							users: results,
							totalUsers: results.length
						});
					})
					.catch( error => {
						if ( error.status === 401 ) {
							return this.props.redirect();
						}

						this.message = error.message;
						this.action = error.action;

						return this.setState({ showToast: true });
					});

			break;

			default: // todos

				this.userService.paginationUsers( pagination )
					.then( resp => {
						return this.setState( resp );
					})
					.catch( error => {
						if ( error.status === 401 ) {
							return this.props.redirect();
						}

						this.message = error.message;
						this.action = error.action;

						return this.setState({ showToast: true });
					});

			break;
		}
	}

	getRows() {

		return this.state.users.map( ( user, index ) => (

			<tr className="text-center" key={ user.apiaudiophoneusers_id }>
				<td>{ user.apiaudiophoneusers_fullname }</td>
				<td>{ user.apiaudiophoneusers_email }</td>
				<td>{ user.apiaudiophoneusers_role }</td>
				<td>{ getDateWithHour( user.created_at ) }</td>
				<td>
					<FontAwesomeIcon
						icon={ user.apiaudiophoneusers_status === 1 ? 'check' : 'times' }
						className={ user.apiaudiophoneusers_status === 1 ? 'success' : 'danger' }
					/>
				</td>
				<td>
					<div className="w-100 h-100 d-flex flex-row justify-content-center">
						<Button
							size="sm"
							variant="primary"
							onClick={ () => this.showModal( 'edit', user ) }
							disabled={ user.apiaudiophoneusers_id === JSON.parse( sessionStorage.getItem('logged') ).id }
							className="mr-2"
						>
							<FontAwesomeIcon icon="user" className="point" />
						</Button>
						<Button
							size="sm"
							variant="secondary"
							onClick={ () => this.showModal( 'delete', user ) }
							disabled={ user.apiaudiophoneusers_id === JSON.parse( sessionStorage.getItem('logged') ).id }
							>
							<FontAwesomeIcon icon="trash" className="point" />
						</Button>
					</div>
				</td>
			</tr>

		))
	}

	getTable() {

		const headerTable = [ 'Nombre', 'Correo', 'Rol', 'Fecha de registro', 'Estado', 'Acciones' ];

		if ( this.state.users.length > 0 && JSON.parse( sessionStorage.getItem('logged') ) ) {

			return (
				<div>
					<Table className="mt-4" striped responsive hover>
						<thead className="thead-dark">
							<tr>
								{ headerTable.map( ( element, index ) => (
										<th className="text-center" key={ index }>{ element }:</th>
									))
								}
							</tr>
						</thead>
						<tbody>
							{ this.getRows() }
						</tbody>
					</Table>
					<Row className="justify-content-center mt-2">
						<PaginationComponent
							totalRegisters={ this.state.totalUsers }
							send={ ( params ) => this.getPagination( params ) }
							pagination={ 5 }
						/>
					</Row>
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

	showContent() {

		if ( !this.state.loading ) {
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
				</div>
			);
		}

		return ( <LoadingComponent /> );
	}

	render() {

		return (

			<div>
				{ this.showContent() }
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
