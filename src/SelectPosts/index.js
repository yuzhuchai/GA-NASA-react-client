import React from 'react'
import { Button, Card, Image } from 'semantic-ui-react'
class SelectPosts extends React.Component {
	constructor(){
		super()
		this.state={
			content: '',
			imgUrl:'',
			cat:''
		}
	}

	componentDidMount(){
		this.samplePost()
	}

	samplePost = async () => {
		const url = `http://localhost:9000/api/v1/nasadata/${this.props.cat}`
		console.log(url);
		const response = await fetch(url, {
			method: 'GET',
			credentials: 'include'
		})
		// console.log(response,'<------responsne of the data');
		const parsed = await response.json()
		// console.log(parsed,'<----parsed response i wanna seee!!!!');
		// parsed.data.imgUrl is the img
		//.content is the content 
		this.setState({
			content: parsed.data.content,
			imgUrl: parsed.data.imgUrl,
			cat: parsed.data.cat
		})

	}


	savePostToUser = async () => {
		const url = `http://localhost:9000/api/v1/post`
		const data = {
			content: this.state.content,
			imgUrl: this.state.imgUrl,
			cat: this.state.cat
		}
		const createdPostReaponse = await fetch(url,{
			method: 'POST',
			credentials: 'include',
			body: JSON.stringify(data),
			headers: {
		          'Content-Type': 'application/json'
		   	}	
		})
		const parsed = await createdPostReaponse.json()
		console.log(parsed,'<-----createdpostresponse');
	}

	render(){
		// console.log(this.state,'<-------state in select posts');
		return(
			<div>
				<Card fluid>
				    <Image src={this.state.imgUrl} wrapped ui={false} />
				    <Card.Content>
				      <Card.Header>a lovely post from {this.state.cat}</Card.Header>
				      <Card.Description>
				      	{this.state.content}
				      </Card.Description>
				    </Card.Content>
				    <Card.Content extra>
						<Button onClick={this.samplePost}>shuffle</Button>
						<Button onClick={this.savePostToUser}>Post</Button>
				    </Card.Content>
  				</Card>
			</div>
		)
	}
}

export default SelectPosts