import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { Auth } from 'aws-amplify';

class Navbar extends Component{
	constructor(){
		super();
		this.state = {
			isAuthenticated: false
		}
	}

	componentDidMount(){
		this.authenticate()
		this.unlisten = this.props.history.listen(() => {
			Auth.currentAuthenticatedUser()
			.then(user => console.log('user: ', user))
			.catch(() => {
				if(this.state.isAuthenticated){
					this.setState({ isAuthenticated: false })
				}
			})
		})
	}

	componentWillUnmount(){
		this.unlisten()
	}

	authenticate(){
		Auth.currentAuthenticatedUser()
		.then(() => {
			this.setState({ isAuthenticated: true })
		})
		.catch(err => console.log('Error ', err))
	}

	render(){
		return(
			<div>
				{
					!this.state.isAuthenticated && (
						<div className="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom box-shadow">
							<h5 className="my-0 mr-md-auto font-weight-normal">
								<Link className="p-2 text-dark" to="/">POSTS AUTH</Link>
							</h5>
							<nav className="my-2 my-md-0 mr-md-3">
								<Link className="p-2 text-dark" to="/">Landing</Link>
							</nav>
							<Link className="btn btn-outline-primary" to="/signup">Sign Up</Link>
							<Link className="btn btn-outline-primary" to="/signin">Sign In</Link>
						</div>
					)
				}
				{
					this.state.isAuthenticated && (
						<div className="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom box-shadow">
							<h5 className="my-0 mr-md-auto font-weight-normal">
								<Link className="p-2 text-dark" to="/home">POSTS AUTH</Link>
							</h5>
							<nav className="my-2 my-md-0 mr-md-3">
								<Link className="p-2 text-dark" to="/posts">Posts</Link>
							</nav>
							<Link className="btn btn-outline-primary" to="/settings">Settings</Link>
						</div>
					)
				}
			</div>
		)
	}
}

export default withRouter(Navbar);