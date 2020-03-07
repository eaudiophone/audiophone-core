import { object, string } from 'yup';

class ProfileSchema {

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

			registrationDate: string(),

			role: string(),	
		});
	}

	getSchema() {
		return this.schema;
	}

	async testData( form ) {
		return await this.schema.isValid( form );
	} 
}

export default ProfileSchema;