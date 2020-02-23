import React, { Component } from 'react'
import { InputGroup, Form, Button } from 'react-bootstrap';

class SearchBarComponent extends Component {

	constructor( props ) {
		super( props );
		this.state = { search: '' };
		this.handleChange = this.handleChange.bind( this );
		this.handleSubmit = this.handleSubmit.bind( this );
	}

	handleChange( event ) {
		this.setState({ search: event.target.value });
	}

	handleSubmit( event ) {
		const value = event.target[0].value;
		this.setState({ search: value });
		console.log( this.state.search );
		event.preventDefault();
	}

	render() {

		return(
			<Form onSubmit={ this.handleSubmit }>
				<InputGroup>
					<Form.Control 
						placeholder="Buscar usuario ..."
						aria-label="search-form"
						onChange={ this.handleChange }
						value={ this.state.search }
						
					/>
					<InputGroup.Append>
						<Button 
							variant="dark" 
							className="m-0"
							type="submit"
						>
							<i className="fas fa-search" />
						</Button>
					</InputGroup.Append>
				</InputGroup>
			</Form>
		);
	}
}

export default SearchBarComponent;