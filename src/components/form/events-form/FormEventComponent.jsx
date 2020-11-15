import React from 'react';
import { Form } from 'react-bootstrap'; 
import { Field, Form as FormFormik } from 'formik';

import { 
  SelectInput,
  HourInput,
  FormButtons,
  FormInput,
  FormInputDate,
  TextAreaInput
} from '../FormComponent';

export const FormEventComponent = ({ handleReset, values, isSubmitting, isValid }) => {

  return (

		<FormFormik>

      <Form.Row>

        { values.readOnly && (  // estado del evento
            <label className="w-100 text-center">Estado del evento: 
              <b className="ml-2">{ values.apiaudiophonevents_status }</b>
            </label>
          ) }
        
        <Field 
          title="Título del evento:"
          name="apiaudiophonevents_title"
          type="text"
          component={ FormInput }
          readonly={ values.readOnly || false }  // solo lectura para edicion en usuarios
        />

        <Field 
          component={ SelectInput }
          title="Servicio a solicitar:"
          name="id_apiaudiophoneservices"
          options={ getOptions() }
          type="select"
          readonly={ values.readOnly || false }
        />

        <Field 
          name="apiaudiophonevents_date"
          title="Fecha del evento:"
          type="date"
          component={ FormInputDate }
          readonly={ values.readOnly || false }
        />

        <Field 
          title="Hora de inicio:"
          name="apiaudiophonevents_begintime"
          columnSize={ 6 }
          type="time"
          component={ HourInput }
          readonly={ values.readOnly || false }
        />

        <Field 
          title="Hora de finalización:"
          name="apiaudiophonevents_finaltime"
          columnSize={ 6 }
          type="time"
          component={ HourInput }
          readonly={ values.readOnly || false }
        />

        { values.id_apiaudiophoneservices === '1' && (
            
            <Field 
              name="apiaudiophonevents_address"
              title="Direccion del evento:"
              columnSize={ 12 }
              component={ TextAreaInput }
              type="textarea"
              readonly={ values.readOnly || false }
            />
          )  
        }

         <Field 
            name="apiaudiophonevents_description"
            title="Descripción del evento"
            columnSize={ 12 }
            component={ TextAreaInput }
            type="textarea"
            readonly={ values.readOnly || false }
         />

      </Form.Row>

      { !values.readOnly && ( 
        <FormButtons 
          reset={ handleReset } 
          disabled={ !isValid || ( values.readOnly === true ) } 
          loading={ isSubmitting } 
        />)
      }
			
		</FormFormik>
	);
}

const getOptions = () => {

  let idServices = [];

  for ( let i = 1; i <= 2; i++ ) {

    if ( i === 1 ) {
      idServices = idServices.concat([{ value: i, description: 'servicio de alquiler ( Grupo Musical Horizonte )' }]);
    
    } else {
      idServices = idServices.concat([{ value: i, description: 'servicio de grabación ( Estudios Audiophone )' }]);
    }
  }

  return idServices;
};