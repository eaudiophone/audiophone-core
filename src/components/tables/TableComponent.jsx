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
			totalUsers: 0
		}

		this.getPagination = this.getPagination.bind( this );
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
					totalUsers: bduserstotal 
				});

				console.log( this.state.users );
			})
			.catch( error => console.error( error ) );
	}

	sendSearch( search ) {
		console.log( search );
	}

	getPagination({ start, end }) {

		const url = `apiaudiophoneuser/show?start=${ start }&end=${ end }`;

		this.backendService.getClient( url )
			.then( resp => {
				
				const { apiaudiophoneuserdata } = resp.data;
				this.setState({ users: apiaudiophoneuserdata });

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
			</div>
		);
	}
}

export default TableComponent;