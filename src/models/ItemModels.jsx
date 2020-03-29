class Item {

	constructor(
		id,
		item,
		description,
		costUnit,
		itemQuantity,
		itemMount
	) {
		this.id = id || 0;
		this.item = item || '';
		this.description = description || '';
		this.costUnit = costUnit || 0;
		this.itemQuantity = itemQuantity || 0;
		this.itemMount = itemMount || 0;
	}
}

export default Item;