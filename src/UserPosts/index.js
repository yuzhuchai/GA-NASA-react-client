import React from 'react'
import PostCards from '../PostCards'
import { Tab } from 'semantic-ui-react'

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
			const panes = [
			{menuItem: 'Posts', render: () =>
					<Tab.Pane>
						<PostCards 
							deletePost={this.props.deletePost} 
							updateUserPosts={this.props.updateUserPosts} 
							posts={this.props.userPosts} 
							user={this.props.user} 
							loggedUser={this.props.loggedUser} 
							goToUserPage={this.props.goToUserPage}
						/> 
					</Tab.Pane>
			},
			{menuItem: 'Liked', render:() =>
					<Tab.Pane>
						<PostCards
							deletePost={this.props.deletePost} 
							updateUserPosts={this.props.updateUserPosts} 
							posts={this.props.likedPosts} 
							user={this.props.user}
							loggedUser={this.props.loggedUser} 
							goToUserPage={this.props.goToUserPage}
						/>

					</Tab.Pane>
			}]
		return(
			<div className='UserPosts'>
			{this.props.userPosts && this.props.likedPosts? 
				<div>
					{this.props.user === this.props.loggedUser? 
						<h1> here are your posts. </h1>
					:
						<h1> here are {this.props.user.username}'s posts.</h1>
					}
				
					<Tab panes={panes} />
					
				</div>
			: null}
			</div>
		)
	}

}

export default UserPosts