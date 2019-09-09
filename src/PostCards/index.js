import React from 'react'
import EditPost from '../EditPost'
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
			editPost: null
		}
	}

	handleChange= (e) => {
		this.setState({
			[e.target.name]: e.target.value
		})
	}

	deleteComment = async (id) => {
		// console.log(id,'<-----comment id to delete');
	}

	editComment = async (id) => {
		// console.log(id,'<----- comment id to edit');
	}

	createComment = async (postid,e) => {
		e.preventDefault()
		console.log(postid,"<-----postid");
		console.log(this.state.comment);
		const data = {content: this.state.comment}
		const url =	`http://localhost:9000/api/v1/comment/${postid}`
		const createComment = await fetch(url, {
			method: 'POST',
			body: JSON.stringify(data),
			credentials: 'include',
			headers: {
		        'Content-Type': 'application/json'
		    }
		})
		const parsed = await createComment.json()
		// console.log(parsed,'>>>>>>>>> better see some comments');
		this.setState({
			comment: '',
			showmodal: false
		})

		// need to give this commet back to the state so it can display 
	}

	toggleModal = (post) => {
		this.setState({
			showmodal: false,
			showEditModal: true,
			editPost: post,
		})
	}
	handleEditModal= () => {
		this.setState({
			showmodal: true,
			showEditModal: false,
		})
	}

	handleModal=() => {
		this.setState({
			showmodal: !this.state.showmodal,
		})
	}
	displayFrom = () => {
		this.setState({
			displayfrom: !this.state.displayfrom
		})
	}
	render(){

	// console.log(this.props,'<======postcards');
		const postList = this.props.posts.map((post,i) => {
			const commentList = post.comments.map(comment => {
				return (
					<Comment key={comment._id}>
						<Comment.Content>
							<Comment.Author as='a'>{comment.user.username}</Comment.Author>
							<Comment.Metadata>on {comment.date}</Comment.Metadata>
							<Comment.Text>{comment.content}</Comment.Text>
							{this.props.loggedUser.username === comment.user.username ? 
								<Comment.Actions>
									<Comment.Action onClick={this.deleteComment.bind(null, comment._id)}>delete</Comment.Action>
									<Comment.Action onClick={this.editComment.bind(null, comment._id)}>edit</Comment.Action>
								</Comment.Actions>
							:
							null 
							}
						</Comment.Content>
					</Comment>
				)
			})
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
			    		
			    		<Modal trigger={<Button onClick={this.handleModal}>SHOW POST</Button>} open={this.state.showmodal} onClose={this.handleModal}>
			    			<Modal.Content>
			    				<Image size='medium' src={post.img} floated='left'/>
			    				<p>{post.content}</p>
			    			</Modal.Content>
			    			<Modal.Description>

			    				<Comment.Group>
				    				<Header as='h3' dividing>
								      Comments
								    </Header>
			    					{commentList}

					    			<Form onSubmit={this.createComment.bind(null, post._id)}>
						         		<Form.Input label='write some comment' name='comment' value={this.state.comment} onChange={this.handleChange}/>
						       			<Button>submit</Button>
						        	</Form>
						        	
						        	<div>
			    						{this.props.loggedUser.username === post.user.username? 
			    						<Button onClick={this.toggleModal.bind(null, post)}>EDIT POST</Button> : 
			    						<Button onClick={this.handleModal}>LIKE</Button>}
			    					</div>
			    				</Comment.Group>
			    			</Modal.Description>
			    		</Modal>

			    		<Modal open={this.state.showEditModal} onClose={this.handleEditModal}>
			    			<Modal.Content>
			    				<EditPost editPost={this.state.editPost} updateUserPosts={this.props.updateUserPosts}/>
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