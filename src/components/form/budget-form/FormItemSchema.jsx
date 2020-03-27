import { string, object } from 'yup';

class ItemSchema {

	constructor() {

		this.validationMessages = {
			string: {
				required: 'campo requerido',
				max: ( max ) => `maximo ${ max } caracteres`,
				min: ( min ) => `minimo ${ min } caracteres`
			},
		};

		this.setSchema();
	}

	setSchema() {

		this.schema = object().shape({
			item: string()
				.required( this.validationMessages.string.required )
				.min( 2, this.validationMessages.string.min( 2 ) )
				.max( 20, this.validationMessages.string.max( 20 ) ),

			description: string()
				.required( this.validationMessages.string.required )
				.min( 10, this.validationMessages.string.min( 10 ) )
				.max( 100, this.validationMessages.string.max( 100 ) ),
		});
	}

	getSchema() {
		return this.schema;
	}

	async testData( form ) {
		return await this.schema.isValid( form );
	}
}

export default ItemSchema;