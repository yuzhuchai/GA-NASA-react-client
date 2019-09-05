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
		const url = `http://localhost:9000/api/v1/planet/find`
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
				message: ''
			})	
		} else {
			this.setState({
				message: parsed.message,
				foundPlanet: []
			})
		}
	}


	render(){
		console.log(this.state,"<0------this .state ");
		return(
			<div className='SearchPlanetParent'>
				<div className='SearchPlanet'>
					<p>some intro about the kepler planets, need more research.</p>
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
					{this.state.foundPlanet? <PlanetCards adoptPlanet={this.props.adoptPlanet}randomPlanet={this.state.foundPlanet}/> : null}
				</div>
			</div>
		)
	}
} 


export default SearchPlanet