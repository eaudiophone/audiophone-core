import { object, string } from 'yup';

export class BudgetSchema {

	constructor() {

		this.validationMessages = {
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
		});
	}

	getSchema() {
		return this.schema;
	}

	async testData( form ) {
		return await this.schema.isValid( form );
	}
}
