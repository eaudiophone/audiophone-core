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
					result.push( day.name );
				}

			}
		});

		return result;
	}

	validateTerms( form, id ) {

		const { daysWeek, daysMeeting } = form;

		// validaciones
		if ( daysWeek.length === 7 && daysMeeting === 'range' ) { 
			form = {
				...form,
				daysWeek: [],
				daysMeeting: 'all-days'
			}
		}

		if ( daysWeek.length > 1 && daysMeeting === 'range' && daysWeek.length < 7 ) {  

			// si tiene al menos 2 elementos los ordena
			form = {
				...form,
				daysWeek: this.getArrayDays( daysWeek.map(( x ) => parseInt( x ))) 
			};	
		}

		// enviar datos
		console.log( form );
	}
}