import React from 'react'
import { Card, Button } from 'semantic-ui-react'

function PlanetCards (props){
	console.log(props,'<-----props in PlanetCard');
	const planetCards = props.randomPlanet.map((planet, i) => {
		return(
			<Card key={i}>
				<Card.Content>
					<Card.Header>{planet.name}</Card.Header>
					<Card.Description>{planet.bio}</Card.Description>
				</Card.Content>
				<Card.Content extra>
			      	<Button>Adopt</Button>
	      		</Card.Content>
			</Card>
		)
	})

	return (
	    <Card.Group itemsPerRow={3}>
	    	{planetCards}
	    </Card.Group>
	)
}

export default PlanetCards