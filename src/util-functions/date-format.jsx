import * as moment from 'moment';

const SECONDS = Object.freeze({
	HOURS: 3600,
	MINUTES: 60
});

export function calculateTotalSeconds( time ) {

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

export function verifyRangeHours( start = '00:00', end = '23:59' ) {
	
	const totalSecoundsBegin = calculateTotalSeconds( start );
	const totalSecoundsFinal = calculateTotalSeconds( end );

	console.log( totalSecoundsBegin, totalSecoundsFinal );

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

export function getDifferenceHours( start = '00:00', end = '23:59', object = true ) {

	let difference = calculateTotalSeconds( end ) - calculateTotalSeconds( start );

	if ( object ) {  // devuelve un objeto
		return {
			hours: Math.floor( difference / SECONDS.HOURS ),
			minutes: ( difference % SECONDS.HOURS ) / SECONDS.MINUTES
		};
	}

	return secondsToString( difference );  // devuelve un string
}

export function secondsToString( timeSeconds = 0 ) {

	let hour = Math.floor( timeSeconds / SECONDS.HOURS );
	hour = ( hour < 10 ) ? '0' + hour : hour;

	let minutes = ( ( timeSeconds % SECONDS.HOURS ) / SECONDS.MINUTES );
	minutes = ( minutes < 10 ) ? '0' + minutes : minutes;

	let seconds = ( timeSeconds % 60 );
	seconds = ( seconds < 10 ) ? '0' + seconds : seconds;

	return hour + ':' + minutes + ':' + seconds;  
}