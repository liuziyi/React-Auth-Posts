import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Auth } from 'aws-amplify';

class Settings extends Component{
	render(){
		return(
			<div>
				<h1>Settings</h1>
				<button className="btn btn-lg btn-primary" onClick={() => {
					Auth.signOut()
					.then(() => this.props.history.push('/'))
					.catch(() => console.log('Error signing out'))
				}}>
					Sign Out
				</button>
			</div>
		)
	}
}

export default withRouter(Settings);