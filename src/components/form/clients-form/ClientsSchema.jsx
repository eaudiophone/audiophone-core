import { object, string, number } from 'yup';

class ClientsSchema {
	
	constructor() {

		this.validationMessages = {
			string: {
				required: 'Campo requerido',
				min: ( min ) => `minimo ${ min } caracteres`,
				max: ( max ) => `máximo ${ max } caracteres`,
				patternPhone: 'Patrón de número telefónico inválido.'
			},
			number: {
				required: 'Campo requerido',
				positive: 'Solo números positivos',
				moreThan: ( min ) => `El número no puede ser menor a ${ min }`,
				lessThan: ( max ) => `El número no puede ser mayor que ${ max }`
			}
		};

		this._schema = object().shape({
			apiaudiophoneclients_name: string()
				.required( this.validationMessages.string.required )
				.min( 2, this.validationMessages.string.min( 2 ) )
				.max( 60, this.validationMessages.string.max( 60 ) ),  
			
			apiaudiophoneclients_ident: number()
				.required( this.validationMessages.number.required )
				.positive( this.validationMessages.number.required ),  
			
			apiaudiophoneclients_phone: string()
				.required( this.validationMessages.string.required )  
				.matches( /^[0-9]{4}-[0-9]{7}$/,  {  
					message: this.validationMessages.string.patternPhone, 
					excludeEmptyString: true
				})
		})
	}

	set _schema( schema ) {
		this.schema = schema;
	}

	get _schema() {
		return this.schema;
	}
}

export default ClientsSchema;