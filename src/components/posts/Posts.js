import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

import PostItem from './PostItem';

class Posts extends Component{
	
	constructor(){
		super()
		this.state = {
			posts: []
		}
	}

	componentDidMount(){
		this.getPosts()
	}

	getPosts(){
		axios.get('https://jsonplaceholder.typicode.com/posts')
		.then(res => {
			// console.log(res.data)
			this.setState({ posts: res.data })
		})
		.catch(err => console.log(err));
	}

	render(){
		const postItems = this.state.posts.map((post,i) => {
			return(
				<PostItem key={post.id} item={post}/>
			)
		})		

		return(
			<div>
				<h1>Posts</h1>
				<ul className="list-group">
					{postItems}
				</ul>
			</div>
		)
	}
}

export default withRouter(Posts);