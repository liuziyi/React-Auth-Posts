import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import axios from 'axios';

class PostDetails extends Component{
	
	constructor(props){
		super(props);
		this.state = {
			details: ''
		}
	}

	componentWillMount(){
		this.getPost();
	}

	getPost(){
		let postId = this.props.match.params.id;
		axios.get(`https://jsonplaceholder.typicode.com/posts/${postId}`)
		.then(res => {
			this.setState({details: res.data })
		})
		.catch(err => console.log(err));
	}

	render(){
		return(
			<div>
				<Link to="/home">Back</Link>
				<h1>Post {this.props.match.params.id}</h1>
				<div className="card">
					<div className="card-body">
						<h5 className="card-title">{this.state.details.title}</h5>
						<p className="card-text">{this.state.details.body}</p>
						<p className="card-text"><small className="text-muted">{this.state.details.userId}</small></p>
					</div>
				</div>
			</div>
		)
	}
}

export default withRouter(PostDetails);