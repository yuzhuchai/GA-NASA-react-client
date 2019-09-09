import React from 'react'
import { Card, Button } from 'semantic-ui-react'

function PlanetCards (props){
	console.log(props,'<-----props in PlanetCard');
	const planetCards = props.randomPlanet.map((planet, i) => {
		return(
			<Card key={i} >
				<Card.Content>
					<Card.Header>{planet.name}</Card.Header>
					<Card.Description>{planet.bio}</Card.Description>
				</Card.Content>
				<Card.Content extra>
			      	<Button onClick={props.adoptPlanet.bind(null, planet.name, planet.bio)}>Adopt</Button>
	      		</Card.Content>
			</Card>
		)
	})
	const len = props.randomPlanet.length 
	return (
		    <Card.Group centered itemsPerRow={len}>
		    	{planetCards}
		    </Card.Group>
	)
}

export default PlanetCards