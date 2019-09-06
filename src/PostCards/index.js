import React from 'react'
import { Card, Image, Button } from 'semantic-ui-react'

function PostCards (props){
	// this is a function displaying a list of posts it will be used for all the places that need to display posts by passing down an array of posts. 
	console.log(props,'<======postcards');
	const postList = props.posts.map(post => {
		const subStr = post.content.substring(0,50)
		return(
			<Card key={post._id}>
		      <Card.Content>
		        <Image
		          floated='right'
		          size='mini'
		          src={post.imgUrl}
		        />
		        <Card.Header>a message from {post.cat}</Card.Header>
		        <Card.Meta>posted by <a>{post.user.username}</a> on {post.date}</Card.Meta>
		        <Card.Description>
		          {subStr}
		        </Card.Description>
		      </Card.Content>
		      <Card.Content extra>
		        <div className='ui two buttons'>
		          <Button basic color='red'>
		            like 
		          </Button>
		          <Button basic color='blue'>
		            comment 
		          </Button>
		        </div>
		      </Card.Content>
		    </Card>
		)
	})


	return(
		<div className='PostCards'>
			<Card.Group>
				{postList}
			</Card.Group>
		</div>
	)
}

export default PostCards