import { string, object, mixed, date } from 'yup';

class EventSchema {

	constructor() {

		this.validationMessages = {
			string: {
				required: 'campo requerido',
				min: ( min ) => `minimo ${ min } caracteres`,
				max: ( max ) => `máximo ${ max } caracteres`
			},
			date: {
				required: 'campo requerido',
			},
			mixed: {
				required: 'campo requerido'
			},
			number: {
				required: 'campo requerido',
				positive: 'el numero no puede ser negativo',
				integer: 'el numero debe ser entero',
				typeError: 'El formato no es especificado'
			}
		};

		this.setSchema();
	}

	setSchema() {

		this.schema = object().shape({

			apiaudiophonevents_title: string()
				.required( this.validationMessages.string.required )
				.min( 2, this.validationMessages.string.min( 2 ) )
				.max( 25, this.validationMessages.string.max( 25 ) ),

			apiaudiophonevents_date: date()
				.required( this.validationMessages.date.required ),

			apiaudiophonevents_begintime: mixed()
				.required( this.validationMessages.mixed.required ),

			apiaudiophonevents_finaltime: mixed()
				.required( this.validationMessages.mixed.required ),

			apiaudiophonevents_description: string()
				.required( this.validationMessages.string.required )
				.min( 10, this.validationMessages.string.min( 10 ) )
				.max( 120, this.validationMessages.string.max( 120 )),

			apiaudiophonevents_address: string()
				.min( 10, this.validationMessages.string.min( 10 ) )
				.max( 120, this.validationMessages.string.max( 120 ) ),

			id_apiaudiophoneservices: string()
				.required( this.validationMessages.number.required ),
		});
	}

	getSchema() {
		return this.schema;
	}

	async testData( form ) {
		return await this.schema.isValid( form );
	} 
}

export default EventSchema;