class User {

	constructor(
		name,
		email,
		password,
		) {

		this.name = name;
		this.email = email;
		this.password = password;
		this.status = true;
		this.role = 'USER_ROLE';
		this.registrationDate = this.getDate();
	}

	getDate() {

		let format = new Date();
		let month = parseInt( format.getMonth() ) + 1;
		
		return `${ format.getFullYear() }/${ month }/${ format.getDate() }`;
	}
}

export default User;