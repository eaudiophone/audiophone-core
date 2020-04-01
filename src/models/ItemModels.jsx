class Item {

	constructor(
		id,
		item,
		description,
		costUnit,
		itemQuantity,
		itemMount
	) {
		this.id = id || new Date().getTime();
		this.item = item || '';
		this.description = description || '';
		this.costUnit = costUnit || 0;
		this.itemQuantity = itemQuantity || 0;
		this.itemMount = itemMount || 0;
	}
}

export default Item;