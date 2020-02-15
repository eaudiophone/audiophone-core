import React, { Component } from 'react';
import Event from './../../models/EventModels';
import { Form, Col, Button } from 'react-bootstrap'; 
import { Formik } from 'formik';
import NewEventSchema from './NewEventSchema';

class NewEventComponent extends Component {

	getData( values, actions ) {
		
    const event = new Event(
     values.title,
     values.date,
     values.startingTime,
     values.finalHour,
     values.totalHours,
     values.addressMeeting || 'Estudio principal',
     values.description,
     values.idService
    );

    console.log( event );

    // enviar la data al servidor

		actions.setSubmitting( false );
	}

	render() {

		return (
			<Formik
				component={ Formulario }  
				initialValues={ new Event() }
				validationSchema={ new NewEventSchema().getSchema() }
				onSubmit={ this.getData }
				validateOnChange={ true }
			/>
		);
	}
}

// form-hooks
const Formulario = ( props ) => {

	const {
		handleSubmit,
		handleChange,
		handleReset,
		values,
		errors
	} = props;

	const getInputText = ( title, name, value, columnSize, error )  => (
		
		<Col sm={ columnSize }>
     <Form.Group>
       <Form.Label>{ title }</Form.Label>
       <Form.Control
         as="input" 
         type="text"
         name={ name }
         value={ value }
         onChange={ handleChange }
         isInvalid={ !!error }
      />
			<Form.Control.Feedback type="invalid">
		    { error }
			</Form.Control.Feedback>
     </Form.Group>
    </Col>
	);

	const getInputTextarea = ( title, name, value,  columnSize, error ) => (

		<Col sm={ columnSize }>
		<Form.Group>
			<Form.Label>{ title }</Form.Label>
			<Form.Control
				as="textarea"
				name={ name }
				value={ value }
				onChange={ handleChange }
				isInvalid={ !!error }
			/>
		<Form.Control.Feedback type="invalid">
				{ error }
			</Form.Control.Feedback>
		</Form.Group>
		</Col>
	);


	const getInputDate = ( title, name, value, columnSize, error ) => (

		 <Col sm={ columnSize }>
     <Form.Group>
       <Form.Label>{ title }</Form.Label>
       <Form.Control 
         type="date"
         name={ name }
         value={ value }
         onChange={ handleChange }
         isInvalid={ !!error }
      />
			<Form.Control.Feedback type="invalid">
					{ error }
			</Form.Control.Feedback>
     </Form.Group>
    </Col>
	);

	const getInputHour = ( title, name, value, columnSize, error ) => (
		
		<Col sm={ columnSize }>
     <Form.Group>
       <Form.Label>{ title }</Form.Label>
       <Form.Control 
         type="time"
         name={ name }
         value={ value }
         onChange={ handleChange }
         isInvalid={ !!error }
      />
			<Form.Control.Feedback type="invalid">
					{ error }
			</Form.Control.Feedback>
     </Form.Group>
    </Col>
	);

	const getInputSelect = ( title, name, value, columnSize, error ) => (

	 <Col sm={ columnSize }>
     <Form.Group>
       <Form.Label>{ title }</Form.Label>
       <Form.Control
        as="select"
        name={ name }
        value={ value }
        onChange={ handleChange }
        isInvalid={ !!error }
      >
        <option value="">Seleccione</option>
        <option value="1">Grabación</option>
        <option value="2">Alquiler</option>
      </Form.Control>
			<Form.Control.Feedback type="invalid">
					{ error }
			</Form.Control.Feedback>
     </Form.Group>
    </Col>
	);

	return (

		<Form onSubmit={ handleSubmit } noValidate>
      <Form.Row>
				{	
					getInputText( 
						'Titulo del evento', 
						'title', 
						values.title, 
						12,
						errors.title 
					) 
				}
				{
					getInputSelect( 
						'Servicio a solicitar', 
						'idService', 
						values.idService,  
						12,
						errors.idService 
					) 
				}
				{ 
    				getInputDate(
    					'Fecha del evento', 
    					'date', 
    					values.date, 
    					12,
    					errors.date
    				) 
    			}
    			{ 
    				getInputHour(
    					'Hora de inicio', 
    					'startingTime', 
    					values.startingTime, 
    					4,
    					errors.startingTime 
    				) 
    			}
        	{ 
        		getInputHour(
        			'Hora Final', 
        			'finalHour', 
        			values.finalHour, 
        			4,
        			errors.finalHour 
        		) 
        	}
        	{ 
        		getInputText(
        			'Total horas', 
        			'totalHours', 
        			values.totalHours, 
        			4,
        			errors.totalHours 
        		) 
        	}
					{ /* renderizando condicional */
            values.idService === '2' &&
						
              getInputTextarea (
  							'Direccion del evento', 
  							'addressMeeting', 
  							values.addressMeeting,  
  							12,
  						) 
					}
        	{ 
        	  getInputTextarea (
        			'Description', 
        			'description', 
        			values.description,  
        			12,
        			errors.description 
        		)
          } 
      </Form.Row>

			<Form.Row className="mt-5">
        <Col sm={ 6 } className=" d-flex flex-row justify-content-center">
    			<Button 
            block 
            type="submit" 
            variant="primary"
            className="button-w80"
          >
        		Enviar
        	</Button>
        </Col>
        <Col className="d-flex flex-row justify-content-center">
        	<Button
            className="button-w80" 
            block 
            type="reset" 
            onClick={ handleReset } 
            variant="secondary"
          >
        		Cancelar
        	</Button>
          
        </Col>
      </Form.Row>

		</Form>
	);
};

export default NewEventComponent;