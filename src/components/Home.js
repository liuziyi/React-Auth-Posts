import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Auth } from 'aws-amplify';

class Home extends Component{
	constructor(){
		super();
		this.state = {
			username: ''
		}
	}

	componentDidMount(){
		Auth.currentUserInfo()
		.then(data => {
			console.log('DATA: ', data)
			this.setState({ username: data.username })
		})
		.catch(err => console.log('error: ', err))
	}

	render(){
		return(
			<div>
				<h1>Welcome {this.state.username}</h1>
			</div>
		)
	}
}

export default withRouter(Home);