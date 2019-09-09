import React from 'react'
import PostCards from '../PostCards'

class UserPosts extends React.Component {
	constructor(){
		super()
		this.state={
			user: null,
			loggedUser: null
		}
	}


	render(){

		// console.log(this.props,'<========props in the user possts container');
		return(
			<div className='UserPosts'>
			{this.props.userPosts? 
				<div>
					{this.props.user === this.props.loggedUser? 
						<h1> here are your posts. </h1>
					:
						<h1> here are {this.props.user.username}'s posts.</h1>
					}
					<PostCards 
						deletePost={this.props.deletePost} 
						updateUserPosts={this.props.updateUserPosts} 
						posts={this.props.userPosts} 
						user={this.props.user} 
						loggedUser={this.props.loggedUser} 
						goToUserPage={this.props.goToUserPage}/> 
				</div>
			: null}
			</div>
		)
	}

}

export default UserPosts