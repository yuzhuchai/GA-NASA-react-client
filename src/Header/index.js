import React from 'react'
import {} from 'semantic-ui-react'


class Header extends React.Component{
	constructor(){
		super()
		this.state={
			loggedUser: null
		}
	}

	componentDidMount () {
		this.setState({
			loggedUser: this.props.loggedUser
		})
	}

	render(){
		const header = "{HOSHI ATSUME}"
		console.log(this.props,'<-----props in header');
		console.log(this.state,'<------state in header');
		return(

			<div className='App-header'>
	
				{this.props.loggedUser? <a onClick={this.props.logout}> welcome {this.props.loggedUser.username.toUpperCase()}, click here to logout</a>	: null }
				<h1 className='App-header-header'> {header}</h1>
			
			</div>
		)
	}

}

export default Header