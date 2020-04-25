class Profile {

	constructor( 
		apiaudiophoneusers_fullname, 
		apiaudiophoneusers_email, 
		apiaudiophoneusers_password 
	) {

		this.apiaudiophoneusers_fullname = apiaudiophoneusers_fullname || '';
		this.apiaudiophoneusers_email = apiaudiophoneusers_email || '';
		this.apiaudiophoneusers_password = apiaudiophoneusers_password || '';
	}
}

export default Profile;