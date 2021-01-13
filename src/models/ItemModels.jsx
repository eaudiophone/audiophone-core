class Item {

	constructor(
		apiaudiophoneitems_id ,
		apiaudiophoneitems_name,
		apiaudiophoneitems_description,
		apiaudiophoneitems_price,
		apiaudiophoneitems_status
	) {
		this.apiaudiophoneitems_id = apiaudiophoneitems_id  || null;
		this.apiaudiophoneitems_name = apiaudiophoneitems_name || '';
		this.apiaudiophoneitems_description = apiaudiophoneitems_description || '';
		this.apiaudiophoneitems_price = apiaudiophoneitems_price || 1;
		this.apiaudiophoneitems_status = apiaudiophoneitems_status || 'ACTIVO';
	}
}

export default Item;