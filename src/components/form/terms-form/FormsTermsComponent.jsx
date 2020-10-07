import React from 'react';
import PropTypes from 'prop-types';
import { Form, Col, Row, Button } from 'react-bootstrap';

import { Form as FormFormik, Field } from 'formik';

import { 
  NumberInput, 
  SelectInput,
  HourInput,
  FormButtons
} from '../FormComponent';

import { DAYSWEEK, OPTIONS } from './../../../hardcode/WeekHardcode';

let change = false;

const FormTerms = ({ handleSubmit, handleChange, handleReset, values, errors, isSubmitting, isValid }) => {

  let buttonsArray = [];

  const validateDays = ( id ) => {
     
    let daysArray = values.apiaudiophoneterms_daysevents;

    if ( !daysArray.includes( id ) ) {
      daysArray = daysArray.concat([ id ]);
      change = true;

    } else {
      daysArray = daysArray.filter(( dayId ) => dayId !== id );
      change = false
    }

    changeStyle( 
      buttonsArray.find(( button, index ) => index === +id ), 
      change
    );  

    values.apiaudiophoneterms_daysevents = daysArray;

    // console.log( values.apiaudiophoneterms_daysevents );
  }

  return (

  	<FormFormik noValidate className="m-3">
  		<Form.Row>

        <Field 
          title="Cantidad de eventos por semana:" 
          columnSize={ 6 } 
          name="apiaudiophoneterms_quantityeventsweekly"  
          component={ NumberInput }
          type="number"
        />

        <Field 
          title="Cantidad de eventos al mes:" 
          columnSize={ 6 } 
          name="apiaudiophoneterms_quantityeventsmonthly"  
          component={ NumberInput }
          type="number"
        />

        <Field 
          title="Rango de eventos:"
          name="apiaudiophoneterms_rankevents"
          component={ SelectInput }
          options={ OPTIONS }
        />

        { values.apiaudiophoneterms_rankevents === 'range'  && 
          (
            <Row className="w-100 d-flex flex-md-row justify-content-around mb-2 p-2">
              { DAYSWEEK.map(( day, index, array ) => (
                <Button
                  variant={ 
                    values.apiaudiophoneterms_daysevents.includes( day.id.toString() ) ? 'primary' : 'secondary' 
                  }  
                  className="mb-4 mt-4" 
                  onClick={ () => validateDays( day.id.toString() ) }
                  ref={ ( element ) => buttonsArray = buttonsArray.concat([ element ]) }
                  key={ day.id }
                >
                  { day.name }
                </Button>
              ))}
              <Col sm={12} className="text-center">
                <p>Dias seleccionados: 
                  { DAYSWEEK.map(( day, index ) => {

                    if ( values.apiaudiophoneterms_daysevents.includes( day.id.toString() ) ) {
                      return ( <span key={ index } className="ml-2 font-weight-bold">{ day.name }</span> );
                    }

                    return null;

                  }).filter(( children ) => children !== null ) }
                </p>  
              </Col>
            </Row>
          )
        }

        <Field 
          title="Hora de inicio:"
          component={ HourInput }
          type="time"
          name="apiaudiophoneterms_begintime"
          columnSize={ 6 } 
        />

        <Field 
          title="Hora de culminación:"
          component={ HourInput }
          type="time"
          name="apiaudiophoneterms_finaltime"
          columnSize={ 6 } 
        />
       
        <ShowLogs created_at={ values.created_at } updated_at="" />
        
  		</Form.Row>
      <FormButtons reset={ handleReset } disabled={ !isValid } loading={ isSubmitting } />
  	</FormFormik>
  )
};

const changeStyle = ( element, change = false ) => {

  const rexp = /btn-primary|btn-secondary/g;

  if ( change ) {
    element.className = element.className.replace( rexp, 'btn-primary' );

  } else {
    element.className = element.className.replace( rexp, 'btn-secondary' );

  }

  // console.log( element.className );
}

const ShowLogs = ({ created_at = '', updated_at = '' }) => {

  return (
    <Row className="w-100">
      <Col sm={6} className="text-center mt-3">
        <p>
          Fecha de creación: <br/> 
           <span className="font-weight-bold">{ created_at.length > 0 ? created_at : 'No disponible' }</span>
         </p>
      </Col>
      <Col sm={6} className="text-center mt-3">
        <p>
          Fecha de actualización: <br/> 
          <span className="font-weight-bold">{ updated_at.length > 0 ? updated_at : 'No disponible' }</span>
        </p>
      </Col>  
    </Row>
  );
}

ShowLogs.propTypes = {
  created_at: PropTypes.string,
  updated_at: PropTypes.string
};


export default FormTerms;