import React, { Component } from 'react';

// componentes
import Navbar from './../../components/navbar/Navbar';
import Sidebar from './../../components/sidebar/Sidebar'

class Home extends Component {

	render() {

		return (

			<div>
				<Navbar />
				<Sidebar />
			</div>
		);
	}
}

export default Home;