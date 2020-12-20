import { AuthService } from './AuthService';
import { getDateWithHour } from '../util-functions/date-format';

export class ItemService {

	authService = new AuthService();

	getAllItems( pagination ) {

		return new Promise(( resolve, reject ) => {
			const id = this.authService.getLogged().id;
			const url = `apiaudiophoneitem/show/${ id }?start=${ pagination.start }&end=${ pagination.end }`;

			this.authService.postClient( url )
				.then( response => {
					resolve({ 
						items: response.data.apiaudiophoneitemdata,
						bdItemsTotal: response.data.bditemstotal
					});
				})
				.catch( error => {
					reject( this.authService.validateExceptionServer( error ) );	
				})
		});

	}

	getItem( idItem = 1 ) {

	}

	searchItem( stringSearch = '' ) {

		return new Promise(( resolve, reject ) => {
			const id = this.authService.getLogged().id;
			const url = `apiaudiophoneitem/show/${ id }?stringsearch=${ stringSearch }`;

			this.authService.postClient( url )
				.then( response => {
					resolve( response.data );
				})
				.catch( error => {
					reject( this.authService.validateExceptionServer( error ) );
				})

		});
	}

	createItem( item ) {

		return new Promise(( resolve, reject ) => {
			const id = this.authService.getLogged().id;

			this.authService.postClient( `apiaudiophoneitem/store/${ id }`, item )
				.then( response => {
					
					const { apiaudiophoneitemessage, apiaudiophoneitemnew } = response.data;

					resolve({
						message: apiaudiophoneitemessage,
						action: 'Exito',
						item: {
							...apiaudiophoneitemnew,
							created_at: getDateWithHour( apiaudiophoneitemnew.created_at ),
							updated_at: getDateWithHour( apiaudiophoneitemnew.updated_at )
						}
					});
				})
				.catch( error => {
					reject( this.authService.validateExceptionServer( error )) 
				});
		});
	}

	updateItem( item ) {
		
		return new Promise(( resolve, reject ) => {
			const id = this.authService.getLogged().id;

			this.authService.putClient(`apiaudiophoneitem/update/${ id }`, item )
				.then( response => {
					resolve( response.data );
				})
				.catch( error => {
					reject( this.authService.validateExceptionServer( error ) );
				});
		});
	}

	deleteItem() {

	}
}