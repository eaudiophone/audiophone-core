function sliceString( message = '', limit = 0 ) {
	return message.slice( 0, limit ) + '...';
}

export {
	sliceString
};