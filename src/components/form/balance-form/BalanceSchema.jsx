import { object, string, number } from 'yup';

class BalanceSchema {
  constructor() {
    this.validationMessages = {
			string: {
				required: 'Campo requerido',
				min: ( min ) => `minimo ${ min } caracteres`,
				max: ( max ) => `máximo ${ max } caracteres`,
			},
			number: {
				required: 'Campo requerido',
				positive: 'Solo números positivos',
				moreThan: ( min ) => `El número no puede ser menor a ${ min }`,
				lessThan: ( max ) => `El número no puede ser mayor que ${ max }`,
			}
		};

    this._schema = object().shape({
      apiaudiophonebalances_date: string()
        .max( 60, this.validationMessages.string.max( 60 ) ),

      apiaudiophonebalances_desc: string()
        .required( this.validationMessages.string.required )
        .min( 2, this.validationMessages.string.min( 2 ) )
        .max( 60, this.validationMessages.string.max( 60 ) ),

      apiaudiophonebalances_horlab: number()
        .required( this.validationMessages.number.required )
        .positive( this.validationMessages.number.positive )
        .lessThan( 999999, this.validationMessages.number.lessThan( 999999 ) ),

      apiaudiophonebalances_tarif: number()
        .required( this.validationMessages.number.required )
        .positive( this.validationMessages.number.positive )
        .lessThan( 999999, this.validationMessages.number.lessThan( 999999 ) ),

      apiaudiophonebalances_debe: number()
        .lessThan( 999999, this.validationMessages.number.lessThan( 999999 ) ),

      apiaudiophonebalances_haber: number()
        .lessThan( 999999, this.validationMessages.number.lessThan( 999999 ) ),

      apiaudiophonebalances_total: number()
    });
  }

  set _schema( schema ) {
    this.schema = schema;
  }

  get _schema() {
    return this.schema;
  }
}

export default BalanceSchema;
