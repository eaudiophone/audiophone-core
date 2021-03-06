import { AuthService } from './AuthService';
import Profile from './../models/ProfileModels';

export class UserService {

	authService = new AuthService();

	getUsers() {

		return new Promise( ( resolve, reject ) => {

			this.authService.postClient('apiaudiophoneuser/show')
			.then( resp => {

				const { 
					apiaudiophoneuserdata, 
					bduserstotal
				} = resp.data;

				resolve({
					users: apiaudiophoneuserdata,
					totalUsers: bduserstotal,
					loading: false
				});
			})
			.catch( error => reject( this.authService.validateExceptionServer( error )) );

		});
	}

	editUserRole( user, users = [] ) {

		const role = {
			apiaudiophoneusers_role: user.apiaudiophoneusers_role === 'ADMIN_ROLE' ? 'USER_ROLE' : 'ADMIN_ROLE'
		};

		return new Promise(( resolve, reject ) => {

			this.authService.putClient( 
					`apiaudiophoneuser/update/${ user.apiaudiophoneusers_id }`,
					role
				)
				.then( ({ data }) => {

					const user = data.apiaudiophoneusernew;

					const result = users.map( ( element ) => {
						if ( user.apiaudiophoneusers_id === element.apiaudiophoneusers_id ) {
							return {
								...element,
								apiaudiophoneusers_role: user.apiaudiophoneusers_role
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
				.catch( error => reject( this.authService.validateExceptionServer( error )) );
		});
	}

	deleteUser( idUser = 0, users = [] ) {
		
		const status = users.find( ( user ) => idUser === user.apiaudiophoneusers_id ).apiaudiophoneusers_status;
		const method = status === 1 ? 'inactivate' : 'activate';
		const data = { apiaudiophoneusers_status: status === 1 ? 0 : 1 };

		return new Promise( ( resolve, reject ) => {

			this.authService.putClient(`apiaudiophoneuser/${ method }/${ idUser }`, data )
				.then( ({ data }) => {

					const user = data.apiaudiophoneusernew;

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
			.catch( error => reject( this.authService.validateExceptionServer( error )) );
		});
	}

	searchUser( search = '' ) {

		return new Promise( ( resolve, reject ) => {

			this.authService.postClient(`apiaudiophoneuser/show?stringsearch=${ search }`)
				.then( resp => {

					const { apiaudiophoneuserdata } = resp.data;

					resolve({
						users: apiaudiophoneuserdata
					});
				})
				.catch( error => reject( this.authService.validateExceptionServer( error )) );	
			});
	}
	

	paginationUsers({ start, end }) {

		return new Promise( ( resolve, reject ) => {
			
			const url = `apiaudiophoneuser/show?start=${ start }&end=${ end }`;

			this.authService.postClient( url )
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
				.catch( error => reject( this.authService.validateExceptionServer( error )) );
		});
	}

	editUser( id, user ) {

		return new Promise(( resolve, reject ) => {

			setTimeout( () => {

			this.authService.putClient(`apiaudiophoneuser/update/${ id }`, user )
				.then( resp => {
				
				const { apiaudiophoneusermessage, apiaudiophoneusernew } = resp.data; 

				let logged = JSON.parse( sessionStorage.getItem('logged'));

				console.log( resp.data );
				
				logged = {
					...logged,
					email: apiaudiophoneusernew.apiaudiophoneusers_email,
					fullname: apiaudiophoneusernew.apiaudiophoneusers_fullname,
				}


				sessionStorage.setItem('logged', JSON.stringify( logged ) );
				
				resolve({
					state: {
						showToast: true, 
						loading: false, 
						user:  new Profile(
							this.authService.getLogged().fullname,
							this.authService.getLogged().email,
						)
					},
					message: apiaudiophoneusermessage,
					action: 'Exito'
					});
				})
				.catch( error => reject( this.authService.validateExceptionServer( error )));

			}, 1000 );
		});
	}
}

