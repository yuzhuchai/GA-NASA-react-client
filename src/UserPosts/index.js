import React from 'react'

class UserPosts extends React.Component {
	constructor(){
		super()

	}

	render(){
		return(
			<div className='UserPosts'>
				<h1> here are your posts. </h1>
				<a onClick={this.props.toggleHomePage}> click here to look at some awsome data and post them!</a>
			</div>
		)
	}

}

export default UserPosts