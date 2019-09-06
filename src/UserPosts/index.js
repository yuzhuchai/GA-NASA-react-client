import React from 'react'

class UserPosts extends React.Component {
	constructor(){
		super()
		this.state={
			user: null,
			loggedUser: null
		}

	}
	componentDidMount(){
		this.setState({
			user: this.props.user,
			loggedUser: this.props.loggedUser
		})
	}


	render(){
		console.log(this.state,'<========props in the user possts container');
		return(
			<div className='UserPosts'>
				<h1> here are your posts. </h1>
				<a onClick={this.props.toggleHomePage}> click here to look at some awsome data and post them!</a>
			</div>
		)
	}

}

export default UserPosts