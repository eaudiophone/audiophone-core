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
        
        <Field 
          title="Título del evento:"
          name="apiaudiophonevents_title"
          type="text"
          component={ FormInput }
        />

        <Field 
          component={ SelectInput }
          title="Servicio a solicitar:"
          name="id_apiaudiophoneservices"
          options={ getOptions() }
          type="select"
        />

        <Field 
          name="apiaudiophonevents_date"
          title="Fecha del evento:"
          type="date"
          component={ FormInputDate }
        />

        <Field 
          title="Hora de inicio:"
          name="apiaudiophonevents_begintime"
          columnSize={ 6 }
          type="time"
          component={ HourInput }
        />

        <Field 
          title="Hora de finalización:"
          name="apiaudiophonevents_finaltime"
          columnSize={ 6 }
          type="time"
          component={ HourInput }
        />

        { values.id_apiaudiophoneservices === '1' && (
            
            <Field 
              name="apiaudiophonevents_address"
              title="Direccion del evento:"
              columnSize={ 12 }
              component={ TextAreaInput }
              type="textarea"
            />
          )  
        }

         <Field 
            name="apiaudiophonevents_description"
            title="Descripción del evento"
            columnSize={ 12 }
            component={ TextAreaInput }
            type="textarea"
         />

      </Form.Row>

      <FormButtons reset={ handleReset } disabled={ !isValid } loading={ isSubmitting } />
			
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