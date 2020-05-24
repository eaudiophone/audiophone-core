import { string, object } from 'yup';

class PorfileSchema {

	registerSchema = null;
	profileSchema = null;

	constructor() {

		this.validationMessages = {
			string: {
				required: 'campo requerido',
				min: ( min ) => `minimo ${ min } caracteres`,
				max: ( max ) => `maximo ${ max } caracteres`,
				email: 'debe ser un correo valido',
				pattern: 'Formato inválido'
			}
		};

		this.setRegisterSchema();
		this.setProfileSchema();
	}

	setRegisterSchema() {

		this.registerSchema = object().shape({
			
			apiaudiophoneusers_fullname: string()
				.required( this.validationMessages.string.required )
				.min( 2, this.validationMessages.string.min( 2 ) )
				.max( 20, this.validationMessages.string.max( 20 ) )
				.matches( /^[\sA-Za-z]+$/, this.validationMessages.string.pattern ),
			
			apiaudiophoneusers_email: string()
				.required( this.validationMessages.string.required )
				.email( this.validationMessages.string.email ),
			
			apiaudiophoneusers_password: string()
				.min( 8, this.validationMessages.string.min( 8 ) )
				.required( this.validationMessages.string.required )
		});

	}

	setProfileSchema() {

		this.profileSchema = object().shape({
			
			apiaudiophoneusers_fullname: string()
				.required( this.validationMessages.string.required )
				.min( 2, this.validationMessages.string.min( 2 ) )
				.max( 20, this.validationMessages.string.max( 20 ) )
				.matches( /^[\sA-Za-z]+$/, this.validationMessages.string.pattern ),
			
			apiaudiophoneusers_email: string()
				.required( this.validationMessages.string.required )
				.email( this.validationMessages.string.email ),
			
			apiaudiophoneusers_password: string()
				.min( 8, this.validationMessages.string.min( 8 ) )
		});
	} 

	getRegisterSchema() {
		return this.registerSchema;
	}

	getProfileSchema() {
		return this.profileSchema;
	}

	async testData( form ) {
		return await this.schema.isValid( form );
	} 
}


export default PorfileSchema;