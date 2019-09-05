import React from 'react'

class UserProfileContainer extends React.Component {
	constructor(){
		super()
		this.state = {
			loggedUser: null
		}
	}

	componentDidMount(){
		this.setState({
			loggedUser: this.props.loggedUser
		})
	}

	render(){
		console.log(this.state,'<------state in userprofile ');
		return(
			<div>
				<h1>User profile Contaainer </h1>
			</div>
		)
	}
}

export default UserProfileContainer