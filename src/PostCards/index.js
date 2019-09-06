import React from 'react'
import { Card, Image, Button, Form, } from 'semantic-ui-react'

class PostCards  extends React.Component {
	// this is a function displaying a list of posts it will be used for all the places that need to display posts by passing down an array of posts.

	constructor(){
		super()
		this.state={
			comment: ''
		}
	}

	handleChange= (e) => {
		this.setState({
			[e.target.name]: e.target.value
		})
	}

	createComment = async (postid) => {
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
			comment: ''
		})
	}

	render(){

	// console.log(props,'<======postcards');
		const postList = this.props.posts.map((post,i) => {
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
							<Card.Meta><strong><a onClick={this.props.goToUserPage.bind(null, post.user)}>{post.user.username}</a></strong> posted on {post.date}</Card.Meta>
						: 
							<Card.Meta>posted on {post.date}</Card.Meta>
						}
				        
				        <Card.Description>
				        	{subStr}...
				        </Card.Description>
			    	</Card.Content>

			    	<Card.Content extra>
				         <Form onSubmit={this.createComment.bind(null, post._id)}>
				         	<Form.Input label='write some comment' name='comment' value={this.state.comment} onChange={this.handleChange}/>
				       		<Button>submit</Button>
				         </Form>
				         <Button>like</Button>
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