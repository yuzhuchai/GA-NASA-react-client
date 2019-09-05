import React from 'react'
import UserPlanet from '../UserPlanet'
import UserPosts from '../UserPosts'

class UserProfileContainer extends React.Component {
	constructor(){
		super()
		this.state = {
			loggedUser: null,
			otherUser: null,
			planet: null 
		}
	}

	componentDidMount(){
		this.setState({
			loggedUser: this.props.loggedUser
		})
		this.findPlanet()
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

	// planetState = () => {
	// 	this.setState({
	// 		planet:null
	// 	})
	// }

	render(){
		console.log(this.state,'<------state in userprofile ');

		return(
			<div>
				{this.state.planet ? <UserPlanet delete={this.deletePlanet} planet={this.state.planet} loggedUser={this.props.loggedUser}/>: <p>you have no planet, adopt one!</p>}
				<UserPosts />
			</div>
		)
	}
}

export default UserProfileContainer

// left container if for the planet,         right container is for the user posts.

// user can only have one planet at a time user model should contain the planet user adopted as well
// and go back to after log in, if user already have a planet, land the user to the user profile page.
// edit user button should be in the header 
// all the edit form should be a pop-up??????

