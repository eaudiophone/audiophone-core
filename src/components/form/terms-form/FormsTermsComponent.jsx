import React from 'react';
import PropTypes from 'prop-types';
import { Form, Col, Row } from 'react-bootstrap';

import { Form as FormFormik, Field } from 'formik';

import { 
  NumberInput, 
  SelectInput,
  HourInput,
  FormButtons
} from '../FormComponent';

import { DAYSWEEK, OPTIONS } from './../../../hardcode/WeekHardcode';


const FormTerms = ({ handleSubmit, handleChange, handleReset, values, errors, isValid }) => {

  // console.log( values );

  const validateDays = ( $event ) => {
    
    let daysArray = values.apiaudiophoneterms_daysevents;
    const { value, checked } = $event.target;

    // console.log( daysArray.includes( value ), checked );

    if ( !daysArray.includes( value ) && checked ) {
      daysArray = daysArray.concat([ value ]);

    } else {
      daysArray = daysArray.filter(( dayId ) => dayId !== value );
    
    }

    values.apiaudiophoneterms_daysevents = daysArray;

    // console.log( values );
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
            <Row className="w-100 mb-2 p-2">
              { DAYSWEEK.map(( day, index, array ) => (
                 <Col sm={ 6 } key={ day.id }>
                    <input 
                      type="checkbox" 
                      id={ day.name } 
                      onChange={ validateDays } 
                      name="apiaudiophoneterms_daysevents"
                      value={ day.id }
                    />
                    <label className="ml-2" htmlFor={ day.name }>{ day.name }</label> 
                 </Col>
              ))}
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
      <FormButtons reset={ handleReset } disabled={ !isValid }  />
  	</FormFormik>
  )
};


/*const CheckboxDays = ({ name, columnSize, error, start, limit, value }) => {

  const renderWeek = () => {

    let checks = [];

    for ( let i = start; i <= limit; i++ ) {
      
      checks.push(
        
        <Field 
          name={ name } 
          label={ DAYSWEEK[i].name }
          value={ DAYSWEEK[i].id }  
          key={ DAYSWEEK[i].id } 
          id={ DAYSWEEK[i].name } 
          component={ CheckboxInput }
        />
      );          
    }

    return checks;
  } 

  return (

    <Col sm={ columnSize } className="mb-2">
      { renderWeek() }
    </Col>
  );
}

CheckboxDays.propTypes = {
  name: PropTypes.string.isRequired,
  values: PropTypes.array,
  columnSize: PropTypes.number.isRequired,
  error: PropTypes.string,
  start: PropTypes.number.isRequired,
  limit: PropTypes.number.isRequired
};*/

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