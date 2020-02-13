import { string, object, number, mixed, date } from 'yup';

class NewEventSchema {

	constructor() {

		this.validationMessages = {
			string: {
				required: 'campo requerido',
				min: (min) => `minimo ${ min } caracteres`,
				max: (max) => `minimo ${ max } caracteres`
			},
			date: {
				required: 'campo requerido'
			},
			mixed: {
				required: 'campo requerido'
			},
			number: {
				required: 'campo requerido'
			}
		};

		this.setSchema();
	}

	setSchema() {

		this.schema = object().shape({

			title: string()
				.required( this.validationMessages.string.required )
				.min( 2, this.validationMessages.string.min( 2 ) )
				.max( 25, this.validationMessages.string.max( 25 ) ),

			idService: string()
				.required( this.validationMessages.number.required ),

			date: date()
				.required( this.validationMessages.date.required ),

			startingTime: mixed()
				.required( this.validationMessages.mixed.required ),

			finalHour: mixed()
				.required( this.validationMessages.mixed.required ),

			totalHours: number()
				.required( this.validationMessages.number.required ),

			description: string()
				.required( this.validationMessages.string.required )
				.min( 10, this.validationMessages.string.min( 10 ) )
				.max( 255, this.validationMessages.string.max( 255 ) )
		});
	}

	getSchema() {
		return this.schema;
	}

	async testData( form ) {
		return await this.schema.isValid( form );
	} 
}

export default NewEventSchema;