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
		// this.getPosts(this.props.allposts)
		console.log(this.props ,'<------this.props');
	}

	getPosts = (allposts) => {
		const posts = allposts.filter(post => post.user === this.props.loggedUser)
		console.log(posts);
	}

	render(){

		console.log(this.props,'<========props in the user possts container');
		return(
			<div className='UserPosts'>
				<h1> here are your posts. </h1>
				<a onClick={this.props.toggleHomePage}> click here to look at some awsome data and post them!</a>
			</div>
		)
	}

}

export default UserPosts