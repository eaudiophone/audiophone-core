import * as moment from 'moment';

const SECONDS = {
	HOURS: 3600,
	MINUTES: 60
};

export function getDateWithHour( date ) {
	return moment( date ).format('DD-MM-YYYY kk:mm:ss');
}

export function getHour( hour = '00:00' ) {
	return hour.slice( 0, 5 );
}

// ------------------------------------------------------ //

// time 

export function verifyRangeHours( beginTime = '', finalHour = '' ) {
	
	const totalSecoundsBegin = calculateTotalSeconds( beginTime );
	const totalSecoundsFinal = calculateTotalSeconds( finalHour );

	if ( totalSecoundsBegin > totalSecoundsFinal ) {
		return {
			ok: false,
			message: 'La hora inicio no debe ser mayor que la hora final'
		};
	
	} else if ( totalSecoundsFinal < totalSecoundsBegin ) {
		return {
			ok: false,
			message: 'La hora final no debe ser manor que la hora de inicio'
		};
	
	} else if ( totalSecoundsBegin === totalSecoundsFinal ) {
		return {
			ok: false,
			message: 'Las horas no pueden ser iguales'
		};

	} else {
		return {
			ok: true
		};
	} 
}

function calculateTotalSeconds( time ) {

	let hour = parseInt( time.split(':')[0] );
	let minutes = parseInt( time.split(':')[1] );
	let totalSeconds = ( hour * SECONDS.HOURS ) + ( minutes * SECONDS.MINUTES );

	console.log( totalSeconds );

	return totalSeconds;
}
