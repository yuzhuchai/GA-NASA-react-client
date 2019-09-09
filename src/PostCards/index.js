import React from 'react'
import EditPost from '../EditPost'
import CommentList from '../CommentList'

import { Card, Image, Button, Form, Modal, Comment, Header} from 'semantic-ui-react'

class PostCards  extends React.Component {
	// this is a function displaying a list of posts it will be used for all the places that need to display posts by passing down an array of posts.

	constructor(){
		super()
		this.state={
			comment: '',
			displayfrom: false,
			showmodal: false,
			showEditModal: false,
			editPost: null,
			post: null,
			foundComment:[]
		}
	}

	handleChange= (e) => {
		this.setState({
			[e.target.name]: e.target.value
		})
	}

	updateDeleteComment = (commentId) => {
		const oldComment = this.state.foundComment
		const newComment = oldComment.filter(comment => commentId !== comment._id)		
		this.setState({
			foundComment: newComment
		})
	}

	editComment = async (id) => {
		// console.log(id,'<----- comment id to edit');
	}

	
	updateComment = (comment) => {
		 this.state.foundComment.push(comment)
	}

	findAllComments = async (postId) => {
		const url = `http://localhost:9000/api/v1/comment/post/${postId}`
		const response = await fetch(url,{
			method: 'GET',
			credentials: 'include'
		})
		const parsedResponse = await response.json()
		console.log(parsedResponse,'<------yes, need to see this ');
		this.setState({
			foundComment: [...parsedResponse.data]
		})
	}


	toggleModal = (post) => {
		this.setState({
			showmodal: false,
			showEditModal: true,
			editPost: post,
		})
		// console.log(post._id,'<-----should be differnet');
	}

	handleModal=(post) => {
		this.setState({
			showmodal: !this.state.showmodal,
			post: post,
			showEditModal: false 
		})
		this.findAllComments(post._id)
	}

	displayFrom = () => {
		this.setState({
			displayfrom: !this.state.displayfrom
		})
	}

	deletePostToggle = (postid) => {
		this.props.deletePost(postid)
		this.handleModal()
	}

	closeModal= () => {
		this.setState({
			showmodal: false,
			showEditModal: false 
		})
	}


	render(){
	console.log(this.state,'<---------this is what I wannasee');

	console.log(this.props,'<======postcards');
		const postList = this.props.posts.map((post) => {

			const subStr = post.content.substring(0,50)
			return(
				<Card key={post._id}>
		    		<Card.Content>
				        <Image
				          floated='right'
				          size='mini'
				          src={post.img}
				        />
				        <Card.Header>a message from {post.cat}</Card.Header>
						
						{this.props.loggedUser.username !== post.user.username ?
							<Card.Meta>posted by <strong><a onClick={this.props.goToUserPage.bind(null, post.user)}>{post.user.username}</a></strong> on {post.date}</Card.Meta>
						: 
							<Card.Meta>posted by you on {post.date}</Card.Meta>
						}
				        
				        <Card.Description>
				        	{subStr}...
				        </Card.Description>
			    	</Card.Content>

			    	<Card.Content extra>
			    		<Button onClick={this.handleModal.bind(null,post)}>SHOW POST</Button>
			    		{this.state.post? 
			    		<div>
				    		<Modal open={this.state.showmodal} onClose={this.closeModal}>
				    			<Modal.Content>
				    				<Image size='medium' src={this.state.post.img} floated='left'/>
				    				<p>{this.state.post.content}</p>
				    			</Modal.Content>
				    			<Modal.Description>

				    				<Comment.Group>
					    				<Header as='h3' dividing>
									      Comments
									    </Header>
				    					<CommentList 
				    						editComment={this.editComment} 
				    						loggedUser={this.props.loggedUser}
				    						foundComment={this.state.foundComment}
				    						createComment={this.createComment}
				    						post={this.state.post}
				    						updateComment={this.updateComment}
				    						updateDeleteComment={this.updateDeleteComment}
				    						goToUserPage={this.props.goToUserPage}
				    						/>
							        	
							        	<div>
				    						{this.props.loggedUser._id === this.state.post.user._id?
				    						<div>
					    						<Button onClick={this.deletePostToggle.bind(null, this.state.post.
					    							_id)}>DELETE POST</Button> 
					    						<Button onClick={this.toggleModal.bind(null, this.state.post)}>EDIT POST</Button> 
				    						</div> : 
				    						<Button onClick={this.closeModal}>LIKE</Button>}
				    					</div>
				    				</Comment.Group>
				    			</Modal.Description>
				    		</Modal>
				    		</div> : null}

			    		<Modal open={this.state.showEditModal} onClose={this.closeModal}>
			    			<Modal.Content>
			    				<EditPost editPost={this.state.editPost} updateUserPosts={this.props.updateUserPosts} handleEditModal={this.closeModal}/>
			    			</Modal.Content>
			    		</Modal>

				    </Card.Content>
			    </Card>
			)
		})

		return(
			<div className='PostCards'>
				{this.props.loggedUser ? 
					<Card.Group>
						{postList}
					</Card.Group>
				:
					null
				}	
			</div>
		)
	}
}

export default PostCards