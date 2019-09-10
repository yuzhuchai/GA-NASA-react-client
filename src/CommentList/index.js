import React from 'react'
import { Comment, Form, Button } from 'semantic-ui-react'

class CommentList extends React.Component {
	constructor(){
		super()
		this.state={
			comment:'',

		}
	}

	handleChange = (e) => {
		this.setState({
			[e.target.name]: e.target.value
		})
	}


	handleSubmit = async (e) => {
		e.preventDefault()
		// this.props.createComment.bind(null, this.props.post._id)
		const data = {content: this.state.comment}
		const url =	`${process.env.REACT_APP_API_URL}/api/v1/comment/${this.props.post._id}`
		const createComment = await fetch(url, {
			method: 'POST',
			body: JSON.stringify(data),
			credentials: 'include',
			headers: {
		        'Content-Type': 'application/json'
		    }
		})
		const parsed = await createComment.json()
		this.props.updateComment(parsed.data)
		this.setState({
			comment: '',
			// showmodal: false,
		})
		console.log(parsed,'<000000create the commetns');
	}


	deleteComment = async (commentId) => {
		const url = `${process.env.REACT_APP_API_URL}/api/v1/comment/${commentId}`
		console.log(url);
		const deleteResponse = await fetch(url,{
			method: 'DELETE',
			credentials: 'include'
		})

		const parsed = await deleteResponse.json();
		console.log(parsed);
		this.props.updateDeleteComment(commentId)
	}


	render(){
		console.log(this.props,'<------i wanna se the comments');
		const commentList = this.props.foundComment.map((comment) => {
				return (
					<Comment style={{border:'1px lightgrey solid', padding:'10px', borderRadius:'20px'}} key={comment._id}>
						<Comment.Content>

							{this.props.loggedUser.username !== comment.user.username ? 

								<Comment.Author>
									<a onClick={this.props.goToUserPage.bind(null, comment.user)}>{comment.user.username}</a> 
								</Comment.Author>
								:
							
								<Comment.Author>you</Comment.Author>
							}
							<Comment.Metadata>on {comment.date}</Comment.Metadata>
							<Comment.Text>{comment.content}</Comment.Text>
							{this.props.loggedUser.username === comment.user.username ? 
								<Comment.Actions>
									<Comment.Action  style={{color:'pink', fontSize:'12px', textDecoration:'none'}}onClick={this.deleteComment.bind(null,comment._id)}>delete</Comment.Action>
								</Comment.Actions>
							:
							null 
							}
						</Comment.Content>
					</Comment>
				)
			})

		return(
			<div style={{padding: '10px'}}>
				<div>
					{this.props.foundComment?
						<div> 
							{commentList}
						</div>
					: null
					}
				</div>
				<Form onSubmit={this.handleSubmit} style={{margin: '10px auto'}}>
					<Form.Input label='write some comment' name='comment' value={this.state.comment} onChange={this.handleChange}/>
					<Button>submit</Button>
				</Form>
			</div>
		)
	}

}


export default CommentList