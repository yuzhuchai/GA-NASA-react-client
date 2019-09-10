import React from 'react'
import { Card, Button, Responsive, Container, Modal } from 'semantic-ui-react'

class PlanetCards extends React.Component{
	// console.log(props,'<-----props in PlanetCard');
	constructor(){
		super()
		this.state={
			bio:'',
			open: false,
		}
	}

	showPlanetInfo=(bio) => {
		this.setState({
			bio:bio
		})
		console.log(bio);
		this.handleModal()
	}

	handleModal = () => {
		this.setState({
			open: !this.state.open
		})
	}

	render(){
		const planetCards = this.props.randomPlanet.map((planet, i) => {
			const sub = planet.bio.substring(0,40)
			// console.log(planet.bio);
			// console.log(sub);
			console.log(this.props,'<-----props');
			return(
				<Card key={i} color={this.props.color}>
					<Card.Content>
						<Card.Header>{planet.name}</Card.Header>
						<Card.Description>
							<Responsive minWidth={640} >
								{planet.bio}
							</Responsive>
							<Responsive as={Container} maxWidth={640}> 
								{sub} ...
							</Responsive>
						</Card.Description>
					</Card.Content>
					<Card.Content extra>
				      	<Button onClick={this.props.adoptPlanet.bind(null, planet.name, planet.bio)}>Adopt</Button>
				      	<Responsive as={Button} maxWidth={640} onClick={this.showPlanetInfo.bind(null, planet.bio)}>
				      		expand
				      	</Responsive>
		      		</Card.Content>
				</Card>
			)
		})
		const len = this.props.randomPlanet.length 
		const open = this.state.open
		return (
			<div>
					<Responsive as={Container} minWidth={640}> 
					    <Card.Group centered itemsPerRow={len}>
					    	{planetCards}
					    </Card.Group>
					</Responsive>

					<Responsive as={Container} maxWidth={640}>
						<Card.Group centered itemsPerRow={1}>
							{planetCards}
						</Card.Group>
						<Modal
							open={open}
							onOpen={this.handleModal}
							onClose={this.handleModal}
						>
							<p>{this.state.bio}</p>
						</Modal>
					</Responsive>
				
			</div>
		)
	}
}

export default PlanetCards