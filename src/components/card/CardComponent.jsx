import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Card, Row, Button } from 'react-bootstrap';
import { RedirectService } from './../../services/RedirectService';
import './CardComponent.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const CardComponent = ({ meeting, color, showModal }) => {

	const {
		icon,
		id,
		title,
		date,
		totalHours,
		startingTime,
		finalHour,
		description,
		status
	} = meeting;

	const [ redirect, setRedirect ] = useState( false );

	const redirectTo = () => {

		if ( redirect ) {
			return ( 
				<RedirectService route={ `/event/${ id }` } /> 
			);
		}
	};

	const CardHeader = () => (

		<Row className="justify-content-between align-items-center mt-1 pr-3 pl-3">
			<FontAwesomeIcon icon={ icon } />
			<h5 className="mb-0">{ title }</h5>
			<FontAwesomeIcon icon={ icon } />
		</Row>
	);

	const CardBody = () => (

		<div className="container-fluid">
					
				<Row className="d-flex justify-content-between">
					<label className="card-subtitle mb-2 text-muted text-left pt-2">
						Fecha del evento:
					</label>

					<label className="card-subtitle mb-2 text-muted text-left pt-2">
		        { date }
		      </label>
				</Row>

				<Row className="justify-content-center">
					<b>Estado: <span>{ status }</span> </b>
				</Row>

				<Row className="pt-2 d-flex justify-content-center">
			     <h6>
			     	<FontAwesomeIcon icon="clock" className="mr-1" />
			        Total: { totalHours.hour } horas, { totalHours.minutes } minutos
			    </h6>        
		   	</Row> 

				<Row className="d-flex justify-content-between pt-2">
					<h5>
			      <span className="badge badge-secondary">
			          <FontAwesomeIcon icon="clock" className="mr-1" />
			          Inicio: { startingTime }
			       </span>
			    </h5>
			    <h5>
			        <span className="badge badge-secondary">
			            <FontAwesomeIcon icon="clock" className="mr-1" />
			            Cierre: { finalHour }
			        </span>
			    </h5> 
		    </Row>

		    <Row className="pt-2">
		        <p className="w-100 text-justify">{ description }</p>       
		    </Row>
		    
		    <Row className="d-flex justify-content-center pt-2">
		      <Button 
		      	variant="dark" 
		      	onClick={ () => setRedirect( true ) }>
		          <FontAwesomeIcon className="mr-2" icon="pen" />
		          Ver detalles
		      </Button>  
		    </Row>

			</div>
	);

	return (

		<div className="col-sm-6 mb-3">
		  
		  { redirectTo() }

		  <Card>
		  	<Card.Header style={{ backgroundColor: color }}>
		  		<CardHeader/>
		  	</Card.Header>
		    <Card.Body>
		    	<CardBody />
		    </Card.Body>
		  </Card>

		</div>
	);
};

CardComponent.propTypes = {
	meeting: PropTypes.shape({
		icon: PropTypes.string.isRequired,
		id: PropTypes.number.isRequired,
		title: PropTypes.string.isRequired,
		date: PropTypes.string.isRequired,
		startingTime: PropTypes.string.isRequired,
		totalHours: PropTypes.shape({
			hour: PropTypes.number.isRequired,
			minutes: PropTypes.number.isRequired
		}),
		finalHour: PropTypes.string.isRequired,
		description: PropTypes.string,
		addressMeeting: PropTypes.string.isRequired,
		idService: PropTypes.number.isRequired,
		status: PropTypes.string.isRequired
	}),
	color: PropTypes.string.isRequired,
	showModal: PropTypes.func.isRequired
};
