import { string, object, setLocale } from 'yup';

class RegisterMessages {

	constructor() {

		this.maxLength = 20;
		this.minLength = 2;

		this.setSchema();
	}

	setSchema() {

		setLocale({

			string: {
				required: 'campo requerido',
				min: `minimo ${ this.minLength } caracteres`,
				max: `maximo ${ this.maxLength } caracteres`,
				email: 'debe ser un correo valido' 
			}

		});

		this.schema = object().shape({
			
			name: string()
				.required()
				.min( 2 )
				.max( 20 ),
			
			email: string()
				.required()
				.email(),
			
			password: string()
				.required()
				.min( 8 )

		});

		this.testValidation();
	}


	validateData( register ) {

		this.schema.isValid( register )
			.then( () => true )
			.catch( () => false )
	} 

	testValidation() {

		const data = {
			'name': 'Gabriel Martínez',
			'email': 'gabmart1995@gmail.com',
			'password': '12345678'
		}; 

		// campo valido con booleanos
	 	// this.schema.isValid( data )
			// .then( valid => console.log( valid ) )
			// .catch( error => console.log( error ) );
		

		// validar arreglo de errores
		this.schema.validate( data )
			.then( () => console.log('paso la validación') )
			.catch( ( error ) => {
				console.log( error.name );
				console.log( error.errors );
		});
	}

}


export default RegisterMessages;