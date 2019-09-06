import React from 'react'
import { Card, Image, Button, Form, Modal } from 'semantic-ui-react'

class PostCards  extends React.Component {
	// this is a function displaying a list of posts it will be used for all the places that need to display posts by passing down an array of posts.

	constructor(){
		super()
		this.state={
			comment: '',
			displayfrom: false,
			showmodal: false
		}
	}

	handleChange= (e) => {
		this.setState({
			[e.target.name]: e.target.value
		})
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
		console.log(parsed,'>>>>>>>>> better see some comments');
		this.setState({
			comment: '',
			showmodal: false
		})

		// need to give this commet back to the state so it can display 
	}

	handleModal=() => {
		this.setState({
			showmodal: !this.state.showmodal
		})
	}
	displayFrom = () => {
		this.setState({
			displayfrom: !this.state.displayfrom
		})
	}
	render(){

	// console.log(props,'<======postcards');
		const postList = this.props.posts.map((post,i) => {
			const commentList = post.comments.map(comment => {
				return (
					<p key={comment._id}>{comment.content} on {comment.date} by {comment.user.username}</p>
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
			    				<Image size='medium' src={post.img} spaced='left' floated='left'/>
			    				<p>{post.content}</p>
			    			</Modal.Content>
			    			<Modal.Description>
			    				{commentList}
			    			</Modal.Description>
			    			<Form onSubmit={this.createComment.bind(null, post._id)}>
				         		<Form.Input label='write some comment' name='comment' value={this.state.comment} onChange={this.handleChange}/>
				       			<Button>submit</Button>
				        	</Form>
				        	<Button onClick={this.handleModal}>LIKE</Button>
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