class RecordBudgetModels {
	
	constructor(
		date,
		startingTime,
		finishTime,
		costHour
	) {
		this.date = date || '';
		this.startingTime = startingTime || '';
		this.finishTime = finishTime || '';
		this.costHour = costHour || 0;
	}
}

export default RecordBudgetModels;