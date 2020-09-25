import { AuthService } from './AuthService';
import { DAYSWEEK } from '../hardcode/WeekHardcode';
import { getHour, getDateWithHour } from './../util-functions/date-format';
 
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

		// rango 2 al 7
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

		// rango igual a 1
		if (
			apiaudiophoneterms_daysevents.length === 1 && 
			apiaudiophoneterms_rankevents === 'range'
		) {

			form = {
				...form,
				apiaudiophoneterms_daysevents: DAYSWEEK.filter(( day ) => day.id === form.apiaudiophoneterms_daysevents[0] ).name
			};
		}

		// vacia el arreglo si tiene alguno de los 2 campos
		if ( apiaudiophoneterms_rankevents === 'all-days' || apiaudiophoneterms_rankevents === '5-days' ) {
			form = {
				...form,
				apiaudiophoneterms_daysevents: [],
			};
		}

		return form;
	}

	getTerms( idTerms = 0 ) {
		
		return new Promise(( resolve, reject ) => {

			const id = this.authService.getLogged().id;

			this.authService.postClient(
				`apiaudiophoneterm/show/${ id }`,
				{ id_apiaudiophoneservices: idTerms }
			)
				.then(({ data }) => {

					let { apiaudiophonetermshowdata, days_events_array } = data;

					// console.log( days_events_array );

					apiaudiophonetermshowdata = {
						...apiaudiophonetermshowdata,
						apiaudiophoneterms_begintime: getHour( apiaudiophonetermshowdata.apiaudiophoneterms_begintime ),
						apiaudiophoneterms_finaltime: getHour( apiaudiophonetermshowdata.apiaudiophoneterms_finaltime ),
						created_at: apiaudiophonetermshowdata.created_at ? getDateWithHour( apiaudiophonetermshowdata.created_at ) : '',
						updated_at: apiaudiophonetermshowdata.updated_at ? getDateWithHour( apiaudiophonetermshowdata.updated_at ) : '',
						apiaudiophoneterms_daysevents: apiaudiophonetermshowdata.apiaudiophoneterms_daysevents !== null ?  
							this.changeDaybyId( days_events_array ) : []
					};

					// console.log( apiaudiophonetermshowdata );

					resolve({
						ok: data.ok,
						status: data.status,
						data: apiaudiophonetermshowdata
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

	changeDaybyId( arrayDays = [] ) {
		
		// console.log( arrayDays );

		arrayDays = arrayDays.map( day => day.trim( day ) )

		// console.log( arrayDays );

		return DAYSWEEK.map(( day ) => {

			if ( arrayDays.includes( day.name ) ) {
				return day.id.toString();
			}

			return null;

		}).filter(( day ) => day !== null ) 
	}
}