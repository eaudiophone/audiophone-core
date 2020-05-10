import * as moment from 'moment';

export function getDateWithHour( date ) {
	return moment( date ).format('DD-MM-YYYY kk:mm:ss');
}