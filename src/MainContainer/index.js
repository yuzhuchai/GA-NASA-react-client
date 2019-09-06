import React from 'react'
import UserPlanet from '../UserPlanet'
import UserPosts from '../UserPosts'
import DataCategory from '../DataCategory'
import PostCards from '../PostCards'
import { Tab } from 'semantic-ui-react'

class MainContainer extends React.Component {
	constructor(){
		super()
		this.state = {
			loggedUser: null,
			user: null,
			planet: null,
			planetStatus: 0,
			showHomePage: false,
			allPosts:[],
			userPost:[]
		}
	}

	componentDidMount(){
		this.setState({
			loggedUser: this.props.loggedUser,
			user: this.props.user
		})
		this.findAllPosts()
		this.findPlanetAndPosts(this.props.user)
		this.timer = setInterval(() => {
			this.decreasePlanetHappiness()
		}, 4000)

	}

	componentWillUnmount() {
    	clearInterval(this.timer);
  	}


  	findAllPosts = async () => {
	// this function will find all the posts and select couple of them randomly. set state and then pass them down as props to the postCards
		const url = `http://localhost:9000/api/v1/post`
		const findAllPosts = await fetch(url,{
			method: 'GET',
			credentials: 'include'
		})
		const parsed = await findAllPosts.json()
		// console.log(parsed,'<-------found all the posts');
		this.setState({
			allPosts: parsed.data
		})

	}

	findPlanetAndPosts = async (user) => {
		const url = `http://localhost:9000/api/v1/planet/${user._id}`
		const findPlanet = await fetch(url, {
			method: 'GET',
			credentials: 'include',
		})
		console.log(url);
		const parsed = await findPlanet.json()
		// console.log(parsed,'<------parsed data of uer planet');
		const planet = parsed.data[0]
		
		// console.log(user,'<0000000user in the findPlanet');

		const postUrl = `http://localhost:9000/api/v1/post/user/${user._id}`
		const findPost = await fetch(postUrl,{
			method: 'GET',
			credentials: 'include'
		})
		const parsedPosts = await findPost.json();
		// console.log(parsedPosts,'<-------parsedPosts   ahskljaskdajs;dalsj;adajs;ajd');
		// console.log(userPost,'<======userpost');	
		this.setState({
			planet: planet,
			planetStatus: planet.status,
			userPosts: [...parsedPosts.data]
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


	toggleHomePage = () => {
		this.setState({
			showHomePage: !this.state.showHomePage,
			// user: null
		})
	}

	goToUserPage = (user) => {
		this.setState({
			user: user,
			showHomePage: false
		})
		// console.log(user,"<askljdaskas jjjj    need to see this ")
		this.findPlanetAndPosts(user)
	}


	render(){
		console.log(this.state,'<------state in userprofile ');
		const panes = [
			{ menuItem: 'featured posts', render: () => <Tab.Pane>{this.state.allPosts.length? <PostCards loggedUser={this.props.loggedUser} goToUserPage={this.goToUserPage} posts={this.state.allPosts}/> : null }</Tab.Pane> },
  			{ menuItem: 'data category', render: () => <Tab.Pane><DataCategory toggleHomePage={this.toggleHomePage}/></Tab.Pane> },]
		return(
			<div>
			{this.state.user !== this.props.loggedUser? 
				<a onClick={this.goToUserPage.bind(null, this.props.loggedUser)}>back to your profile page</a> 
			: null
			}
			{this.state.showHomePage ? null: 
				<div>
					<a onClick={this.toggleHomePage}> click here to look at some awsome data and post them!</a>
					<div className='UserProefileGroup'>
						{this.state.planet ? <UserPlanet 
							increasePlanetHappiness={this.increasePlanetHappiness} 
							delete = {this.deletePlanet} 
							planet = {this.state.planet} 
							loggedUser = {this.props.loggedUser}
							user = {this.state.user} 
							goToUserPage = {this.goToUserPage}
							planetStatus={this.state.planetStatus}/>
							: 
							<a onClick={this.props.togglePlanetContainer}>
							you have no planet, adopt one!
							</a>
						}
						<UserPosts 
						goToUserPage={this.goToUserPage}
						toggleHomePage={this.toggleHomePage} 
						user={this.state.user} 
						loggedUser={this.state.loggedUser}
						userPosts={this.state.userPosts}/>
					</div>
				</div>
			}
			{this.state.showHomePage? 
				<div className='HomePagePost'>
				<a onClick={this.goToUserPage.bind(null, this.props.loggedUser)}>back to your profile page</a> 
					<Tab panes={panes}/>
				</div> : null
			}
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

