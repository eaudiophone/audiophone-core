import React from 'react';
import { Form, Col, Button } from 'react-bootstrap'; 

const FormEventComponent = ( props ) => {

	const {
		handleSubmit,
		handleChange,
		handleReset,
		errors,
		values
	} = props

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
        			'Hora final', 
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
			    { /* Condicional */
			    	values.idService === '2' &&    
				  	
				  	getInputTextarea (
  						'Direccion del evento', 
  						'addressMeeting', 
  						values.addressMeeting,  
  						12,
                        errors.addressMeeting
  					) 
					}
        	{ 
        	  getInputTextarea (
        			'Descripción', 
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
}

export default FormEventComponent;