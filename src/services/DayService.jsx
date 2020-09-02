import { AuthService } from './AuthService';
import { DAYSWEEK } from '../hardcode/WeekHardcode';

export class DayService {
	
	authService = new AuthService();

	getArrayDays( daysWeek = [] ) {

		let result = [];

		const comp = ( a, b ) => {

			if ( a > b ) {
				return 1;
			}

			if ( a < b ) {
				return -1;
			}

			return 0;
		};

		daysWeek.sort( comp ).forEach(( index ) => {

			for ( let day of DAYSWEEK ) {
				
				if ( day.id === index ) {
					result = result.concat([ day.name ]);
				}

			}
		});

		return result;
	}

	validateTerms( form = {} ) {

		const { apiaudiophoneterms_daysevents, apiaudiophoneterms_rankevents } = form;

		if ( 
			apiaudiophoneterms_daysevents.length === 7 && 
			apiaudiophoneterms_rankevents === 'range' 
		) { 
			
			form = {
				...form,
				apiaudiophoneterms_daysevents: [],
				apiaudiophoneterms_rankevents: 'all-days'
			}
		}

		if ( 
			apiaudiophoneterms_daysevents.length > 1 && 
			apiaudiophoneterms_rankevents === 'range' && 
			apiaudiophoneterms_daysevents.length < 7 ) 
		{  

			// si tiene al menos 2 elementos los ordena
			form = {
				...form,
				apiaudiophoneterms_daysevents: this.getArrayDays( apiaudiophoneterms_daysevents.map(( x ) => parseInt( x ))) 
			};	
		}

		return form;
	}

	getTerms( idTerms = 0 ) {
		
		return new Promise(( resolve, reject ) => {

			const id = this.authService.getLogged().id;

			this.authService.postClient(`apiaudiophoneterm/show/${ id }`)
				.then(({ data }) => {
					resolve({
						ok: data.ok,
						status: data.status,
						data: data.apiaudiophonetermshowdata
					})
				})
				.catch( error => {
					// console.log( error.response );

					reject({ 
						message: 'Ha ocurrido un imprevisto',
						action: 'Error',
						status: error.response.status
				});
			});
		});
	}

	createTerms( form ) {

		return new Promise(( resolve, reject ) => {

			const id = this.authService.getLogged().id;

			this.authService.postClient(`apiaudiophoneterm/store/${ id }`, form )
				.then(({ data }) => {
					resolve({
						message: data.apiaudiophoneterm_mesaage,
						ok: data.ok,
						status: data.status,
						apiaudiophonetermnew: data.apiaudiophonetermnew
					});
				})
				.catch( error => {
					reject({ 
						message: 'Ha ocurrido un imprevisto',
						action: 'Error',
						status: error.response.status
					});
			});
		});
	}
}