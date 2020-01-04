import React, { Component } from 'react';
import Navbar from './../../components/navbar/Navbar';
import Sidebar from './../../components/sidebar/Sidebar'

class Home extends Component {

	render() {

		return (

			<div className="container-fliud">
				
				<Navbar />

				<div className="row">

					<div className="col-3 d-none d-md-block">
						<Sidebar admin="ADMIN_ROLE" />
					</div>

					<div className="col-9">
						{ /* Content here */ }
					</div>
				</div>
			</div>
		);
	}
}

export default Home;