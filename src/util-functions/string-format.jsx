function sliceString( message = '', limit = 0 ) {
	return message.slice( 0, limit ) + '...';
}

function toCapitalize( text = '' ) {
	
	let result = '';

	for ( let i = 0; i < text.length; i++ ) {
		
		if ( i === 0 ) {
			result += text.charAt( i ).toUpperCase();
		
		} else {			
			result += text.charAt( i ).toLowerCase();
			
		}
	}

	return result;
}

export {
	sliceString,
	toCapitalize
};