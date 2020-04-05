class Profile {

	constructor( 
		audiophoneusers_fullname, 
		audiophoneusers_email, 
		audiophoneusers_password 
	) {

		this.audiophoneusers_fullname = audiophoneusers_fullname || '';
		this.audiophoneusers_email = audiophoneusers_fullname || '';
		this.audiophoneusers_password = audiophoneusers_password || '';
	}
}

export default Profile;