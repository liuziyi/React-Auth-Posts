import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Auth } from 'aws-amplify';

class SignIn extends Component{
	constructor(){
		super();
		this.state = {
			username: '',
			password: '',
			showConfirmation: false,
			user: {},
			authCode: ''
		}
	}

	inputChange(e){
		this.setState({
			[e.target.id]: e.target.value
		})
	}

	signIn(e){
		e.preventDefault();
		Auth.signIn(this.state.username, this.state.password)
		.then(user => {
			console.log('USER ', user)
			this.setState({ user: user, showConfirmation: true })
		})
		.catch(err => console.log('Error Signing In: ', err))
	}

	confirmSignIn(e){
		e.preventDefault();
		Auth.confirmSignIn(this.state.user, this.state.authCode)
		.then(userData => {
			console.log('userData: ', userData)
			this.props.history.push('/home')
		})
		.catch(err => console.log('Error Confirming Sign In: ', err ))
	}

	render(){
		return(
			<div>
				<h1>Sign In</h1>
				{
					!this.state.showConfirmation && (
						<form>
							<div className="form-group">
								<label>Username</label>
		    					<input onChange={this.inputChange.bind(this)} 
		    					type="text" className="form-control" id="username"/>
							</div>
							<div className="form-group">
								<label>Password</label>
		    					<input onChange={this.inputChange.bind(this)} 
		    					type="password" className="form-control" id="password"/>
							</div>
							<button type="submit" className="btn btn-lg btn-primary"
							onClick={this.signIn.bind(this)}>
								Sign In 
							</button>
						</form>
					)
				}
				{
					this.state.showConfirmation && (
						<form>
							<div className="form-group">
								<label>Authentication Code</label>
		    					<input onChange={this.inputChange.bind(this)} 
		    					type="text" className="form-control" id="authCode"/>
							</div>
							<button type="submit" className="btn btn-lg btn-primary"
							onClick={this.confirmSignIn.bind(this)}>
								Confirm Login
							</button>
						</form>
					)
				}
			</div>
		)
	}
}

export default withRouter(SignIn);