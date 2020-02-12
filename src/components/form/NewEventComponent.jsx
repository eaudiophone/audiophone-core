import React, { Component } from 'react';
import Event from './../../models/EventModels';
import { Form, Col, Button } from 'react-bootstrap'; 
import { Formik } from 'formik';
import NewEventSchema from './NewEventSchema';


class NewEventComponent extends Component {

	getData( values, actions ) {
		console.log( values );
		actions.setSubmitting( false );
	}

	render() {

		return (
			<Formik
				component={ form }  
				initialValues={ new Event() }
				validationSchema={ new NewEventSchema().getSchema() }
				onSubmit={ this.getData }
			/>
		);
	}
}


const form = ( props ) => {
	
	const {
		handleSubmit,
		handleChange,
		handleReset,
		values,
		errors
	} = props;

	const getInputText = ( title, name, value, change, columnSize, error )  => (
		
		<Col sm={ columnSize }>
     <Form.Group>
       <Form.Label>{ title }</Form.Label>
       <Form.Control
         as="input" 
         type="text"
         name={ name }
         value={ value }
         onChange={ change }
         isInvalid={ !!error }
      />
     </Form.Group>
		  <Form.Control.Feedback type="invalid">
		    { error }
		  </Form.Control.Feedback>
    </Col>
	);

	const getInputTextarea = ( title, name, value, change, columnSize, error ) => (

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
     </Form.Group>
     <Form.Control.Feedback type="invalid">
		    { error }
		  </Form.Control.Feedback>
  	</Col>
	);

	const getInputDate = ( title, name, value, change, columnSize, error ) => (

		 <Col sm={ columnSize }>
     <Form.Group>
       <Form.Label>{ title }</Form.Label>
       <Form.Control 
         type="text"
         name={ name }
         value={ value }
         onChange={ change }
         isInvalid={ !!error }
      />
     </Form.Group>
     <Form.Control.Feedback type="invalid">
		    { error }
		 </Form.Control.Feedback>
    </Col>
	);

	const getInputHour = ( title, name, value, change, columnSize, error ) => (
		
		<Col sm={ columnSize }>
     <Form.Group>
       <Form.Label>{ title }</Form.Label>
       <Form.Control 
         type="time"
         name={ name }
         value={ value }
         onChange={ change }
         isInvalid={ !!error }
      />
     </Form.Group>
     <Form.Control.Feedback type="invalid">
		    { error }
		 </Form.Control.Feedback>
    </Col>
	);

	const getInputSelect = ( title, name, value, change, columnSize, error ) => (

	 <Col sm={ columnSize }>
     <Form.Group>
       <Form.Label>{ title }</Form.Label>
       <Form.Control
        as="select"
        name={ name }
        value={ value }
        onChange={ change }
        isInvalid={ !!error }
      >
        <option value={ 0 }>Seleccione</option>
        <option value={ 1 }>Grabación</option>
        <option value={ 2 }>Alquiler</option>
      </Form.Control>
     </Form.Group>
     <Form.Control.Feedback type="invalid">
		    { error }
		 </Form.Control.Feedback>
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
						handleChange, 
						12,
						errors.title 
					) 
				}
				{ 
					getInputSelect( 
						'Servicio a solicitar', 
						'idService', 
						values.idService, 
						handleChange, 
						12,
						errors.idService 
					) 
				}
				{ 
    				getInputDate(
    					'Fecha del evento', 
    					'date', 
    					values.date, 
    					handleChange,
    					12,
    					errors.date
    				) 
    			}
    			{ 
    				getInputHour(
    					'Hora de inicio', 
    					'startingTime', 
    					values.startingTime, 
    					handleChange,
    					4,
    					errors.startingTime 
    				) 
    			}
        	{ 
        		getInputHour(
        			'Hora Final', 
        			'finalHour', 
        			values.finalHour,
        			handleChange, 
        			4,
        			errors.finalHour 
        		) 
        	}
        	{ 
        		getInputText(
        			'Total horas', 
        			'totalHours', 
        			values.totalHours, 
        			handleChange, 
        			4,
        			errors.totalHours 
        		) 
        	}
          <div className="col-sm-12 p-0">
            { 
            	getInputTextarea (
            		'Direccion del evento', 
            		'addressMeeting', 
            		values.addressMeeting, 
            		handleChange, 
            		12,
            	) 
            }
          </div>
        	{ 
        	getInputTextarea (
        			'Description', 
        			'description', 
        			values.description, 
        			handleChange, 
        			12,
        			errors.description 
        		) 
        	}
			</Form.Row>
			
			<Button type="submit" variant="primary" className="mr-3">
    		Enviar
    	</Button>
    	<Button type="reset" onClick={ handleReset } variant="secondary">
    		Cancelar
    	</Button>

		</Form>
	);
};

  /*constructor( props ) {

    super( props );

    this.state = new Event();

    // metodos que vinculan al estado
    this.handleSubmit = this.handleSubmit.bind( this );
    this.handleChange = this.handleChange.bind( this );
    this.resetForm = this.resetForm.bind( this );

    // elementos DOM
    this.addressInput = React.createRef();
  }

  componentDidMount() {
    this.showAddress('idService', '0');
  }

  handleSubmit( event ) {

  	const meeting = new Event(
        this.state.title,
        this.state.date,
        this.state.startingTime,
        this.state.finalHour,
        this.state.totalHours,
        this.state.addressMeeting === '' ? 'Estudio principal' : this.state.addressMeeting,
        this.state.description,
        parseInt( this.state.idService )
    );
  
  	this.resetForm();
  	console.log( meeting );

    alert( 'formulario enviado' );
    event.preventDefault();
  }

  handleChange( event ) {
  	
    const name = event.target.name;
    const value = event.target.value;

    this.showAddress( name, value );

    this.setState({ [ name ]: value });
  } 

  showAddress( name, value ) {

    if ( name === 'idService' && ( value ) === '2' ) {
      
      this.addressInput.current.style.display = 'block';
 
    } else if ( name === 'idService' && ( value === '1' || value === '0' ) ) {
      
      this.addressInput.current.style.display = 'none';

    } else {

      return;
    }
  }

  resetForm() {   
    
    this.setState( new Event() );
  }

  getForm( name, title, state, columnSize ) {

    return (

	    <Col sm={ columnSize }>
	       <Form.Group>
	         <Form.Label>{ title }</Form.Label>
	         <Form.Control
             as="input" 
	           type="text"
	           name={ name }
	           value={ state }
	           onChange={ this.handleChange }
             required
	        />
	       </Form.Group>
	    </Col>
    );
  }

  getFormDate( name, title, state, columnSize ) {

  	return (

  		 <Col sm={ columnSize }>
	       <Form.Group>
	         <Form.Label>{ title }</Form.Label>
	         <Form.Control 
	           type="text"
	           name={ name }
	           value={ state }
	           onChange={ this.handleChange }
             required
	        />
	       </Form.Group>
	    </Col>
  	);
  }

  getFormTextarea( name, title, state, columnSize ) {

  	return (

  		<Col sm={ columnSize }>
	       <Form.Group>
	         <Form.Label>{ title }</Form.Label>
	         <Form.Control
	         	as="textarea"
	          name={ name }
	          value={ state }
	          onChange={ this.handleChange }
	        />
	       </Form.Group>
	    </Col>
  	);
  }

  getFormSelect( name, title, state, columnSize ) {

    return (

      <Col sm={ columnSize }>
         <Form.Group>
           <Form.Label>{ title }</Form.Label>
           <Form.Control
            as="select"
            name={ name }
            value={ this.state.idService }
            onChange={ this.handleChange }
            required
          >
            <option value={ 0 }>Seleccione</option>
            <option value={ 1 }>Grabación</option>
            <option value={ 2 }>Alquiler</option>
          </Form.Control>
         </Form.Group>
      </Col>
    );
  }

  render() {

  	return(

    	<Form onSubmit={ this.handleSubmit }>
    		<Row>
    			{ 
    				this.getForm( 
    					'title', 
    					'Titulo del evento', 
    					this.state.title, 
    					12 
    				)
    			}
          { 
          	this.getFormSelect( 
          		'idService', 
          		'Servicio a solicitar', 
          		this.state.idService, 
          		12 
          	) 
          }
    			{ 
    				this.getFormDate( 
    					'date', 
    					'Fecha', 
    					this.state.date, 
    					12 
    				) 
    			}
    			{ 
    				this.getForm( 
    					'startingTime', 
    					'Hora de inicio', 
    					this.state.startingTime, 
    					4 
    				) 
    			}
        	{ 
        		this.getForm( 
        			'finalHour', 
        			'Hora final', 
        			this.state.finalHour, 
        			4 
        		) 
        	}
        	{ 
        		this.getForm( 
        			'totalHours', 
        			'Total horas', 
        			this.state.totalHours, 
        			4 
        		) 
        	}
          <div ref={ this.addressInput } className="col-sm-12 p-0">
            { 
            	this.getFormTextarea( 
            		'addressMeeting', 
            		'Dirección del evento', 
            		this.state.addressMeeting, 
            		12 
            	) 
            }
          </div>
        	{ 
        		this.getFormTextarea( 
        			'description', 
        			'Descripción', 
        			this.state.description, 
        			12 
        		) 
        	}
    		</Row>

        	<Button type="submit" variant="primary" className="mr-3">
        		Enviar
        	</Button>
        	<Button type="reset" onClick={ this.resetForm } variant="secondary">
        		Cancelar
        	</Button>
    	</Form>
  	);

  }
}*/

export default NewEventComponent;