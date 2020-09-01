import { AuthService } from './AuthService';
import { DAYSWEEK } from '../hardcode/WeekHardcode';

export class DayService {
	
	AuthService = new AuthService();

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

	getTerms( id = 0 ) {
		console.log( id );
	}

	createTerms( form ) {

		return new Promise(( resolve, reject ) => {

			const id = this.AuthService.getLogged().id;

			this.AuthService.postClient(`apiaudiophoneterm/store/${ id }`, form )
				.then(({ data }) => {
					resolve({
						message: data.apiaudiophoneterm_mesaage,
						ok: data.ok,
						status: data.status,
						apiaudiophonetermnew: data.apiaudiophonetermnew
					});
				})
				.catch( error => reject( error ) );
		});
	}
}