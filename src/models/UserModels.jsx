class User {

	constructor( name, email, password ) {

		this.name = name;
		this.email = email;
		this.password = password;
		this.status = true;
		this.role = 'USER_ROLE';
		this.registrationDate = this.getDate();
	}

	getDate() {

		let format = new Date().toISOString();
		format = format.split('T');
		format = format[0]
		
		return format;
	}
}

export default User;