class Budget {
	constructor(
		apiaudiophonebudgets_client_name,
		apiaudiophonebudgets_client_email,
		apiaudiophonebudgets_client_phone,
		apiaudiophonebudgets_client_social,
	) {
		this.apiaudiophonebudgets_client_name = apiaudiophonebudgets_client_name || '';
		this.apiaudiophonebudgets_client_email = apiaudiophonebudgets_client_email || '';
		this.apiaudiophonebudgets_client_phone = apiaudiophonebudgets_client_phone || '';
		this.apiaudiophonebudgets_client_social = apiaudiophonebudgets_client_social || '';
	}
}

export default Budget;