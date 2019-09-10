import React from 'react'
import { Card, Button, Modal, Form, Header, TextArea, Progress } from 'semantic-ui-react'

class UserPlanet extends React.Component {
	constructor(){
		super()
		this.state = {
			// planetStatus: 0,
			planetName:'',
			planetBio:'',
			planet: null,
			showmodal: false
		}
	}


	componentDidMount(){
		this.setState({
			// planetStatus: this.props.planet.status,
			planetName:this.props.planet.name,
			planetBio:this.props.planet.bio,
			planet: this.props.planet 
		})
		// this.props.findPlanet()
	}

	handleSubmit = async (e) => {
		e.preventDefault()
		const data = {
			name: this.state.planetName,
			bio: this.state.planetBio
		}
		const url = `${process.env.REACT_APP_API_URL}/api/v1/planet/${this.state.planet._id}`
		const editPlanetBio = await fetch (url, {
			method: 'PUT',
			credentials: 'include',
			body: JSON.stringify(data),
			headers: {
		          'Content-Type': 'application/json'
		        }		
		})
		console.log(url);
		console.log(editPlanetBio);
		const parsed = await editPlanetBio.json()
		// console.log(parsed,'<-=======edited planet ');
		this.props.updatePlanet(this.state.planetName, this.state.planetBio)
		this.setState({
			showmodal: !this.state.showmodal
		})
		this.props.increasePlanetHappiness()
	}
	
	handleClick = () => {
		this.props.goToUserPage(this.props.loggedUser)

	}

	handleModal= () => {
		this.setState({
			showmodal: !this.state.showmodal
		})
	}

	handleChange = (e) => {
		this.setState({
			[e.target.name]: e.target.value	
		})
	}

	render(){
		// console.log(this.props,'<-======props in userplanet ');
		// console.log(this.state,"<-----this.state in user planet");
		return(
			<div className='UserPlanet'>
				{this.props.user=== this.props.loggedUser ? 
					<h3>here is your baby planet</h3> 
				: 
					<div>
						<h3>here is {this.props.user.username}'s baby planet</h3>
						<a onClick={this.handleClick}>back to your profile page</a>
					</div>
				}
				
				<Card centered>
				{this.state.planet? 
					<Card.Content>
						<Card.Header>{this.props.planet.name}</Card.Header>
						<Card.Meta>
							Your baby planet's happiness:
							<Progress percent={this.props.planetStatus} progress active color='pink'/>
						</Card.Meta>
						<Card.Description>{this.props.planet.bio}</Card.Description>
					</Card.Content>
					:
					null}
					{this.props.user === this.props.loggedUser ? 
						<Card.Content extra>
							<Modal open={this.state.showmodal} onClose={this.handleModal}>
								<Modal.Header> Edit your planet profile</Modal.Header>
								<Modal.Content>
									<Form onSubmit={this.handleSubmit}>
										<Form.Field>
											<label> give your planet a cool name: </label>
											<input type='text' value={this.state.planetName} name='planetName' onChange={this.handleChange}/>
										</Form.Field>
										<Form.Field>
											<label> change the bio: </label>
											<TextArea style={{ minHeight: 200 }} type='text' value={this.state.planetBio} name='planetBio' onChange={this.handleChange}/>
										</Form.Field>
										<Button>submit</Button>
									</Form> 
								</Modal.Content>
							</Modal>
							<Button.Group >
								<Button size='mini' onClick={this.handleModal}>Edit</Button>
						      	<Button size='mini' onClick={this.props.delete}>Delete</Button>
						      	<Button size='mini' onClick={this.props.increasePlanetHappiness.bind()}>play!!</Button>
					      	</Button.Group>
			      		</Card.Content> : null
			      	}
				</Card>
			</div>
		)
	}

}

export default UserPlanet

