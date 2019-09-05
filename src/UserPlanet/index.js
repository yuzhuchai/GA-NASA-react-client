import React from 'react'
import { Card, Button } from 'semantic-ui-react'

class UserPlanet extends React.Component {
	constructor(){
		super()
		this.state = {
			planetStatus: 0
		}
	}


	componentDidMount(){
		this.setState({
			planetStatus: this.props.planet.status
		})
		// this.props.findPlanet()
	}

	
	

	render(){
		console.log(this.props,'<-======props in userplanet ');
		console.log(this.state,"<-----this.state in user planet");
		return(
			<div className='UserPlanet'>
				<h3>here is your baby planet</h3>
				<Card>
					<Card.Content>
						<Card.Header>{this.props.planet.name}</Card.Header>
						<Card.Meta>Your planet happiness: {this.state.planetStatus}</Card.Meta>
						<Card.Description>{this.props.planet.bio}</Card.Description>
					</Card.Content>
					<Card.Content extra>
				      	<Button>Edit</Button>
				      	<Button onClick={this.props.delete}>Delete</Button>
		      		</Card.Content>
				</Card>
			</div>
		)
	}

}

export default UserPlanet

