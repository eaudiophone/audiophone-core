import { AuthService } from './AuthService';

export class UserService {

	AuthService = new AuthService();

	getUsers() {

		return new Promise( ( resolve, reject ) => {

			this.AuthService.postClient('apiaudiophoneuser/show')
			.then( resp => {

				const { 
					apiaudiophoneuserdata, 
					bduserstotal
				} = resp.data;

				resolve({
					users: apiaudiophoneuserdata,
					totalUsers: bduserstotal 
				});
			})
			.catch( error => reject({
				message: 'Ha ocurrido un imprevisto',
				action: 'Error',
				status: error.response.status
			}));

		});
	}

	editUserRole( user, users = [] ) {

		const role = {
			apiaudiophoneusers_role: user.apiaudiophoneusers_role === 'ADMIN_ROLE' ? 'USER_ROLE' : 'ADMIN_ROLE'
		};

		return new Promise(( resolve, reject ) => {

			this.AuthService.putClient( 
					`apiaudiophoneuser/update/${ user.apiaudiophoneusers_id }`,
					role
				)
				.then( ({ data }) => {

					const result = users.map( ( element ) => {
						if ( data.apiaudiophoneuserupdate.apiaudiophoneusers_id === element.apiaudiophoneusers_id ) {
							return {
								...element,
								apiaudiophoneusers_role: data.apiaudiophoneuserupdate.apiaudiophoneusers_role
							}
						}

						return element;
					});

					resolve({
						users: result,
						action: 'Exito',
						message: data.apiaudiophoneusermessage,
					})

				})
				.catch( error => reject({
					message: 'Ha ocurrido un imprevisto',
					action: 'Error',
					status: error.response.status
				}));
		});
	}

	deleteUser( idUser = 0, users = [] ) {
		
		let status = users.find( ( user ) => idUser === user.apiaudiophoneusers_id ).apiaudiophoneusers_status;
		let method = status === 1 ? 'inactivate' : 'activate';
		let data = { apiaudiophoneusers_status: status === 1 ? 0 : 1 };

		return new Promise( ( resolve, reject ) => {

			this.AuthService.putClient(`apiaudiophoneuser/${ method }/${ idUser }`, data )
				.then( ({ data }) => {

					const user = method === 'inactivate' ? data.apiaudiophoneuserinactive : data.apiaudiophoneuseractivate;

					const result = users.map( ( element ) => {
						if ( element.apiaudiophoneusers_id === user.apiaudiophoneusers_id  ) {
							return {
								...element,
								apiaudiophoneusers_status: user.apiaudiophoneusers_status
							}
						}
						return element;
					});

				resolve({ 
					users: result,
					message: data.apiaudiophoneusermessage,
					action: 'Exito'
				});
			})
			.catch( error => reject({
					message: 'Ha ocurrido un imprevisto',
					action: 'Error',
					status: error.response.status
				}));
		});
	}

	searchUser( search = '' ) {

		return new Promise( ( resolve, reject ) => {

			this.AuthService.postClient(`apiaudiophoneuser/show?stringsearch=${ search }`)
				.then( resp => {

					const { apiaudiophoneuserdata } = resp.data;

					resolve({
						users: apiaudiophoneuserdata
					});
				})
				.catch( error => reject({
					message: 'Ha ocurrido un imprevisto',
					action: 'Error',
					status: error.response.status
				}))	
			});
	}
	

	paginationUsers( url = '' ) {

		return new Promise( ( resolve, reject ) => {

			this.AuthService.postClient( url )
				.then( resp => {
					
					const { 
						apiaudiophoneuserdata, 
						bduserstotal 
					} = resp.data;

					resolve({
						users: apiaudiophoneuserdata,
						totalUsers: bduserstotal 
					});

				})
				.catch( error => reject({
					message: 'Ha ocurrido un imprevisto',
					action: 'Error',
					status: error.response.status
				}));
		});
	}
}
