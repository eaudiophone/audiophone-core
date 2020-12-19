import { object, string, number } from 'yup';

export class ItemsSchema {

	constructor() {
		this.validationMessages = {
			string: {
				required: 'Campo requerido',
				min: ( min ) => `minimo ${ min } caracteres`,
				max: ( max ) => `máximo ${ max } caracteres`
			},
			number: {
				required: 'Campo requerido',
				positive: 'No se permiten números negativos',
				moreThan: ( min ) => `El número no puede ser menor a ${ min }`,
				lessThan: ( max ) => `El número no puede ser mayor que ${ max }`
			}
		}

		this.setSchema();
	}

	setSchema() {
		this.schema = object().shape({
			apiaudiophoneitems_name: string()
				.required( this.validationMessages.string.required )
				.min( 2, this.validationMessages.string.min( 2 ) )
				.max( 60, this.validationMessages.string.max( 60 ) ),

			apiaudiophoneitems_description: string()
				.required( this.validationMessages.string.required )
				.min( 2, this.validationMessages.string.min( 2 ) )
				.max( 60, this.validationMessages.string.max( 60 ) ),

			apiaudiophoneitems_price: number()
				.required( this.validationMessages.number.required )
				.positive( this.validationMessages.number.positive )
				.moreThan( 0, this.validationMessages.number.moreThan( 0 ) )
				.lessThan( 9999, this.validationMessages.number.lessThan( 9999 ) )
		});
	}

	getSchema() {
		return this.schema;
	}
}