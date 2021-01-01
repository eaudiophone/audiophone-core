import { AuthService } from './AuthService';

export class BudgetService {

	authService = new AuthService();

	getDataItemsBudget() {
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
					resolve({ 
						ok: true,
						message: response.data.apiaudiophonebudgetmessage,
						action: 'Exito',
						budget: response.data.apiaudiophonebudgetnew
					});
				})
				.catch( error => reject( this.authService.validateExceptionServer( error ) ) )
		});
	}


	getAllBudgets( pagination ) {
		return new Promise(( resolve, reject ) => {
			const id = this.authService.getLogged().id;
			const url = `apiaudiophonebudget/show/${ id }?start=${ pagination.start }&end=${ pagination.end }`;

			this.authService.postClient( url )
				.then( response => {
					
					// console.log( response );

					resolve({
						totalBudgets: response.data.bditemstotal,
						budgets: response.data.apiaudiophoneitemdata
					});
				})
				.catch( error => reject( this.authService.validateExceptionServer( error ) ) );
		});
	}

	searchBudget( stringSearch ) {
		return new Promise(( resolve, reject ) => {
			const id = this.authService.getLogged().id;
			const url = `apiaudiophonebudget/show/${ id }?stringsearch=${ stringSearch }`;

			this.authService.postClient( url )
				.then( response => {
					
					// console.log( response );

					resolve({
						totalBudgets: response.data.bditemstotal,
						budgets: response.data.apiaudiophoneitemdata
					});
				})
				.catch( error => reject( this.authService.validateExceptionServer( error ) ) );
		});
	}
}