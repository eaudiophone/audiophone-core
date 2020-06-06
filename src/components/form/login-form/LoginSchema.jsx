import { string, object } from 'yup';

class LoginSchema {

	constructor() {

		this.validationMessages = {
			string: {
				required: 'campo requerido',
				min: ( min ) => `minimo ${ min } caracteres`,
				email: 'debe ser un email valido'
			}
		};

		this.setSchema();
	}

	setSchema() {

		this.schema = object().shape({

			audiophoneusers_email: string()
				.required( this.validationMessages.string.required )
				.email( this.validationMessages.string.email ),

			audiophoneusers_password: string()
				.required( this.validationMessages.string.required )
				.min( 8, this.validationMessages.string.min( 8 ) )
		});
	}

	getSchema() {
		return this.schema;
	}

	async testData( form ) {
		return await this.schema.isValid( form );
	} 
}

export default LoginSchema;