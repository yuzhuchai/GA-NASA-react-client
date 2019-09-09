import React from 'react'
import {Form, Button} from 'semantic-ui-react'

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

	render(){
		console.log(this.state.post,'<------post to edit');
		return(
			<div>
				{this.state.post? 
					<Form>
						<input type='text' value={this.state.post.content} onChange={this.handleChange} />
						<Button> submit </Button>
					</Form>
				: null}
			</div>
		)
	}
}


export default EditPost