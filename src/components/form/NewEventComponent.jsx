import React, { Component } from 'react';
import Event from './../../models/EventModels';
import { Form, Row, Col, Button } from 'react-bootstrap'; 

class NewEventComponent extends Component {

  constructor( props ) {

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
}

export default NewEventComponent;