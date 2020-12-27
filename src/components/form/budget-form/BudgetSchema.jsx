import { mixed, object, string, number } from 'yup';

export class BudgetSchema {

	constructor() {

		this.validationMessages = {
			number: {
				required: 'campo requerido',
				positive: 'Solo números positivos',
				moreThan: ( min ) => `El número no puede ser menor a ${ min }`,
				lessThan: ( max ) => `El número no puede ser mayor que ${ max }`
			},
			string: {
				required: 'campo requerido',
				min: ( min ) => `minimo ${ min } caracteres`,
				max: ( max ) => `máximo ${ max } caracteres`,
				email: 'Debe ser un correo válido'
			}
		};

		this.setSchema();
	}

	setSchema() {

		this.schema = object().shape({
			apiaudiophonebudgets_client_name: string()
				.required( this.validationMessages.string.required )
				.min( 2, this.validationMessages.string.min( 2 ) )
				.max( 20, this.validationMessages.string.max( 20 ) ),

			apiaudiophonebudgets_client_email: string()
				.required( this.validationMessages.string.required )
				.email( this.validationMessages.string.email ),

			apiaudiophonebudgets_client_phone: string(),

			apiaudiophonebudgets_client_social: string(),

			apiaudiophonebudgets_total_price: string()
				.required( this.validationMessages.number.required )
				.positive( this.validationMessages.number.positive )
				.moreThan( 0, this.validationMessages.number.moreThan( 0 ) )
				.lessThan( 9999, this.validationMessages.number.lessThan( 9999 ) )
		});
	}

	getSchema() {
		return this.schema;
	}

	async testData( form ) {
		return await this.schema.isValid( form );
	}
}