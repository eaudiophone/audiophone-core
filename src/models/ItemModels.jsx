class Item {

	constructor(
		apiaudiophoneitems_id ,
		apiaudiophoneitems_name,
		apiaudiophoneitems_description,
		apiaudiophoneitems_price,
	) {
		this.apiaudiophoneitems_id = apiaudiophoneitems_id  || null;
		this.apiaudiophoneitems_name = apiaudiophoneitems_name || '';
		this.apiaudiophoneitems_description = apiaudiophoneitems_description || '';
		this.apiaudiophoneitems_price = apiaudiophoneitems_price || 1;
	}
}

export default Item;