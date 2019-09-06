import React from 'react'
import PostCards from '../PostCards'

class FeaturedPosts extends React.Component {

	constructor(){
		super()
		this.state = {
			allPosts: []
		}
	}
	componentDidMount(){
		this.findFeaturedPosts()
	}

	findFeaturedPosts = async () => {
	// this function will find all the posts and select couple of them randomly. set state and then pass them down as props to the postCards
		const url = `http://localhost:9000/api/v1/post`
		const findAllPosts = await fetch(url,{
			method: 'GET',
			credentials: 'include'
		})
		const parsed = await findAllPosts.json()
		// console.log(parsed,'<-------found all the posts');
		this.setState({
			allPosts: parsed.data
		})

	}

	render(){
		console.log(this.state);
		return(
			<div>
			{this.state.allPosts.length? <PostCards loggedUser={this.props.loggedUser} goToUserPage={this.props.goToUserPage} posts={this.state.allPosts}/> : null }
				

			</div>
		)
	}

}

export default FeaturedPosts





	