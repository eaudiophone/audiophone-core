import React, { Component } from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap'; 
import Event from './../../models/EventModels';
import { MEETINGS } from './../../hardcode/MeetigsHardcode';

class EditEventComponent extends Component {

	constructor( props ) {

		super( props );

		this.state = new Event();
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
	           defaultValue={ state }
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
	           type="date"
	           name={ name }
	           defaultValue={ state }
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
	          defaultValue={ state }
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
            defaultValue={ this.state.idService }
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

		return (

			<Form>
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
		        <div id="address" className="col-sm-12 p-0">
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
		      	<Button type="reset" variant="secondary">
		      		Cancelar
		      	</Button>
		  	</Form>
			);
	}
}

export default EditEventComponent;