import React from 'react'
import {Form, Button, TextArea} from 'semantic-ui-react'

class EditPost extends React.Component{
	constructor(){
		super()
		this.state={
			post: null
		}
	}

	componentDidMount(){
		this.setState({
			post: this.props.editPost
		})
	}

	handleChange = (e) => {
		this.setState({
			post:{
				...this.state.post,
				content: e.target.value
			}
		})
	}

	handleSubmit = async (e) => {
		// this function will call the backend api and update the post, at the same time, lift the state up to update the post in the front end 
		e.preventDefault()
		const data = {content: this.state.post.content}
		// console.log(data, '<------this is the data to update');
		// console.log(this.state.post._id,'<-------this si the post id');
		const url = `${process.env.REACT_APP_API_URL}/api/v1/post/${this.state.post._id}`
		const response = await fetch(url, {
			method: 'PUT',
			credentials: 'include',
			body: JSON.stringify(data),
			headers: {
		          'Content-Type': 'application/json'
		        }
		})
		const parsed = await response.json()
		// console.log(parsed, '<------this is the new post data');
		this.props.updateUserPosts(this.state.post)
		this.props.handleEditModal()
	}

	render(){
		// console.log(this.state.post,'<------post to edit');
		return(
			<div>
				{this.state.post? 
					<Form onSubmit={this.handleSubmit}>
						<TextArea type='text' value={this.state.post.content} onChange={this.handleChange} />
						<Button> submit </Button>
					</Form>
				: null}
			</div>
		)
	}
}


export default EditPost