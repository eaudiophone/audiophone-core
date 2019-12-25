import React, { Component } from 'react';
import Navbar from './../../components/navbar/Navbar';
import Sidebar from './../../components/sidebar/Sidebar'

class Home extends Component {

	render() {

		return (

			<div>
				<Navbar />
				<Sidebar admin={ false } />
			</div>
		);
	}
}

export default Home;