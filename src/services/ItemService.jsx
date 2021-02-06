import { AuthService } from './AuthService';

export class ItemService {

	authService = new AuthService();

	getAllItems( pagination ) {

		// el servicio incluye paginación enviarla en el parametro
		return new Promise(( resolve, reject ) => {

			const id = this.authService.getLogged().id;
			const url = `apiaudiophoneitem/show/${ id }?start=${ pagination.start }&end=${ pagination.end }`;

			this.authService.postClient( url )
				.then( response => {

					const { apiaudiophoneitemdata, bditemstotal } = response.data;

					resolve({ 
						items: apiaudiophoneitemdata,
						bdItemsTotal: bditemstotal
					});
				})
				.catch( error => {
					reject( this.authService.validateExceptionServer( error ) );	
				})
		});
	}

	searchItem( stringSearch = '' ) {

		return new Promise(( resolve, reject ) => {

			const id = this.authService.getLogged().id;
			const url = `apiaudiophoneitem/show/${ id }?stringsearch=${ stringSearch }`;

			this.authService.postClient( url )
				.then( response => {

					const { apiaudiophoneitemdata, bditemstotal } = response.data;

					resolve({
						items: apiaudiophoneitemdata,
						total: bditemstotal
					});
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
						item: apiaudiophoneitemnew
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

					const { apiaudiophoneitemessage, apiaudiophoneitemupdate } = response.data;

					resolve({
						action: 'Exito',
						message: apiaudiophoneitemessage,
						item: apiaudiophoneitemupdate
					});

				})
				.catch( error => {
					reject( this.authService.validateExceptionServer( error ) );
				});
		});
	}

	changeStatus( item ) {

		return new Promise(( resolve, reject ) => {
	
			const id = this.authService.getLogged().id;
			const url = `apiaudiophoneitemstatus/update/${ id }`;

			this.authService.putClient( url, item )
				.then( response => {

					const { apiaudiophoneitemessage, apiaudiophoneitemnew } = response.data;

					resolve({
						action: 'Exito',
						message: apiaudiophoneitemessage,
						itemUpdate: apiaudiophoneitemnew
					});
				})
				.catch( error => {
					reject( this.authService.validateExceptionServer( error ) );
				})
		});
	}
}