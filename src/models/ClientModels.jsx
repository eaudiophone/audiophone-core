class Client {
	constructor( 
		apiaudiophoneclients_name, 
		apiaudiophoneclients_ident, 
		apiaudiophoneclients_phone 
	) {
		this.apiaudiophoneclients_name = apiaudiophoneclients_name || '';  
		this.apiaudiophoneclients_ident = apiaudiophoneclients_ident || 0;  
		this.apiaudiophoneclients_phone = apiaudiophoneclients_phone || '';
	}
}

export default Client;