import React from 'react'
import { Comment } from 'semantic-ui-react'

class CommentList extends React.Component {
	constructor(){
		super()
		this.state={

		}
	}




	render(){

		const commentList = this.props.foundComment.map(comment => {
				return (
					<Comment key={comment._id}>
						<Comment.Content>
							<a><Comment.Author>{comment.user.username}</Comment.Author></a>
							<Comment.Metadata>on {comment.date}</Comment.Metadata>
							<Comment.Text>{comment.content}</Comment.Text>
							{this.props.loggedUser.username === comment.user.username ? 
								<Comment.Actions>
									<Comment.Action onClick={this.props.deleteComment.bind(null, comment._id)}>delete</Comment.Action>
									<Comment.Action onClick={this.props.editComment.bind(null, comment._id)}>edit</Comment.Action>
								</Comment.Actions>
							:
							null 
							}
						</Comment.Content>
					</Comment>
				)
			})

		return(
			<div>
				{this.props.foundComment?
				<div> 
					{commentList}
				</div>
				: null
				}
			</div>
		)
	}

}


export default CommentList