import React, { useState } from 'react';
import { Card, Row, Col, Button } from 'react-bootstrap';
import RedirectService from './../../services/RedirectService';
import './CardComponent.css';

// react Hooks
const CardComponent = ( props ) => {

	const [ redirect, setRedirect ] = useState( false );

	const redirectTo = () => {

		if ( redirect ) {
			return ( 
				<RedirectService route={ `/home/event/${ props.meeting.id }` } /> 
			);
		}
	};

	const CardHeader = () => (

		<Row>
			<Col 
				sm={ 12 } 
				className="d-flex justify-content-between flex-row mt-1"
			>
				<i className={ props.meeting.icon }></i>
				<h5 className="card-title">{ props.meeting.title }</h5>
				<i 
					className="fas fa-times pointer" 
					onClick={ () => props.showModal( props.meeting.id ) }>
				</i>
			</Col>

		</Row>
	);

	const CardBody = () => (

		<div className="container-fluid">
					
				<Row className="d-flex justify-content-between">

					<label className="card-subtitle mb-2 text-muted text-left pt-2">
						Fecha del evento:
					</label>

					<label className="card-subtitle mb-2 text-muted text-left pt-2">
		        { props.meeting.date }
		      </label>
							
				</Row>

				<Row className="pt-2 d-flex justify-content-center">
			     <h6>
			        <i className="mr-1 fas fa-clock"></i>
			        Total: { props.meeting.totalHours } horas
			    </h6>        
		   	</Row> 

				<Row className="d-flex justify-content-between pt-2">

					<h5>
			      <span className="badge badge-secondary">
			          <i className="mr-1 fas fa-clock"></i>
			          Inicio: { props.meeting.startingTime }
			       </span>
			    </h5>

			    <h5>
			        <span className="badge badge-secondary">
			            <i className="mr-1 fas fa-clock"></i>
			            Cierre: { props.meeting.finalHour }
			        </span>
			    </h5> 
		    </Row>

		    <Row className=" pt-2 text-justify">
		        <p>{ props.meeting.description }</p>       
		    </Row>
		    
		    <Row className="d-flex justify-content-center pt-2">
		      <Button 
		      	variant="dark" 
		      	onClick={ () => setRedirect( true ) }>
		          <i className="fas fa-pen mr-2"></i>
		          Ver detalles
		      </Button>  
		    </Row>
			</div>
	);

	return (

		<div className="col-sm-6 mb-3">
		  
		  { redirectTo() }

		  <Card>
		  	<Card.Header style={{ backgroundColor: props.color }}>
		  		{ CardHeader() }
		  	</Card.Header>
		    <Card.Body>
		    	{ CardBody() }
		    </Card.Body>
		  </Card>

		</div>
	);
};


export default CardComponent;