import React from 'react'
import PlanetCards from '../PlanetCards'
import { Button, Form } from 'semantic-ui-react'

class SearchPlanet extends React.Component {
	constructor(){
		super()
		this.state = {
			number: '',
			letter: '',
			foundPlanet:[]
		}
	}

	handleChange = (e) => {
		this.setState({
			[e.target.name]: e.target.value
		})
	}

	handleSubmit = async (e) => {
		e.preventDefault()
		const data = {
			name: `Kepler-${this.state.number} ${this.state.letter}`
		}
		console.log(data);
		const url = `${process.env.REACT_APP_API_URL}/api/v1/nasadata/planet`
		const searchedPlanet = await fetch(url, {
			method: 'POST',
			body: JSON.stringify(data),
			credentials: 'include',
			headers: {
		          'Content-Type': 'application/json'
		        }			
		})

		const parsed = await searchedPlanet.json()
		console.log(parsed);
		if (parsed.success){
			this.setState({
				foundPlanet : [parsed.data],
				message: '',
				color: 'red' 
			})	
		} else {
			this.setState({
				message: parsed.message,
				foundPlanet: [],
				
			})
		}
	}


	render(){
		console.log(this.state,"<0------this .state ");
		// responsive: search planet form will display no matter what, and the size is responsive through css
		// when it's iphone planet cards will be block and each one of them will be toggle to show the info
		return(
			<div className='SearchPlanetParent'>
				
				<div className='SearchPlanet'>
					<p>You can search for a planet discovered by the Kepler telescope. Enter the number of the star in the cluster and the letter of the planet!</p>
					<Form onSubmit={this.handleSubmit}>
							<Form.Field>
								<label> number </label>
								<input type='number' value={this.state.number} name='number' onChange={this.handleChange}/>
							</Form.Field>
							<Form.Field>
								<label> letter </label>
								<input type='text' value={this.state.letter} name='letter' onChange={this.handleChange}/>
							</Form.Field>
						<Button>find</Button>
						<p>{this.state.message}</p>
					</Form> 
				</div>

				<div className='Card'> 
					{this.state.foundPlanet? <PlanetCards color={this.state.color} adoptPlanet={this.props.adoptPlanet}randomPlanet={this.state.foundPlanet}/> : null}
				</div>
			</div>
		)
	}
} 


export default SearchPlanet