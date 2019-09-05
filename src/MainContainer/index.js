import React from 'react'
import UserPlanet from '../UserPlanet'
import UserPosts from '../UserPosts'

class MainContainer extends React.Component {
	constructor(){
		super()
		this.state = {
			loggedUser: null,
			otherUser: null,
			planet: null,
			planetStatus: 0
		}
	}

	componentDidMount(){
		this.setState({
			loggedUser: this.props.loggedUser
		})
		this.findPlanet()
		this.timer = setInterval(() => {
			this.decreasePlanetHappiness()
		}, 4000)
	}

	componentWillUnmount() {
    	clearInterval(this.timer);
  	}


	findPlanet = async () => {
		const url = `http://localhost:9000/api/v1/planet/${this.props.loggedUser._id}`
		const findPlanet = await fetch(url, {
			method: 'GET',
			credentials: 'include',
		})
		console.log(url);
		const parsed = await findPlanet.json()
		// console.log(parsed,'<------parsed data of uer planet');
		const planet = parsed.data[0]
		this.setState({
			planet: planet,
			planetStatus: planet.status
		})
	}


	deletePlanet = async () => {
		console.log(this.state.planet._id);
		const url = `http://localhost:9000/api/v1/planet/${this.state.planet._id}`
		const deletePlanet = await fetch(url, {
			method: 'DELETE',
			credentials: 'include'
		})
		console.log(deletePlanet);
		this.props.togglePlanetContainer()
		this.planetState()
	}

	planetState = () => {
		this.setState({
			planet:null
		})
	}

	decreasePlanetHappiness = () => {
		this.setState({
			planetStatus: (this.state.planetStatus-1)
		})
		this.props.changePlanetStatus(this.state.planetStatus-1, this.state.planet._id)
	}

	increasePlanetHappiness = () => {
		this.setState({
			planetStatus: (this.state.planetStatus+5)
		})
		this.props.changePlanetStatus(this.state.planetStatus+5)
	}

	render(){
		// console.log(this.state,'<------state in userprofile ');

		return(
			<div>
				{this.state.planet ? <UserPlanet increasePlanetHappiness={this.increasePlanetHappiness} delete={this.deletePlanet} planet={this.state.planet} loggedUser={this.props.loggedUser} planetStatus={this.state.planetStatus}/>: <a onClick={this.props.togglePlanetContainer}>you have no planet, adopt one!</a>}
				<UserPosts />
			</div>
		)
	}
}

export default MainContainer

// left container if for the planet,         right container is for the user posts.

// user can only have one planet at a time user model should contain the planet user adopted as well
// and go back to after log in, if user already have a planet, land the user to the user profile page.
// edit user button should be in the header 
// all the edit form should be a pop-up??????
