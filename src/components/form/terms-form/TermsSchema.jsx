import { number, object, string, mixed } from 'yup';

class TermsSchema {

	constructor() {

		this.validationMessages = {
			number: {
				min: ( min ) => `debe ser mayor o igual a ${ min }`,
				max: ( max ) => `debe ser menor o igual a ${ max }`
			},

			string: {
				required: 'campo requerido'
			},

			date: {
				required: 'campo requerido'
			},

			mixed: {
				required: 'campo requerido',
			}
		};

		this.setSchema();
	}

	setSchema() {

		this.schema = object().shape({

			apiaudiophoneterms_quantityeventsweekly: number()
				.min( 1, this.validationMessages.number.min( 1 ) )
				.max( 24, this.validationMessages.number.max( 24 ) ),

			apiaudiophoneterms_quantityeventsmonthly: number()
				.min( 1, this.validationMessages.number.min( 1 ) )
				.max( 30, this.validationMessages.number.max( 30 ) ),

			apiaudiophoneterms_rankevents: string()
				.required( this.validationMessages.string.required ),

			apiaudiophoneterms_finaltime: mixed()
				.required( this.validationMessages.mixed.required ),

			apiaudiophoneterms_begintime: mixed()
				.required( this.validationMessages.mixed.required ),

			apiaudiophoneterms_daysevents: mixed()
		});
	}

	getSchema() {
		return this.schema;
	}

	async testData( form ) {
		return await this.schema.isValid( form );
	}
}

export default TermsSchema;