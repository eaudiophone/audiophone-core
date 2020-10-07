import * as moment from 'moment';

const SECONDS = Object.freeze({
	HOURS: 3600,
	MINUTES: 60
});

function calculateTotalSeconds( time ) {

	let hour = parseInt( time.split(':')[0] );
	let minutes = parseInt( time.split(':')[1] );
	let totalSeconds = ( hour * SECONDS.HOURS ) + ( minutes * SECONDS.MINUTES );

	// console.log( totalSeconds );

	return totalSeconds;
}

export function getDateWithHour( date = '' ) {
	return moment( date ).format('DD-MM-YYYY kk:mm:ss');
}

export function getHour( hour = '00:00' ) {
	return hour.slice( 0, 5 );
}

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

export function getDifferenceHours( start = '00:00', end = '23:59' ) {

	let difference = calculateTotalSeconds( end ) - calculateTotalSeconds( start );

	// console.log( diff % SECONDS.HOURS );

	return {
		hours: Math.floor( difference / SECONDS.HOURS ),
		minutes: ( difference % SECONDS.HOURS ) / SECONDS.MINUTES
	}
}