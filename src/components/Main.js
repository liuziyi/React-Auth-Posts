import React from 'react';
import { Switch, Route } from 'react-router-dom';

import PrivateRoute from './PrivateRoute';
import Landing from './Landing';
import SignUp from './auth/SignUp';
import SignIn from './auth/SignIn';
import Home from './Home';
import Settings from './Settings';
import Posts from './posts/Posts';
import PostDetails from './posts/PostDetails';

const Main = () => (
	<main>
		<Switch>
			<Route exact path='/' component={Landing}/>
			<Route exact path="/signup" component={SignUp}/>
			<Route exact path="/signin" component={SignIn}/>
			<PrivateRoute exact path='/home' component={Home}/>
			<PrivateRoute exact path='/posts' component={Posts}/>
			<PrivateRoute exact path='/posts/:id' component={PostDetails}/>
			<PrivateRoute exact path="/settings" component={Settings}/>
		</Switch>
	</main>
)

export default Main;