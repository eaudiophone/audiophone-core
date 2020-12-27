import * as moment from 'moment';

const SECONDS = Object.freeze({
	DAY: 86400,
	HOURS: 3600,
	MINUTES: 60
});

function calculateTotalSeconds( time = '00:00' ) {

	let [ hour, minutes ] = time.split(':');

	hour = parseInt( hour );
	minutes = parseInt( minutes );
	
	let totalSeconds = ( hour * SECONDS.HOURS ) + ( minutes * SECONDS.MINUTES );

	// console.log( totalSeconds );

	return totalSeconds;
}

function getDateWithHour( date = '' ) {
	return moment( date ).format('DD-MM-YYYY kk:mm:ss');
}

function getSpanishFormatDate( date = '' ) {
	return moment( date ).format('DD-MM-YYYY');
}

function getHour( hour = '00:00', limit = 5 ) {
	return hour.slice( 0, limit );
}

function verifyRangeHours( start = '00:00', end = '23:59' ) {
	
	const totalSecoundsBegin = calculateTotalSeconds( start );
	const totalSecoundsFinal = calculateTotalSeconds( end );

	// console.log( totalSecoundsBegin, totalSecoundsFinal );

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

function getDifferenceHours( start = '00:00', end = '23:59', object = false ) {

	let difference = calculateTotalSeconds( end ) - calculateTotalSeconds( start );

	// fisica básica horario inverso ( alquiler )

	if ( difference < 0 ) {

		difference = SECONDS.DAY - calculateTotalSeconds( start );
		difference = difference + calculateTotalSeconds( end );
	}

	if ( object ) {  // devuelve un objeto
		return {
			hours: Math.floor( difference / SECONDS.HOURS ),
			minutes: ( difference % SECONDS.HOURS ) / SECONDS.MINUTES
		};
	}

	return secondsToString( difference );  // devuelve un string
}

function secondsToString( timeSeconds = 0, seconds = false ) {

	let hour = Math.floor( timeSeconds / SECONDS.HOURS );
	hour = ( hour < 10 ) ? '0' + hour : hour;

	let minutes = ( ( timeSeconds % SECONDS.HOURS ) / SECONDS.MINUTES );
	minutes = ( minutes < 10 ) ? '0' + minutes : minutes;

	if ( seconds ) {
		
		let seconds = ( timeSeconds % 60 );
		seconds = ( seconds < 10 ) ? '0' + seconds : seconds;
		
		return hour + ':' + minutes + ':' + seconds;  
	
	} 
	
	return hour + ':' + minutes; 
}

function hourToObject( format = '00:00' ) {

	const [ hour, minutes ] = format.split(':');

	return {
		hour: parseInt( hour ),
		minutes: parseInt( minutes )
	};
}

function compareDates( 
	date1 = new Date().setHours( 0, 0, 0, 0 ), 
	date2 = new Date().setHours( 0, 0, 0, 0 ) 
) {

		if ( date1 < date2 ) {
			return false;
		}  

		return {
			date1: moment( date1 ).format('YYYY-MM-DD'),
			date2: moment( date2 ).format('YYYY-MM-DD')
		};
}

export {
	hourToObject,
	secondsToString,
	verifyRangeHours, 
	getHour,
	calculateTotalSeconds,
	getDateWithHour,
	getDifferenceHours,
	getSpanishFormatDate,
	compareDates
};