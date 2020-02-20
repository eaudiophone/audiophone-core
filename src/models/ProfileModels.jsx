class Profile {

	constructor( name, email, password, confirmPassword ) {

		this.name = name || '';
		this.email = email || '';
		this.password = password || '';
		this.confirmPassword = confirmPassword || '';
	}
}

export default Profile;