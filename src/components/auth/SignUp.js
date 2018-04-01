import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Auth } from 'aws-amplify';

class SignUp extends Component{
	constructor(){
		super()
		this.state = {
			username: '',
		    password: '',
		    email: '',
		    phone_number: '',
		    authCode: '',
		    showConfirmation: false
		}
	}

	inputChange(e){
		this.setState({
			[e.target.id]: e.target.value 
		})
	}

	signUp(e){
		e.preventDefault();
		const { username, password, email, phone_number } = this.state;

		Auth.signUp({
			username,
			password,
			attributes: {
				email,
				phone_number
			}
		})
		.then(() => {
			console.log('Successful Sign Up')
			this.setState({ showConfirmation: true })
		})
		.catch(err => console.log('Error Signing Up: ', err ));
	}

	confirmSignUp(e){
		e.preventDefault();
		Auth.confirmSignUp(this.state.username, this.state.authCode)
		.then(() => this.props.history.push('/home'))
		.catch(err => console.log('Error Confirming Signing Up: ', err ));
	}

	render(){
		return(
			<div>
				<h1>Sign Up</h1>
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
							<div className="form-group">
								<label>Email</label>
								<input onChange={this.inputChange.bind(this)} 
								type="email" className="form-control" id="email"/>
							</div>
							<div className="form-group">
								<label>Phone Number</label>
								<input onChange={this.inputChange.bind(this)} 
								type="text" className="form-control" id="phone_number"/>
							</div>
							<button type="submit" className="btn btn-lg btn-primary"
							onClick={this.signUp.bind(this)}>
								Sign Up
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
							onClick={this.confirmSignUp.bind(this)}>
								Confirm Sign Up
							</button>
						</form>
					)
				}
			</div>
		)
	}
}

export default withRouter(SignUp);