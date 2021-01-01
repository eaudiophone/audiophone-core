import { AuthService } from './AuthService';

export class BudgetService {

	authService = new AuthService();

	getItemsBudget() {
		return new Promise(( resolve, reject ) => {
			const id = this.authService.getLogged().id;

			this.authService.postClient(`apiaudiophonebudget/create/${ id }`)
				.then( response => {
					resolve( response.data );
				})
				.catch( error => reject( this.authService.validateExceptionServer( error ) ) )
		});
	}

	createBudget( budget ) {
		return new Promise(( resolve, reject ) => {
			const id = this.authService.getLogged().id;

			this.authService.postClient(`apiaudiophonebudget/store/${ id }`, budget )
				.then( response => {
					console.log( response.data );
					resolve( response.data );
				})
				.catch( error => reject( this.authService.validateExceptionServer( error ) ) )
		});
	}
}