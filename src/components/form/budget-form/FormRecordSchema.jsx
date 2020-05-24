import { mixed, object, number } from 'yup';

class FormRecordSchema {

	constructor() {

		this.validationMessages = {
			
			number: {
				required: 'campo requerido',
				positive: 'Solo números positivos',
				integer: 'Numeros enteros'
			},

			mixed: {
				required: 'campo requerido'
			}
		};

		this.setSchema();
	}

	setSchema() {

		this.schema = object().shape({
			date: mixed()
				.required( this.validationMessages.mixed.required ),

			startingTime: mixed()
				.required( this.validationMessages.mixed.required ),

			finishTime: mixed()
				.required( this.validationMessages.mixed.required ),

			costHour: number()
				.required( this.validationMessages.number.required )
				.positive( this.validationMessages.number.positive )
				.integer( this.validationMessages.number.integer )
		});
	}

	getSchema() {
		return this.schema;
	}

	async testData( form ) {
		return await this.schema.isValid( form );
	}
}

export default FormRecordSchema;