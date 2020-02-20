import { string, object } from 'yup';

class RegisterSchema {

	constructor() {

		this.validationMessages = {
			string: {
				required: 'campo requerido',
				min: ( min ) => `minimo ${ min } caracteres`,
				max: ( max ) => `maximo ${ max } caracteres`,
				email: 'debe ser un correo valido'
			}
		};

		this.setSchema();
	}

	setSchema() {

		this.schema = object().shape({
			
			name: string()
				.required( this.validationMessages.string.required )
				.min( 2, this.validationMessages.string.min( 2 ) )
				.max( 20, this.validationMessages.string.max( 20 ) ),
			
			email: string()
				.required( this.validationMessages.string.required )
				.email( this.validationMessages.string.email ),
			
			password: string()
				.required( this.validationMessages.string.required  )
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


export default RegisterSchema;